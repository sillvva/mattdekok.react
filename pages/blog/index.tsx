import type { NextPage } from 'next'
import path from 'path';
import { readFile } from "node:fs/promises";
import { menuItems } from '../../store/main-layout.context';
import PageHeader from '../../components/page-header'
import Layout from '../../layouts/layout';
import Page from '../../components/page';
import BlogDirectory, { DirectoryProps, PostProps } from '../../components/blog';
import PageMeta from '../../components/meta';

const Blog: NextPage<DirectoryProps> = (props: DirectoryProps) => {
  return (
    <Layout>
      <PageMeta title="Blog" />
      <PageHeader title="Blog" items={menuItems} />
      <Page.Body>
        <BlogDirectory posts={props.posts} />
      </Page.Body>
    </Layout>
  )
}

export default Blog

export async function getServerSideProps() {
  const contentPath = path.join(process.cwd(), 'content');
  const contentFiles = await readFile(`${contentPath}/content.json`, "utf8");
  const data: PostProps[] = JSON.parse(contentFiles);

  return {
    props: {
      posts: data.sort((a, b) => a.date < b.date ? 1 : -1)
    }
  }
}