import Document, { Html, Head, Main, NextScript } from "next/document";
import Cookies from "js-cookie";

const themeColors: { [key: string]: string } = {
  dark: "#00aa99",
  blue: "#32b2e8",
  light: "#0070e7"
};

function MyDocument({ theme }: any) {
  const color = themeColors[theme] ?? "#111";

  return (
    <Html lang="en" prefix="og: http://ogp.me/ns#" data-theme={theme}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@mdi/font@6.6.96/css/materialdesignicons.min.css" />
        <link rel="manifest" href="/manifest.webmanifest" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content={color} />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content={color} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;

MyDocument.getInitialProps = async (ctx: any) => {
  let theme;
  if (ctx.req && "cookies" in ctx.req) {
    const { req } = ctx;

    theme = req.cookies.theme || "dark";
  } else {
    theme = Cookies.get("theme") || "dark";
  }

  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps, theme };
};
