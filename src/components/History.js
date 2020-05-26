import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { root } from '../config';

var historyData = []

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        root.ref('/delivery').on('value', (snap) => {
            historyData = []
            // let buffArray = []
            snap.forEach((item) => {
                let itemVal = item.val();
                let itemKey = item.key;
                Object.assign(itemVal, { key: itemKey })
                // buffArray.push(itemVal)
                // buffArray.push(itemKey)
                // console.log(buffArray)
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
        const historyList = this.state.data.map((item) => {
            return (
                <>
                    <View style={{ flexDirection: 'row', marginHorizontal: 17, marginTop: 15, marginBottom: 15 }}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <View style={{ backgroundColor: '#0c25c9', height: 45, paddingTop: 8, marginLeft: 2, paddingHorizontal: 10, borderTopLeftRadius: 7, borderTopRightRadius: 7 }}>
                                <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingLeft: 8 }}>{item.destination}</Text>
                                <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingRight: 8, marginTop: -20, textAlign: 'right' }}>{item.currentDate}</Text>
                            </View>
                            <View style={{ backgroundColor: '#394fe3', height: 160, marginLeft: 2, flexDirection: 'row', borderBottomRightRadius: 7, borderBottomLeftRadius: 7 }}>
                                <View style={{ marginHorizontal: 17, marginTop: 6 }}>
                                    <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1, fontWeight: 'bold' }}>{item.medicine}</Text>
                                    <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 2, textAlign: 'justify', marginTop: 6 }}>{item.description}</Text>

                                </View>
                                <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 14 }}>
                                    <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 2, textAlign: 'justify' }}>Pengiriman : {item.start}</Text>
                                    <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 2, textAlign: 'justify', marginTop: 2 }}>Sampai : {item.finish}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: "flex-end", marginBottom: 14, marginRight: -140 }}>
                                    <TouchableOpacity
                                        style={{ flexDirection: "row" }}
                                        onPress={() => this.deleteHistory(item)}
                                    >
                                        <Icon name="trash" size={14} color='#fff' />
                                        <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 2, textAlign: 'right' }}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                </>
            )
        })

        return (
            <>
                {/* Title */}
                <View style={{ alignItems: 'flex-start', marginTop: 20, marginLeft: 27 }}>
                    <Text style={{ fontSize: 28, color: '#000', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: 'bold' }}>History</Text>
                </View>
                {/* Histories */}
                {historyList}
            </>
        )
    }
}

export default History;