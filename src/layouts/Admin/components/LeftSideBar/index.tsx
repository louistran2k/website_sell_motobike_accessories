import { Drawer } from '@mui/material';
import SidebarBody from '../SidebarBody';
import SidebarFooter from '../SidebarFooter';
import SidebarHeader from '../SidebarHeader';
import { useStyles } from '../../style';

const LeftSideBar = () => {
  const classes = useStyles();
  return (
    <Drawer
      PaperProps={{
        elevation: 7,
      }}
      open={true}
      variant="persistent"
      className={classes.sidebar}
    >
      <SidebarHeader />
      <SidebarBody />
      <SidebarFooter />
    </Drawer>
  );
};

export default LeftSideBar;
