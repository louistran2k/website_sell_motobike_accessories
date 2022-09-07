import { Visibility } from '@mui/icons-material';
import {
  Chip,
  Container,
  Dialog,
  IconButton,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import {
  convertCurrency,
  setIsShowPurchaseDetail,
} from 'store/Customer/Home/slice';
import { getMyOrdersAsync } from 'store/Customer/Home/thunkActions';
import { useCustomerDispatch, useCustomerSelector } from 'store/Customer/hooks';
import {
  getMyOrders,
  getOrderId,
  getUser,
  isShowPurchaseDetail,
} from 'store/Customer/selectors';
import { CustomerOrderDTO, ORDER_STATUS } from 'types/Customer/home';
import OrderDetail from './components/OrderDetail';
import { useStyles } from './style';

const RenderRow = (props: ListChildComponentProps) => {
  const { index, style, data } = props;

  const item: CustomerOrderDTO = data[index];

  const dispatch = useCustomerDispatch();

  const handleViewDetail = () => {
    dispatch(setIsShowPurchaseDetail(item.id));
  };

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <Typography variant="body1" style={{ width: '18%', textAlign: 'center' }}>
        {item.id}
      </Typography>
      <Typography variant="body1" style={{ width: '18%', textAlign: 'center' }}>
        {format(new Date(item.createAt), 'dd-MM-yyyy')}
      </Typography>
      {item.deliveryDate && (
        <Typography
          variant="body1"
          style={{ width: '18%', textAlign: 'center' }}
        >
          {format(new Date(item.deliveryDate), 'dd-MM-yyyy')}
        </Typography>
      )}
      <div style={{ width: '18%', textAlign: 'center', fontWeight: 600 }}>
        {item.status === ORDER_STATUS['Chờ xác nhận'] && (
          <Chip label={ORDER_STATUS[item.status]} color="default" />
        )}
        {item.status === ORDER_STATUS['Đã hủy'] && (
          <Chip label={ORDER_STATUS[item.status]} color="error" />
        )}
        {item.status === ORDER_STATUS['Đã giao'] && (
          <Chip label={ORDER_STATUS[item.status]} color="success" />
        )}
        {item.status === ORDER_STATUS['Đang giao'] && (
          <Chip label={ORDER_STATUS[item.status]} color="info" />
        )}
      </div>
      <Typography variant="body1" style={{ width: '18%', textAlign: 'center' }}>
        {convertCurrency(item.totalPrice)}
      </Typography>
      <Typography variant="body1" style={{ width: '10%', textAlign: 'center' }}>
        <IconButton onClick={handleViewDetail}>
          <Tooltip title="Xem chi tiết đơn hàng">
            <Visibility style={{ color: 'var(--primary-color)' }} />
          </Tooltip>
        </IconButton>
      </Typography>
    </ListItem>
  );
};

const PurchaseHistory = () => {
  const classes = useStyles();
  const dispatch = useCustomerDispatch();
  const user = useCustomerSelector(getUser);
  const myOrders = useCustomerSelector(getMyOrders);
  const showPurchaseDetail = useCustomerSelector(isShowPurchaseDetail);
  const orderId = useCustomerSelector(getOrderId);
  const [filter, setFilter] = useState(-1);

  useEffect(() => {
    dispatch(
      getMyOrdersAsync({
        citizenIdentification: user.citizenIdentification,
        status: filter,
      })
    );
  }, [filter]);

  const orderDetail = useMemo(
    () => myOrders.find((item) => item.id === orderId),
    [orderId]
  );

  const handleFilter = (e: SelectChangeEvent) => {
    setFilter(Number(e.target.value));
  };

  const handleClose = () => {
    dispatch(setIsShowPurchaseDetail(-1));
  };

  return (
    <>
      <Container className="content-block">
        <Container>
          <Typography variant="h4" component="span">
            Lịch sử mua hàng
          </Typography>
          <Select
            value={filter.toString()}
            onChange={handleFilter}
            style={{ minWidth: 200, float: 'right' }}
          >
            <MenuItem value={-1}>Tất cả</MenuItem>
            {Object.values(ORDER_STATUS)
              .filter((item) => typeof item !== 'number')
              .map((item: any) => (
                <MenuItem key={ORDER_STATUS[item]} value={ORDER_STATUS[item]}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </Container>
        <Table style={{ width: 'calc(100% - 17px)' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '18%', textAlign: 'center' }}>
                <Typography variant="body2">Mã đơn hàng</Typography>
              </TableCell>
              <TableCell style={{ width: '18%', textAlign: 'center' }}>
                <Typography variant="body2">Ngày đặt</Typography>
              </TableCell>
              <TableCell style={{ width: '18%', textAlign: 'center' }}>
                <Typography variant="body2">Ngày giao</Typography>
              </TableCell>
              <TableCell style={{ width: '18%', textAlign: 'center' }}>
                <Typography variant="body2">Trạng thái</Typography>
              </TableCell>
              <TableCell style={{ width: '18%', textAlign: 'center' }}>
                <Typography variant="body2">Tổng tiền</Typography>
              </TableCell>
              <TableCell
                style={{ width: '10%', textAlign: 'center' }}
              ></TableCell>
            </TableRow>
          </TableHead>
        </Table>
        {myOrders.length !== 0 && (
          <FixedSizeList
            height={300}
            width={360}
            itemSize={46}
            itemCount={myOrders.length}
            overscanCount={5}
            itemData={myOrders}
            style={{
              width: '100%',
            }}
          >
            {RenderRow}
          </FixedSizeList>
        )}
      </Container>
      {showPurchaseDetail && (
        <Dialog
          open={showPurchaseDetail}
          onClose={handleClose}
          className={classes.detail}
        >
          {orderDetail && (
            <OrderDetail orderDetail={orderDetail} handleClose={handleClose} />
          )}
        </Dialog>
      )}
    </>
  );
};

export default PurchaseHistory;
