import Document, { Html, Head, Main, NextScript } from 'next/document'
import Cookies from 'js-cookie'

class MyDocument extends Document {
  props: any;

  static async getInitialProps(ctx: any) {
    let theme
    if (ctx.req && 'cookies' in ctx.req) {
      const { req } = ctx

      theme = req.cookies.theme || 'dark'
    } else {
      theme = Cookies.get('theme') === 'dark' ? 'dark' : 'light'
    }

    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, theme }
  }

  render() {
    const { theme } = this.props;

    return (
      <Html lang="en" prefix="og: http://ogp.me/ns#">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@mdi/font@6.6.96/css/materialdesignicons.min.css" />
          <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap" />
        </Head>
        <body className={`app ${theme}`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument