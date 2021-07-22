import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { APIKEY } from '../../shared/_helpers/utils';
import LocationPin from './LocationPin'

export class Map extends Component {
    
    render() {
        const location = {
            address: '1600 Amphitheatre Parkway, Mountain View, california.',
            lat: 37.42216,
            lng: -122.08427,
          }
        const zoomLevel = 11
        return (
            <div>
                <GoogleMapReact
        bootstrapURLKeys={{ key: APIKEY }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
            </div>
        )
    }
}

export default Map
