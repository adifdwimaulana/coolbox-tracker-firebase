import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { root } from '../config';

var historyData = []

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        root.ref('/delivery').on('value', (snap) => {
            historyData = []
            snap.forEach((item) => {
                let itemVal = item.val();
                let itemKey = item.key;
                Object.assign(itemVal, { key: itemKey })
                historyData.push(itemVal);
                // console.log(historyData)
                this.setState({ data: historyData })
            })
        })
    }

    deleteHistory(item) {
        console.log(item.key)
        root.ref('delivery/' + item.key).remove();
    }

    render() {
        const { data } = this.state;
        return (
            <>
                <View style={{ alignItems: 'flex-start', marginTop: 20, marginLeft: 27 }}>
                    <Text style={{ fontSize: 28, color: '#000', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: 'bold' }}>History</Text>
                </View>
                {
                    data ?
                        data.map(item =>
                            <View style={styles.blockContainer}>
                                <View style={{ flex: 1 }}>
                                    <View style={styles.topPart}>
                                        <Text style={styles.destination}>{item.destination.name}</Text>
                                        <Text style={styles.date}>{item.currentDate}</Text>
                                    </View>
                                    <View style={styles.contentPart}>
                                        <Text style={styles.medicineName}>{item.medicine.name}</Text>
                                        <View style={styles.wrapper}>
                                            <Text style={styles.start}>Pengiriman : {item.start}</Text>
                                            <Text style={styles.finish}>Sampai : {item.finish}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.delete}
                                            onPress={() => this.deleteHistory(item)}
                                        >
                                            <Icon name="trash" size={16} color='#fff' />
                                            <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 2, textAlign: 'right' }}> DELETE</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        ) : <Text style={{ fontSize: 32, color: '#bbb', fontWeight: '700', textAlign: 'center', marginTop: 100 }}>Belum Ada History</Text>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    blockContainer: {
        flexDirection: 'row',
        marginHorizontal: 17,
        marginTop: 15,
        marginBottom: 15
    },
    topPart: {
        backgroundColor: '#0c25c9',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 2,
        paddingHorizontal: 10,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7
    },
    destination: {
        fontSize: 16,
        color: '#fff',
        letterSpacing: 1.8,
        paddingLeft: 8
    },
    date: {
        fontSize: 12,
        color: '#fff',
        letterSpacing: 1.8,
        paddingRight: 8,
    },
    contentPart: {
        backgroundColor: '#394fe3',
        height: 160,
        marginLeft: 2,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        paddingHorizontal: 18
    },
    medicineName: {
        fontSize: 28,
        color: '#fff',
        letterSpacing: 1.2,
        fontWeight: '600',
        marginTop: 12
    },
    keterangan: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'justify',
        letterSpacing: 1.5
    },
    wrapper: {
        position: 'absolute',
        bottom: 12,
        marginLeft: 20
    },
    start: {
        fontSize: 12,
        color: '#fff',
        letterSpacing: 2,
        textAlign: 'justify'
    },
    finish: {
        fontSize: 12,
        color: '#fff',
        letterSpacing: 2,
        textAlign: 'justify',
        marginTop: 2
    },
    delete: {
        position: 'absolute',
        right: 20,
        bottom: 12,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default History;