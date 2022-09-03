import { Container, Grid, Divider, Typography } from '@mui/material';
import ProductItem from 'common/Customer/Components/ProductItem';
import ViewProduct from 'common/Customer/Components/ViewProduct';
import { useState } from 'react';
import { useCustomerSelector } from 'store/Customer/hooks';
import { getProduct, getSearch } from 'store/Customer/selectors';

const Search = () => {
  const product = useCustomerSelector(getProduct);
  const search = useCustomerSelector(getSearch);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open && (
        <ViewProduct product={product} open={open} handleClose={handleClose} />
      )}
      <Container disableGutters>
        <Container
          component="div"
          disableGutters
          style={{ paddingBottom: '20px' }}
        >
          <Grid container alignItems="center" columns={20}>
            <Grid item xs={1}>
              <Divider />
            </Grid>
            <Typography variant="h2">{`Kết quả tìm kiếm`}</Typography>
            <Divider />
          </Grid>
          <Divider />
          <Grid container>
            {search.map((item, index) => (
              <Grid item xs={3} key={index}>
                <ProductItem product={item} handleClickOpen={handleClickOpen} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default Search;
