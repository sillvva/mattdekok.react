import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import "../styles/globals.scss";
import "../styles/mdi.scss";
import "../styles/montserrat.font.css";
import { storeWrapper } from "../store/app.store";
import { useTheme } from "../store/slices/theme.slice";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement, pageProps: AppPropsWithLayout) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const theme = useTheme();
  
  return (
    <div id="app" data-theme={pageProps.cookies?.theme || theme?.name} className="min-h-screen min-w-screen">
      {getLayout(<Component {...pageProps} />, pageProps)}        
    </div>
  );
}

export default storeWrapper.withRedux(MyApp);

// const routeChange = () => {
//   // Temporary fix to avoid flash of unstyled content
//   // during route transitions. Keep an eye on this
//   // issue and remove this code when resolved:
//   // https://github.com/vercel/next.js/issues/17464

//   const tempFix = () => {
//     const allStyleElems = document.querySelectorAll('style[media="x"]');
//     allStyleElems.forEach(elem => {
//       elem.removeAttribute("media");
//     });
//   };
//   tempFix();
// };

// Router.events.on("routeChangeComplete", routeChange);
// Router.events.on("routeChangeStart", routeChange);
