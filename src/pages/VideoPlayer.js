import React, { Component, } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform, Image, NativeModules, Stylesheet } from 'react-native'
import Video from 'react-native-video'
import Commonstyle from '../component/CommonStyle'

export default class VideoPlayer extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '视频播放',
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

    }

    render() {
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               
            </View>
        )
    }
}

// const styles = Stylesheet.create({
//     backgroundVideo: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       bottom: 0,
//       right: 0,
//     },
//   });
