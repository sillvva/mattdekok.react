import type { AppProps } from "next/app";
import App from "next/app";
import "../styles/globals.scss";
import "../styles/mdi.scss";
import "../styles/montserrat.font.css";
import { storeWrapper } from "../store/app.store";
import Layout from "../layouts/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout pageProps={pageProps}>
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
