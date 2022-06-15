import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import { debounce } from "../../lib/misc";
import MainLayoutContext, { MainLayoutContextProvider } from "../../store/main-layout.context";
import Page from "../../components/layouts/main/page";
import PageHeader from "../../components/layouts/main/page-header";
import NextNProgress from "../../components/progress";
import PageMeta from "../../components/meta";

const Drawer = dynamic(() => import("../../components/drawer"));

const Layout = (props: React.PropsWithChildren<PageHeadProps>) => {
  const { drawer } = useContext(MainLayoutContext);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const mm = matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setTheme(mm.matches ? "dark" : "light");
    
    if (theme == "system") listener();
    mm.addEventListener("change", listener);
    return () => mm.removeEventListener("change", listener);
  }, [theme, setTheme]);

  useEffect(() => {
    document.documentElement.dataset.scroll = window.scrollY.toString();
    const scrollHandler = debounce(() => {
      document.documentElement.dataset.scroll = window.scrollY.toString();
    });

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <AnimatePresence initial={false}>
      <div key={props.path} id="app" className="min-h-screen min-w-screen">
        <Page.Bg key={theme} />
        <PageHeader key={props.path} head={{ ...props, headerClasses: props.headerClasses || headerClasses }} layoutMotion={mainMotion} />
        <motion.main key={`main${props.path}`} variants={mainMotion.variants} initial="hidden" animate="enter" exit="exit" transition={mainMotion.transition}>
          {props.children}
        </motion.main>
        {drawer.state ? <Drawer /> : ""}
      </div>
    </AnimatePresence>
  );
};

const MainLayout = (props: React.PropsWithChildren<PageHeadProps>) => {
  const router = useRouter();

  return (
    <MainLayoutContextProvider>
      <NextNProgress color="var(--link)" height={1} options={{ showSpinner: false }} />
      <PageMeta title={props.title} description={props.meta?.description} articleMeta={props.meta?.articleMeta} />
      <Layout {...{ ...props, path: router.pathname }}>{props.children}</Layout>
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
  path?: string;
  meta?: LayoutMeta;
  headerClasses?: string[];
  backTo?: string | boolean;
};

type LayoutMeta = {
  description?: string;
  image?: string;
  articleMeta?: object;
};
