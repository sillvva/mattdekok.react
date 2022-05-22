import { motion, Transition, Variants } from "framer-motion";
import PageMeta from '../components/meta';
import PageHeader from '../components/page-header';
import { MainLayoutContextProvider } from '../store/main-layout.context';
import MainLayout from './main';
import { menuItems } from '../store/main-layout.context';

interface LayoutProps {
  layout?: string;
  props?: MainLayoutProps
}

interface LayoutMeta {
  title?: string;
  description?: string;
  image?: string;
}
interface MainLayoutProps {
  menu?: boolean;
  smallTitle?: boolean;
  meta?: LayoutMeta;
  headerClasses?: string[];
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

const Layout = ({ layout, children, props }: React.PropsWithChildren<LayoutProps>) => {
  return (
    <MainLayoutContextProvider>
      <MainLayout>
        <PageMeta title={props?.meta?.title} description={props?.meta?.description} />
        <PageHeader 
          title={props?.meta?.title} 
          items={props?.menu ? menuItems : []} 
          smallTitle={props?.smallTitle} 
          classes={props?.headerClasses || []} />
        <motion.main
          variants={layoutMotion.variants} // Pass the variant object into Framer Motion 
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={layoutMotion.transition} // Set the transition to linear
          className="">
          {children}
        </motion.main>
      </MainLayout>
    </MainLayoutContextProvider>
  )
}

export default Layout