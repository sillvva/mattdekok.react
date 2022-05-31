import { PropsWithChildren } from "react";
import { motion, Transition, Variants } from "framer-motion";
import { MainLayoutContextProvider, menuItems } from '../store/main-layout.context';
import PageMeta from '../components/meta';
import PageHeader from '../components/page-header';
import NextNProgress from "../components/progress";
import MainLayout from './main';

type LayoutProps = {
  layout?: string;
  props?: PageHeadProps;
}

type LayoutMeta = {
  title?: string;
  description?: string;
  image?: string;
  articleMeta?: object;
}

const Layout = ({ layout, children, props }: PropsWithChildren<LayoutProps>) => {
  return (
    <MainLayoutContextProvider>
      <MainLayout>
        <NextNProgress color="var(--link)" height={1} options={{ showSpinner: false }} />
        {props && <PageHead {...props} />}
        <motion.main
          variants={layoutMotion.variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={layoutMotion.transition}>
          {children}
        </motion.main>
      </MainLayout>
    </MainLayoutContextProvider>
  )
}

export default Layout

type PageHeadProps = {
  menu?: boolean;
  smallTitle?: boolean;
  meta?: LayoutMeta;
  headerClasses?: string[];
  backTo?: string;
}

export const layoutMotion: { variants: Variants, transition: Transition } = {
  variants: {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: {
    type: 'linear',
    duration: 0.5
  }
}

const PageHead = (props: PageHeadProps) => (
  <>
    <PageMeta
      title={props?.meta?.title}
      description={props?.meta?.description}
      articleMeta={props?.meta?.articleMeta} />
    <PageHeader
      title={props?.meta?.title}
      items={props?.menu ? menuItems : []}
      smallTitle={props?.smallTitle}
      classes={props?.headerClasses || []}
      backTo={props?.backTo} />
  </>
);