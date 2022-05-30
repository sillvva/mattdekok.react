import { useState, PropsWithChildren, createContext } from "react";
import cookie from 'js-cookie';

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
  action: string;
  toggle: () => void;
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
    action: "",
    toggle: function () { }
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
    if (drawer.action) return;

    if (drawer.state) {
      drawer.action = 'closing';
      setTimeout(() => {
        drawer.state = false;
        drawer.action = "";
        setContext({ ...context, drawer: drawer });
      }, 500);
    } else {
      drawer.state = true;
      drawer.action = "opening";
      setTimeout(() => {
        drawer.action = "";
        setContext({ ...context, drawer: drawer });
      }, 500);
    }

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
      toggle: drawerToggleHandler
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

export const DefaultLayoutContext = createContext({});