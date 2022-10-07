import spinner from '../../assets/spinner.gif'
import classes from './Loader.module.css'
import { Box } from '@material-ui/core';

const Loader = () => {
  return (
    <Box className={classes.loader}>
      <Box component="img" src={spinner} alt='Loading' />
    </Box>
  )
}

export default Loader