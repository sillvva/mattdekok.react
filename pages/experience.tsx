import type { NextPage } from 'next'
import { PropsWithChildren } from 'react';
import { menuItems } from '../store/main-layout.context';
import PageHeader from '../components/page-header'
import Page from '../components/page';
import Layout from '../layouts/layout';
import PageMeta from '../components/meta';
import { doc, getDoc, setDoc } from '../functions/firebase'

const Experience: NextPage<ExperienceProps> = (props: PropsWithChildren<ExperienceProps>) => {
  return (
    <Layout>
      <PageMeta title="Experience" />
      <PageHeader title="Experience" items={menuItems} />
      <Page.Body>
        <Page.Article className="w-full md:w-9/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12">
          {props.experience.map((section) => (
            <Page.Section key={section.name}>
              <h2 className="text-xl font-bold">{section.name}</h2>
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

interface ExperienceItem {
  name?: string;
  nameLink?: string;
  image: string;
  h4: string;
  h4Link?: string;
  h5: string;
  h5Link?: string;
}

interface ExperienceProps {
  experience: ExperienceArrSection[]
}

interface ExperienceArrSection {
  name: string;
  experience: ExperienceItem[]
}

interface ExperienceSection {
  [name: string]: ExperienceItem;
}

interface ExperienceSections {
  [name: string]: ExperienceSection;
}

export async function getServerSideProps() {
  const docRef = doc('website/experience');
  const document = await getDoc(docRef);
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
