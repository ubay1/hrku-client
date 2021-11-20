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
import {persistor, store, wrapper} from '../store'
import { Provider } from 'react-redux'
import { Provider as SessionProvider } from 'next-auth/client'
import NProgress from "nprogress"
import '../public/nprogress.css'
import router from "next/router"
import Head from "next/head"
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider, getUser } from '../context/authContext';
import App from 'next/app';

function MyApp({ Component, pageProps, auth }: any) {
  
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
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        </Head>
        <AuthProvider myAuth={auth}>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext)
  const auth = await getUser(appContext.ctx)
  return { ...appProps, auth: auth }
}

export default wrapper.withRedux(MyApp)
