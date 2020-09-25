import React from 'react';
import GoogleMapReact from 'google-map-react';

const Map2 = () => {
    const map = {
        center:{lat:34.397, lng:150.644},
        zoom:0
    }
    return (
        <div style={{width:'80%', height:'550px', margin:'auto', marginTop:'40px'}}>
            <GoogleMapReact
            defaultCenter = {map.center}
            defaultZoom = {map.zoom}
            >

            </GoogleMapReact>
            
        </div>
    );
};

export default Map2;