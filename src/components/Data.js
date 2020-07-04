import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { root } from '../config';

const dayArr = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
const monthArr = ["Januari", "Februari", "Maret", "Apri", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]

const day = new Date().getDay();
const currentDay = dayArr[day];
const date = new Date().getDate();
const month = new Date().getMonth();
const currentMonth = monthArr[month];
const year = new Date().getFullYear();
const currentDate = date + '-' + month + '-' + year;

const sensors = [
    { id: 1, name: 'Ruangan' },
    { id: 2, name: 'Compressor' },
    { id: 3, name: 'Condensor' },
    { id: 4, name: 'Evaporator' },
];

class Data extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            data: null,
            ruangan: false,
            condensor: false,
            compressor: false,
            evaporator: false
        };
    };

    componentDidMount() {
        root.ref('/data').on('value', (snap) => {
            console.log(snap.val());
            this.setState({ data: snap.val() })
        });

        root.ref('/isFinish').on('value', (snap) => {
            let data = snap.val()
            let bool = data.bool
            if (bool == true) {
                this.setState({ info: data })
            } else {
                this.setState({ info: null })
            }

        })

    };

    handleSensor(item) {
        console.log(item)
        let id = item.id
        if (id == 1) {
            this.setState({ ruangan: true, condensor: false, compressor: false, evaporator: false })
        } else if (id == 2) {
            this.setState({ ruangan: false, condensor: false, compressor: true, evaporator: false })
        } else if (id == 3) {
            this.setState({ ruangan: false, condensor: false, compressor: false, evaporator: false })
        } else if (id == 4) {
            this.setState({ ruangan: fasle, condensor: false, compressor: false, evaporator: true })
        }
    }

    render() {
        const { data, ruangan, compressor, condensor, evaporator, info } = this.state;
        if (data == null) {
            return null;
        }
        return (
            <>
                {/* Title */}
                <View style={{ alignItems: 'flex-start', marginTop: 20, marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 28, color: '#000', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: 'bold' }}>Data Sensor</Text>
                    <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: '100', marginTop: 2 }}>Real Time Monitoring Coolbox Tracker</Text>
                    <Text style={{ fontSize: 12, color: '#000', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: '100', marginTop: 4 }}>{currentDay}, {date} {currentMonth} {year}</Text>
                </View>
                <SearchableDropdown
                    onTextChange={text => console.log(text)}
                    // onItemSelect={item => alert(JSON.stringify(item))}
                    // onItemSelect={item => console.log(item)}
                    // onItemSelect={item => this.setState({ medicine: item })}
                    onItemSelect={item => this.handleSensor(item)}
                    textInputStyle={{
                        borderBottomColor: "#000",
                        marginHorizontal: 20,
                        marginTop: 12,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        fontSize: 15
                    }}
                    itemStyle={styles.itemStyle}
                    itemTextStyle={{
                        color: '#222',
                        marginHorizontal: 16
                    }}
                    items={sensors}
                    defaultIndex={0}
                    placeholder="Pilih Lokasi Sensor"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                />

                {
                    ruangan ?
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
                        </View> : compressor ? <View style={{ flexDirection: 'row', marginHorizontal: 17, marginTop: 30 }}>
                            <View style={{ backgroundColor: '#bd3787', height: 165, paddingTop: 8, paddingLeft: 10, borderTopLeftRadius: 7, borderBottomLeftRadius: 7, width: 10, elevation: 6 }}>
                            </View>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ backgroundColor: '#910f5d', height: 45, paddingTop: 8, marginLeft: 2, paddingHorizontal: 10, borderTopRightRadius: 7, elevation: 6 }}>
                                    <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingLeft: 8 }}>Compressor</Text>
                                </View>
                                <View style={{ backgroundColor: '#bd3787', height: 120, marginLeft: 2, flexDirection: 'row', borderBottomRightRadius: 7, elevation: 6, justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name="thermometer" size={24} color='#fff' />
                                            <Text style={{ fontSize: 24, color: '#fff', fontFamily: 'Montserrat', marginRight: 15 }}> Suhu</Text>
                                        </View>
                                        <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'Montserrat', textAlign: 'center', fontWeight: '700', marginLeft: 15 }}>
                                            {data.tempA} C
                                </Text>
                                    </View>
                                </View>
                            </View>
                        </View> : condensor ? <View style={{ flexDirection: 'row', marginHorizontal: 17, marginTop: 30 }}>
                            <View style={{ backgroundColor: '#42a679', height: 165, paddingTop: 8, paddingLeft: 10, borderTopLeftRadius: 7, borderBottomLeftRadius: 7, width: 10, elevation: 6 }}>
                            </View>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ backgroundColor: '#0c633c', height: 45, paddingTop: 8, marginLeft: 2, paddingHorizontal: 10, borderTopRightRadius: 7, elevation: 6 }}>
                                    <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingLeft: 8 }}>Condensor</Text>
                                </View>
                                <View style={{ backgroundColor: '#42a679', height: 120, marginLeft: 2, flexDirection: 'row', borderBottomRightRadius: 7, elevation: 6, justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name="thermometer" size={24} color='#fff' />
                                            <Text style={{ fontSize: 24, color: '#fff', fontFamily: 'Montserrat', marginRight: 15 }}> Suhu</Text>
                                        </View>
                                        <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'Montserrat', textAlign: 'center', fontWeight: '700', marginLeft: 15 }}>
                                            {data.tempB} C
                                </Text>
                                    </View>
                                </View>
                            </View>
                        </View> : evaporator ? <View style={{ flexDirection: 'row', marginHorizontal: 17, marginTop: 30 }}>
                            <View style={{ backgroundColor: '#a75fd4', height: 165, paddingTop: 8, paddingLeft: 10, borderTopLeftRadius: 7, borderBottomLeftRadius: 7, width: 10, elevation: 6 }}>
                            </View>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ backgroundColor: '#5d128c', height: 45, paddingTop: 8, marginLeft: 2, paddingHorizontal: 10, borderTopRightRadius: 7, elevation: 6 }}>
                                    <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingLeft: 8 }}>Evaporator</Text>
                                </View>
                                <View style={{ backgroundColor: '#a75fd4', height: 120, marginLeft: 2, flexDirection: 'row', borderBottomRightRadius: 7, elevation: 6, justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name="thermometer" size={24} color='#fff' />
                                            <Text style={{ fontSize: 24, color: '#fff', fontFamily: 'Montserrat', marginRight: 15 }}> Suhu</Text>
                                        </View>
                                        <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'Montserrat', textAlign: 'center', fontWeight: '700', marginLeft: 15 }}>
                                            {data.tempC} C
                                </Text>
                                    </View>
                                </View>
                            </View>
                        </View> : <Text style={{ fontSize: 32, color: '#bbb', fontWeight: '700', textAlign: 'center', marginTop: 100 }}>Pilih Lokasi Sensor</Text>

                }

                {
                    info ? <View style={{ flexDirection: 'row', marginHorizontal: 17, marginTop: 30 }}>
                        <View style={{ backgroundColor: '#0eaab5', height: 205, paddingTop: 8, paddingLeft: 10, borderTopLeftRadius: 7, borderBottomLeftRadius: 7, width: 10, elevation: 6, marginBottom: 30 }}>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <View style={{ backgroundColor: '#097a82', height: 45, paddingTop: 8, marginLeft: 2, paddingHorizontal: 10, borderTopRightRadius: 7, elevation: 6 }}>
                                <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingLeft: 8 }}>Info Obat</Text>
                            </View>
                            <View style={{ backgroundColor: '#0eaab5', height: 160, marginLeft: 2, flexDirection: 'row', borderBottomRightRadius: 7, elevation: 6, alignItems: 'center' }}>
                                <View style={{ justifyContent: 'flex-start', marginHorizontal: 16 }}>
                                    <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Montserrat' }}>Obat: {info.medicine.name}</Text>
                                    <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Montserrat' }}>Suhu Maksimal : {info.medicine.max} C</Text>
                                    <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Montserrat' }}>Suhu Minimal : {info.medicine.min} C</Text>
                                    <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Montserrat' }}>Tujuan : {info.destination.name}</Text>
                                </View>
                            </View>
                        </View>
                    </View> : null
                }

            </>
        );
    }
};

const styles = StyleSheet.create({
    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#FAF9F8',
        borderColor: '#bbb',
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})

export default Data;