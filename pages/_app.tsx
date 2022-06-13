import type { AppProps } from "next/app";
import App from "next/app";
import Router from "next/router";
import "../styles/globals.scss";
import "../styles/mdi.scss";
import "../styles/montserrat.font.css";
import { storeWrapper } from "../store/app.store";
import Layout from "../layouts/layout";
import { useTheme } from "../store/slices/theme.slice";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  
  return (
    <div id="app" data-theme={pageProps.cookies?.theme || theme?.name} className="min-h-screen min-w-screen">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  appProps.pageProps = { ...appProps.pageProps, cookies: appContext.ctx?.req?.cookies, path: appContext.ctx?.pathname };
  return { ...appProps };
};

export default storeWrapper.withRedux(MyApp);

const routeChange = () => {
  // Temporary fix to avoid flash of unstyled content
  // during route transitions. Keep an eye on this
  // issue and remove this code when resolved:
  // https://github.com/vercel/next.js/issues/17464

  const tempFix = () => {
    const allStyleElems = document.querySelectorAll('style[media="x"]');
    allStyleElems.forEach(elem => {
      elem.removeAttribute("media");
    });
  };
  tempFix();
};

Router.events.on("routeChangeComplete", routeChange);
Router.events.on("routeChangeStart", routeChange);
