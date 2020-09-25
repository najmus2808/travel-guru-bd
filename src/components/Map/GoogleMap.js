import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
const mapStyles = {
  width: '75%',
  height: '75%'
};
export class GoogleMap extends Component {

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                {
                    lat: 21.4272,
                    lng: 92.0058
                }
                }
            />
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyAUhPL53_Y1o8spujNKkeOxRXqaw2ywsa4")
  })(GoogleMap)