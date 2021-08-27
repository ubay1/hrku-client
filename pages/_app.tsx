import 'tailwindcss/tailwind.css'
import '../assets/scss/app.css'
import '../assets/scss/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import theme from '../utils/theme';
import {useRouter} from 'next/router'
import Cookies from "js-cookie";
import {store} from '../store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    const jssStyles: any = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp
