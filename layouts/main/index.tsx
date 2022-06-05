import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import type { Transition, Variants } from "framer-motion";
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

const headerClasses = ["transition-all duration-1000 bg-transparent sticky z-10 top-0"];
const scrollClasses = ["backdrop-blur-lg"];

export function useHeaderClasses() {
  const [ classes, setClasses ] = useState(headerClasses);

  useEffect(() => {
    let toggle = false;

    if (window.scrollY) setClasses([...headerClasses, ...scrollClasses]);

    const scrollHandler = () => {
      if (window.scrollY && !toggle) {
        setClasses([...headerClasses, ...scrollClasses]);
        toggle = true;
      }
      else if (!window.scrollY && toggle) {
        setClasses(headerClasses);
        toggle = false;
      }
    } 

    window.addEventListener('scroll', scrollHandler);

    () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return classes;
}

export const mainMotion: { variants: Variants; transition: Transition } = {
  variants: {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: {
    type: "linear",
    duration: 0.25
  }
};
