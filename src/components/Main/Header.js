import { Icon } from '@iconify/react'
import LocationIcon from '@iconify/icons-mdi/map-marker'

import classes from './Header.module.css'

const Header = () => {
    return (
        <header className={classes.header}>
            <h1><Icon icon={LocationIcon} />
                Event Tracker (powered by NASA)
            </h1>
        </header>
    )
}

export default Header