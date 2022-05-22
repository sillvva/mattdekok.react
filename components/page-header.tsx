import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import MainLayoutContext from '../store/main-layout.context';
import styles from '../layouts/main/MainLayout.module.scss'
import { layoutMotion } from '../layouts/layout';
import PageMenu from './page-menu';

interface PageHeaderProps {
  classes?: string | string[];
  items: any[],
  title?: string;
  smallTitle?: boolean;
}

const PageHeader = (props: React.PropsWithChildren<PageHeaderProps>) => {
  const { drawer, theme } = useContext(MainLayoutContext);

  return (
    <header className={[styles.PageHeader, ...(typeof props.classes == 'string' ? [props.classes] : (props.classes ? props.classes : ['']))].join(' ')}>
      <nav className={styles.PageNav}>
        <button type="button" onClick={drawer.toggle} className={`${styles.Fab} lg:hidden`}>
          <i className="mdi mdi-menu"></i>
        </button>
        <div className={styles.PageMenuContainer}>
          <PageMenu items={props.items} />
        </div>
        <h1 className={`${[styles.PageTitle, props.smallTitle ? styles.SmallTitle : ''].join(' ')} block lg:hidden flex-1`}>{props.title}</h1>
        <button type="button" onClick={theme.toggle} className={`${styles.Fab} my-3`}>
          <i className="mdi mdi-brightness-6"></i>
        </button >
      </nav>
      {props.title && (
        <motion.h1 
          variants={layoutMotion.variants} // Pass the variant object into Framer Motion 
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={layoutMotion.transition} // Set the transition to linear
          className={`${styles.PageTitle} hidden lg:block`}>
          {props.title}
        </motion.h1>
      )}
    </header >
  )
}

PageHeader.defaultProps = {
  items: []
}

export default PageHeader

