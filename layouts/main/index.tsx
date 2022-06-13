import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import { motion } from "framer-motion";
import { debounce } from "../../lib/misc";
import MainLayoutContext, { MainLayoutContextProvider } from "../../store/main-layout.context";
import { useTheme } from "../../store/slices/theme.slice";
import Page from "../../components/layouts/main/page";
import PageHeader from "../../components/layouts/main/page-header";
import NextNProgress from "../../components/progress";
import PageMeta from "../../components/meta";

const Drawer = dynamic(() => import("../../components/drawer"));

const Layout = (props: React.PropsWithChildren<PageHeadProps>) => {
  const { drawer } = useContext(MainLayoutContext);
  const { name, themes, init, set } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const cur = document.querySelector<HTMLDivElement>("#app")?.dataset.theme;
    themes.forEach(t => cur === t && name !== t && set(t));
  }, [themes, name, set]);

  useEffect(() => {
    document.documentElement.dataset.scroll = window.scrollY.toString();
    const scrollHandler = debounce(() => {
      document.documentElement.dataset.scroll = window.scrollY.toString();
    });

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <>
      <Page.Bg key={`theme${init ? 1 : 0}`} />
      <PageHeader head={props} layoutMotion={mainMotion} />
      <motion.main
        key={`main${router.pathname}`}
        variants={mainMotion.variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={mainMotion.transition}>
        {props.children}
      </motion.main>
      {drawer.state ? <Drawer /> : ""}
    </>
  );
};

const MainLayout = (props: React.PropsWithChildren<PageHeadProps>) => {
  const router = useRouter();

  return (
    <MainLayoutContextProvider>
      <NextNProgress color="var(--link)" height={1} options={{ showSpinner: false }} />
      <PageMeta title={props.title} description={props.meta?.description} articleMeta={props.meta?.articleMeta} />
      <AnimatePresence initial={false} exitBeforeEnter>
        <Layout key={router.pathname} {...{ ...props, path: router.pathname }}>
          {props.children}
        </Layout>
      </AnimatePresence>
    </MainLayoutContextProvider>
  );
};

export default MainLayout;

export const headerClasses = ["transition-all duration-1000 bg-transparent sticky z-10 top-0"];

export const mainMotion: { variants?: Variants; transition?: Transition } = {
  variants: {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: {
    duration: 0.25
  }
};

export type PageHeadProps = {
  title?: string;
  menu?: boolean;
  smallTitle?: boolean;
  meta?: LayoutMeta;
  headerClasses?: string[];
  backTo?: string | boolean;
};

type LayoutMeta = {
  description?: string;
  image?: string;
  articleMeta?: object;
};
