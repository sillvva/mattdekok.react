import type { NextPage } from 'next'
import { menuItems } from '../store/main-layout.context';
import PageHeader from '../components/page-header'
import Page from '../components/page';
import Layout from '../layouts/layout';
import PageMeta from '../components/meta';

const Experience: NextPage = () => {
  return (
    <Layout>
      <PageMeta title="Experience" />
      <PageHeader title="Experience" items={menuItems} />
      <Page.Body>
        <Page.Article className="w-full md:w-9/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12">
          <Page.Section>
            <h2 className="text-xl font-bold">Work Experience</h2>
            <Page.SectionItems>
              <Page.SectionItem image="/images/ddb.png">
                <h3>Forum, Twitch, and Discord Moderator</h3>
                <h4>
                  <a href="https://www.dndbeyond.com/" target="_blank" rel="noreferrer noopener"> D&amp;D Beyond </a>
                </h4>
                <h5>2019 - Present</h5>
              </Page.SectionItem>
              <Page.SectionItem image="/images/valmont.jpg">
                <h3>Front End Web Developer</h3>
                <h4>
                  <a href="http://www.valmont.com/" target="_blank" rel="noreferrer noopener"> Valmont Industries, Inc. </a>
                </h4>
                <h5>2019 - Present</h5>
              </Page.SectionItem>
              <Page.SectionItem image="/images/agsense.png">
                <h3>Web Developer</h3>
                <h4>
                  <a href="http://agsense.com/" target="_blank" rel="noreferrer noopener"> AgSense, LLC. </a>
                </h4>
                <h5>2012 - Present</h5>
              </Page.SectionItem>
            </Page.SectionItems>
          </Page.Section>
          <Page.Section>
            <h2 className="text-xl font-bold">Education</h2>
            <Page.SectionItems>
              <Page.SectionItem image="/images/dsu.png">
                <h3>Computer and Information Systems Security/Information Assurance</h3>
                <h4>
                  <a href="https://dsu.edu/academics/degrees-and-programs/computer-information-systems-bs" target="_blank" rel="noreferrer noopener"> Dakota State University </a>
                </h4>
                <h5>Bachelor of Science Degree</h5>
              </Page.SectionItem>
              <Page.SectionItem image="/images/mti.png">
                <h3>Computer Software and Media Applications</h3>
                <h4>
                  <a href="https://www.mitchelltech.edu/academics/programs-we-offer/online/administrative-office-specialist" target="_blank" rel="noreferrer noopener">
                    Mitchell Technical Institute
                  </a>
                </h4>
                <h5>Associate&apos;s Degree</h5>
              </Page.SectionItem>
            </Page.SectionItems>
          </Page.Section>
          <Page.Section>
            <h2 className="text-xl font-bold">Licenses &amp; Certifications</h2>
            <Page.SectionItems>
              <Page.SectionItem image="/images/mos.png">
                <h3>Microsoft Office Specialist</h3>
                <h4>Microsoft Excel - Mitchell Tech</h4>
                <h5>
                  <a href="https://www.microsoft.com/en-us/learning/dashboard.aspx" target="_blank" rel="noreferrer noopener"> Credential ID 6154048 </a>
                </h5>
              </Page.SectionItem>
              <Page.SectionItem image="/images/udemy.svg">
                <h3>
                  <a href="https://www.udemy.com/react-the-complete-guide-incl-redux/" target="_blank" rel="noreferrer noopener"> React - The Complete Guide </a>
                </h3>
                <h4>Udemy - Academind by Maximilian Schwarzmülle</h4>
                <h5>
                  <a target="_blank" rel="noreferrer noopener" href="http://ude.my/UC-WSZBKXEW"> Certificate </a>
                </h5>
              </Page.SectionItem>
              <Page.SectionItem image="/images/udemy.svg">
                <h3>
                  <a href="https://www.udemy.com/course/nextjs-react-the-complete-guide/" target="_blank" rel="noreferrer noopener"> Next.js &amp; React - The Complete Guide</a>
                </h3>
                <h4>Udemy - Academind by Maximilian Schwarzmülle</h4>
                <h5>
                  <a target="_blank" rel="noreferrer noopener" href="http://ude.my/UC-9057120f-61f0-480b-aaf0-8b3e77b095bb"> Certificate </a>
                </h5>
              </Page.SectionItem>
              <Page.SectionItem image="/images/udemy.svg">
                <h3>
                  <a href="https://www.udemy.com/course/understanding-typescript/" target="_blank" rel="noreferrer noopener"> Understanding TypeScript </a>
                </h3>
                <h4>Udemy - Academind by Maximilian Schwarzmülle</h4>
                <h5>
                  <a target="_blank" rel="noreferrer noopener" href="http://ude.my/UC-DIDRRWV8"> Certificate </a>
                </h5>
              </Page.SectionItem>
              <Page.SectionItem image="/images/udemy.svg">
                <h3>
                  <a href="https://www.udemy.com/nuxtjs-vuejs-on-steroids/" target="_blank" rel="noreferrer noopener"> Nuxt.js - Vue.js on Steroids </a>
                </h3>
                <h4>Udemy - Academind by Maximilian Schwarzmülle</h4>
                <h5>
                  <a target="_blank" rel="noreferrer noopener" href="http://ude.my/UC-T5TFG77X"> Certificate </a>
                </h5>
              </Page.SectionItem>
            </Page.SectionItems>
          </Page.Section>
        </Page.Article>
      </Page.Body>
    </Layout>
  )
}

export default Experience
