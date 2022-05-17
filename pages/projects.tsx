import type { NextPage } from 'next'
import { menuItems } from '../store/main-layout.context';
import PageHeader from '../components/page-header'
import Layout from '../layouts/layout';
import Page from '../components/page';
import styles from '../styles/Gallery.module.scss'
import GalleryItem from '../components/gallery';
import PageMeta from '../components/meta';

const projects = [
  {
    image: "me2",
    title: "This Page (NextJS)",
    subtitle: "Personal Website",
    description: "Firebase, Vercel, Node.js, NextJS, React, TypeScript, HTML, SCSS, TailwindCSS",
    link: "https://github.com/sillvva/mattdekok.next"
  },
  {
    image: "me2",
    title: "This Page (Nuxt 3)",
    subtitle: "Personal Website",
    description: "Firebase, Heroku, Node.js, Nuxt 3, Vue 3, JavaScript, HTML, SCSS, TailwindCSS",
    link: "https://github.com/sillvva/mattdekok.nuxt2"
  },
  {
    image: "me2",
    title: "This Page (Nuxt 2)",
    subtitle: "Personal Website",
    description: "Firebase, Heroku, Node.js, Nuxt 2, Vue 2, JavaScript, HTML, SCSS, Vuetify, Github Actions",
    link: "https://github.com/sillvva/mattdekok.dev"
  },
  {
    image: "me",
    title: "This Page (Previous Version)",
    subtitle: "Personal Website",
    description: "Heroku, Node.js, React, TypeScript, HTML, SCSS, Bootstrap, Stripe",
    link: "https://github.com/sillvva/mattdekok.me",
  },
  {
    image: "valley-365",
    title: "Valley 365",
    subtitle: "Valmont Industries, Inc. - Web App",
    description: "Angular, TypeScript, jQuery, HTML, SCSS",
    link: "https://www.valley365.com/",
  },
  {
    image: "rpgschedule",
    title: "RPG Schedule",
    subtitle: "Discord Bot",
    description: "Google Cloud, Node.js, Nuxt 2, Vue 2, TypeScript, discord.js, MongoDB, HTML, CSS, Web Sockets",
    link: "https://github.com/sillvva/rpg-schedule",
  },
  {
    image: "npm",
    title: "@sillvva/react-styled-flexgrid",
    subtitle: "NPM Module - React Components",
    description: "NPM, React, TypeScript, JavaScript, Styled Components",
    link: "https://www.npmjs.com/package/@sillvva/react-styled-flexgrid",
  },
  {
    image: "hex-menu",
    title: "@sillvva/vue-hex-menu",
    subtitle: "Vue UI Component",
    description: "Vue 2, HTML, SCSS, JavaScript",
    link: "https://github.com/sillvva/vue-hexagon-menu",
  },
];

const Projects: NextPage = () => {
  return (
    <Layout>
      <PageMeta title="Projects" />
      <PageHeader title="Projects" items={menuItems} />
      <Page.Body>
        <div className="flex flex-wrap justify-center lg:mt-0 pb-4">
          <div className="p-2 basis-full 2xl:basis-11/12">
            <div className={styles.Projects}>
              {projects.map((project, i) => (
                <div className={styles.Project} key={`project-${i}`}>
                  <GalleryItem image={project.image} title={project.title} subtitle={project.subtitle} description={project.description} link={project.link} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Page.Body>
    </Layout >
  )
}

export default Projects
