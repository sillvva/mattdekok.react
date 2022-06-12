import Image from "next/image";
import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { mainMotion } from "../../../layouts/main";
import styles from "../../../layouts/main/MainLayout.module.scss";
import { useTheme } from "../../../store/slices/theme.slice";

const PageBg = () => {
  const theme = useTheme();
  const themeBg = `Page${theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}`;

  return (
    <motion.div
      key={`bg${theme.name}`}
      variants={mainMotion.variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5 }}
      className={[styles.PageBg, styles[themeBg], theme.done && styles.FixedBg].filter(c => !!c).join(" ")}
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
  return <article className={[styles.PageArticle, props.className || ""].join(" ")}>{props.children}</article>;
};

interface PageSectionProps {
  className?: string;
  bgImage?: string;
}

const PageSection = (props: PropsWithChildren<PageSectionProps>) => {
  return (
    <section className={[props.className || "", "bg-cover bg-center"].join(" ")} style={{ ...(props.bgImage && { backgroundImage: `url(${props.bgImage})` }) }}>
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
