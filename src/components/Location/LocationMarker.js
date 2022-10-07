import { Icon } from '@iconify/react'
import FireIcon from '@iconify/icons-noto-v1/fire'
import VolcanoIcon from '@iconify/icons-noto-v1/volcano'
import StormIcon from '@iconify/icons-noto-v1/cloud-with-lightning-and-rain'
import SnowFlakeIcon from '@iconify/icons-noto-v1/snowflake'
import { Box } from '@material-ui/core';

const LocationMarker = ({ id, onClick }) => {
  return (
    <Box sx={{ fontSize: "2rem" }} onClick={onClick}>
      {id === 8 && <Icon icon={FireIcon} className='location-icon' />}
      {id === 10 && <Icon icon={StormIcon} className='location-icon' />}
      {id === 12 && <Icon icon={VolcanoIcon} className='location-icon' />}
      {id === 15 && <Icon icon={SnowFlakeIcon} className='location-icon' />}
    </Box>
  )
}

export default LocationMarker;