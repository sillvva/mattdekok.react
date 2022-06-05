import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout, { mainMotion } from "../layouts/main";
import { getLayout, PageHeadProps, setLayout } from "../store/slices/layout.slice";
import { MainLayoutContextProvider } from "../store/main-layout.context";
import PageHeader from "../components/layouts/main/page-header";
import Page from "../components/layouts/main/page";
import PageMeta from "../components/meta";
import NextNProgress from "../components/progress";

function Layout({ children }: PropsWithChildren<unknown>) {
  const layout = useSelector(getLayout);
  const router = useRouter();

  if (layout.name == "main")
    return (
      <MainLayoutContextProvider>
        <NextNProgress color="var(--link)" height={1} options={{ showSpinner: false }} />
        <PageMeta title={layout.head?.meta?.title} description={layout.head?.meta?.description} articleMeta={layout.head?.meta?.articleMeta} />
        <AnimatePresence initial={false} exitBeforeEnter>
          <MainLayout key={router.pathname}>
            <Page.Bg />
            <PageHeader layout={layout} layoutMotion={mainMotion} />
            <motion.main
              key={`main${router.pathname}`}
              variants={mainMotion.variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={mainMotion.transition}>
              {children}
            </motion.main>
          </MainLayout>
        </AnimatePresence>
      </MainLayoutContextProvider>
    );

  return <>{children}</>;
}

export default Layout;

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
