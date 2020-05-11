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
                <GooglePlacesAutocomplete
                    style={{ flex: 1 }}
                    placeholder='Enter Location'
                    minLength={2}
                    autoFocus={false}
                    fetchDetails
                    listViewDisplayed='auto'
                    query={{
                        key: 'AIzaSyDf8UOiJrm6eJVdZ3ZMJdKqczzrcC9jqms',
                        language: 'en',
                        types: 'geocode',
                    }}
                    currentLocation={false}
                    onPress={(data, details = null) => {
                        const region = {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.00922 * 1.5,
                            longitudeDelta: 0.00421 * 1.5
                        };
                        this.onRegionChange(region, region.latitude, region.longitude);
                    }}
                />
                <MapView
                    style={{ flex: 1, width: window.width }}
                    region={this.state.mapRegion}
                    onRegionChange={(regions) => {
                        this.setState({
                            mapRegion: regions
                        });
                    }}
                    onPress={(e) => {
                        const region = {
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude,
                            latitudeDelta: 0.00922 * 1.5,
                            longitudeDelta: 0.00421 * 1.5
                        }
                        this.onRegionChange(region, region.latitude, region.longitude);
                    }}
                >
                    {/* <MapView.Marker
                        coordinate={{
                            latitude: (this.state.latitude),
                            longitude: (this.state.longitude),
                        }}
                        title="Lokasi"
                        description="Hello"
                    /> */}
                </MapView>
            </>
        );
    };
};

export default Map;