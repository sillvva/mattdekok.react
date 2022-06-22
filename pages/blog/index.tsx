import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import type { NextPageWithLayout } from "../_app";
import MainLayout from "../../layouts/main";
import Page from "../../components/layouts/main/page";
import { PostProps } from "../../components/blog";

const PageMessage = dynamic(() => import("../../components/page-message"));
const BlogDirectory = dynamic(() => import("../../components/blog"));

const Blog: NextPageWithLayout = () => {
  const {
    query: { p, q },
    asPath
  } = useRouter();

  useQuery(["backTo", "/blog"], async () => asPath, {
    refetchOnMount: "always"
  });

  const page = (Array.isArray(p) ? p[0] : p) || 1;
  const search = (Array.isArray(q) ? q[0] : q) || "";
  const { isLoading, data, error } = useQuery<{ posts: PostProps[]; pages: number }, Error>(["posts", page, search], async ({ signal }) => {
    const res = await fetch(`/api/get-posts?p=${page}&q=${search}`, { signal });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }

    return res.json();
  });

  return (
    <Page.Body>
      {error ? (
        <PageMessage>{error.message}</PageMessage>
      ) : !isLoading && !(data?.posts || []).length ? (
        <PageMessage>No posts found.</PageMessage>
      ) : (
        <BlogDirectory data={data} page={page} />
      )}
    </Page.Body>
  );
};

export default Blog;

Blog.getLayout = function (page) {
  return (
    <MainLayout title="Blog" menu>
      {page}
    </MainLayout>
  );
};
