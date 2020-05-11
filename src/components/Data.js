import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC8divwtzjft2A6ft4RHooGAQfMSn-WXGQ",
    authDomain: "coolbox-tracker.firebaseapp.com",
    databaseURL: "https://coolbox-tracker.firebaseio.com",
    projectId: "coolbox-tracker",
    storageBucket: "coolbox-tracker.appspot.com",
    messagingSenderId: "609155444075",
    appId: "1:609155444075:web:0a3125d41ae0bb56cdb02e",
    measurementId: "G-SP2Z296Q0K"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

const root = firebase.database();

class Data extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    };

    componentDidMount() {
        root.ref('/').on('value', (snap) => {
            console.log(snap.val());
            this.setState({ data: snap.val() })
        });
    };

    render() {
        const { data } = this.state;
        if (this.state.data == null) {
            return null;
        }
        return (
            <>
                {/* Title */}
                <View style={{ alignItems: 'center', paddingTop: 8 }}>
                    <Text style={{ fontSize: 24, color: '#000', fontFamily: 'Montserrat', textAlign: 'center', letterSpacing: 0.8 }}>Real Time Monitoring Coolbox Tracker</Text>
                </View>
                {/* Ruangan */}
                <View style={{ backgroundColor: '#0c25c9', height: 45, paddingTop: 8, marginTop: 20, marginHorizontal: 17, paddingHorizontal: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                    <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8 }}>Ruangan</Text>
                </View>
                <View style={{ backgroundColor: '#394fe3', height: 120, marginHorizontal: 17, flexDirection: 'row' }}>
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
                {/* Compressor */}
                <View style={{ backgroundColor: '#910f5d', height: 45, paddingTop: 8, marginTop: 20, marginHorizontal: 17, paddingHorizontal: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                    <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8 }}>Compressor</Text>
                </View>
                <View style={{ backgroundColor: '#bd3787', height: 120, marginHorizontal: 17, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 1, paddingTop: 10, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
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
                {/* Condensor */}
                <View style={{ backgroundColor: '#0c633c', height: 45, paddingTop: 8, marginTop: 20, marginHorizontal: 17, paddingHorizontal: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                    <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8 }}>Condensor</Text>
                </View>
                <View style={{ backgroundColor: '#42a679', height: 120, marginHorizontal: 17, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 1, paddingTop: 10, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
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
                {/* Evaporator */}
                <View style={{ backgroundColor: '#5d128c', height: 45, paddingTop: 8, marginTop: 20, marginHorizontal: 17, paddingHorizontal: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                    <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8 }}>Evaporator</Text>
                </View>
                <View style={{ backgroundColor: '#a75fd4', height: 120, marginHorizontal: 17, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 1, paddingTop: 10, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
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
                <View style={{ marginVertical: 20, marginHorizontal: 17 }}>
                    <Text style={{ fontSize: 20, color: '#000', fontFamily: 'Montserrat', letterSpacing: 1.8 }}>Set Room Temperature</Text>
                    <TextInput style={{
                        marginTop: 15,
                        height: 40,
                        borderColor: '#7a42f4',
                        borderWidth: 1,
                        borderRadius: 12
                    }}
                        underlineColorAndroid="transparent"
                        placeholder="Set Temperature"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handleEmail} />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#7a42f4',
                                padding: 10,
                                marginTop: 6,
                                height: 40,
                                width: 150,
                                borderRadius: 20,
                            }}
                            onPress={
                                () => this.login(this.state.email, this.state.password)
                            }>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}> SET </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }
};

export default Data;