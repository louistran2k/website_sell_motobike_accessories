import { Button, Container, Divider, List, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { convertCurrency } from 'store/Customer/Home/slice';
import { useCustomerSelector } from 'store/Customer/hooks';
import { getAccessTokenRedux, getCart } from 'store/Customer/selectors';
import { CartItemType } from 'types/Customer/home';
import CartItem from './components/CartItem';

export const calcTotalPrice = (cart: CartItemType[]) =>
  cart.reduce((prev, current) => {
    if (current.product.discountPrice > 0) {
      return prev + current.quantity * current.product.discountPrice;
    }
    return prev + current.quantity * current.product.price;
  }, 0);

const Cart = () => {
  const cart = useCustomerSelector(getCart);
  const accessToken = useCustomerSelector(getAccessTokenRedux);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!!accessToken) {
      navigate('/checkout');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <Container disableGutters className="content-block">
      <Typography variant="h2">Giỏ hàng</Typography>
      <Divider />
      {!!cart.length ? (
        <List>
          {cart.map((item, index) => (
            <CartItem key={index} cartItem={item} />
          ))}
        </List>
      ) : (
        <Typography variant="h5">
          Không có sản phẩm nào trong giỏ hàng
        </Typography>
      )}
      <Container disableGutters style={{ textAlign: 'right' }}>
        <Typography variant="h2">
          {convertCurrency(calcTotalPrice(cart))}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          disabled={!cart.length}
        >
          Thanh toán
        </Button>
      </Container>
    </Container>
  );
};

export default Cart;
