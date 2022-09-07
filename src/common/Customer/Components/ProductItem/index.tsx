import { Container, Typography } from '@mui/material';
import { AddShoppingCart, Visibility } from '@mui/icons-material';
import { CartItemType, Product } from 'types/Customer/home';
import productItemStyles from './style.module.scss';
import { getProductByIdAsync } from 'store/Customer/Home/thunkActions';
import { useCustomerDispatch } from 'store/Customer/hooks';
import { addToCart, convertCurrency } from 'store/Customer/Home/slice';
import { MouseEvent } from 'react';
import clsx from 'clsx';

type Props = {
  product: Product;
  handleClickOpen: () => void;
};

const ProductItem = ({ product, handleClickOpen }: Props) => {
  const dispatch = useCustomerDispatch();

  const handleClickProduct = (e: MouseEvent<HTMLDivElement>) => {
    const element = e.target as Element;
    if (!element.closest('span[class*="product__add-to-cart"]')) {
      dispatch(getProductByIdAsync(product.productId));
      handleClickOpen();
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItemType = {
      product,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div className={productItemStyles['product']} onClick={handleClickProduct}>
      <div className={productItemStyles['product__top']}>
        <img src={product.images[0]} alt={product.name} />
        {product.isNew && (
          <span className={productItemStyles['product__new']}>NEW</span>
        )}
        {!!product.discountPercent && (
          <span className={productItemStyles['product__discount']}>
            {`-${product.discountPercent}%`}
          </span>
        )}
      </div>
      <div className={productItemStyles['product__bottom']}>
        <Typography variant="h5">{product.name}</Typography>
        <span
          className={`${
            !!product.discountPercent && 'line-through'
          } product__price`}
        >
          {convertCurrency(product.price)}
        </span>
        <br />
        {!!product.discountPercent && (
          <span className="product__price">
            {convertCurrency(product.discountPrice)}
          </span>
        )}
        <span
          className={clsx(
            productItemStyles['button'],
            productItemStyles['product__add-to-cart']
          )}
          onClick={handleAddToCart}
        >
          <AddShoppingCart />
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
