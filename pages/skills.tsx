import type { NextPage } from 'next'
import { menuItems } from '../store/main-layout.context';
import PageHeader from '../components/page-header'
import Page from '../components/page';
import Rating from '../components/ratings';
import Layout from '../layouts/layout';
import PageMeta from '../components/meta';
import { doc, getDoc } from '../functions/firebase'

const Skills: NextPage = (props: any) => {
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
          {props.skills.map((section: any, i: number) => (
            <Rating.Section key={i} name={section.section} columns={cols}>
              {section.skills.map((skill: any, j: number) => <Rating.Item key={`${i}-${j}`} name={skill.name} rating={skill.rating} />)}
            </Rating.Section>
          ))}
        </Page.Article>
      </Page.Body>
    </Layout>
  )
}

export default Skills

interface Skill {
  name: string;
  rating: number;
}

interface SkillSection {
  section: string;
  skills: Skill[];
}

export async function getServerSideProps() {
  const docRef = doc('website/skills');
  const document = await getDoc(docRef);
  const skills: SkillSection[] = document.data()?.data || [];

  return {
    props: {
      skills: skills.map(section => ({ 
        ...section, 
        skills: section.skills.sort((a, b) => a.name > b.name ? 1 : -1) 
      }))
    }
  }
}
