import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      marginTop: 70,
    },
    top: {
      backgroundColor: theme.palette.secondary.main,
      paddingBottom: 20,

      '& a': {
        '&:hover': {
          '& h6': {
            color: theme.palette.primary.main,
          },
        },
      },

      '& h6': {
        display: 'flex',
        alignItem: 'center',
        transition: '0.25s',
      },

      '& svg': {
        marginRight: 20
      }
    },
    bottom: {
      textAlign: 'center',
      backgroundColor: theme.palette.secondary.dark,
      padding: '15px 0',
    },
    follow: {
      '& li': {
        display: 'inline-block',
        width: 'unset !important',
      }
    }
  })
);
