import type { NextPage } from 'next'
import { menuItems } from '../../store/main-layout.context';
import PageHeader from '../../components/page-header'
import Layout from '../../layouts/layout';
import Page from '../../components/page';
import BlogDirectory, { DirectoryProps, PostProps } from '../../components/blog';
import PageMeta from '../../components/meta';

import { doc, getDoc, firebaseConfig } from '../../functions/firebase'

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
  const docRef = doc(firebaseConfig.storageContent);
  const document = await getDoc(docRef);
  const data: any = Object.values(JSON.parse(JSON.stringify(document.data())));

  const posts: PostProps[] = [];
  for(let doc of data) {
    posts.push({
      slug: doc.name.replace(/\.[^/.]+$/, ""),
      ...doc.data,
      ...(doc.data.date && { date: new Date(doc.data.date.seconds * 1000).toISOString() }),
      ...(doc.data.updated && { updated: new Date(doc.data.updated.seconds * 1000).toISOString() }),
    })
  }

  return {
    props: {
      posts: posts.sort((a, b) => a.date < b.date ? 1 : -1)
    }
  }
}