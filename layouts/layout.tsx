import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import MainLayout from "../layouts/main";
import { getLayout, PageHeadProps, setLayout } from "../store/slices/layout.slice";
import { MainLayoutContextProvider } from "../store/main-layout.context";
import PageMeta from "../components/meta";
import NextNProgress from "../components/progress";
import { useTheme } from "../store/slices/theme.slice";

function Layout({ children }: PropsWithChildren<unknown>) {
  const layout = useSelector(getLayout);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const cur = document.documentElement.dataset.theme;
    theme.themes.forEach(t => cur === t && theme.name !== t && theme.set(t));
  }, [theme]);

  if (layout.name == "main")
    return (
      <MainLayoutContextProvider>
        <NextNProgress color="var(--link)" height={1} options={{ showSpinner: false }} />
        <PageMeta title={layout.head?.meta?.title} description={layout.head?.meta?.description} articleMeta={layout.head?.meta?.articleMeta} />
        <AnimatePresence initial={false} exitBeforeEnter>
          <MainLayout key={router.pathname} layout={layout} path={router.pathname}>
            {children}
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
