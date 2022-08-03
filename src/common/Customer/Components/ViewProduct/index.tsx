import { Button, Container, Dialog, Grid, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import Slider from 'react-slick';
import {
  CheckCircle,
  HighlightOff,
  AddCircleOutline,
} from '@mui/icons-material';
import { CartItemType, Product } from 'types/Customer/home';
import viewProductStyles from './style.module.scss';
import { useCustomerDispatch } from 'store/Customer/hooks';
import { addToCart, convertCurrency } from 'store/Customer/Home/slice';
import QuantityInput from '../QuantityInput';

type Props = {
  product: Product;
  open: boolean;
  handleClose: () => void;
};

const ViewProduct = ({ product, open, handleClose }: Props) => {
  const [quantity, setQuantity] = useState(product.quantityInStock > 0 ? 1 : 0);
  const dispatch = useCustomerDispatch();

  useEffect(() => {
    setQuantity(product.quantityInStock > 0 ? 1 : 0);
    return () => {};
  }, [product]);

  const settings = {
    customPaging: function (i: number) {
      return <img src={product.images[i]} />;
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleIncrease = () => {
    if (quantity < product.quantityInStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > product.quantityInStock) {
      setQuantity(product.quantityInStock);
    } else {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItemType = {
      product,
      quantity,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={viewProductStyles['dialog']}
    >
      <div>
        <div className={viewProductStyles['slider']}>
          <Slider {...settings}>
            {product.images.map((item, index) => (
              <Container
                key={index}
                className={viewProductStyles['image']}
                disableGutters
              >
                <img src={item} alt={product.productName} />
              </Container>
            ))}
          </Slider>
        </div>
        <div className={viewProductStyles['description']}>
          <Typography variant="h4">{product.productName}</Typography>
          <Typography variant="body1" component="span">
            Hãng sản xuất:{' '}
          </Typography>
          <Typography variant="body2" component="span">
            {product.manufacturerName}
          </Typography>
          <br />
          <Typography>{product.description}</Typography>
          <br />
          <Typography component="span">Giá: </Typography>
          <span
            className={`${
              !!product.discountPercent && 'line-through'
            } product__price`}
          >
            {convertCurrency(product.price)}
          </span>
          <span> </span>
          {!!product.discountPercent && (
            <span className="product__price">
              {convertCurrency(product.discountPrice)}
            </span>
          )}
          <Typography
            component="span"
            variant="body1"
            style={{ marginLeft: 10 }}
          >
            Đơn vị:{' '}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            style={{ marginRight: 10 }}
          >
            {product.unit}
          </Typography>
          {!!product.quantityInStock ? (
            <Button
              startIcon={<CheckCircle />}
              color="success"
              variant="text"
              disableFocusRipple
              disableElevation
              disableRipple
              disableTouchRipple
            >
              Còn hàng
            </Button>
          ) : (
            <Button
              startIcon={<HighlightOff />}
              color="error"
              variant="text"
              disableFocusRipple
              disableElevation
              disableRipple
              disableTouchRipple
            >
              Hết hàng
            </Button>
          )}
          <div>
            <Typography variant="body1">Số lượng:</Typography>
            <QuantityInput
              quantity={quantity}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
              handleChangeQuantity={handleChangeQuantity}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutline />}
              style={{ marginLeft: 20 }}
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewProduct;
