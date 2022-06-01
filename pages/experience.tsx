import type { NextPage } from 'next'
import Page from '../components/page';
import Layout from '../layouts/layout';
import { firestore } from '../functions/func'

const Experience: NextPage<ExperienceProps> = (props) => {
  return (
    <Layout props={{ menu: true, meta: { title: "Experience" }, headerClasses: ['backdrop-blur-lg bg-transparent sticky z-10 top-0'] }}>
      <Page.Body>
        <Page.Article className="w-full md:w-9/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12">
          {props.experience.map((section) => (
            <Page.Section key={section.name}>
              <h2>{section.name}</h2>
              <Page.SectionItems>
                {section.experience.map((exp, i) => (
                  <Page.SectionItem key={`${exp.name}${i}`} image={exp.image}>
                    <h3>
                      {!exp.nameLink ? exp.name : <a href={exp.nameLink} target="_blank" rel="noreferrer noopener">{exp.name}</a>}
                    </h3>
                    <h4>
                      {!exp.h4Link ? exp.h4 : <a href={exp.h4Link} target="_blank" rel="noreferrer noopener">{exp.h4}</a>}
                    </h4>
                    <h5>
                      {!exp.h5Link ? exp.h5 : <a href={exp.h5Link} target="_blank" rel="noreferrer noopener">{exp.h5}</a>}
                    </h5>
                  </Page.SectionItem>
                ))}
              </Page.SectionItems>
            </Page.Section>
          ))}
        </Page.Article>
      </Page.Body>
    </Layout>
  )
}

export default Experience

type ExperienceItem = {
  name?: string;
  nameLink?: string;
  image: string;
  h4: string;
  h4Link?: string;
  h5: string;
  h5Link?: string;
}

type ExperienceProps = {
  experience: ExperienceArrSection[]
}

type ExperienceArrSection = {
  name: string;
  experience: ExperienceItem[]
}

type ExperienceSection = {
  [name: string]: ExperienceItem;
}

type ExperienceSections = {
  [name: string]: ExperienceSection;
}

export async function getServerSideProps() {
  const doc = firestore.doc('website/experience');
  const document = await doc.get();
  const experience: ExperienceSections = document.data() || {};

  return {
    props: {
      experience: Object.entries(experience)
        .sort(([nameA], [nameB]) => nameA > nameB ? 1 : -1)
        .map(([sectionName, section]) => ({
          name: sectionName.replace(/^\d+\. /, ''),
          experience: Object.entries(section)
            .sort(([nameA], [nameB]) => nameA > nameB ? 1 : -1)
            .map(([expName, exp]) => ({
              name: expName.replace(/^\d+\. /, ''),
              ...exp
            }))
        }))
    }
  }
}
