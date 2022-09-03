import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useStyles } from './style';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { ParentContainer, useGlobalStyles } from 'GlobalStyle';
import { useCustomerDispatch, useCustomerSelector } from 'store/Customer/hooks';
import { getUser } from 'store/Customer/selectors';
import { logout } from 'store/Customer/Home/slice';
import { Logout, MoreVert } from '@mui/icons-material';

type Props = {};

function Header({}: Props) {
  const classes = useStyles();
  const user = useCustomerSelector(getUser);
  const dispatch = useCustomerDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(0);
  };

  return (
    <AppBar color="secondary" className={classes.header} position="static">
      <ParentContainer>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography>WELCOME TO SHARMA ONLINE SHOPPING STORE!</Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            classes={{ root: classes.root }}
            alignItems="center"
          >
            <Typography>Theo dõi tại:</Typography>
            <Link href="https://www.facebook.com/profile.php?id=100007828847430">
              <FacebookOutlinedIcon />
            </Link>
            <Link href="https://www.google.com">
              <GoogleIcon />
            </Link>
          </Grid>
          {user.citizenIdentification ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 'auto',
              }}
            >
              <Avatar style={{ width: '30px', height: '30px' }}>
                {user.lastName.substring(0, 1)}
              </Avatar>
              <Typography
                style={{ marginLeft: 10 }}
              >{`${user.firstName} ${user.lastName}`}</Typography>
              <span onClick={handleClick}>
                <MoreVert />
              </span>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleLogout}>
                  <Logout />
                  Đăng xuất
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Grid item className={classes.account}>
              <Button
                onClick={handleClick}
                startIcon={<PersonIcon />}
                endIcon={<KeyboardArrowDownOutlinedIcon />}
              >
                Tài khoản
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                classes={{ list: classes.list }}
              >
                <MenuItem onClick={handleClose}>
                  <RouterLink to="/sign-up">Đăng ký</RouterLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <RouterLink to="/sign-in">Đăng nhập</RouterLink>
                </MenuItem>
              </Menu>
            </Grid>
          )}
        </Grid>
      </ParentContainer>
    </AppBar>
  );
}

export default Header;
