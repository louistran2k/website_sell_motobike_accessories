import {
  AppBar,
  Grid,
  TextField,
  InputAdornment,
  Container,
  Typography,
  Badge,
  debounce,
} from '@mui/material';
import { ParentContainer } from 'GlobalStyle';
import { useState, ChangeEvent, useEffect, useRef } from 'react';
import Categories from '../Categories';
import { useStyles } from './style';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import { useCustomerDispatch, useCustomerSelector } from 'store/Customer/hooks';
import { getCart } from 'store/Customer/selectors';
import { searchByName } from 'store/Customer/Home/thunkActions';

type Props = {};

function Navbar({}: Props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const cart = useCustomerSelector(getCart);
  const dispatch = useCustomerDispatch();

  const cartQuantity = cart.reduce((prev, value) => prev + value.quantity, 0);

  const debouncedSearch = useRef(
    debounce((value) => {
      dispatch(searchByName(value));
      navigate(`/search`);
    }, 300)
  ).current;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(
      e.target.value.trim().replaceAll(/\s+/g, ' ').toLowerCase()
    );
  };

  // useEffect(() => {
  //   return () => {
  //     debouncedSearch.cancel();
  //   };
  // }, [debouncedSearch]);

  const handleClickCart = () => {
    navigate('/cart');
  };

  return (
    <AppBar position="sticky" color="secondary">
      <ParentContainer>
        <Grid container alignItems="center" className={classes.block}>
          <Grid item xs={3}>
            <Categories />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="search"
              variant="outlined"
              color="primary"
              placeholder="Tìm kiếm ..."
              onChange={handleSearch}
              fullWidth
              autoComplete="off"
              className={classes.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3} className={classes.cart}>
            <Badge
              badgeContent={cartQuantity}
              color="primary"
              onClick={handleClickCart}
            >
              <ShoppingCartOutlinedIcon color="action" />
            </Badge>
          </Grid>
        </Grid>
      </ParentContainer>
    </AppBar>
  );
}

export default Navbar;
