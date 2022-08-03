import loadingGif from 'assets/images/loading.gif';
import { useStyles } from './style';

function Loading(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <img src={loadingGif} alt="loading" className={classes.loading__gif} />
    </div>
  );
}

export default Loading;
