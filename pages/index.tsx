import type { NextPageWithLayout } from "./_app";
import HexMenu, { Item } from "../components/hex-menu";
import styles from "../styles/Intro.module.scss";
import MainLayout from "../layouts/main";
import Image from "next/image";

const Home: NextPageWithLayout = () => {
  const items: (Item | null)[] = [
    { link: "/about", label: "About Me" },
    { link: "/experience", label: "Experience" },
    { link: "/skills", label: "Skills" },
    { link: "/projects", label: "Projects" },
    null,
    { link: "/blog", label: "Blog" }
  ];

  return (
    <div className={styles.Me}>
      <Image src="/images/me4x.webp" id="me" alt="" layout="fill" objectFit="cover" objectPosition="left" />
      <div className={styles.Intro}>
        <div className={styles.IntroSubject}>
          <h2 className={styles.IntroName}>Matt DeKok</h2>
          <h4 className={styles.IntroTitle}>Full&nbsp;Stack Web&nbsp;Developer</h4>
        </div>
        <div className="menu-container hidden flex-row justify-end lg:flex mt-8">
          <HexMenu items={items} maxLength={3} classes={["lg:scale-100"]} itemClasses={["Bounce"]} rotated={true} />
        </div>
      </div>
    </div>
  );
};

export default Home;

Home.getLayout = function (page) {
  return (
    <MainLayout headerClasses={["bg-transparent w-full absolute"]}>
      {page}
    </MainLayout>
  );
};
