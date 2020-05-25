import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { root } from '../config';

class Data extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    };

    componentDidMount() {
        root.ref('/data').on('value', (snap) => {
            console.log(snap.val());
            this.setState({ data: snap.val() })
        });
    };

    render() {
        const { data } = this.state;
        if (data == null) {
            return null;
        }
        return (
            <>
                {/* Title */}
                <View style={{ alignItems: 'flex-start', marginTop: 20, marginLeft: 27 }}>
                    <Text style={{ fontSize: 28, color: '#000', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: 'bold' }}>Data Sensor</Text>
                    <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: '100' }}>Real Time Monitoring Coolbox Tracker</Text>
                </View>
                {/* Ruangan */}
                <View style={{ flexDirection: 'row', marginHorizontal: 17, marginTop: 30 }}>
                    <View style={{ backgroundColor: '#394fe3', height: 165, paddingTop: 8, paddingLeft: 10, borderTopLeftRadius: 7, borderBottomLeftRadius: 7, width: 10, elevation: 6 }}>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <View style={{ backgroundColor: '#0c25c9', height: 45, paddingTop: 8, marginLeft: 2, paddingHorizontal: 10, borderTopRightRadius: 7, elevation: 6 }}>
                            <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingLeft: 8 }}>Ruangan</Text>
                        </View>
                        <View style={{ backgroundColor: '#394fe3', height: 120, marginLeft: 2, flexDirection: 'row', borderBottomRightRadius: 7, elevation: 6 }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{ flex: 1, paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Icon name="thermometer" size={22} color='#fff' />
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}> Suhu</Text>
                                </View>
                                <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'Montserrat', textAlign: 'center', paddingBottom: 25 }}>
                                    {data.roomTemperature} C
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{ flex: 1, paddingTop: 10, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Icon name="cloud" size={22} color='#fff' />
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}> Kelembapan</Text>
                                </View>
                                <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'Montserrat', textAlign: 'center', paddingBottom: 25 }}>
                                    {data.roomHumidity} %
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Compressor */}
                <View style={{ flexDirection: 'row', marginHorizontal: 17, marginTop: 30 }}>
                    <View style={{ backgroundColor: '#bd3787', height: 165, paddingTop: 8, paddingLeft: 10, borderTopLeftRadius: 7, borderBottomLeftRadius: 7, width: 10, elevation: 6 }}>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <View style={{ backgroundColor: '#910f5d', height: 45, paddingTop: 8, marginLeft: 2, paddingHorizontal: 10, borderTopRightRadius: 7, elevation: 6 }}>
                            <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingLeft: 8 }}>Compressor</Text>
                        </View>
                        <View style={{ backgroundColor: '#bd3787', height: 120, marginLeft: 2, flexDirection: 'row', borderBottomRightRadius: 7, elevation: 6 }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{ flex: 1, paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Icon name="thermometer" size={22} color='#fff' />
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}> Suhu</Text>
                                </View>
                                <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'Montserrat', textAlign: 'center', paddingBottom: 25 }}>
                                    {data.tempA} C
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{ flex: 1, paddingTop: 10, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Icon name="fire-extinguisher" size={22} color='#fff' />
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}> Tekanan</Text>
                                </View>
                                <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'Montserrat', textAlign: 'center', paddingBottom: 25 }}>
                                    {data.pressA} Pa
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Condensor */}
                <View style={{ flexDirection: 'row', marginHorizontal: 17, marginTop: 30 }}>
                    <View style={{ backgroundColor: '#42a679', height: 165, paddingTop: 8, paddingLeft: 10, borderTopLeftRadius: 7, borderBottomLeftRadius: 7, width: 10, elevation: 6 }}>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <View style={{ backgroundColor: '#0c633c', height: 45, paddingTop: 8, marginLeft: 2, paddingHorizontal: 10, borderTopRightRadius: 7, elevation: 6 }}>
                            <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingLeft: 8 }}>Condensor</Text>
                        </View>
                        <View style={{ backgroundColor: '#42a679', height: 120, marginLeft: 2, flexDirection: 'row', borderBottomRightRadius: 7, elevation: 6 }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{ flex: 1, paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Icon name="thermometer" size={22} color='#fff' />
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}> Suhu</Text>
                                </View>
                                <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'Montserrat', textAlign: 'center', paddingBottom: 25 }}>
                                    {data.tempB} C
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{ flex: 1, paddingTop: 10, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Icon name="fire-extinguisher" size={22} color='#fff' />
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}> Tekanan</Text>
                                </View>
                                <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'Montserrat', textAlign: 'center', paddingBottom: 25 }}>
                                    {data.pressB} Pa
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Evaporator */}
                <View style={{ flexDirection: 'row', marginHorizontal: 17, marginTop: 30, marginBottom: 40 }}>
                    <View style={{ backgroundColor: '#a75fd4', height: 165, paddingTop: 8, paddingLeft: 10, borderTopLeftRadius: 7, borderBottomLeftRadius: 7, width: 10, elevation: 6 }}>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <View style={{ backgroundColor: '#5d128c', height: 45, paddingTop: 8, marginLeft: 2, paddingHorizontal: 10, borderTopRightRadius: 7, elevation: 6 }}>
                            <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingLeft: 8 }}>Evaporator</Text>
                        </View>
                        <View style={{ backgroundColor: '#a75fd4', height: 120, marginLeft: 2, flexDirection: 'row', borderBottomRightRadius: 7, elevation: 6 }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{ flex: 1, paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Icon name="thermometer" size={22} color='#fff' />
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}> Suhu</Text>
                                </View>
                                <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'Montserrat', textAlign: 'center', paddingBottom: 25 }}>
                                    {data.tempC} C
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{ flex: 1, paddingTop: 10, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Icon name="fire-extinguisher" size={22} color='#fff' />
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}> Tekanan</Text>
                                </View>
                                <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'Montserrat', textAlign: 'center', paddingBottom: 25 }}>
                                    {data.pressC} Pa
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

            </>
        );
    }
};

export default Data;