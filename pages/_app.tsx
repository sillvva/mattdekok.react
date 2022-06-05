import type { AppProps } from "next/app";
import App from "next/app";
import Router from "next/router";
import "../styles/globals.scss";
import "../styles/mdi.scss";
import "../styles/montserrat.font.css";
import { storeWrapper } from "../store/app.store";
import Layout from "../layouts/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
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
