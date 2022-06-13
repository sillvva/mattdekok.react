import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import { motion } from "framer-motion";
import { debounce } from "../../lib/misc";
import MainLayoutContext, { MainLayoutContextProvider } from "../../store/main-layout.context";
import Page from "../../components/layouts/main/page";
import PageHeader from "../../components/layouts/main/page-header";
import NextNProgress from "../../components/progress";
import PageMeta from "../../components/meta";

const Drawer = dynamic(() => import("../../components/drawer"));

const Layout = (props: React.PropsWithChildren<PageHeadProps>) => {
  const { drawer, theme } = useContext(MainLayoutContext);
  const router = useRouter();

  useEffect(() => {
    const cur = document.querySelector<HTMLDivElement>("#app")?.dataset.theme;
    theme.themes.forEach(t => cur === t && theme.state !== t && theme.set(t));
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.scroll = window.scrollY.toString();
    const scrollHandler = debounce(() => {
      document.documentElement.dataset.scroll = window.scrollY.toString();
    });

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div id="app" data-theme={theme?.state} className="min-h-screen min-w-screen">
      <Page.Bg />
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
    </div>
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
