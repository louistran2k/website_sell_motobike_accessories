import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { textColor2 } from 'themes/HomeTheme';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    'sign-up-container': {
      marginTop: 30,
      backgroundColor: textColor2,
      paddingTop: 24,
      paddingBottom: 24,
      boxShadow: theme.shadows[3],

      '& h4': {
        margin: '10px 0',
      },

      '& .MuiFormControl-root': {
        marginBottom: 40,
        position: 'relative',

        '& p': {
          position: 'absolute',
          left: 0,
          bottom: -25,
          margin: 'unset',
        },
      },

      '& form': {
        position: 'relative',
        paddingBottom: 37,

        '&>button': {
          position: 'absolute',
          bottom: 0,
          right: 0,
        },
      },
    },
  })
);
