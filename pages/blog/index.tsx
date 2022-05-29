import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import Layout from '../../layouts/layout';
import Page from '../../components/page';
import BlogDirectory, { PostProps, postLoader } from '../../components/blog';
import PageMessage from '../../components/page-message';
import Pagination from '../../components/pagination';

const loaders: PostProps[] = Array(6).fill(postLoader);
const fetcher: Fetcher<{ posts: PostProps[], pages: number }> = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
}

const Blog: NextPage = () => {
  const router = useRouter();
  const page = (Array.isArray(router.query.page) ? router.query.page[0] : router.query.page) || 1;
  let { data, error } = useSWR(`/api/get-posts?page=${page}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false
  });

  if (!data) data = { posts: loaders, pages: 0 };

  return (
    <Layout props={{ menu: true, meta: { title: "Blog" } }}>
      <Page.Body>
        {error ? (
          <PageMessage>{error.message}</PageMessage>
        ) : !(data.posts || []).length ? (
          <PageMessage>No posts found.</PageMessage>
        ) : (
          <div className="flex flex-col">
            <BlogDirectory data={data} page={page} />
            {data.pages > 1 && <Pagination page={page} pages={data.pages} />}
          </div>
        )}
      </Page.Body>
    </Layout>
  )
}

export default Blog