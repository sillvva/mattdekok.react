import { useState, createContext } from "react";
import type { PropsWithChildren } from "react";
import cookie from "js-cookie";

export const menuItems = [
  { link: "/", label: "Intro" },
  { link: "/about", label: "About Me" },
  { link: "/experience", label: "Experience" },
  { link: "/skills", label: "Skills" },
  { link: "/projects", label: "Projects" },
  { link: "/blog", label: "Blog" }
];

const themes = ["dark", "blue", "light"];

type DrawerProps = {
  state: boolean;
  action: string;
  toggle: () => void;
};

type ThemeProps = {
  state: string;
  themes: string[];
  toggle: () => void;
  set: (theme: string) => void;
};

type MainLayoutProps = {
  drawer: DrawerProps;
  theme: ThemeProps;
};

const initState = {
  drawer: {
    state: false,
    action: "",
    toggle: function () {}
  },
  theme: {
    state: themes[0],
    themes: themes,
    toggle: function () {},
    set: function (theme: string) {}
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
      drawer.action = "closing";
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

  function setTheme(theme?: string) {
    const currentIndex = themes.findIndex(t => t === context.theme.state);
    let nextIndex = themes.findIndex(t => t === theme);
    if (nextIndex == -1) nextIndex = themes[currentIndex + 1] ? currentIndex + 1 : 0;
    document.body.classList.replace(themes[currentIndex], themes[nextIndex]);
    context.theme.state = themes[nextIndex];
    cookie.set("theme", context.theme.state);
    setContext({ ...context, theme: context.theme });
  }

  function themeToggleHandler() {
    setTheme();
  }

  function themeSetHandler(theme: string) {
    setTheme(theme);
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

  return <MainLayoutContext.Provider value={ctx}>{props.children}</MainLayoutContext.Provider>;
};
