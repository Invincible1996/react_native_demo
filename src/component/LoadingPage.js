import React, { Component, } from 'react'
import { View, Text, WebView, TouchableOpacity, FlatList, Image, CameraRoll, StyleSheet, Modal } from 'react-native'
import { BubblesLoader } from 'react-native-indicator';
import CommonStyle from '../component/CommonStyle'

export default class LoadingPage extends Component {

    render() {
        return (
            <Modal visible={this.props.isLoading} transparent={true} onRequestClose={()=>{}}>
                <View style={styles.container}>
                    <BubblesLoader size={30} color="#f00" dotRadius={4} />
                    <Text style={styles.text}>数据加载中...</Text>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#ff9000',
        fontSize: 12,
        marginTop: 12
    }
});