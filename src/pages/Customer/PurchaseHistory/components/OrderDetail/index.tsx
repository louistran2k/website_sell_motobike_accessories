import { HighlightOff } from '@mui/icons-material';
import {
  IconButton,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import { convertCurrency } from 'store/Customer/Home/slice';
import { cancelOrderAsync } from 'store/Customer/Home/thunkActions';
import { useCustomerDispatch } from 'store/Customer/hooks';
import { CustomerOrderDTO, ORDER_STATUS } from 'types/Customer/home';
import { useStyles } from '../../style';

type Props = {
  orderDetail: CustomerOrderDTO;
  handleClose: () => void;
};

const OrderDetail = ({ orderDetail, handleClose }: Props) => {
  const classes = useStyles();
  const dispatch = useCustomerDispatch();

  const total = orderDetail.customerOrderDetails.reduce(
    (prev, cur) => prev + cur.totalPrice,
    0
  );

  const handleCancel = async () => {
    dispatch(cancelOrderAsync(orderDetail.id));
  };

  return (
    <>
      <IconButton
        onClick={handleClose}
        className={classes.btnClose}
        style={{ position: 'absolute' }}
      >
        <HighlightOff />
      </IconButton>
      {orderDetail.status === ORDER_STATUS['Chờ xác nhận'] && (
        <Button
          variant="outlined"
          onClick={handleCancel}
          className={classes.btnCancel}
          style={{
            position: 'absolute',
            padding: 'unset',
            textTransform: 'capitalize',
          }}
        >
          Hủy
        </Button>
      )}
      <Typography variant="h4">{`Chi tiết đơn hàng ${orderDetail.id}`}</Typography>
      <Grid container className={classes.customer}>
        <Grid item xs={6}>
          <Typography component="span">{`Trạng thái đơn hàng: `}</Typography>
          {orderDetail.status === ORDER_STATUS['Chờ xác nhận'] && (
            <Chip
              size="small"
              variant="outlined"
              label={ORDER_STATUS[orderDetail.status]}
              color="default"
            />
          )}
          {orderDetail.status === ORDER_STATUS['Đã hủy'] && (
            <Chip
              size="small"
              variant="outlined"
              label={ORDER_STATUS[orderDetail.status]}
              color="error"
            />
          )}
          {orderDetail.status === ORDER_STATUS['Đã giao'] && (
            <Chip
              size="small"
              variant="outlined"
              label={ORDER_STATUS[orderDetail.status]}
              color="success"
            />
          )}
          {orderDetail.status === ORDER_STATUS['Đang giao'] && (
            <Chip
              size="small"
              variant="outlined"
              label={ORDER_STATUS[orderDetail.status]}
              color="info"
            />
          )}
          <Typography>{`Ngày đặt: ${format(
            new Date(orderDetail.createAt),
            'dd-MM-yyyy'
          )}`}</Typography>
          {orderDetail.deliveryDate && (
            <Typography>{`Ngày giao: ${format(
              new Date(orderDetail.deliveryDate),
              'dd-MM-yyyy'
            )}`}</Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          {orderDetail.receiverFullName && (
            <Typography>{`Người nhận: ${orderDetail.receiverFullName}`}</Typography>
          )}
          {orderDetail.receiverPhoneNumber && (
            <Typography>{`Số điện thoại: ${orderDetail.receiverPhoneNumber}`}</Typography>
          )}
          {orderDetail.receiverEmail && (
            <Typography>{`Email: ${orderDetail.receiverEmail}`}</Typography>
          )}
          {orderDetail.deliveryAddress && (
            <Typography>{`Địa chỉ: ${orderDetail.deliveryAddress}`}</Typography>
          )}
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: 'center' }}></TableCell>
            <TableCell style={{ textAlign: 'left' }}>
              <Typography variant="body2">Tên sản phẩm</Typography>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <Typography variant="body2">Số lượng</Typography>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <Typography variant="body2">Đơn giá</Typography>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <Typography variant="body2">Trị giá</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderDetail.customerOrderDetails.length > 0 &&
            orderDetail.customerOrderDetails.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body1">
                    <img
                      className={classes.img}
                      src={item.product.image.split('|')[0]}
                      alt={item.product.name}
                    />
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{item.product.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ textAlign: 'center' }}>
                    {item.orderQuantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ textAlign: 'right' }}>
                    {convertCurrency(item.totalPrice / item.orderQuantity)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ textAlign: 'right' }}>
                    {convertCurrency(item.totalPrice)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell>Thành tiền</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Typography variant="h5" color="primary">
                {convertCurrency(total)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default OrderDetail;
