import {
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import ProductItem from 'common/Customer/Components/ProductItem';
import ViewProduct from 'common/Customer/Components/ViewProduct';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
  fetchFeatureProducts,
  fetchNewProducts,
  fetchProductsByGroupId,
  fetchProductsByTypeId,
  fetchProductsWithRange,
  fetchPromotionalProducts,
} from 'store/Customer/Home/thunkActions';
import { useCustomerDispatch, useCustomerSelector } from 'store/Customer/hooks';
import {
  getCategories,
  getFeatureProducts,
  getProduct,
} from 'store/Customer/selectors';
import {
  PAGE_MAX,
  Product,
  ProductGroup,
  ProductType,
} from 'types/Customer/home';

const Products = () => {
  const params = useParams();
  const location = useLocation();
  const categories = useCustomerSelector(getCategories);
  const dispatch = useCustomerDispatch();
  const product = useCustomerSelector(getProduct);

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let arr: ProductGroup[] | ProductType[] = [];
  let route: string = '';

  useEffect(() => {
    (async () => {
      let tmp: Product[] = [];
      if (location.pathname.includes('/new-products')) {
        const res = await fetchNewProducts();
        tmp = res.data.map((item: any) => ({
          ...item,
          images: item.images.split('|'),
        }));
        setTitle('Sản phẩm mới');
      }
      if (location.pathname.includes('/feature-products')) {
        const res = await fetchFeatureProducts();
        tmp = res.data.map((item: any) => ({
          ...item,
          images: item.images.split('|'),
        }));
        setTitle('Sản phẩm nổi bật');
      }
      if (location.pathname.includes('/promotional-products')) {
        const res = await fetchPromotionalProducts();
        tmp = res.data.map((item: any) => ({
          ...item,
          images: item.images.split('|'),
        }));
        setTitle('Sản phẩm khuyến mãi');
      }
      if (location.pathname.includes('/products')) {
        const res = await fetchProductsWithRange({
          min: (page - 1) * PAGE_MAX,
          max: page * PAGE_MAX,
        });
        tmp = res.data.map((item: any) => ({
          ...item,
          images: item.images.split('|'),
        }));
        setTitle('Danh sách sản phẩm');
      }
      if (location.pathname.includes('/product-group')) {
        const res = await fetchProductsByGroupId({
          groupId: Number(params.productGroupId),
          min: (page - 1) * PAGE_MAX,
          max: page * PAGE_MAX,
        });
        tmp = res.data.map((item: any) => ({
          ...item,
          images: item.images.split('|'),
        }));
        setTitle('Danh sách sản phẩm');
      }
      if (location.pathname.includes('/product-type')) {
        const res = await fetchProductsByTypeId({
          typeId: Number(params.productTypeId),
          min: (page - 1) * PAGE_MAX,
          max: page * PAGE_MAX,
        });
        tmp = res.data.map((item: any) => ({
          ...item,
          images: item.images.split('|'),
        }));
        setTitle('Danh sách sản phẩm');
      }
      setProducts(tmp);
    })();
  }, [page, location.pathname]);

  if (!!params?.productGroupId) {
    const tmp = categories.find(
      (item) => item.id === Number(params?.productGroupId)
    )?.productTypes;
    if (tmp !== undefined) {
      arr = [...tmp];
      route = '/product-type/';
    }
  }

  if (location.pathname.includes('/products')) {
    arr = categories;
    route = '/product-group/';
  }

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {open && (
        <ViewProduct product={product} open={open} handleClose={handleClose} />
      )}
      <Container disableGutters>
        {arr.length > 0 && (
          <Container>
            {arr.map((item) => (
              <Chip
                key={item.id}
                variant="outlined"
                color="primary"
                label={
                  <RouterLink to={`${route}${item.id}`}>
                    <Typography variant="h5">{item.name}</Typography>
                  </RouterLink>
                }
              />
            ))}
          </Container>
        )}
        <Container
          component="div"
          disableGutters
          style={{ paddingBottom: '20px' }}
        >
          <Grid container alignItems="center" columns={20}>
            <Grid item xs={1}>
              <Divider />
            </Grid>
            <Typography variant="h2">{title}</Typography>
            <Divider />
          </Grid>
          <Divider />
          <Grid container>
            {products.map((item, index) => (
              <Grid item xs={3} key={index}>
                <ProductItem product={item} handleClickOpen={handleClickOpen} />
              </Grid>
            ))}
          </Grid>
        </Container>
        {location.pathname.includes('/products') && (
          <Pagination
            count={4}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        )}
      </Container>
    </>
  );
};

export default Products;
