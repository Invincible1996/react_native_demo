import React, { Component, } from 'react'
import { View, Text, Platform, Alert, StyleSheet, TouchableOpacity } from 'react-native'

export default class BasePage extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (<View style={styles.container}>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0ff'
    }
})