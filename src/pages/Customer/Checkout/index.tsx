import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { axiosClientWithToken } from 'api/axiosClient';
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
    .length(10, 'Số điện thoại phải là 10 số')
    .test('Digits only', 'Số điện thoại chỉ bao gồm ký tự số', digitsOnly),
  deliveryDate: yup.date().required(),
});

const Checkout = () => {
  const accessToken = useCustomerSelector(getAccessTokenRedux);
  const navigate = useNavigate();
  const cart = useCustomerSelector(getCart);
  const dispatch = useCustomerDispatch();
  const user = useCustomerSelector(getUser);

  const {
    register,
    control,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<CustomerOrder>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      receiverFullName: `${user.firstName.trim()} ${user.lastName.trim()}`,
      deliveryAddress: !user.address ? '' : user.address.trim(),
      receiverEmail: !user.email ? '' : user.email.trim(),
      receiverPhoneNumber: user.phoneNumber.trim(),
    },
  });

  useEffect(() => {
    if (!accessToken) {
      navigate('/sign-in');
    }
  }, []);

  const onSubmit = async (data: CustomerOrder) => {
    const customerOrder: CustomerOrder = {
      ...data,
      deliveryDate: data.deliveryDate
        ? add(new Date(data.deliveryDate), { days: 1 })
        : null,
      createAt: new Date(),
      status: 1,
      totalPrice: calcTotalPrice(cart),
      citizenIdentification: user.citizenIdentification,
    };
    const cartDetail: ProductCheckoutReq[] = cart.map((item) => ({
      productId: item.product.productId,
      productName: item.product.name,
      price: !!item.product.discountPercent
        ? item.product.discountPrice
        : item.product.price,
      quantity: item.quantity,
    }));
    try {
      const res1 = await axiosClientWithToken.post(
        'api/customerOrder/create',
        customerOrder
      );
      console.log(res1);
      const res = await axiosClientWithToken.post('api/checkout/checkout', cartDetail);
      window.location.replace(res.data.forwardLink);
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return (
    <Container className="content-block">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={5}>
          <Grid item container xs={4}>
            <Typography variant="h4" style={{ marginBottom: 10 }}>
              Thông tin người nhận
            </Typography>
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="deliveryDate"
                control={control}
                defaultValue={null}
                render={({ field }) => {
                  return (
                    <DatePicker
                      label="Ngày giao"
                      inputFormat="dd/MM/yyyy"
                      minDate={add(new Date(), { days: 4 })}
                      {...field}
                      renderInput={(
                        params: JSX.IntrinsicAttributes & TextFieldProps
                      ) => (
                        <TextField
                          InputLabelProps={{
                            style: { color: 'var(--secondary-color)' },
                          }}
                          color="secondary"
                          required
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  );
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h4">Sản phẩm</Typography>
            <List>
              {cart.map((item, index) => (
                <ListItem key={index} divider>
                  <Grid container>
                    <Grid item xs={9}>
                      <Typography variant="h4">{item.product.name}</Typography>
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
