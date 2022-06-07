import Image from "next/image";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { mainMotion } from "../../../layouts/main";
import styles from "../../../layouts/main/MainLayout.module.scss";
import MainLayoutContext from "../../../store/main-layout.context";

const PageBg = () => {
  const { theme } = useContext(MainLayoutContext);
  const themeBg = `Page${theme.state.charAt(0).toUpperCase() + theme.state.slice(1)}`;

  return (
    <motion.div
      key={`bg${theme.state}`}
      variants={mainMotion.variants}
      initial="hidden"
      animate="enter"
      transition={{ duration: 0.5 }}
      className={[styles.PageBg, styles[themeBg], theme.done && styles.FixedBg].filter(c => !!c).join(" ")}
    />
  );
};

const PageBody = (props: React.PropsWithChildren<unknown>) => {
  return <div className={styles.PageBody}>{props.children}</div>;
};

interface PageArticleProps {
  className?: string;
}

const PageArticle = (props: React.PropsWithChildren<PageArticleProps>) => {
  return <article className={[styles.PageArticle, props.className || ""].join(" ")}>{props.children}</article>;
};

interface PageSectionProps {
  className?: string;
  bgImage?: string;
}

const PageSection = (props: React.PropsWithChildren<PageSectionProps>) => {
  return (
    <section className={[props.className || "", "bg-cover bg-center"].join(" ")} style={{ ...(props.bgImage && { backgroundImage: `url(${props.bgImage})` }) }}>
      {props.children}
    </section>
  );
};

const PageSectionItems = (props: React.PropsWithChildren<unknown>) => {
  return <div className={styles.SectionItems}>{props.children}</div>;
};

type PageSectionItemProps = {
  image: string;
};

const PageSectionItem = (props: React.PropsWithChildren<PageSectionItemProps>) => {
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
