import { PropsWithChildren } from "react";
import { motion, Transition, Variants } from "framer-motion";
import { MainLayoutContextProvider, menuItems } from '../store/main-layout.context';
import PageMeta from '../components/meta';
import PageHeader from '../components/page-header';
import MainLayout from './main';

export type LayoutProps = {
  layout?: string;
  props?: any; // PageHeadProps;
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
          {children}
      </MainLayout>
    </MainLayoutContextProvider>
  )
}

export default Layout