import LeftSideBar from './components/LeftSideBar';
import { useStyles } from './style';

type Props = {
  children: JSX.Element;
};

const AdminLayout = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.admin}>
      <LeftSideBar />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default AdminLayout;
