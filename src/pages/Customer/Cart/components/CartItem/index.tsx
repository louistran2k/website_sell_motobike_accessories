import { Grid, ListItem, Typography } from '@mui/material';
import QuantityInput from 'common/Customer/Components/QuantityInput';
import { ChangeEvent } from 'react';
import {
  convertCurrency,
  setQuantityCartItem,
} from 'store/Customer/Home/slice';
import { useCustomerDispatch } from 'store/Customer/hooks';
import { CartItemType } from 'types/Customer/home';

type Props = {
  cartItem: CartItemType;
};

export const calcTotalPrice = (cartItem: CartItemType) => {
  if (cartItem.product.discountPrice > 0) {
    return cartItem.product.discountPrice * cartItem.quantity;
  }
  return cartItem.product.price * cartItem.quantity;
};

const CartItem = ({ cartItem }: Props) => {
  const dispatch = useCustomerDispatch();
  const handleIncrease = () => {
    const tmp = {
      productId: cartItem.product.productId,
      quantity:
        cartItem.quantity < cartItem.product.quantityInStock
          ? cartItem.quantity + 1
          : cartItem.quantity,
    };
    dispatch(setQuantityCartItem(tmp));
  };
  const handleDecrease = () => {
    const tmp = {
      productId: cartItem.product.productId,
      quantity:
        cartItem.quantity > 0 ? cartItem.quantity - 1 : cartItem.quantity,
    };
    dispatch(setQuantityCartItem(tmp));
  };
  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    console.log(value > cartItem.product.quantityInStock ? cartItem.product.quantityInStock : value);
    const tmp = {
      productId: cartItem.product.productId,
      quantity: value > cartItem.product.quantityInStock ? cartItem.product.quantityInStock : value,
    };
    dispatch(setQuantityCartItem(tmp));
  };

  return (
    <ListItem divider>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h4">{cartItem.product.productName}</Typography>
          <Typography variant="subtitle1">
            {cartItem.product.discountPrice > 0
              ? convertCurrency(cartItem.product.discountPrice)
              : convertCurrency(cartItem.product.price)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">Số lượng:</Typography>
          <QuantityInput
            quantity={cartItem.quantity}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            handleChangeQuantity={handleChangeQuantity}
          />
          <Typography variant="subtitle1">
            {convertCurrency(calcTotalPrice(cartItem))}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default CartItem;
