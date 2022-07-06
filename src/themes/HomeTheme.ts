import { createTheme } from '@mui/material';

const primaryMainColor = '#ea1b25';
const primaryLightColor = 'rgb(234, 27, 37, 0.5)';
const secondaryMainColor = '#222222';
const textColor1 = '#222222';
const textColor2 = '#ffffff';
const textColor3 = '#777';

export const globalTheme = createTheme({
  palette: {
    text: {
      primary: textColor1,
      secondary: textColor2,
    },
    primary: {
      light: primaryLightColor,
      main: primaryMainColor,
    },
    secondary: {
      main: secondaryMainColor,
    },
    action: {
      hover: primaryMainColor,
    },
    background: {
      default: '#f7f7f7',
    }
  },
  typography: {
    h3: {
      fontSize: 16,
      fontWeight: 600,
    },
    h5: {
      fontSize: 14,
      color: textColor1,
      fontWeight: 600,
    },
    caption: {
      fontSize: 13,
      fontWeight: 200,
      color: textColor3,
    }
  }
});
