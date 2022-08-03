import { Button, Container, Divider, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import { Link as RouterLink } from 'react-router-dom';
import ProductItem from 'common/Customer/Components/ProductItem';
import { Product } from 'types/Customer/home';
import { useStyles } from './style';

export type ProductSectionProps = {
  title: string;
  link: string;
  list: Product[];
  handleClickOpen: () => void;
};

const ProductSection = ({
  title,
  link,
  list,
  handleClickOpen,
}: ProductSectionProps) => {
  const classes = useStyles();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: list.length < 5 ? list.length : 5,
    slidesToScroll: 1,
    variableWidth: list.length < 5,
  };

  return (
    <Container component="div" disableGutters className={classes.section}>
      <Grid
        container
        alignItems="center"
        columns={20}
        className={classes.header}
      >
        <Grid item xs={1}>
          <Divider />
        </Grid>
        <Typography variant="h2">{title}</Typography>
        <Divider />
        <RouterLink to={link}>
          <Button variant="contained" color="secondary">
            Xem thêm
          </Button>
        </RouterLink>
      </Grid>
      <Divider />
      <Slider {...settings}>
        {list.map((item: Product, index) => (
          <div key={index} style={{ width: `${list.length < 5 && 20}%` }}>
            <ProductItem product={item} handleClickOpen={handleClickOpen} />
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default ProductSection;
