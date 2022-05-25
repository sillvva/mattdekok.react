import { existsSync, readFileSync, writeFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { PostProps } from "../../components/blog";
import { firestore, firebaseConfig } from "../../functions/func";
import { getContentDir } from "../../store/misc";

export const getPosts = async () => {
  const dirPath = getContentDir();
  const postsPath = `${dirPath}/posts.json`;

  let data: any[] = [];
  if (existsSync(postsPath)) {
    const posts = readFileSync(postsPath, 'utf8');
    data = Object.values(JSON.parse(posts));
  }
  else {
    const doc = firestore.doc(firebaseConfig.blogContent);
    const document = await doc.get();
    const refData: any = document.data();
    writeFileSync(postsPath, JSON.stringify(refData));
    data = Object.values(refData);
  }

  const posts: PostProps[] = [];
  for (let doc of data) {
    posts.push({
      slug: doc.name.replace(/\.[^/.]+$/, ""),
      ...doc.data,
      ...(doc.data.date?._seconds && { date: new Date(doc.data.date._seconds * 1000).toISOString() }),
      ...(doc.data.updated?._seconds && { updated: new Date(doc.data.updated._seconds * 1000).toISOString() }),
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    try {
      res.setHeader("Cache-Control", "public, max-age=21600");
      return res.status(200).json({
        posts: await getPosts(),
      });
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  }

  return res.status(422).json("Invalid method");
}
