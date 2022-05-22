import '../styles/globals.scss'
import '../styles/animations.scss'
import '../styles/mdi.scss'
import type { AppProps } from 'next/app'
import App from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
}

export default MyApp
