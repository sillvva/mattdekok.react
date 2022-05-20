import { NextApiRequest, NextApiResponse } from "next";
import { PostProps } from "../../components/blog";
import { doc, getDoc, firebaseConfig } from "../../functions/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    try {
      const docRef = doc(firebaseConfig.blogContent);
      const document = await getDoc(docRef);
      const data = Object.values(<object>(document.data()));

      const posts: PostProps[] = [];
      for (let doc of data) {
        posts.push({
          slug: doc.name.replace(/\.[^/.]+$/, ""),
          ...doc.data,
          ...(doc.data.date && { date: new Date(doc.data.date.seconds * 1000).toISOString() }),
          ...(doc.data.updated && { updated: new Date(doc.data.updated.seconds * 1000).toISOString() }),
        });
      }

      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.status(200).json({
        posts: posts.sort((a, b) => (a.date < b.date ? 1 : -1)),
      });
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  }

  return res.status(422).json("Invalid method");
}
