import type { NextPageWithLayout } from "../_app";
import Page from "../../components/layouts/main/page";
import GalleryItem from "../../components/gallery";
import { firestore } from "../../lib/func";
import MainLayout, { headerClasses } from "../../layouts/main";
import styles from "./Projects.module.scss";

const Projects: NextPageWithLayout<ProjectProps> = props => {
  return (
    <Page.Body>
      <div className="flex flex-wrap justify-center lg:mt-0 pb-4">
        <div className="p-0 md:p-2 basis-full 2xl:basis-11/12">
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
  );
};

export default Projects;

Projects.getLayout = function (page) {
  return (
    <MainLayout title="Projects" menu headerClasses={headerClasses}>
      {page}
    </MainLayout>
  );
};

type Project = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link?: string;
  sort?: number;
};

type ProjectProps = {
  projects: Project[];
};

export async function getStaticProps() {
  const doc = firestore.doc("website/projects");
  const document = await doc.get();
  const projects: Project[] = document.data()?.data || [];

  return {
    props: {
      projects: projects
        .map((p, i) => ({
          ...p,
          sort: i
        }))
        .sort((a, b) => (a.sort < b.sort ? 1 : -1))
    },
    revalidate: 6 * 3600
  };
}
