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

export const themes = ["dark", "light", "blue"];

type DrawerProps = {
  state: boolean;
  action: string;
  toggle: () => void;
};

type ThemeProps = {
  state: string;
  themes: string[];
  done: boolean;
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
    done: true,
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
    let nextIndex = themes[themes.findIndex(t => t === context.theme.state) + 1] || themes[0];
    let next = (theme && themes.find(t => t === theme)) || nextIndex;
    document.documentElement.dataset.theme = next;
    context.theme.state = next;
    context.theme.done = false;
    cookie.set("theme", context.theme.state);
    setContext({ ...context, theme: context.theme });
    setTimeout(() => {
      context.theme.done = true;
      setContext({ ...context, theme: context.theme });
    }, 300);
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
