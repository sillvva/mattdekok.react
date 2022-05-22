import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Layout from '../../layouts/layout';
import Page from '../../components/page';
import BlogDirectory, { DirectoryProps, PostProps } from '../../components/blog';
import PageMessage from '../../components/page-message';


const Blog: NextPage<DirectoryProps> = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loaders: PostProps[] = Array(6).fill({
    title: "", date: "", image: "",
    description: "", slug: "", link: ""
  });

  useEffect(() => {
    fetch('/api/get-posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout props={{ menu: true, meta: { title: "Blog" } }}>
      <Page.Body>
        {loading ? (
          <BlogDirectory posts={loaders} />
        ) : error ? (
          <PageMessage>{error}</PageMessage>
        ) : !posts.length ? (
          <PageMessage>No posts found.</PageMessage>
        ) : (
          <BlogDirectory posts={posts} />
        )}
      </Page.Body>
    </Layout>
  )
}

export default Blog