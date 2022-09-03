import { NoEncryption } from '@mui/icons-material';
import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: '10px 0',
    },

    root: {
      width: 'unset !important',

      '& a': {
        color: theme.palette.common.white,
        transition: '.25s',

        '&:hover': {
          color: theme.palette.action.hover,
        }
      },

      '& p': {
        position: 'relative',
        marginLeft: 20,
        borderLeft: `1px solid ${theme.palette.grey[600]}`,
        paddingLeft: 20,
        paddingRight: 10,
      },
    },
    account: {
      marginLeft: 'auto !important',
      borderLeft: `1px solid ${theme.palette.grey[600]}`,
      borderRight: `1px solid ${theme.palette.grey[600]}`,
      
      '& button': {
        paddingLeft: 10,
        paddingRight: 10,
        color: `${theme.palette.common.white} !important`,
        transition: '.25s',

        '&:hover': {
          color: `${theme.palette.action.hover} !important`,
        },
      }
    },

    list: {
      padding: 'unset !important',

      '& a': {
        color: theme.palette.text.primary,
        textDecoration: 'none',
      }
    }
  })
);
