import type { NextPage } from 'next'
import { menuItems } from '../store/main-layout.context';
import PageHeader from '../components/page-header'
import Layout from '../layouts/layout';
import Page from '../components/page';
import styles from '../styles/Gallery.module.scss'
import GalleryItem from '../components/gallery';
import PageMeta from '../components/meta';
import { firestore, doc, getDoc } from '../functions/firebase'

const Projects: NextPage = (props: any) => {
  return (
    <Layout>
      <PageMeta title="Projects" />
      <PageHeader title="Projects" items={menuItems} />
      <Page.Body>
        <div className="flex flex-wrap justify-center lg:mt-0 pb-4">
          <div className="p-2 basis-full 2xl:basis-11/12">
            <div className={styles.Projects}>
              {props.projects.map((project: any, i: number) => (
                <div className={styles.Project} key={`project-${i}`}>
                  <GalleryItem image={project.image} title={project.title} subtitle={project.subtitle} description={project.description} link={project.link} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Page.Body>
    </Layout>
  )
}

export default Projects

export async function getServerSideProps(context: any) {
  const docRef = doc(firestore, 'website/projects');
  const document = await getDoc(docRef);
  const projects = document.data()?.data || [];

  return {
    props: {
      projects
    }
  }
}