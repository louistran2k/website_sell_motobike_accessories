import { ExitToApp, ExpandMore } from '@mui/icons-material';
import {
  Container,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { LogoImg } from 'assets/images';
import { useStyles } from 'layouts/Admin/style';
import { useState } from 'react';

const SidebarHeader = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    // dispatch(logout());
    // navigate('/');
  };

  return (
    <Container component="header" disableGutters>
      <img src={LogoImg} alt="" />
      <Container disableGutters>
        <Avatar alt="User" />
      </Container>
      <Container disableGutters>
        <Typography variant="body2">{'NV1'}</Typography>
      </Container>
      <Container component="span" maxWidth={false} disableGutters>
        <span onClick={handleClick}>
          <ExpandMore />
        </span>
        <Menu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
      </Container>
    </Container>
  );
};

export default SidebarHeader;
