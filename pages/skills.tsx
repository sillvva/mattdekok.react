import type { NextPage } from 'next'
import Page from '../components/page';
import Rating from '../components/ratings';
import Layout from '../layouts/layout';
import { doc, getDoc } from '../functions/firebase'

const Skills: NextPage<SkillProps> = (props: SkillProps) => {
  const cols = {
    sm: 12,
    md: 6,
    xl: 4,
  };

  return (
    <Layout props={{ menu: true, meta: { title: "Skills" } }}>
      <Page.Body>
        <Page.Article className="w-full sm:w-9/12 md:w-10/12 lg:w-9/12">
          {props.skills.map((section, i) => (
            <Rating.Section key={i} name={section.name} columns={cols}>
              {section.skills.map((skill, j) => <Rating.Item key={`${i}-${j}`} name={skill.name} rating={skill.rating} />)}
            </Rating.Section>
          ))}
        </Page.Article>
      </Page.Body>
    </Layout>
  )
}

export default Skills

type Skill = {
  [name: string]: number
}

type SkillSection = {
  [section: string]: Skill
}

type SkillPropsSkill = {
  name: string;
  rating: number;
}

type SkillPropsSection = {
  name: string;
  skills: SkillPropsSkill[];
}

type SkillProps = {
  skills: SkillPropsSection[];
}

export async function getServerSideProps() {
  const docRef = doc('website/skills');
  const document = await getDoc(docRef);
  const sections: SkillSection = document.data() || {};

  return {
    props: {
      skills: Object.entries(sections).sort((a, b) => a[0] > b[0] ? 1 : -1).map(([section, skills]) => ({
        name: section.replace(/^\d+\. /, ''),
        skills: Object.entries(skills).map(([skill, rating]) => ({
          name: skill,
          rating: rating
        })).sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
      }))
    }
  }
}
