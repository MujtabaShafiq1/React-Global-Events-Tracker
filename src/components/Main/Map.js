import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationInfoBox from './LocationInfoBox'
import LocationMarker from './LocationMarker'

import classes from './Map.module.css'
import dark from './mapStyles'

const Map = ({ eventData, center, zoom, singleEvent}) => {

    const [locationInfo, setLocationInfo] = useState(null)
    const markers = eventData.map(ev => {
        return <LocationMarker
            key={ev.id}
            lat={ev.geometries[0].coordinates[1]}
            lng={ev.geometries[0].coordinates[0]}
            id={ev.categories[0].id}
            onClick={() => setLocationInfo(ev)}
        />
    })

    return (
        <div className={classes.map}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_APIKEY }}
                center={singleEvent ? {
                    lat: singleEvent.geometries[0].coordinates[1],
                    lng: singleEvent.geometries[0].coordinates[0]
                    
                } :center}
                zoom={singleEvent ? 10 : zoom}
                options={{ styles: dark }}
            >
                {markers}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 2
}

export default Map