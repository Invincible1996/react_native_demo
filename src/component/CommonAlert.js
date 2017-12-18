import React, { Component, } from 'react'
import { View, Text, Platform, Alert, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import CommonStyle from '../component/CommonStyle'
export default class CommonAlert extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowAlert: true
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
        this.setState({ isShowAlert: nextProps.isShowAlert })
    }

    render() {
        return (<Modal
            visible={this.state.isShowAlert} onRequestClose={() => { this.setState({ isShowAlert: false }) }} animationType='fade' transparent={true}>
            <View style={styles.container}>
                <View style={{ width: CommonStyle.screen_width * 0.65, backgroundColor: '#fff', borderRadius: 5 }}>
                    <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                        <Text style={{ color: '#333', fontSize: 20 }}>{this.props.title}</Text>
                    </View>
                    <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity style={{
                            flex: 1, padding: 20, borderRightColor: '#eee', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center',
                        }}
                            onPress={() => { this.setState({ isShowAlert: false }) }}
                        >
                            <Text style={{ fontSize: 18 }}>确定</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.setState({ isShowAlert: false }) }}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                            <Text style={{ fontSize: 18 }}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal >)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',

    }
})