import { Icon } from '@iconify/react'
import LocationIcon from '@iconify/icons-mdi/map-marker'
import { AppBar, Toolbar, Box, Typography } from '@material-ui/core';

const Header = () => {
    return (

        <AppBar position="static">
            <Toolbar style={{ backgroundColor: "red", display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                    <Icon icon={LocationIcon} />
                    <Typography variant="h5">Event Tracker (powered by NASA)</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header