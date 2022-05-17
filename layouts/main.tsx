import React, { useContext, useEffect } from 'react'
import HexMenu from '../components/hex-menu';
import MainLayoutContext from '../store/main-layout.context';
import { menuItems } from '../store/main-layout.context';
import styles from '../styles/MainLayout.module.scss'

const MainLayout = (props: React.PropsWithChildren<any>) => {
  const { drawer } = useContext(MainLayoutContext);

  useEffect(() => {
    drawer.reset();
  }, [])

  return (
    <div className="Page">
      {props.children}
      <nav className={[styles.Drawer, drawer.drawerClasses].join(' ')} onClick={drawer.toggle}>
        <HexMenu items={menuItems}
          maxLength={3}
          classes={[drawer.menuClasses, 'sm:scale-100', 'md:scale-125']}
          itemClasses={['menu-bounce']}
          rotated={menuItems.length % 2 == 0} />
      </nav>
    </div>
  )
}

export default MainLayout
