import { textColor2 } from './../../../../themes/HomeTheme';
import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    block: {
      padding: '8px 0',

      '& input': {
        padding: '12px 12px 12px 0',
      },
    },
    search: {
      backgroundColor: textColor2,
      overflow: 'hidden',

      '&.MuiFormControl-root': {
        marginBottom: 'unset !important',
        position: 'unset !important',
      },
    },
    cart: {
      textAlign: 'right',
      paddingRight: 20,

      '& svg': {
        fontSize: 35,
        color: textColor2,
      },
    },
  })
);
