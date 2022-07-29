import React from 'react'
import spinner from '../../assets/spinner.gif'

import classes from './Loader.module.css'

const Loader = () => {
  return (
    <div className={classes.loader}>
        <img src={spinner} alt='Loading' />
        <h1>Fetching Data</h1>
    </div>
  )
}

export default Loader