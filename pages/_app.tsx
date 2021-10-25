import 'tailwindcss/tailwind.css'
import '../assets/scss/app.css'
import '../assets/scss/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import theme from '../utils/theme';
import Cookies from "js-cookie";
import {persistor, store} from '../store'
import { Provider } from 'react-redux'
import NProgress from "nprogress"
import '../public/nprogress.css'
import router from "next/router"
import Head from "next/head"
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
  
  React.useEffect(() => {
    const jssStyles: any = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    const handleStart = (url: any) => {
      // console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs    /nprogress/0.2.0/nprogress.min.css"
        />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp
