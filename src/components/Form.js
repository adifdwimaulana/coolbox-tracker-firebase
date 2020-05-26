import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { root } from '../config';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            medicine: '',
            description: '',
            start: '',
            finish: '',
            destination: '',
            temperature: 0,
            isFinish: false
        }
    }

    componentDidMount() {
        root.ref('/isFinish/bool').on('value', (snap) => {
            console.log(snap.val());
            this.setState({ isFinish: snap.val() })
        });
    }

    finishTrack(medicine, description, temperature, destination) {
        const date = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const currentDate = date + '/' + month + '/' + year;
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        const second = new Date().getSeconds();
        const finish = hour + ':' + minute + ':' + second;
        const start = this.state.start;
        console.log(medicine)
        console.log(description)
        console.log(temperature)
        console.log(destination)
        console.log(currentDate)
        console.log(finish)
        console.log(start)

        // Push Data to Firebase
        root.ref('/delivery').push({
            medicine,
            description,
            temperature,
            destination,
            start,
            finish,
            currentDate
        })

        root.ref('/isFinish').set({
            bool: false
        })

        this.setState({ medicine: null, description: null, temperature: null, destination: null })
    }

    handleForm(medicine, description, temperature, destination) {
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        const second = new Date().getSeconds();
        const currentTime = hour + ':' + minute + ':' + second;
        console.log(medicine)
        console.log(description)
        console.log(temperature)
        console.log(destination)
        console.log(currentTime)

        root.ref('/isFinish').set({
            bool: true
        })

        this.setState({ start: currentTime })
    }

    render() {
        const { medicine, description, destination, temperature, isFinish } = this.state;
        return (
            <>
                {/* Title */}
                <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 20 }}>
                    <Text style={{ fontSize: 28, color: '#000', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: '600' }}>Medicine Information</Text>
                </View>
                <TextInput
                    style={{ height: 40, fontSize: 16, margin: 17, borderBottomWidth: 1.5, borderBottomColor: '#2c6d6a' }}
                    name='obat'
                    placeholder="Nama Obat"
                    placeholderTextColor="9a73ef"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({ medicine: text })}
                />

                <TextInput
                    style={{ height: 40, fontSize: 16, margin: 17, borderBottomWidth: 1.5, borderBottomColor: '#2c6d6a' }}
                    name='deskripsi'
                    placeholder="Deskripsi Obat"
                    placeholderTextColor="9a73ef"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({ description: text })}
                />

                <TextInput
                    style={{ height: 40, fontSize: 16, margin: 17, borderBottomWidth: 1.5, borderBottomColor: '#2c6d6a' }}
                    name='suhu'
                    placeholder="Suhu Optimal"
                    placeholderTextColor="9a73ef"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({ temperature: text })}
                />

                <TextInput
                    style={{ height: 40, fontSize: 16, margin: 17, borderBottomWidth: 1.5, borderBottomColor: '#2c6d6a' }}
                    name='tujuan'
                    placeholder="Tujuan Pengiriman"
                    placeholderTextColor="9a73ef"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({ destination: text })}
                />

                {
                    isFinish ?
                        <TouchableOpacity
                            style={{ fontSize: 16, margin: 17, elevation: 2, backgroundColor: '#92c5c2', borderRadius: 4 }}
                            onPress={() => this.finishTrack(medicine, description, temperature, destination)}
                        >
                            <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: '600', textAlign: 'center', padding: 8 }}>Finish Tracking</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity
                            style={{ fontSize: 16, margin: 17, elevation: 2, backgroundColor: '#2c6d6a', borderRadius: 4 }}
                            onPress={() => this.handleForm(medicine, description, temperature, destination)}
                        >
                            <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: '600', textAlign: 'center', padding: 8 }}>Start Tracking</Text>
                        </TouchableOpacity>

                }
            </>
        )
    }
}

export default Form;