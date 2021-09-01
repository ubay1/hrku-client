import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = unstable_createMuiStrictModeTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff1744',
    },
    info: {
      main: '#315f72'
    },
    error: {
      main: '#f44336',
    },
    text: {
      primary: '#000',
      secondary: '#fff',
    }
  },
});

export default theme;