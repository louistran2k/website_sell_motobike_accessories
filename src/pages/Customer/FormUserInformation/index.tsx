import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { sub, isValid } from 'date-fns';
import { Controller, useFormContext } from 'react-hook-form';
import { ISignUp, User } from 'types/Customer/home';

type Props = {
  isEdit: boolean;
  isUpdate: boolean;
};

const FormUserInformation = ({ isEdit, isUpdate }: Props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ISignUp>();

  return (
    <Grid item xs={8}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            type="text"
            variant="outlined"
            label="CCCD"
            disabled={isUpdate}
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
            disabled={!isEdit}
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
            disabled={!isEdit}
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
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="select-gender" color="secondary">
              Giới tính
            </InputLabel>
            <Controller
              name="gender"
              control={control}              
              render={({ field }) => {
                return (
                  <Select
                    labelId="select-gender"
                    label="Giới tính"
                    disabled={!isEdit}
                    color="secondary"
                    fullWidth
                    {...field}
                  >
                    <MenuItem value={0}>Nam</MenuItem>
                    <MenuItem value={1}>Nữ</MenuItem>
                  </Select>
                );
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={null}
              render={({ field }) => {
                return (
                  <DatePicker
                    label="Ngày sinh"
                    disabled={!isEdit}
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
          disabled={!isEdit}
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
            disabled={!isEdit}
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
            disabled={!isEdit}
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
            disabled={!isEdit}
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
  );
};

export default FormUserInformation;
