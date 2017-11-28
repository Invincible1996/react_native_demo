import React, { Component, } from 'react'
import { View, Text, Image, NativeModules } from 'react-native'
import CommonStyle from '../component/CommonStyle'
let ImagePicker = NativeModules.PickerModule
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
        // Glide.gildeWithPath("https://bucket-bnq-dev.oss-cn-shanghai.aliyuncs.com/emallmgr/dev/721").then((res) => {
        //     this.setState({
        //         path: res
        //     }, () => console.log('this.state.path', this.state.path))
        // })
        let json = "坎坎坷坷"
        ImagePicker.openPicker().then((res) => {
            console.log("image", res)
            this.setState({
                path: res
            })
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f7f7f7', }}>
                <Image source={{ uri:'file:'+ this.state.path }} style={{ width: CommonStyle.screen_width, height: CommonStyle.screen_height / 3 }} />
            </View>
        )
    }
}