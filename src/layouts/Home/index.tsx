import { ThemeProvider } from '@mui/material/styles';
import NavBar from '../../common/components/Navbar';
import Header from '../../common/components/Header';
import { globalTheme } from '../../themes/HomeTheme';
import { useStyles } from './style';
import Logo from 'common/components/Logo';
import { Container } from '@mui/material';

type Props = {};

function CustomerLayout({}: Props) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={globalTheme}>
      <div className={classes.main}>

      <Header />
      <Logo />
      <NavBar />
      <Container style={{height: 2000}}>
      </Container>
      </div>
    </ThemeProvider>
  );
}

export default CustomerLayout;
