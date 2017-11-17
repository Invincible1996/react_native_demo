import React, { Component, } from 'react'
import { View, Text, Image, TouchableOpacity, } from 'react-native'
import CommonStyle from '../component/CommonStyle'


export default class ImageCell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelected: false
        }
    }

    onPressSelect() {
        this.setState({
            isSelected: !this.state.isSelected
        }, () => this.props.addImgs(this.props.item.index, this.state.isSelected))

    }

    render() {
        return (<TouchableOpacity
            activeOpacity={1.0}
            style={{ margin: 3, borderColor: '#ddd', borderWidth: 1 }}>
            <Image
                source={{ uri: this.props.item.item.node.image.uri }}
                style={{ width: CommonStyle.screen_width / 3 - 8, height: CommonStyle.screen_width / 3 - 8 }} />
            <TouchableOpacity
                onPress={() => this.onPressSelect()}
                style={{ position: 'absolute', top: 2, right: 2 }} >
                <Image source={this.state.isSelected ? require('../res/images/select.png') : require('../res/images/unselect.png')} style={{ width: 22, height: 22 }} />
            </TouchableOpacity>

        </TouchableOpacity>)
    }
}