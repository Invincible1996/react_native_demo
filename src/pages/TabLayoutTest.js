import React, { Component, } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Platform
} from 'react-native'
import BaseContainer from '../component/BaseContainer'

@BaseContainer("TabLayoutTest")
export default class TabLayoutTest extends Component {

    constructor(props) {
        super(props)
        console.log(typeof BaseContainer)
        this.state = {
            data: ['户型图', '设计图']
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log('props', nextProps)
    }

    renderTitles() {
        return this.state.data.map((item, key) => {
            return (<TouchableOpacity
                key={key}
                style={{ borderBottomWidth: 1, borderBottomColor: '#000', padding: 5 }}>
                <Text style={{ fontSize: 20, color: 'red' }}>{item}</Text>
            </TouchableOpacity>)
        })
    }

    renderBanner() {
        return (
            <View style={{ flex: 1, backgroundColor: null, justifyContent: 'center', alignItems: 'center' }}>
                <Text>户型图</Text>
            </View>)
    }

    render() {
        return (
            <View style={{ backgroundColor: '#f7f7f7', padding: 10, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 20, borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                    {this.renderTitles()}
                </View>
                <TouchableHighlight>
                    <Text>TouchableHighlight</Text>
                </TouchableHighlight>
                {Platform.OS === 'android' &&
                    <TouchableNativeFeedback>
                        <Text>TouchableNativeFeedback</Text>
                    </TouchableNativeFeedback>}
                <TouchableHighlight>
                    <Text>TouchableHighlight</Text>
                </TouchableHighlight>
                <TouchableWithoutFeedback>
                    <View>
                        <Text>TouchableWithoutFeedback</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        )
    }
}