import {
  Container,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Home,
  Mail,
  Phone,
  Facebook,
  Google,
  YouTube,
} from '@mui/icons-material';
import { useStyles } from './style';
import { LogoFooterImg } from 'assets/images';

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth={false} className={classes.top}>
        <Container disableGutters>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <List>
                <ListItem>
                  <img src={LogoFooterImg} alt="" />
                </ListItem>
                <ListItem>
                  <Typography variant="h6">
                    <Home />
                    72 Làng Tăng Phú, TP Thủ Đức, TP Hồ Chí Minh
                  </Typography>
                </ListItem>
                <ListItem>
                  <Link href="mailto:sharmashop@gmail.com" underline="none">
                    <Typography variant="h6">
                      <Mail />
                      sharmashop@gmail.com
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="tel:+0123456789" underline="none">
                    <Typography variant="h6">
                      <Phone />
                      0123456789
                    </Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" component="h4">
                HỖ TRỢ KHÁCH HÀNG
              </Typography>
              <List disablePadding>
                <ListItem>
                  <Link href="#" underline="none">
                    <Typography variant="h6">Hướng dẫn mua hàng</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="#" underline="none">
                    <Typography variant="h6">Phương thức thanh toán</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="#" underline="none">
                    <Typography variant="h6">Chính sách bảo mật</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="#" underline="none">
                    <Typography variant="h6">Chính sách bảo hành</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="#" underline="none">
                    <Typography variant="h6">Điều khoản sử dụng</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={4} className={classes.follow}>
              <Typography variant="subtitle2" component="h4">
                THEO DỖI TẠI:
              </Typography>
              <List disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <Link href="#" underline="none">
                      <Typography variant="h6">
                        <Facebook />
                      </Typography>
                    </Link>
                  </ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Link href="#" underline="none">
                      <Typography variant="h6">
                        <Google />
                      </Typography>
                    </Link>
                  </ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Link href="#" underline="none">
                      <Typography variant="h6">
                        <YouTube />
                      </Typography>
                    </Link>
                  </ListItemIcon>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Container maxWidth={false} className={classes.bottom}>
        <Typography variant="h6">
          Copyright ©2022 Sharma. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
