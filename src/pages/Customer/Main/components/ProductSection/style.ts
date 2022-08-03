import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      backgroundColor: '#fff',
      margin: '20px 0',
      boxShadow: theme.shadows[3],
    },
    header: {
      padding: 10,

      '&>hr': {
        flex: 1,
        marginRight: 10,
      },

      '& hr': {
        height: 2,
        backgroundColor: `${theme.palette.text.primary} !important`,
      },

      '& h2': {
        margin: '0 10px',
      },

      '& a': {
        textDecoration: 'none',
      }
    },
  })
);
