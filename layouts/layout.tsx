import React from "react";
import { motion, Transition, Variants } from "framer-motion";
import PageMeta from '../components/meta';
import PageHeader from '../components/page-header';
import { MainLayoutContextProvider } from '../store/main-layout.context';
import MainLayout from './main';
import { menuItems } from '../store/main-layout.context';

interface LayoutProps {
  layout?: string;
  props?: PageHeadProps
}

interface LayoutMeta {
  title?: string;
  description?: string;
  image?: string;
  articleMeta?: object;
}
interface PageHeadProps {
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
    duration: 1
  }
}

const PageHead = (props: React.PropsWithChildren<PageHeadProps>) => (
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

const Layout = ({ layout, children, props }: React.PropsWithChildren<LayoutProps>) => {
  return (
    <MainLayoutContextProvider>
      <MainLayout>
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