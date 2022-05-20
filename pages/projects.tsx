import type { NextPage } from 'next'
import { PropsWithChildren } from 'react';
import { menuItems } from '../store/main-layout.context';
import PageHeader from '../components/page-header'
import Layout from '../layouts/layout';
import Page from '../components/page';
import styles from '../styles/Gallery.module.scss'
import GalleryItem from '../components/gallery';
import PageMeta from '../components/meta';
import { doc, getDoc } from '../functions/firebase'

const Projects: NextPage<ProjectProps> = (props: PropsWithChildren<ProjectProps>) => {
  return (
    <Layout>
      <PageMeta title="Projects" />
      <PageHeader title="Projects" items={menuItems} />
      <Page.Body>
        <div className="flex flex-wrap justify-center lg:mt-0 pb-4">
          <div className="p-2 basis-full 2xl:basis-11/12">
            <div className={styles.Projects}>
              {props.projects.map((project, i) => (
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

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link?: string;
  sort?: number;
}

interface ProjectProps {
  projects: Project[];
}

export async function getServerSideProps() {
  const docRef = doc('website/projects');
  const document = await getDoc(docRef);
  const projects: Project[] = document.data()?.data || [];

  return {
    props: {
      projects: projects.map((p, i) => ({
        ...p,
        sort: i
      })).sort((a, b) => a.sort < b.sort ? 1 : -1)
    }
  }
}