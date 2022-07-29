import React, { useState, useEffect } from 'react'
import close from '../../assets/x.png'
import classes from './Location.module.css'

const LocationInfoBox = ({ info }) => {

    const [hide, setHide] = useState(false)

    useEffect(() => {
        setHide(false)
    }, [info])

    return (
        <>
            {hide ?
                null
                :
                <div className={classes.locationinfo}>
                    <div className={classes.header}>
                        <h2 className={classes.title}>Event Location Info</h2>
                        <img src={close} alt="" className={classes.image} onClick={() => { setHide(!hide) }} />
                    </div>
                    <ul>
                        <li>ID: <strong>{info.id}</strong></li>
                        <li>Title: <strong>{info.title}</strong></li>
                    </ul>
                </div>
            }
        </>
    )

}

export default LocationInfoBox