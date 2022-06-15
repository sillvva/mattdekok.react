import Image from "next/image";
import { useTheme } from "next-themes";
import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { mainMotion } from "../../../layouts/main";
import styles from "../../../layouts/main/MainLayout.module.scss";
import { conClasses } from "../../../lib/auxx";

const PageBg = () => {
  const { theme } = useTheme();
  const themeBg = `Page${(theme || "system").charAt(0).toUpperCase() + (theme || "system").slice(1)}`;

  return (
    <motion.div
      key={themeBg}
      variants={mainMotion.variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5 }}
      className={conClasses([styles.PageBg, styles[themeBg]])}
    />
  );
};

const PageBody = (props: PropsWithChildren<unknown>) => {
  return <div className={styles.PageBody}>{props.children}</div>;
};

interface PageArticleProps {
  className?: string;
}

const PageArticle = (props: PropsWithChildren<PageArticleProps>) => {
  return <article className={conClasses([styles.PageArticle, props.className || ""])}>{props.children}</article>;
};

interface PageSectionProps {
  className?: string;
  bgImage?: string;
}

const PageSection = (props: PropsWithChildren<PageSectionProps>) => {
  return (
    <section
      className={conClasses([props.className || "", "bg-cover bg-center"])}
      style={{ ...(props.bgImage && { backgroundImage: `url(${props.bgImage})` }) }}>
      {props.children}
    </section>
  );
};

const PageSectionItems = (props: PropsWithChildren<unknown>) => {
  return <div className={styles.SectionItems}>{props.children}</div>;
};

type PageSectionItemProps = {
  image: string;
};

const PageSectionItem = (props: PropsWithChildren<PageSectionItemProps>) => {
  return (
    <div className={styles.SectionItem}>
      <div className={styles.SectionItem__Image}>
        <Image src={props.image} alt="" layout="fill" objectFit="contain" />
      </div>
      <div className={styles.SectionItem__Content}>{props.children}</div>
    </div>
  );
};

const PageComponents = {
  Bg: PageBg,
  Body: PageBody,
  Article: PageArticle,
  Section: PageSection,
  SectionItems: PageSectionItems,
  SectionItem: PageSectionItem
};

export default PageComponents;
