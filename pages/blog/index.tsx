import type { NextPage } from 'next'
import useSWR, { Fetcher } from 'swr';
import Layout from '../../layouts/layout';
import Page from '../../components/page';
import BlogDirectory, { PostProps } from '../../components/blog';
import PageMessage from '../../components/page-message';

const fetcher: Fetcher<{ posts: PostProps[] }> = (url: string) => fetch(url).then((res) => res.json());

const Blog: NextPage = () => {
  const { data, error } = useSWR('/api/get-posts', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false
  });
  const loaders: PostProps[] = Array(6).fill({
    title: "", date: "", image: "",
    description: "", slug: "", link: ""
  });

  return (
    <Layout props={{ menu: true, meta: { title: "Blog" } }}>
      <Page.Body>
        { error ? (
          <PageMessage>{error}</PageMessage>
        ) : !data ? (
          <BlogDirectory posts={loaders} />
        ) : !(data.posts || []).length ? (
          <PageMessage>No posts found.</PageMessage>
        ) : (
          <BlogDirectory posts={data.posts} />
        )}
      </Page.Body>
    </Layout>
  )
}

export default Blog