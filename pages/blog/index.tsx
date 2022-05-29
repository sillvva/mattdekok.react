import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import Layout from '../../layouts/layout';
import Page from '../../components/page';
import BlogDirectory, { PostProps, postLoader } from '../../components/blog';
import PageMessage from '../../components/page-message';
import Pagination from '../../components/pagination';

const loaders: PostProps[] = Array(6).fill(postLoader);
const fetcher: Fetcher<{ posts: PostProps[], pages: number }> =
  (url: string) => fetch(url)
    .then(res => res.json());

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
          <PageMessage>{error}</PageMessage>
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