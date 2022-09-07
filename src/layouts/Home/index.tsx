import { ThemeProvider } from '@mui/material/styles';
import NavBar from './components/Navbar';
import Header from './components/Header';
import { globalTheme } from '../../themes/HomeTheme';
import { useStyles } from './style';
import Logo from 'layouts/Home/components/Logo';
import { Container } from '@mui/material';
import { Provider } from 'react-redux';
import store from 'store/Customer';
import { useEffect } from 'react';
import { useCustomerDispatch } from 'store/Customer/hooks';
import {
  getAllProductGroupAsync,
  getAllProductTypeAsync,
} from 'store/Customer/Home/thunkActions';
import Main from 'pages/Customer/Main';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children: JSX.Element;
};

function CustomerLayout({ children }: Props) {
  const classes = useStyles();

  const dispatch = useCustomerDispatch();

  useEffect(() => {
    dispatch(getAllProductGroupAsync());
    dispatch(getAllProductTypeAsync());
  }, []);

  return (
    <ThemeProvider theme={globalTheme}>
      <div className={classes.main}>
        <Header />
        <Logo />
        <NavBar />
        <Container className={classes.content} disableGutters>
          {children}
        </Container>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={false}
        />
      </div>
    </ThemeProvider>
  );
}

export default CustomerLayout;
