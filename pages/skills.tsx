import type { NextPage } from "next";
import { useLayout } from "../layouts/layout";
import { headerClasses } from "../layouts/main";
import Page from "../components/layouts/main/page";
import Rating from "../components/ratings";
import { firestore } from "../functions/func";

const Skills: NextPage<SkillProps> = props => {
  useLayout("main", { menu: true, meta: { title: "Skills" }, headerClasses });

  const cols = {
    sm: 12,
    md: 6,
    xl: 4
  };

  return (
    <Page.Body>
      <Page.Article className="w-full sm:w-8/12 md:w-10/12 lg:w-9/12">
        {props.skills.map((section, i) => (
          <Rating.Section key={`rsect${i}`} name={section.name} columns={cols}>
            {section.skills.map((skill, j) => (
              <Rating.Item key={`${i}-${j}`} name={skill.name} rating={skill.rating} />
            ))}
          </Rating.Section>
        ))}
      </Page.Article>
    </Page.Body>
  );
};

export default Skills;

type Skill = {
  [name: string]: number;
};

type SkillSection = {
  [section: string]: Skill;
};

type SkillPropsSkill = {
  name: string;
  rating: number;
};

type SkillPropsSection = {
  name: string;
  skills: SkillPropsSkill[];
};

type SkillProps = {
  skills: SkillPropsSection[];
};

export async function getServerSideProps() {
  const doc = firestore.doc("website/skills");
  const document = await doc.get();
  const sections: SkillSection = document.data() || {};

  return {
    props: {
      skills: Object.entries(sections)
        .sort((a, b) => (a[0] > b[0] ? 1 : -1))
        .map(([section, skills]) => ({
          name: section.replace(/^\d+\. /, ""),
          skills: Object.entries(skills)
            .map(([skill, rating]) => ({
              name: skill,
              rating: rating
            }))
            .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        }))
    }
  };
}
