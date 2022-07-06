import {
  AppBar,
  Grid,
  TextField,
  InputAdornment,
  Container,
  Typography,
} from '@mui/material';
import { ParentContainer } from 'GlobalStyle';
import { useState, ChangeEvent } from 'react';
import Categories from '../Categories';
import { useStyles } from './style';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

type Props = {};

function Navbar({}: Props) {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
              value={searchValue}
              onChange={handleSearch}
              fullWidth
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
            <Container disableGutters>
              <ShoppingCartOutlinedIcon color="secondary" />
              <Typography component="span">3</Typography>
            </Container>
          </Grid>
        </Grid>
      </ParentContainer>
    </AppBar>
  );
}

export default Navbar;