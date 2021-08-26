import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = unstable_createMuiStrictModeTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: red.A400,
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#000',
    }
  },
});

export default theme;