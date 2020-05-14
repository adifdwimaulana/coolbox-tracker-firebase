import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            latitude: null,
            longitude: null
        };
    }

    onRegionChange(region, latitude, longitude) {
        this.setState({
            mapRegion: region,
            // If there are no new values set the current ones
            latitude: latitude || this.state.latitude,
            longitude: longitude || this.state.longitude
        });
    }

    render() {
        return (
            <>
                <MapView
                    style={{ flex: 1, width: window.width }}
                    region={this.state.mapRegion}
                    onRegionChange={(regions) => {
                        this.setState({
                            mapRegion: regions
                        });
                    }}
                />
            </>
        );
    };
};

export default Map;