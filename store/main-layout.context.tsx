import React, { useState } from "react";
import styles from '../styles/MainLayout.module.scss'

export const menuItems = [
  { link: "/", label: "Intro" },
  { link: "/about", label: "About Me" },
  { link: "/experience", label: "Experience" },
  { link: "/skills", label: "Skills" },
  { link: "/projects", label: "Projects" },
  { link: "/blog", label: "Blog" },
];

interface DrawerProps {
  state: boolean;
  drawerClasses: string;
  menuClasses: string;
  toggle: () => void;
  reset: () => void;
}

interface MainLayoutProps {
  drawer: DrawerProps
}

const initState = {
  drawer: {
    state: false,
    drawerClasses: "hidden opacity-0",
    menuClasses: "",
    toggle: function () { },
    reset: function () { }
  },
};

const MainLayoutContext = React.createContext<MainLayoutProps>(initState);

export const MainLayoutContextProvider = (props: React.PropsWithChildren<any>) => {
  const [context, setContext] = useState<MainLayoutProps>(initState);

  function toggleHandler() {
    const drawer = context.drawer;
    if (drawer.menuClasses.length) return;

    if (drawer.state) {
      drawer.drawerClasses = "flex opacity-0";
      drawer.menuClasses = styles.Close;
      setTimeout(() => {
        drawer.menuClasses = "";
        drawer.drawerClasses = "hidden opacity-0";
        setContext({ ...context, drawer: drawer });
      }, 500);
    } else {
      drawer.drawerClasses = "flex opacity-0";
      drawer.menuClasses = styles.Open;
      setTimeout(() => {
        drawer.drawerClasses = "flex opacity-100";
        setContext({ ...context, drawer: drawer });
      }, 50);
      setTimeout(() => {
        drawer.menuClasses = "";
        setContext({ ...context, drawer: drawer });
      }, 500);
    }

    drawer.state = !drawer.state;
    setContext({ ...context, drawer: drawer });
  }

  function resetHandler() {
    const drawer = context.drawer;
    drawer.state = false;
    drawer.menuClasses = "";
    drawer.drawerClasses = "hidden opacity-0";
    setContext({ ...context, drawer: drawer });
  }

  const ctx = {
    ...context,
    drawer: {
      ...context.drawer,
      toggle: toggleHandler,
      reset: resetHandler
    }
  };

  return (
    <MainLayoutContext.Provider value={ctx}>
      {props.children}
    </MainLayoutContext.Provider>
  );
}

export default MainLayoutContext;