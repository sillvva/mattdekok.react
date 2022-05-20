import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { menuItems } from '../../store/main-layout.context';
import PageHeader from '../../components/page-header'
import Layout from '../../layouts/layout';
import Page from '../../components/page';
import BlogDirectory, { DirectoryProps, PostProps } from '../../components/blog';
import PageMeta from '../../components/meta';

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
        setPosts(data.posts);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <PageMeta title="Blog" />
      <PageHeader title="Blog" items={menuItems} />
      <Page.Body>
        {loading ? (
          <BlogDirectory posts={loaders} />
        ) : error ? (
          <div className="flex flex-col justify-center py-20 text-2xl">
            <h1 className="text-2xl">{error}</h1>
          </div>
        ) : !posts.length ? (
          <div className="flex flex-col justify-center py-20 text-2xl">
            <h1 className="text-2xl">No posts found.</h1>
          </div>
        ) : (
          <BlogDirectory posts={posts} />
        )}
      </Page.Body>
    </Layout>
  )
}

export default Blog