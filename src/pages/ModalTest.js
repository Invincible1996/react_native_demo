import React, { Component, } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Platform,
    Modal
} from 'react-native'
import BaseContainer from '../component/BaseContainer'
import CommonStyle from '../component/CommonStyle'

@BaseContainer("ModalTest")
export default class ModalTest extends Component {

    constructor(props) {
        super(props)
        console.log(typeof BaseContainer)
        this.state = {
            showModal: false,
            showModal2: false
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log('props', nextProps)
    }

    render() {
        return (
            <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
                <TouchableOpacity onPress={() => { this.setState({ showModal: true }) }}>
                    <Text>ModalTest</Text>
                </TouchableOpacity>
                {this.state.showModal && <View style={{ width: CommonStyle.screen_width, height: CommonStyle.screen_height, backgroundColor: 'blue', position: 'absolute' }}>
                    <TouchableOpacity onPress={() => { this.setState({ showModal2: true }) }}>
                        <Text>点击取消</Text>
                    </TouchableOpacity>
                </View>}
                {this.state.showModal2 && <View style={{ width: CommonStyle.screen_width, height: CommonStyle.screen_height, backgroundColor: 'red', position: 'absolute' }}>
                    <TouchableOpacity onPress={() => { this.setState({ showModal2: false }) }}>
                        <Text>点击取消</Text>
                    </TouchableOpacity>
                </View>}

            </View>
        )
    }
}