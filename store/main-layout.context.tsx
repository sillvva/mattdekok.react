import { useState, PropsWithChildren, createContext } from "react";
import cookie from 'js-cookie';
import styles from '../layouts/main/MainLayout.module.scss'

export const menuItems = [
  { link: "/", label: "Intro" },
  { link: "/about", label: "About Me" },
  { link: "/experience", label: "Experience" },
  { link: "/skills", label: "Skills" },
  { link: "/projects", label: "Projects" },
  { link: "/blog", label: "Blog" },
];

type DrawerProps = {
  state: boolean;
  drawerClasses: string;
  menuClasses: string;
  toggle: () => void;
  reset: () => void;
}

type ThemeProps = {
  state: string;
  toggle: () => void;
  set: (theme: string) => void;
}

type MainLayoutProps = {
  drawer: DrawerProps;
  theme: ThemeProps;
}

const initState = {
  drawer: {
    state: false,
    drawerClasses: "hidden opacity-0",
    menuClasses: "",
    toggle: function () { },
    reset: function () { }
  },
  theme: {
    state: 'dark',
    toggle: function () { },
    set: function (theme: string) { }
  }
};

const MainLayoutContext = createContext<MainLayoutProps>(initState);

export default MainLayoutContext;

export const MainLayoutContextProvider = (props: PropsWithChildren<unknown>) => {
  const [context, setContext] = useState<MainLayoutProps>(initState);

  function drawerToggleHandler() {
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

  function drawerResetHandler() {
    const drawer = context.drawer;
    drawer.state = false;
    drawer.menuClasses = "";
    drawer.drawerClasses = "hidden opacity-0";
    setContext({ ...context, drawer: drawer });
  }

  function themeToggleHandler() {
    if (context.theme.state == 'dark') {
      document.body.classList.replace('dark', 'light');
      context.theme.state = 'light';
    } else {
      document.body.classList.replace('light', 'dark');
      context.theme.state = 'dark';
    }
    cookie.set('theme', context.theme.state);
    setContext({ ...context, theme: context.theme });
  }

  function themeSetHandler(theme: string) {
    if (theme == 'light') {
      document.body.classList.replace('dark', 'light');
      context.theme.state = 'light';
    } else {
      document.body.classList.replace('light', 'dark');
      context.theme.state = 'dark';
    }
    cookie.set('theme', context.theme.state);
    setContext({ ...context, theme: context.theme });
  }

  const ctx = {
    ...context,
    drawer: {
      ...context.drawer,
      toggle: drawerToggleHandler,
      reset: drawerResetHandler
    },
    theme: {
      ...context.theme,
      toggle: themeToggleHandler,
      set: themeSetHandler
    }
  };

  return (
    <MainLayoutContext.Provider value={ctx}>
      {props.children}
    </MainLayoutContext.Provider>
  );
}