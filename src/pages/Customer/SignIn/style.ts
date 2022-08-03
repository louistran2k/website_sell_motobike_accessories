import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { textColor2 } from 'themes/HomeTheme';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    'sign-in-container': {
      marginTop: 30,
      backgroundColor: textColor2,
      paddingTop: 24,
      paddingBottom: 24,
      textAlign: 'center',
      boxShadow: theme.shadows[3],

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
        marginTop: 20,
      },
    },
  })
);
