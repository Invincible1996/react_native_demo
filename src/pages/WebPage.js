import React, { Component, } from 'react'
import { View, Text, WebView } from 'react-native'
import EmptyView from '../component/EmptyView'
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
        if (this.params.url === '') {
            return (<EmptyView />)
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <WebView source={{ uri: this.params.url }} />
                </View>
            )
        }

    }
}