import React, { useContext } from 'react';
import MainLayoutContext from '../store/main-layout.context';
import styles from '../styles/MainLayout.module.scss'
import PageMenu from './page-menu';

const toggleTheme = () => {
  let newTheme: string;
  if (document.body.classList.contains('dark')) {
    document.body.classList.replace('dark', 'light');
    newTheme = 'light';
  } else {
    document.body.classList.replace('light', 'dark');
    newTheme = 'dark';
  }
}

interface PageHeaderProps {
  classes?: string | string[];
  items: any[],
  title?: string;
  smallTitle?: boolean;
}

const PageHeader = (props: React.PropsWithChildren<PageHeaderProps>) => {
  const { drawer } = useContext(MainLayoutContext);

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
        <button type="button" onClick={toggleTheme} className={`${styles.Fab} my-3`}>
          <i className="mdi mdi-brightness-6"></i>
        </button >
      </nav>
      {props.title && <h1 className={`${styles.PageTitle} hidden lg:block`}>{props.title}</h1>}
    </header >
  )
}

PageHeader.defaultProps = {
  items: []
}

export default PageHeader

