
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import MainLayout from "../layouts/main";
import { getLayout, setLayout } from "../store/slices/layout.slice";
import { MainLayoutContextProvider, menuItems } from "../store/main-layout.context";
import PageMeta from "../components/meta";
import PageHeader from "../components/page-header";
import NextNProgress from "../components/progress";

function Layout({ pageProps, children }: PropsWithChildren<AppLayout>) {
  const layout = useSelector(getLayout);

  if (layout.name == "main")
    return (
      <MainLayoutContextProvider>
        <NextNProgress key={"test"} color="var(--link)" height={1} options={{ showSpinner: false }} />
        {layout.head && (
          <>
            <PageMeta title={layout.head?.meta?.title} description={layout.head?.meta?.description} articleMeta={layout.head?.meta?.articleMeta} />
            <PageHeader
              title={layout.head?.meta?.title}
              items={layout.head?.menu ? menuItems : []}
              smallTitle={layout.head?.smallTitle}
              classes={layout.head?.headerClasses || []}
              backTo={layout.head?.backTo}
            />
          </>
        )}
        <AnimatePresence initial={false}>
          <MainLayout>
            <motion.main
              key={pageProps.path}
              variants={layoutMotion.variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={layoutMotion.transition}>
              {children}
            </motion.main>
          </MainLayout>
        </AnimatePresence>
      </MainLayoutContextProvider>
    );

  return <>{children}</>;
}

export default Layout;

export type AppLayout = {
  pageProps: any;
};

export type LayoutProps = {
  name?: string;
  head?: PageHeadProps;
};

type PageHeadProps = {
  menu?: boolean;
  smallTitle?: boolean;
  meta?: LayoutMeta;
  headerClasses?: string[];
  backTo?: string;
};

type LayoutMeta = {
  title?: string;
  description?: string;
  image?: string;
  articleMeta?: object;
};

export const layoutMotion: { variants: Variants; transition: Transition } = {
  variants: {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: {
    type: "linear",
    duration: 0.5
  }
};

export const useLayout = (layout: string, head: PageHeadProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setLayout({
        name: layout,
        path: router.pathname,
        head
      })
    );
  }, [dispatch, layout, head, router.pathname]);
};