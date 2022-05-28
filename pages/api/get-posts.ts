import { existsSync, readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { PostProps } from "../../components/blog";
import { fetchPosts } from "../../functions/blog";
import { firebaseConfig } from "../../functions/firebase";
import { getContentDir } from "../../store/misc";

type PostFetchOptions = {
  page?: number;
  query?: string;
};

export type PostData = {
  timeCreated: string;
  path: string;
  match: number;
} & PostProps

const perPage = 12;

export const getPosts = async (options?: PostFetchOptions) => {
  const { page = 1, query = "" } = options || {};
  const jsonFile = `${getContentDir()}/${firebaseConfig.blogCollection}.json`;

  let posts: PostData[] = [];
  if (existsSync(jsonFile)) {
    const metaJson = readFileSync(jsonFile, { encoding: 'utf-8' });
    posts = JSON.parse(metaJson);
  }
  else {
    const result = await fetchPosts(true);
    posts = result.posts;
  }
  
  if (query) {
    posts = posts.map(post => {
      if (post.title.toLowerCase() === query.toLowerCase()) return { ...post, match: 1000 };
      const words = query.toLowerCase().split(' ');
      let match = 0;
      let found: string[] = [];
      if (post.title.toLowerCase().includes(query.toLowerCase())) match += 100;
      if (post.description.toLowerCase().includes(query.toLowerCase())) match += 50;

      const tagMatches = words.filter(c => post.tags.map(t => t.toLowerCase()).includes(c));
      found = found.concat(tagMatches);
      match += tagMatches.length * 20;

      const titleMatches = words.filter(c => post.title.toLowerCase().includes(c));  
      found = found.concat(titleMatches);
      match += titleMatches.length * 5;

      const descriptionMatches = words.filter(c => post.description.toLowerCase().includes(c));  
      found = found.concat(descriptionMatches);
      match += descriptionMatches.length * 1;

      const matches = found.filter((f, i) => i === found.indexOf(f));
      if (matches.length !== words.length) match = 0;

      return { ...post, match };
    })
    .filter(post => post.match)
    .sort((a, b) => a.match > b.match ? -1 : 1);
  }
  else posts = posts.sort((a, b) => a.date > b.date ? -1 : 1);

  return posts.slice((page - 1) * perPage, page * perPage - 1);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const { page, q } = req.query;

    try {
      res.setHeader("Cache-Control", "public, max-age=21600");
      return res.status(200).json({
        posts: await getPosts({
          page: parseInt(Array.isArray(page) ? page[0] : page) || 1,
          query: Array.isArray(q) ? q[0] : q
        }),
      });
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  }

  return res.status(422).json("Invalid method");
}
