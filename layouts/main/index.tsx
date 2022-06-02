import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import MainLayoutContext from "../../store/main-layout.context";

const Drawer = dynamic(() => import("../../components/drawer"));

const MainLayout = (props: React.PropsWithChildren<unknown>) => {
  const { drawer, theme } = useContext(MainLayoutContext);

  useEffect(() => {
    const cL = document.body.classList;
    theme.themes.forEach(t => cL.contains(t) && theme.state !== t && theme.set(t));
  }, [theme]);

  return (
    <>
      {props.children}
      {drawer.state ? <Drawer /> : ""}
    </>
  );
};

export default MainLayout;

export const headerClasses = ["backdrop-blur-lg bg-transparent sticky z-10 top-0"];
