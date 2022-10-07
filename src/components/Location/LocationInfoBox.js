import { useState, useEffect } from 'react'
import close from '../../assets/x.png'
import { Box, Typography } from '@material-ui/core';
import classes from './Location.module.css'

const LocationInfoBox = ({ info }) => {

    const [hide, setHide] = useState(false)

    useEffect(() => {
        setHide(false)
    }, [info])

    return (
        <>
            {!hide &&
                <Box className={classes.locationinfo}>
                    <Box className={classes.header}>
                        <Typography className={classes.title} variant="h5">Event Location Info</Typography>
                        <img src={close} alt="" className={classes.image} onClick={() => { setHide(true) }} />
                    </Box>
                    <Box sx={{ gap: 2 }}>
                        <Typography variant="h6"><strong>ID: </strong>{info.id}</Typography>
                        <Typography variant="h6"><strong>Title: </strong>{info.title}</Typography>
                    </Box>
                </Box>
            }
        </>
    )

}

export default LocationInfoBox