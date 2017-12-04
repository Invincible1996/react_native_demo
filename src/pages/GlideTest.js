import React, { Component, } from 'react'
import { View, Text, Image, NativeModules } from 'react-native'
import CommonStyle from '../component/CommonStyle'

export default class GlideTest extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'GlideTest',
            headerBackTitleStyle: '返回',
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            path: ''
        }
    }

    componentDidMount() {
      
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#0f0', }}>
        
            </View>
        )
    }
}