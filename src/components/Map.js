import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { root } from '../config';

const API_KEY = 'AIzaSyDf8UOiJrm6eJVdZ3ZMJdKqczzrcC9jqms'

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            destination: null,
            origin: null,
            region: null,
            showDestination: false,
            showDirection: false
        };
    }

    componentDidMount() {
        root.ref('/location').on('value', (snap) => {
            console.log(snap.val());
            let data = snap.val()
            const currentOrigin = {
                latitude: data.latitude,
                longitude: data.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }

            const currentCoordinate = {
                latitude: data.latitude,
                longitude: data.longitude
            }

            const origin = Object.create(currentOrigin)
            const coordinate = Object.create(currentCoordinate)

            this.setState({ region: origin, origin: coordinate })
        });

        root.ref('/isFinish').on('value', (snap) => {
            let data = snap.val()
            if (data.bool == false) {
                this.setState({ showDestination: false, showDirection: false })
            } else {
                let latitude = data.destination.lat
                let longitude = data.destination.long
                const coordinate = {
                    latitude,
                    longitude
                }

                const destination = Object.create(coordinate)

                this.setState({ destination: destination, showDestination: true, showDirection: true })
            }
        })
    }

    render() {
        const { region, origin, destination, showDestination, showDirection } = this.state;
        if (origin == null) {
            return null;
        }
        return (
            <>

                <MapView
                    region={region}
                    // onRegionChange={this.onChane(region)}
                    style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
                >
                    <Marker
                        coordinate={origin}
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
                                coordinate={destination}
                                title={"Tujuan Anda"}
                            >

                            </Marker> : null
                    }
                    {
                        showDirection ?
                            <MapViewDirections
                                origin={origin}
                                destination={destination}
                                apikey={API_KEY}
                                strokeWidth={3}
                                strokeColor="hotpink"
                            /> : null}
                </MapView>
            </>
        );
    };
};

export default Map;