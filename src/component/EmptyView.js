import React, { Component, } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'

export default class EmptyView extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: 150 }}>
                <Image source={require('../res/images/vacancy.png')} />
                <Text style={{ marginTop: 15, fontSize: 18 }}>Nothing to show</Text>
            </View>
        )
    }
}