import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    block: {
      padding: '15px 0',

      '& input': {
        padding: '12px 12px 12px 0',
      }
    },
    search: {
      backgroundColor: theme.palette.text.secondary,
      overflow: 'hidden',
    },
    cart: {
      textAlign: 'right',
      '&>div': {
        display: 'inline-block !important',
        position: 'relative',
        width: 'unset !important',
        marginRight: 20,
        cursor: 'pointer',

        '& svg': {
          fontSize: 35,
          color: theme.palette.text.secondary,
        },

        '& span': {
          display: 'inline-block',
          width: 20,
          height: 20,
          borderRadius: 10,
          lineHeight: '20px',
          textAlign: 'center',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          position: 'absolute',
          top: -6,
          right: -8,
        },
      },
    },
  })
);
