import React, { Component, } from 'react'
import { View, Text, WebView, TouchableOpacity, FlatList, Image, CameraRoll, StyleSheet, Modal } from 'react-native'

import CommonStyle from '../component/CommonStyle'

export default class LoadingPage extends Component {

    render() {
        return (<View style={styles.container}>
            <Text>数据加载中。。。</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        backgroundColor: '#0f0',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 150,
        left: 100,
        borderRadius:5
    }
})