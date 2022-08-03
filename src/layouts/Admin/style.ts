import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  sidebar: {
    '&>div': {
      width: 250,
      overflowX: 'hidden',
    },
  },
  admin: {
    maxWidth: 2000,
    height: '100vh',
  },
  content: {
    margin: 25,
    marginLeft: 275,
    minHeight: 'calc(100vh - 25px - 25px)',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px 2px rgba(0,0,0,0.2)',
  },
});
