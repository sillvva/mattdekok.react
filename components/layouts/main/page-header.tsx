import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useContext } from "react";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiMenu, mdiBrightness6 } from "@mdi/js";
import { motion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import MainLayoutContext, { menuItems } from "../../../store/main-layout.context";
import styles from "../../../layouts/main/MainLayout.module.scss";
import type { PageHeadProps } from "../../../layouts/main";
import { parseCSSModules, conClasses } from "../../../lib/auxx";

const PageMenu = dynamic(() => import("./page-menu"));

type PageHeaderProps = {
  head: PageHeadProps;
  layoutMotion?: { variants?: Variants; transition?: Transition };
};

const PageHeader = ({ head, layoutMotion }: PageHeaderProps) => {
  const router = useRouter();
  const { drawer } = useContext(MainLayoutContext);
  const { theme, setTheme, themes } = useTheme();

  const items = head?.menu ? menuItems : [];
  const smallTitle = (head?.title?.length || 0) > 12;
  const headerClasses = parseCSSModules(styles, head?.headerClasses);
  let nextTheme = themes[themes.findIndex(t => t === theme) + 1] || themes[0];

  return (
    <header className={conClasses([styles.PageHeader, headerClasses])}>
      <nav className={conClasses([styles.PageNav, !head?.backTo && "lg:pl-3"])}>
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
        <div className={conClasses([styles.PageMenuContainer, !head?.backTo && "lg:pl-14"])}>
          {items.length ? <PageMenu key={router.pathname} items={items} /> : ""}
        </div>
        <h1 className={conClasses([styles.PageTitle, smallTitle && styles.SmallTitle, "block lg:hidden flex-1"])}>{head?.title}</h1>
        <button type="button" aria-label="Toggle Theme" onClick={() => setTheme(nextTheme)} className={`${styles.Fab} my-3`}>
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
