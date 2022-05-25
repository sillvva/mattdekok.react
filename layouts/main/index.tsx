import { useContext, useEffect } from 'react'
import MainLayoutContext, { menuItems } from '../../store/main-layout.context';
import HexMenu from '../../components/hex-menu'
import styles from './MainLayout.module.scss'

const MainLayout = (props: React.PropsWithChildren<unknown>) => {
  const { drawer, theme } = useContext(MainLayoutContext);

  useEffect(() => {
    drawer.reset();
    if (document.body.classList.contains('dark')) theme.set('dark');
    if (document.body.classList.contains('light')) theme.set('light');
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
