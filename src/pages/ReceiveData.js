import React, { Component, } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform, Image, NativeModules } from 'react-native'

import Commonstyle from '../component/CommonStyle'
let ReactTest = NativeModules.ReactTest;
export default class ReceiveData extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '原生向RN传递数据',
            headerRight: (<View />),
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            result: []
        }
    }

    componentDidMount() {
        if (Platform.OS === 'android'){
            ReactTest.getResult((result) => { this.setState({ result: result }, () => console.log('this.state.result', this.state.result)) })
            ReactTest.tryPromise().then((map)=>{
                alert(map)
            })
        }
    }

    onPress() {

    }
    render() {
        return (<TouchableOpacity
            onPress={this.onPress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{this.state.result.length}</Text>

        </TouchableOpacity>)
    }
}