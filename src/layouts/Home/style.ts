import { makeStyles } from '@mui/styles';

const headerHeight = `${46.5 + 100.25 + 60}px`;
const footerHeight = '389.45px';

export const useStyles = makeStyles({
  main: {
    backgroundColor: '#f7f7f7 !important',
  },
  content: {
    minHeight: `calc(100vh - ${headerHeight} - ${footerHeight} + 30px) !important`,
    marginTop: 20,
  },
});
