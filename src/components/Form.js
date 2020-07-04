import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { root } from '../config';

const hospitals = [
    { id: 1, name: 'RS Premier Surabaya' },
    { id: 2, name: 'RS Onkologi Surabaya' },
    { id: 3, name: 'RS Univ. Airlangga' },
    { id: 4, name: 'RS Orthopedi & Traumatologi' },
    { id: 5, name: 'RS Mitra Keluarga Kenjeran' },
    { id: 6, name: 'RS Mitra Keluarga Surabaya' },
    { id: 7, name: 'RSAL Surabaya' },
];

const medicines = [
    { id: 1, name: 'Transport of pre-processed blood' },
    { id: 2, name: 'Storage of pre-processed/processed blood' },
    { id: 3, name: 'Transport of processed blood' },
    { id: 4, name: 'Fresh Frozen Plasma' },
    { id: 5, name: 'Oral Polio Virus' },
    { id: 6, name: 'Hib(liquid)' },
    { id: 7, name: 'Rotavirus' },
    { id: 8, name: 'Hepatitis B Vaccine' },
    { id: 9, name: 'Cholera' },
    { id: 10, name: 'RHuman Papillomavirus' },
];

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            medicine: null,
            start: '',
            finish: '',
            destination: null,
            isFinish: false
        }
    }

    componentDidMount() {
        root.ref('/isFinish').on('value', (snap) => {
            console.log(snap.val());
            this.setState({ isFinish: snap.val().bool })
        });
    }

    finishTrack(medicine, destination) {
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const currentDate = date + '-' + month + '-' + year;
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        const second = new Date().getSeconds();
        const finish = hour + ':' + minute + ':' + second;
        const start = this.state.start;
        console.log(medicine)
        console.log(destination)
        console.log(currentDate)
        console.log(finish)
        console.log(start)

        // Push Data to Firebase
        root.ref('/delivery').push({
            medicine,
            destination,
            start,
            finish,
            currentDate
        })

        root.ref('/isFinish').set({
            bool: false,
            medicine: medicine,
            destination: destination,
            start: start,
            finish: finish,
            currentDate: currentDate
        }).then(() => {
            alert('Tracking Selesai');
            this.setState({ medicine: '', destination: '', isFinish: false })
            // this.props.navigation.navigate('Data');
        })

        // this.setState({ medicine: '', destination: '', isFinish: false })
    }

    handleForm(medicine, destination) {
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        const second = new Date().getSeconds();
        const currentTime = hour + ':' + minute + ':' + second;
        console.log(medicine)
        console.log(destination)
        console.log(currentTime)

        root.ref('/isFinish').set({
            bool: true,
            medicine: medicine,
            destination: destination,
            start: currentTime,
            finish: null,
            currentDate: null
        }).then(() => {
            alert('Tracking Dimulai');
            this.setState({ start: currentTime, isFinish: true })
            // this.props.navigation.navigate('Data');
        })

    }

    handleDestination(item) {
        let id = item.id
        let url = '/hospital/' + id
        root.ref(url).on('value', (snap) => {
            let data = snap.val()
            console.log(data)
            this.setState({ destination: data })
        })
    }

    handleMedicine(item) {
        let id = item.id
        let url = '/medicine/' + id
        root.ref(url).on('value', (snap) => {
            let data = snap.val()
            console.log(data)
            this.setState({ medicine: data })
        })
    }

    render() {
        const { medicine, destination, isFinish, start, finish, date } = this.state;
        return (
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps='always'
            >
                {/* Title */}
                <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 20 }}>
                    <Text style={{ fontSize: 28, color: '#000', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: '600' }}>Medicine Information</Text>
                </View>
                <SearchableDropdown
                    onTextChange={text => console.log(text)}
                    // onItemSelect={item => alert(JSON.stringify(item))}
                    // onItemSelect={item => console.log(item)}
                    // onItemSelect={item => this.setState({ medicine: item })}
                    onItemSelect={item => this.handleMedicine(item)}
                    textInputStyle={{
                        borderBottomColor: "#000",
                        marginHorizontal: 16,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        fontSize: 16
                    }}
                    itemStyle={styles.itemStyle}
                    itemTextStyle={{
                        color: '#222',
                        marginHorizontal: 16
                    }}
                    items={medicines}
                    defaultIndex={0}
                    placeholder="Nama Obat"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                />

                <SearchableDropdown
                    onTextChange={text => console.log(text)}
                    // onItemSelect={item => alert(JSON.stringify(item))}
                    // onItemSelect={item => console.log(item)}
                    // onItemSelect={item => this.setState({ destination: item })}
                    onItemSelect={item => this.handleDestination(item)}
                    textInputStyle={{
                        borderBottomColor: "#000",
                        marginHorizontal: 16,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        fontSize: 16
                    }}
                    itemStyle={styles.itemStyle}
                    itemTextStyle={{
                        color: '#222',
                        marginHorizontal: 16
                    }}
                    items={hospitals}
                    defaultIndex={0}
                    placeholder="Tujuan Pengiriman"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                />

                {
                    isFinish ?
                        <TouchableOpacity
                            style={{ fontSize: 16, margin: 17, elevation: 2, backgroundColor: '#92c5c2', borderRadius: 4 }}
                            onPress={() => this.finishTrack(medicine, destination)}
                        >
                            <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: '600', textAlign: 'center', padding: 8 }}>Finish Tracking</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity
                            style={{ fontSize: 16, margin: 17, elevation: 2, backgroundColor: '#2c6d6a', borderRadius: 4 }}
                            onPress={() => this.handleForm(medicine, destination)}
                        >
                            <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: '600', textAlign: 'center', padding: 8 }}>Start Tracking</Text>
                        </TouchableOpacity>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginTop: 40,
        marginBottom: 40,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1,
        color: '#000'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#000",
        fontSize: 10,
        textTransform: "uppercase"
    },
    inputTitleDosen: {
        color: "#000",
        fontSize: 10,
        textTransform: "uppercase",
        marginTop: 24
    },
    textInput: {
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F30",
        marginBottom: 24
    },
    submitBtn: {
        height: 40,
        backgroundColor: "#6861CF",
        borderRadius: 4,
        marginTop: 6,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    submitText: {
        fontFamily: "Montserrat",
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600",
    },
    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#FAF9F8',
        borderColor: '#bbb',
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})


export default Form;