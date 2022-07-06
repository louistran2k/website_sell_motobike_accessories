import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const ParentContainer = styled(Container)`
  width: 1200px;
  padding: unset !important;
`

export const useGlobalStyles = makeStyles({
  container: {
    width: '1200px'
  }
});
