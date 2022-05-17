import type { NextPage } from 'next'
import HexMenu, { Item } from '../components/hex-menu'
import PageMeta from '../components/meta'
import PageHeader from '../components/page-header'
import Layout from '../layouts/layout'
import styles from '../styles/Intro.module.scss'

const Home: NextPage = () => {
  const items: (Item | null)[] = [
    { link: "/about", label: "About Me" },
    { link: "/experience", label: "Experience" },
    { link: "/skills", label: "Skills" },
    { link: "/projects", label: "Projects" },
    null,
    { link: "/blog", label: "Blog" },
  ];

  return (
    <div className="Page">
      <PageMeta />
      <Layout>
        <PageHeader classes={['bg-transparent']} />
        <div className={styles.Me}>
          <div className={styles.Intro}>
            <div className={styles.IntroSubject}>
              <h2 className={styles.IntroName}>Matt DeKok</h2>
              <h4 className={styles.IntroTitle}>Full&nbsp;Stack Web&nbsp;Developer</h4>
            </div>
            <div className="menu-container hidden flex-row justify-end lg:flex">
              <HexMenu items={items}
                maxLength={3}
                classes={['lg:scale-100']}
                itemClasses={['menu-bounce']}
                rotated={items.length % 2 == 0} />
            </div>
          </div>
        </div>
      </Layout>
    </div >
  )
}

export default Home
