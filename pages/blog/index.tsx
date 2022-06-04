import type { NextPage } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import Cookies from "js-cookie";
import Page from "../../components/page";
import { PostProps, postLoader } from "../../components/blog";
import { useLayout } from "../../layouts/layout";
import { headerClasses } from "../../layouts/main";

const Pagination = dynamic(() => import("../../components/pagination"));
const PageMessage = dynamic(() => import("../../components/page-message"));
const BlogDirectory = dynamic(() => import("../../components/blog"));

const loaders: PostProps[] = Array(6).fill(postLoader);
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

  const router = useRouter();
  const page = (Array.isArray(router.query.page) ? router.query.page[0] : router.query.page) || 1;
  let { data, error } = useSWRImmutable(`/api/get-posts?page=${page}`, fetcher);

  if (!data) data = { posts: loaders, pages: 0 };

  useEffect(() => {
    Cookies.set("blog-url", router.asPath);
  }, [router.asPath]);

  return (
    <Page.Body>
      {error ? (
        <PageMessage>{error.message}</PageMessage>
      ) : !(data.posts || []).length ? (
        <PageMessage>No posts found.</PageMessage>
      ) : (
        <>
          <BlogDirectory data={data} page={page} />
          {data.pages > 1 && <Pagination page={page} pages={data.pages} />}
        </>
      )}
    </Page.Body>
  );
};

export default Blog;
