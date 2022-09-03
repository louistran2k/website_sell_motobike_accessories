import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { ISignIn } from 'types/Customer/home';
import { useStyles } from './style';
import { useCustomerDispatch } from 'store/Customer/hooks';
import { signIn } from 'store/Customer/Home/thunkActions';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Đây là trường bắt buộc')
    .min(6, 'Tên tài khoản phải có số ký tự lớn hơn 6'),
  password: yup
    .string()
    .required('Đây là trường bắt buộc')
    .min(6, 'Mật khẩu phải có số ký tự lớn hơn 6'),
});

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useCustomerDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<ISignIn>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: ISignIn) => {
    const res = await dispatch(signIn(data));
    navigate(-1);
    // if (!!res.payload) {
    //   navigate('/checkout');
    // }
  };

  return (
    <Grid
      container
      className={classes['sign-in-container']}
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Typography variant="h2">Đăng nhập</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={!isValid}
          >
            Đăng nhập
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignIn;
