import 'tailwindcss/tailwind.css'
import '../assets/scss/app.css'
import '../assets/scss/global.scss';
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import theme from '../utils/theme';
import { useUserStore } from "../store/user";
import {useRouter} from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const user = useUserStore(state => state.isLogin)
  const router = useRouter()
  
  React.useEffect(() => {
    if (user === false) {
      router.push('/login')
    }
    
    const jssStyles: any = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp
