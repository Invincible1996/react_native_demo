import React, { Component, } from 'react'
import { View, Text, Platform, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
export default class FindPage extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: '发现',
            tabBarLabel: '发现',
            headerStyle: {
                backgroundColor: '#0f0'
            },
            headerLeft: (<View />),
            headerTitleStyle: {
                fontSize: 16
            },
            tabBarVisible: true,
            headerTintColor: '#ffffff',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name="home" size={24} color={focused ? tintColor : '#9c9c9c'} />
            )
        }
    };

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (<View style={styles.container}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 200, height: 210, backgroundColor: 'red' }}>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <View style={{ width: 150, height: 100, backgroundColor: 'red' }}></View>
                        <View style={{ width: 150, height: 100, backgroundColor: 'red', marginTop: 10 }}></View>
                    </View>
                </View>
            </ScrollView>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0ff',
        padding: 10
    }
})