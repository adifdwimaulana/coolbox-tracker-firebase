import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { root } from '../config';

const historyData = []

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        root.ref('/delivery').on('value', (snap) => {
            snap.forEach((item) => {
                let itemVal = item.val();
                historyData.push(itemVal);
                // console.log(historyData)
                this.setState({ data: historyData })
            })
        })
    }

    render() {
        const historyList = this.state.data.map((item) => {
            return (
                <>
                    <View style={{ flexDirection: 'row', marginHorizontal: 17, marginTop: 30 }}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <View style={{ backgroundColor: '#9c9c98', height: 45, paddingTop: 8, marginLeft: 2, paddingHorizontal: 10, borderTopLeftRadius: 7, borderTopRightRadius: 7 }}>
                                <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingLeft: 8 }}>{item.destination}</Text>
                                <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Montserrat', letterSpacing: 1.8, paddingRight: 8, marginTop: -20, textAlign: 'right' }}>{item.currentDate}</Text>
                            </View>
                            <View style={{ backgroundColor: '#bfbfbd', height: 160, marginLeft: 2, flexDirection: 'row', borderBottomRightRadius: 7, borderBottomLeftRadius: 7 }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flex: 1, paddingTop: 10, paddingLeft: 17, flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}>Start : {item.start}</Text>
                                    </View>
                                    <View style={{ paddingTop: 10, paddingLeft: 17, flexDirection: 'row', flex: 3 }}>
                                        <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}>{item.medicine}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flex: 1, paddingTop: 10, paddingLeft: 17, flexWrap: 'wrap', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}>Finish : {item.start}</Text>
                                    </View>
                                    <View style={{ paddingTop: 10, paddingLeft: 17, flexDirection: 'row', flex: 3 }}>
                                        <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat' }}>{item.description}</Text>
                                    </View>
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