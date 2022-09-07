import {
  Container,
  Typography,
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  TextFieldProps,
  Button,
  InputAdornment,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStyles } from './style';
import { ISignUp } from 'types/Customer/home';
import { add, sub } from 'date-fns';
import { signUp } from 'store/Customer/Home/thunkActions';
import { useCustomerDispatch } from 'store/Customer/hooks';
import { Navigate, useNavigate } from 'react-router-dom';

export const digitsOnly = (value: any) => /^\d+$/.test(value);
export const isCitizenIdentification = (value: any) => {
  if (value.length !== 10 || value.length !== 13) {
    return false;
  }
  return true;
};

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Đây là trường bắt buộc')
    .min(6, 'Tên tài khoản phải có số ký tự lớn hơn 6'),
  password: yup
    .string()
    .required('Đây là trường bắt buộc')
    .min(6, 'Mật khẩu phải có số ký tự lớn hơn 6'),
  passwordConfirmation: yup
    .string()
    .required('Đây là trường bắt buộc')
    .min(6, 'Mật khẩu phải có số ký tự lớn hơn 6')
    .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
  citizenIdentification: yup
    .string()
    .required('Đây là trường bắt buộc')
    .length(12, 'CCCD phải là 12 số')
    .test('Digits only', 'CCCD chỉ bao gồm ký tự số', digitsOnly),
  firstName: yup.string().required('Đây là trường bắt buộc'),
  lastName: yup.string().required('Đây là trường bắt buộc'),
  gender: yup.number(),
  dateOfBirth: yup.date().nullable(),
  address: yup.string(),
  email: yup
    .string()
    .required('Đây là trường bắt buộc')
    .email('Email không đúng định dạng'),
  phoneNumber: yup
    .string()
    .required('Đây là trường bắt buộc')
    .length(10, 'Số điện thoại phải là 10 số')
    .test('Digits only', 'Số điện thoại chỉ bao gồm ký tự số', digitsOnly),
  taxCode: yup
    .string()
    .required('Đây là trường bắt buộc')
    .min(10, 'Mã số thuế có ít nhất 10 kí tự')
    .max(13, 'Mã số thuế có nhiều nhất 13 kí tự')
    .test('Digits only', 'Mã số thuế chỉ bao gồm ký tự số', digitsOnly),
});

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useCustomerDispatch();
  const navigate = useNavigate();

  const {
    register,
    control,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<ISignUp>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmationPassword = () => {
    setShowConfirmationPassword(!showConfirmationPassword);
  };

  const onSubmit = async (data: ISignUp) => {
    const res: any = await dispatch(signUp(data));
    if (res.payload.data) {
      navigate('/');
    }
  };

  return (
    <Container className={classes['sign-up-container']}>
      <Typography variant="h2">Đăng ký</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={6}>
          <Grid item xs={4}>
            <Typography variant="h4">Thông tin tài khoản</Typography>
            <TextField
              type="text"
              variant="outlined"
              label="Tên tài khoản"
              color="secondary"
              required
              fullWidth
              autoComplete="off"
              inputProps={{
                minLength: 6,
                maxLength: 20,
              }}
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message ?? ''}
            />
            <TextField
              type={showPassword ? 'type' : 'password'}
              variant="outlined"
              label="Mật khẩu"
              color="secondary"
              required
              fullWidth
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPassword ? (
                      <VisibilityOff onClick={handleShowPassword} />
                    ) : (
                      <Visibility onClick={handleShowPassword} />
                    )}
                  </InputAdornment>
                ),
              }}
              inputProps={{
                minLength: 6,
                maxLength: 20,
              }}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message ?? ''}
            />
            <TextField
              type={showConfirmationPassword ? 'type' : 'password'}
              variant="outlined"
              label="Nhập lại mật khẩu"
              color="secondary"
              required
              fullWidth
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showConfirmationPassword ? (
                      <VisibilityOff onClick={handleShowConfirmationPassword} />
                    ) : (
                      <Visibility onClick={handleShowConfirmationPassword} />
                    )}
                  </InputAdornment>
                ),
              }}
              inputProps={{
                minLength: 6,
                maxLength: 20,
              }}
              {...register('passwordConfirmation')}
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation?.message ?? ''}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h4">Thông tin khách hàng</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="CCCD"
                  color="secondary"
                  required
                  fullWidth
                  autoComplete="off"
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...register('citizenIdentification')}
                  error={!!errors.citizenIdentification}
                  helperText={errors.citizenIdentification?.message ?? ''}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Họ"
                  color="secondary"
                  required
                  fullWidth
                  autoComplete="off"
                  inputProps={{
                    maxLength: 20,
                  }}
                  {...register('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message ?? ''}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Tên"
                  color="secondary"
                  required
                  fullWidth
                  autoComplete="off"
                  inputProps={{
                    maxLength: 10,
                  }}
                  {...register('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message ?? ''}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-gender" color="secondary">
                    Giói tính
                  </InputLabel>
                  <Select
                    labelId="select-gender"
                    label="Giới tính"
                    color="secondary"
                    value={0}
                    {...register('gender')}
                  >
                    <MenuItem value={0}>Nam</MenuItem>
                    <MenuItem value={1}>Nữ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => {
                      return (
                        <DatePicker
                          label="Ngày sinh"
                          inputFormat="dd/MM/yyyy"
                          maxDate={sub(new Date(), { years: 18 })}
                          {...field}
                          renderInput={(
                            params: JSX.IntrinsicAttributes & TextFieldProps
                          ) => (
                            <TextField
                              InputLabelProps={{
                                style: { color: 'var(--secondary-color)' },
                              }}
                              color="secondary"
                              {...params}
                            />
                          )}
                        />
                      );
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                variant="outlined"
                label="Địa chỉ"
                color="secondary"
                fullWidth
                autoComplete="off"
                {...register('address')}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  type="email"
                  variant="outlined"
                  label="Email"
                  color="secondary"
                  fullWidth
                  required
                  autoComplete="off"
                  inputProps={{
                    maxLength: 40,
                  }}
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message ?? ''}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="tel"
                  variant="outlined"
                  label="Số điện thoại"
                  color="secondary"
                  fullWidth
                  required
                  autoComplete="off"
                  inputProps={{
                    maxLength: 10,
                  }}
                  {...register('phoneNumber')}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message ?? ''}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Mã số thuế"
                  color="secondary"
                  fullWidth
                  required
                  autoComplete="off"
                  inputProps={{
                    maxLength: 13,
                    minLength: 10,
                  }}
                  {...register('taxCode')}
                  error={!!errors.taxCode}
                  helperText={errors.taxCode?.message ?? ''}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={!isValid}
        >
          Đăng ký
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
