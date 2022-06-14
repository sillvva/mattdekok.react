import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiMenu, mdiBrightness6 } from "@mdi/js";
import { motion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import MainLayoutContext, { menuItems } from "../../../store/main-layout.context";
import styles from "../../../layouts/main/MainLayout.module.scss";
import type { PageHeadProps } from "../../../layouts/main";

const PageMenu = dynamic(() => import("./page-menu"));

type PageHeaderProps = {
  head: PageHeadProps;
  layoutMotion?: { variants?: Variants; transition?: Transition };
};

const PageHeader = ({ head, layoutMotion }: PageHeaderProps) => {
  const router = useRouter();
  const { drawer, theme } = useContext(MainLayoutContext);
  const items = head?.menu ? menuItems : [];
  const smallTitle = (head?.title?.length || 0) > 12;

  const classes = {
    pageHeader: [
      styles.PageHeader,
      ...(typeof head?.headerClasses == "string"
        ? [head?.headerClasses]
        : head?.headerClasses
        ? head?.headerClasses.map(c =>
            c
              .split(" ")
              .map(c2 => styles[c2] ?? c2)
              .join(" ")
          )
        : [])
    ].join(" "),
    pageNav: [styles.PageNav, ...(head?.backTo ? [] : ["lg:pl-3"])].join(" "),
    pageMenuContainer: [styles.PageMenuContainer, ...(head?.backTo ? [] : ["lg:pl-14"])].join(" "),
    pageTitle: [styles.PageTitle, ...(smallTitle ? [styles.SmallTitle] : []), "block lg:hidden flex-1"].join(" ")
  };

  return (
    <header className={classes.pageHeader}>
      <nav className={classes.pageNav}>
        {head?.backTo === true ? (
          <a type="button" className={styles.Fab} onClick={router.back}>
            <Icon path={mdiChevronLeft} />
          </a>
        ) : head?.backTo ? (
          <Link href={head?.backTo}>
            <a type="button" className={styles.Fab}>
              <Icon path={mdiChevronLeft} />
            </a>
          </Link>
        ) : (
          <button type="button" aria-label="Open Drawer" onClick={drawer.toggle} className={`${styles.Fab} ${styles.MenuFab}`}>
            <Icon path={mdiMenu} />
          </button>
        )}
        <div className={classes.pageMenuContainer}>{items.length ? <PageMenu key={router.pathname} items={items} /> : ""}</div>
        <h1 className={classes.pageTitle}>{head?.title}</h1>
        <button type="button" aria-label="Toggle Theme" onClick={theme.toggle} className={`${styles.Fab} my-3`}>
          <Icon path={mdiBrightness6} />
        </button>
      </nav>
      {head?.title && (
        <motion.h1
          variants={layoutMotion?.variants}
          key={`title: ${head?.title}`}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={layoutMotion?.transition}
          className={`${styles.PageTitle} hidden lg:block`}>
          {head?.title}
        </motion.h1>
      )}
    </header>
  );
};

export default PageHeader;
