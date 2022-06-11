import type { NextPage } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import Page from "../../components/layouts/main/page";
import { PostProps } from "../../components/blog";
import { useLayout } from "../../layouts/layout";
import { headerClasses } from "../../layouts/main";

const PageMessage = dynamic(() => import("../../components/page-message"));
const BlogDirectory = dynamic(() => import("../../components/blog"));

const fetcher: Fetcher<{ posts: PostProps[]; pages: number }> = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
};

const Blog: NextPage = () => {
  useLayout("main", { menu: true, meta: { title: "Blog" }, headerClasses });

  const { query: { p, q } } = useRouter();
  const page = (Array.isArray(p) ? p[0] : p) || 1;
  const search = (Array.isArray(q) ? q[0] : q) || "";
  let { data, error, isValidating } = useSWRImmutable(`/api/get-posts?p=${page}&q=${search}`, fetcher);

  return (
    <Page.Body>
      {error ? (
        <PageMessage>{error.message}</PageMessage>
      ) : !isValidating && !(data?.posts || []).length ? (
        <PageMessage>No posts found.</PageMessage>
      ) : (
        <BlogDirectory data={data} page={page} />
      )}
    </Page.Body>
  );
};

export default Blog;
