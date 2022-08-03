import { Container } from '@mui/material';
import ViewProduct from 'common/Customer/Components/ViewProduct';
import { useEffect, useState } from 'react';
import {
  getFeatureProductsAsync,
  getNewProductsAsync,
  getPromotionalProductsAsync,
  getRandomProductsAsync,
} from 'store/Customer/Home/thunkActions';
import { useCustomerDispatch, useCustomerSelector } from 'store/Customer/hooks';
import {
  getFeatureProducts,
  getNewProducts,
  getProduct,
  getPromotionalProducts,
} from 'store/Customer/selectors';
import AnotherProducts from './components/AnotherProducts';
import ProductSection, {
  ProductSectionProps,
} from './components/ProductSection';

function Main() {
  const dispatch = useCustomerDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getPromotionalProductsAsync(10));
    dispatch(getNewProductsAsync(10));
    dispatch(getFeatureProductsAsync(10));
    dispatch(getRandomProductsAsync());
  }, []);

  const newProducts = useCustomerSelector(getNewProducts);
  const promotionalProducts = useCustomerSelector(getPromotionalProducts);
  const featureProducts = useCustomerSelector(getFeatureProducts);
  const newProductsProps: ProductSectionProps = {
    title: 'Sản phẩm mới',
    link: '/new-products',
    list: newProducts,
    handleClickOpen: handleClickOpen,
  };
  const promotionalProductsProps: ProductSectionProps = {
    title: 'Sản phẩm khuyến mãi',
    link: '/promotional-products',
    list: promotionalProducts,
    handleClickOpen: handleClickOpen,
  };
  const featureProductsProps: ProductSectionProps = {
    title: 'Sản phẩm nổi bật',
    link: '/feature-products',
    list: featureProducts,
    handleClickOpen: handleClickOpen,
  };

  const product = useCustomerSelector(getProduct);

  return (
    <>
      {open && (
        <ViewProduct product={product} open={open} handleClose={handleClose} />
      )}
      <Container disableGutters>
        {!!newProducts.length && <ProductSection {...newProductsProps} />}
        {!!promotionalProducts.length && (
          <ProductSection {...promotionalProductsProps} />
        )}
        {!!featureProducts.length && (
          <ProductSection {...featureProductsProps} />
        )}
        <AnotherProducts handleClickOpen={handleClickOpen} />
      </Container>
    </>
  );
}

export default Main;
