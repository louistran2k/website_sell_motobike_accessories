import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axiosClient from 'api/axiosClient';
import { add, isValid } from 'date-fns';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomerDispatch, useCustomerSelector } from 'store/Customer/hooks';
import {
  getAccessTokenRedux,
  getCart,
  getUser,
} from 'store/Customer/selectors';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { digitsOnly } from '../SignUp';
import { CustomerOrder, ProductCheckoutReq } from 'types/Customer/home';
import { convertCurrency } from 'store/Customer/Home/slice';
import { calcTotalPrice as calcPrice } from '../Cart/components/CartItem';
import { calcTotalPrice } from '../Cart';

const schema = yup.object().shape({
  receiverFullName: yup.string().required('Đây là trường bắt buộc'),
  deliveryAddress: yup.string().required('Đây là trường bắt buộc'),
  receiverEmail: yup
    .string()
    .required('Đây là trường bắt buộc')
    .email('Email không đúng định dạng'),
  receiverPhoneNumber: yup
    .string()
    .required('Đây là trường bắt buộc')
    .test('Digits only', 'Số điện thoại chỉ bao gồm ký tự số', digitsOnly),
});

const Checkout = () => {
  const accessToken = useCustomerSelector(getAccessTokenRedux);
  const navigate = useNavigate();
  const cart = useCustomerSelector(getCart);
  const dispatch = useCustomerDispatch();
  const user = useCustomerSelector(getUser);

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<CustomerOrder>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    if (!accessToken) {
      navigate('/sign-in');
    }
  }, []);

  const onSubmit = async (data: CustomerOrder) => {
    const customerOrder: CustomerOrder = {
      ...data,
      createAt: new Date(),
      status: 0,
      deliveryDate: add(new Date(), { weeks: 1 }),
      totalPrice: calcTotalPrice(cart),
      citizenIdentification: user.citizenIdentification,
    };
    const cartDetail: ProductCheckoutReq[] = cart.map((item) => ({
      productId: item.product.productId,
      productName: item.product.productName,
      price: !!item.product.discountPercent
        ? item.product.discountPrice
        : item.product.price,
      quantity: item.quantity,
    }));
    try {
      const res1 = await axiosClient.post(
        'api/customerOrder/create',
        customerOrder
      );
      console.log(res1);
      const res = await axiosClient.post('api/checkout/checkout', cartDetail);
      window.location.replace(res.data.forwardLink);
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return (
    <Container>
      <Typography variant="h2">Đăng ký</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={5}>
          <Grid item container xs={4}>
            <Typography variant="h4">Thông tin người nhận</Typography>
            <TextField
              type="text"
              variant="outlined"
              label="Họ tên người nhận"
              color="secondary"
              required
              fullWidth
              autoComplete="off"
              {...register('receiverFullName')}
              error={!!errors.receiverFullName}
              helperText={errors.receiverFullName?.message ?? ''}
            />
            <TextField
              type="text"
              variant="outlined"
              label="Địa chỉ nhận"
              color="secondary"
              required
              fullWidth
              autoComplete="off"
              {...register('deliveryAddress')}
              error={!!errors.deliveryAddress}
              helperText={errors.deliveryAddress?.message ?? ''}
            />
            <TextField
              type="email"
              variant="outlined"
              label="Email người nhận"
              color="secondary"
              fullWidth
              required
              autoComplete="off"
              inputProps={{
                maxLength: 40,
              }}
              {...register('receiverEmail')}
              error={!!errors.receiverEmail}
              helperText={errors.receiverEmail?.message ?? ''}
            />
            <TextField
              type="text"
              variant="outlined"
              label="Số điện thoại người nhận"
              color="secondary"
              fullWidth
              required
              autoComplete="off"
              inputProps={{
                maxLength: 10,
              }}
              {...register('receiverPhoneNumber')}
              error={!!errors.receiverPhoneNumber}
              helperText={errors.receiverPhoneNumber?.message ?? ''}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h4">Sản phẩm</Typography>
            <List>
              {cart.map((item, index) => (
                <ListItem key={index} divider>
                  <Grid container>
                    <Grid item xs={9}>
                      <Typography variant="h4">
                        {item.product.productName}
                      </Typography>
                      <Typography variant="subtitle1">
                        {item.product.discountPrice > 0
                          ? convertCurrency(item.product.discountPrice)
                          : convertCurrency(item.product.price)}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h4">
                        {`x${item.quantity}`}
                      </Typography>
                      <Typography variant="subtitle1">
                        {convertCurrency(calcPrice(item))}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={!isValid}
        >
          Thanh toán
        </Button>
      </form>
    </Container>
  );
};

export default Checkout;
