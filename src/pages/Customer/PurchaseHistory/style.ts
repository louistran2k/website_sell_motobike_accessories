import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  container: {
    backgroundColor: '#fff',
    padding: '20px 0',
    boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.15)',
  },
  detail: {
    overflowY: 'auto',
    postion: 'relative',
    '& > div > div': {
      width: 888,
      height: 550,
      maxWidth: 'unset !important',
      padding: 20,
    },

    '& td': {
      padding: '4px 8px !important',
    },
  },
  customer: {
    marginTop: 10,
  },
  btnClose: {
    top: 20,
    right: 20,
  },
  img: {
    width: 50,
    height: 50,
    objectFit: 'cover',
  },
  btnCancel: {
    position: 'absolute',
    top: 26,
    right: 64,
  },
});
