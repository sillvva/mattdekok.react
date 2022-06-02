import type { AppProps } from "next/app";
import App from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import "../styles/globals.scss";
import "../styles/mdi.scss";
import "../styles/montserrat.font.css";
import MainLayout from "../layouts/main";
import { MainLayoutContextProvider, menuItems } from "../store/main-layout.context";
import PageMeta from "../components/meta";
import PageHeader from "../components/page-header";
import NextNProgress from "../components/progress";

function MyApp({ Component, pageProps }: AppProps) {
  const layout = routeLayouts(pageProps);
  if (layout)
    return (
      <MainLayoutContextProvider>
        <NextNProgress key={"test"} color="var(--link)" height={1} options={{ showSpinner: false }} />
        {layout?.props && (
          <>
            <PageMeta title={layout?.props?.meta?.title} description={layout?.props?.meta?.description} articleMeta={layout?.props?.meta?.articleMeta} />
            <PageHeader
              title={layout?.props?.meta?.title}
              items={layout?.props?.menu ? menuItems : []}
              smallTitle={layout?.props?.smallTitle}
              classes={layout?.props?.headerClasses || []}
              backTo={layout?.props?.backTo}
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
              <Component {...pageProps} />
            </motion.main>
          </MainLayout>
        </AnimatePresence>
      </MainLayoutContextProvider>
    );

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  appProps.pageProps = { ...appProps.pageProps, cookies: appContext.ctx?.req?.cookies, path: appContext.ctx?.pathname };
  return { ...appProps };
};

export default MyApp;

export type LayoutProps = {
  layout?: string;
  props?: PageHeadProps;
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

const headerClasses = ["backdrop-blur-lg bg-transparent sticky z-10 top-0"];
const routeLayouts = (pageProps: any): LayoutProps | undefined => {
  const url = pageProps.path;
  if (url == "/") return { props: { headerClasses: ["bg-transparent w-full absolute"] } };
  if (url == "/about") return { props: { menu: true, meta: { title: "About Me" }, headerClasses } };
  if (url == "/experience") return { props: { menu: true, meta: { title: "Experience" }, headerClasses } };
  if (url == "/skills") return { props: { menu: true, meta: { title: "Skills" }, headerClasses } };
  if (url == "/projects") return { props: { menu: true, meta: { title: "Projects" }, headerClasses } };
  if (url == "/donate") return { props: { menu: true, meta: { title: "Donate" }, headerClasses } };
  if (url == "/blog") return { props: { menu: true, meta: { title: "Blog" }, headerClasses } };
  if (url == "/blog/[slug]") {
    const data = pageProps.data;
    const returnUrl = pageProps.cookies["return-url"] || "/blog";
    return {
      props: {
        menu: true,
        smallTitle: true,
        meta: {
          title: data.title,
          description: data.description,
          image: data.image || "",
          articleMeta: {
            published_date: data.dateISO,
            ...(data.updatedISO && { modified_date: data.updatedISO })
          }
        },
        backTo: returnUrl,
        headerClasses
      }
    };
  }
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
