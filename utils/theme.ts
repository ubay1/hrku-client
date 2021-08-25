import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f2277c',
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