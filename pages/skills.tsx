import type { NextPage } from 'next'
import { menuItems } from '../store/main-layout.context';
import PageHeader from '../components/page-header'
import Page from '../components/page';
import Rating from '../components/ratings';
import Layout from '../layouts/layout';
import PageMeta from '../components/meta';

const Skills: NextPage = () => {
  const cols = {
    sm: 12,
    md: 6,
    xl: 4,
  };

  return (
    <Layout>
      <PageMeta title="Skills" />
      <PageHeader title="Skills" items={menuItems} />
      <Page.Body>
        <Page.Article className="w-full sm:w-9/12 md:w-10/12 lg:w-9/12">
          <Rating.Section name="Web Development" columns={cols}>
            <Rating.Item name="Angular" rating={2.5} />
            <Rating.Item name="AWS Elastic Beanstalk" rating={2} />
            <Rating.Item name="AWS CodePipeline" rating={2} />
            <Rating.Item name="Azure DevOps" rating={1} />
            <Rating.Item name="Bootstrap" rating={4} />
            <Rating.Item name="CI/CD" rating={2} />
            <Rating.Item name="CSS3" rating={4.5} />
            <Rating.Item name="Express" rating={3} />
            <Rating.Item name="Github Actions" rating={2} />
            <Rating.Item name="Heroku" rating={3.5} />
            <Rating.Item name="HTML5" rating={5} />
            <Rating.Item name="JavaScript" rating={5} />
            <Rating.Item name="jQuery" rating={4} />
            <Rating.Item name="Node.Js" rating={4} />
            <Rating.Item name="PHP" rating={4} />
            <Rating.Item name="React" rating={2.5} />
            <Rating.Item name="SCSS" rating={4} />
            <Rating.Item name="TypeScript" rating={4} />
            <Rating.Item name="Vue / Nuxt" rating={4} />
          </Rating.Section>
          <Rating.Section name="Microsoft Software" columns={cols}>
            <Rating.Item name="Excel" rating={4.5} />
            <Rating.Item name="Powerpoint" rating={2} />
            <Rating.Item name="VBA" rating={2.5} />
            <Rating.Item name="Visual Studio Code" rating={4} />
            <Rating.Item name="Word" rating={3.5} />
          </Rating.Section>
          <Rating.Section name="Graphic Design" columns={cols}>
            <Rating.Item name="Adobe Photoshop" rating={3} />
            <Rating.Item name="Affinity Photo" rating={3} />
          </Rating.Section>
        </Page.Article>
      </Page.Body>
    </Layout>
  )
}

export default Skills

