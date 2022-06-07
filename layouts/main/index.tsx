import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import type { Transition, Variants } from "framer-motion";
import MainLayoutContext from "../../store/main-layout.context";
import { debounce } from "../../functions/misc";

const Drawer = dynamic(() => import("../../components/drawer"));

const MainLayout = (props: React.PropsWithChildren<unknown>) => {
  const { drawer, theme } = useContext(MainLayoutContext);

  useEffect(() => {
    const cur = document.documentElement.dataset.theme;
    theme.themes.forEach(t => cur === t && theme.state !== t && theme.set(t));
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.scroll = window.scrollY.toString();
    const scrollHandler = debounce(() => {
      document.documentElement.dataset.scroll = window.scrollY.toString();
    });

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <>
      {props.children}
      {drawer.state ? <Drawer /> : ""}
    </>
  );
};

export default MainLayout;

export const headerClasses = ["transition-all duration-1000 bg-transparent sticky z-10 top-0"];

export const mainMotion: { variants?: Variants; transition?: Transition } = {
  variants: {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: {
    duration: 0.25
  }
};
