import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react'
import MainLayoutContext from '../../store/main-layout.context';

const Drawer = dynamic(() => import('../../components/drawer'));

const MainLayout = (props: React.PropsWithChildren<unknown>) => {
  const { drawer, theme } = useContext(MainLayoutContext);

  useEffect(() => {
    if (document.body.classList.contains('dark')) theme.set('dark');
    if (document.body.classList.contains('light')) theme.set('light');
  }, []);

  return (
    <>
      {props.children}
      {drawer.state ? <Drawer /> : ''}
    </>
  )
}

export default MainLayout
