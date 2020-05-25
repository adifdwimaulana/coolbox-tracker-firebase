import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { root } from '../config';

const API_KEY = 'AIzaSyDf8UOiJrm6eJVdZ3ZMJdKqczzrcC9jqms'

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            destination: null,
            showDestination: false,
            showDirection: false
        };
    }

    componentDidMount() {
        root.ref('/location').on('value', (snap) => {
            console.log(snap.val());
            this.setState({
                data: snap.val()
            })
        });
    }

    onRegionChange(region) {
        this.setState({
            destination: region,
            showDestination: true,
            showDirection: true
        })
    }

    render() {
        const { data, destination, showDestination, showDirection } = this.state;
        if (data == null) {
            return null;
        }
        return (
            <>

                <MapView
                    region={{
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.045,
                        longitudeDelta: 0.045
                    }}
                    // onRegionChange={{
                    //     latitude: data.latitude,
                    //     longitude: data.longitude,
                    //     latitudeDelta: 0.045,
                    //     longitudeDelta: 0.045
                    // }}
                    // onRegionChange={this.onChane(region)}
                    style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
                >
                    <Marker
                        coordinate={{
                            latitude: data.latitude,
                            longitude: data.longitude
                        }}
                        title={"Tracker"}
                        description={"Cool Box Current Location"}
                    >
                        <Image
                            source={require('../../assets/coolbox-icon.png')}
                            style={{ height: 25, width: 25 }}
                        />
                    </Marker>
                    {
                        showDestination ?
                            <Marker
                                coordinate={{
                                    latitude: destination.latitude,
                                    longitude: destination.longitude,
                                }}
                                title={"Tujuan Anda"}
                            >

                            </Marker> : null
                    }
                    {
                        showDirection ?
                            <MapViewDirections
                                origin={{
                                    latitude: data.latitude,
                                    longitude: data.longitude
                                }}
                                destination={{
                                    latitude: destination.latitude,
                                    longitude: destination.longitude,
                                }}
                                apikey={API_KEY}
                                strokeWidth={3}
                                strokeColor="hotpink"
                            /> : null}
                </MapView>
                <GooglePlacesAutocomplete
                    placeholder='Lokasi Tujuan'
                    minLength={2}
                    autoFocus={false}
                    fetchDetails
                    listViewDisplayed='auto'
                    query={{
                        key: API_KEY,
                        language: 'id',
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
                        this.onRegionChange(region);
                    }}
                />
            </>
        );
    };
};

export default Map;