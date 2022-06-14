import { NextApiRequest, NextApiResponse } from "next";
import { fetchPosts } from "../../lib/blog.js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        const result = await fetchPosts();
        const added = result.added || [];
        const updated = result.updated || [];
        const revalidations = [...added, ...updated];
        for (let i = 0; i < revalidations.length; i++) {
          await res.unstable_revalidate(`/blog/${revalidations[i]}`);
        }
        res.status(200).json({ success: true, revalidated: !!revalidations.length, ...result });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err: any) {
      res.status(500).json({ success: false, statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
