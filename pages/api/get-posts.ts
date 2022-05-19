import { PostProps } from "../../components/blog";
import { doc, getDoc, firebaseConfig } from "../../functions/firebase";

export default async function handler(req: any, res: any) {
  if (req.method == "GET") {
    try {
      const docRef = doc(firebaseConfig.storageContent);
      const document = await getDoc(docRef);
      const data: any = Object.values(JSON.parse(JSON.stringify(document.data())));

      const posts: PostProps[] = [];
      for (let doc of data) {
        posts.push({
          slug: doc.name.replace(/\.[^/.]+$/, ""),
          ...doc.data,
          ...(doc.data.date && { date: new Date(doc.data.date.seconds * 1000).toISOString() }),
          ...(doc.data.updated && { updated: new Date(doc.data.updated.seconds * 1000).toISOString() }),
        });
      }

      res.setHeader('Cache-Control', 'public, max-age=3600')
      return res.status(200).json({
        posts: posts.sort((a, b) => a.date < b.date ? 1 : -1),
      });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }

  return res.status(422).json("Invalid method");
}
