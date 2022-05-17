import { MainLayoutContextProvider } from '../store/main-layout.context';
import MainLayout from './main';

interface LayoutProps {
  layout?: string;
}

const Layout = ({ layout, children }: React.PropsWithChildren<any>) => {
  return (
    <MainLayoutContextProvider>
      <MainLayout>
        {children}
      </MainLayout>
    </MainLayoutContextProvider>
  )
}

export default Layout