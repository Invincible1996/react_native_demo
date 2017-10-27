import React, { Component, } from 'react'
import { View, Text } from 'react-native'

export default class BasePage extends Component<{}> {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'title',
            headerRight: (<View/>),
        }
    };
    
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    render() {
        return (
            <View>
                <Text>搜索</Text>
            </View>
        )
    }
}
