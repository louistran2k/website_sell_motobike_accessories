import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { textColor2 } from 'themes/HomeTheme';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myInfo: {
      '&>div>div>div': {
        padding: 20,
        position: 'relative',
      },

      '& h4': {
        marginBottom: 15,
      },
    },

    btnEdit: {      
      top: 10,
      right: 10,
    }
  })
);
