import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";
import { readFileSync, rmSync, existsSync, statSync } from "node:fs";
import { getContentDir } from "../../store/misc";
import { firebaseConfig, storage } from "../../functions/func";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    try {
      const { slug } = req.query;

      const dirPath = getContentDir();
      const postsPath = `${dirPath}/posts.json`;
      const filePath = `${dirPath}/${slug}.md`;

      let meta: any;
      let file: any;
      if (existsSync(postsPath)) {
        const posts = readFileSync(postsPath, "utf8");
        const data = JSON.parse(posts);
        meta = data[`${slug}.md`];
      } else {
        const file = storage.file(`${firebaseConfig.blogStorage}/${slug}.md`);
        [meta] = await file.getMetadata();
      }

      let result = { data: "" };
      let write = false;
      if (existsSync(filePath)) {
        const stat = statSync(filePath);
        const tdiff = (new Date(meta.timeCreated).getTime() - stat.ctime.getTime()) / 1000;
        if (tdiff > 0) {
          write = true;
          rmSync(filePath);
        } else result.data = readFileSync(filePath, "utf8");
      } else write = true;

      if (write) {
        if (!file) file = storage.file(`${firebaseConfig.blogStorage}/${slug}.md`);
        file.download({
          destination: filePath
        });
      }

      const { content, data } = matter(result.data);
      if (data.date) data.dateISO = new Date(data.date).toISOString();
      if (data.updated) data.updatedISO = new Date(data.updated).toISOString();
      for (let key in data) {
        if (data[key] instanceof Date) {
          data[key] = data[key].toLocaleDateString("en-us", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
        }
      }

      res.setHeader("Cache-Control", "public, max-age=21600");
      return res.status(200).json({
        content,
        data
      });
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  }

  return res.status(422).json("Invalid method");
}
