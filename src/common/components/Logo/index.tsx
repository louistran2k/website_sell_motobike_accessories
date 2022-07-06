import { Container, Grid, Typography } from '@mui/material';
import { ParentContainer } from 'GlobalStyle';
import { LogoImg, supportImg, paymentImg, freeshipImg } from 'assets/images';
import { useStyles } from './style';

type Props = {};

function Logo({}: Props) {
  const classes = useStyles();
  return (
    <ParentContainer>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <a href="">
            <img src={LogoImg} alt="logo" />
          </a>
        </Grid>
        <Grid item xs={3} container classes={{ item: classes.item }}>
          <img src={freeshipImg} alt="freeship" />
          <Container>
            <Typography variant="h5">Free Shipping</Typography>
            <Typography variant="caption">Free shipping</Typography>
          </Container>
        </Grid>
        <Grid item xs={3} container classes={{ item: classes.item }}>
          <img src={supportImg} alt="support" />
          <Container>
            <Typography variant="h5">Support 24/7</Typography>
            <Typography variant="caption">Contact us 24 hours a day</Typography>
          </Container>
        </Grid>
        <Grid item xs={3} container classes={{ item: classes.item }}>
          <img src={paymentImg} alt="payment" />
          <Container>
            <Typography variant="h5">Payment Secure</Typography>
            <Typography variant="caption">We ensure secure payment</Typography>
          </Container>
        </Grid>
      </Grid>
    </ParentContainer>
  );
}

export default Logo;
