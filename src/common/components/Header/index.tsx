import {
  AppBar,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useState, MouseEvent } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useStyles } from './style';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { ParentContainer, useGlobalStyles } from '../../../GlobalStyle';

type Props = {};

function Header({}: Props) {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar color="secondary" className={classes.header} position="static">
      <ParentContainer>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography>WELCOME TO SHARMA ONLINE SHOPPING STORE !</Typography>
          </Grid>
          <Grid item container direction="row" classes={{root: classes.root}} alignItems="center" >
            <Typography>Theo dõi tại:</Typography>
            <Link href="#">
              <FacebookOutlinedIcon />
            </Link>
            <Link href="#">
              <GoogleIcon />
            </Link>
          </Grid>
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
              classes={{list: classes.list}}
            >
              <MenuItem onClick={handleClose}>Đăng ký</MenuItem>
              <MenuItem onClick={handleClose}>Đăng nhập</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </ParentContainer>
    </AppBar>
  );
}

export default Header;
