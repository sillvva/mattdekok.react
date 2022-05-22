import type { NextPage } from 'next'
import { PropsWithChildren } from 'react';
import Layout from '../../layouts/layout';
import Page from '../../components/page';
import GalleryItem from '../../components/gallery';
import { doc, getDoc } from '../../functions/firebase'
import projectStyles from './Projects.module.scss';

const Projects: NextPage<ProjectProps> = (props: PropsWithChildren<ProjectProps>) => {
  return (
    <Layout props={{ menu: true, meta: { title: "Projects" } }}>
      <Page.Body>
        <div className="flex flex-wrap justify-center lg:mt-0 pb-4">
          <div className="p-2 basis-full 2xl:basis-11/12">
            <div className={projectStyles.Projects}>
              {props.projects.map((project, i) => (
                <div className={projectStyles.Project} key={`project-${i}`}>
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