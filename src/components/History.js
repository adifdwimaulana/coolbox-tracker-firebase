import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { root } from '../config';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        root.ref('/tracking').on('value', (snap) => {
            console.log(snap.val());
            this.setState({ data: snap.val() })
        });
    };
    render() {
        return (
            <>
                {/* Title */}
                <View style={{ alignItems: 'flex-start', marginTop: 20, marginLeft: 27 }}>
                    <Text style={{ fontSize: 28, color: '#000', fontFamily: 'Montserrat', letterSpacing: 1.2, fontWeight: 'bold' }}>History</Text>
                </View>
            </>
        )
    }
}

export default History;