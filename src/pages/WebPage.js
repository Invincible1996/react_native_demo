import React, { Component, } from 'react'
import { View, Text, WebView } from 'react-native'

export default class WebPage extends Component<{}> {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title,
            headerRight: (<View />),
        }
    };

    constructor(props) {
        super(props)
        this.state = {}

        this.params = this.props.navigation.state.params

    }

    render() {
        console.log('this.params', this.params)
        return (
            <View style={{ flex: 1 }}>
                <WebView source={{ uri: this.params.url }} />
            </View>
        )
    }
}