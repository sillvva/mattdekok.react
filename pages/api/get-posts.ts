import { existsSync, readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { PostProps } from "../../components/blog";
import { fetchPosts } from "../../lib/blog";
import { firebaseConfig } from "../../lib/firebase";
import { getContentDir } from "../../store/misc";

type PostFetchOptions = {
  page?: number;
  query?: string;
  limit?: number;
};

export type PostData = {
  timeCreated: string;
  path: string;
  match: number;
} & PostProps;

const perPage = 12;

export const getPosts = async (options?: PostFetchOptions) => {
  const { page = 1, query = "", limit = perPage } = options || {};
  const jsonFile = `${getContentDir()}/${firebaseConfig.blogCollection}.json`;

  let posts: PostData[] = [];
  let num = 0;
  if (existsSync(jsonFile)) {
    const metaJson = readFileSync(jsonFile, { encoding: "utf-8" });
    posts = JSON.parse(metaJson);
    num = posts.length;
  } else {
    const result = await fetchPosts(true, page, limit, query);
    posts = result.posts;
    num = result.num;
  }

  if (query) {
    posts = posts
      .map(post => {
        if (post.title.toLowerCase() === query.toLowerCase()) return { ...post, match: 1000 };
        const words = query.toLowerCase().split(" ");
        let match = 0;
        let found: string[] = [];
        if (post.title.toLowerCase().includes(query.toLowerCase())) match += 100;
        if (post.description?.toLowerCase().includes(query.toLowerCase())) match += 50;

        const tagMatches = words.filter(c => post.tags.map(t => t.toLowerCase()).includes(c));
        found = found.concat(tagMatches);
        match += tagMatches.length * 20;

        const titleMatches = words.filter(c => post.title.toLowerCase().includes(c));
        found = found.concat(titleMatches);
        match += titleMatches.length * 5;

        const descriptionMatches = words.filter(c => post.description?.toLowerCase().includes(c));
        found = found.concat(descriptionMatches);
        match += descriptionMatches.length * 1;

        const matches = found.filter((f, i) => i === found.indexOf(f));
        if (matches.length !== words.length) match = 0;

        return { ...post, match };
      })
      .filter(post => post.match)
      .sort((a, b) => (a.match > b.match ? -1 : 1));
    num = posts.length;
  } else posts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return {
    pages: Math.ceil(num / limit),
    posts: posts.slice((page - 1) * limit, page * limit),
    num
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const { p, q, limit } = req.query;

    try {
      res.setHeader("Cache-Control", "public, max-age=21600");
      const page = parseInt(Array.isArray(p) ? p[0] : p) || 1;
      const query = Array.isArray(q) ? q[0] : q;
      const result = await getPosts({
        page,
        query,
        limit: parseInt(Array.isArray(limit) ? limit[0] : limit) || perPage
      });
      if (result.pages < page) throw new Error("Invalid page count");
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(401).json({
        message: err.message
      });
    }
  }

  return res.status(422).json("Invalid method");
}
