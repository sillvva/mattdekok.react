import Document, { Html, Head, Main, NextScript } from "next/document";
import Cookies from "js-cookie";

function MyDocument({ theme }: any) {
  return (
    <Html lang="en" prefix="og: http://ogp.me/ns#" data-theme={theme}>
      <Head></Head>
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
