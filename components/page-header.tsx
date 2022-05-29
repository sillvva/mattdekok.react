import { useContext } from 'react';
import { motion } from 'framer-motion';
import MainLayoutContext from '../store/main-layout.context';
import styles from '../layouts/main/MainLayout.module.scss'
import { layoutMotion } from '../layouts/layout';
import PageMenu, { Item } from './page-menu';
import Link from 'next/link';

type PageHeaderProps = {
  classes?: string | string[];
  items: (Item | null)[],
  title?: string;
  smallTitle?: boolean;
  backTo?: string;
}

const PageHeader = (props: PageHeaderProps) => {
  const { drawer, theme } = useContext(MainLayoutContext);
  
  const classes = {
    pageHeader: [
      styles.PageHeader, 
      ...(typeof props.classes == 'string' ? [props.classes] : (props.classes ? props.classes : []))
    ].join(' '),
    pageNav: [
      styles.PageNav, 
      ...(props.backTo ? [] : ['lg:pl-3'])
    ].join(' '),
    pageMenuContainer: [
      styles.PageMenuContainer, 
      ...(props.backTo ? [] : ['lg:pl-14'])
    ].join(' '),
    pageTitle: [
      styles.PageTitle, 
      ...(props.smallTitle ? [styles.SmallTitle] : []),
      'block lg:hidden flex-1'
    ].join(' ')
  }

  return (
    <header className={classes.pageHeader}>
      <nav className={classes.pageNav}>
        {props.backTo ? (
          <Link href={props.backTo}>
            <a type="button" className={styles.Fab}>
              <i className="mdi mdi-chevron-left"></i>
            </a>
          </Link>
        ) : (
          <button type="button" onClick={drawer.toggle} className={`${styles.Fab} lg:hidden`}>
            <i className="mdi mdi-menu"></i>
          </button>
        )}
        <div className={classes.pageMenuContainer}>
          <PageMenu items={props.items} />
        </div>
        <h1 className={classes.pageTitle}>{props.title}</h1>
        <button type="button" onClick={theme.toggle} className={`${styles.Fab} my-3`}>
          <i className="mdi mdi-brightness-6"></i>
        </button >
      </nav>
      {props.title && (
        <motion.h1
          variants={layoutMotion.variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={layoutMotion.transition}
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

