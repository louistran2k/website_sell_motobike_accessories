import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  item: {
    padding: '30px 0',

    '&>div': {
      flex: 1,
    },
    '&>img': {
      width: 40,
      objectFit: 'contain',
    }
  }
}));
