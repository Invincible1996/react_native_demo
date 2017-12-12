import React, { Component, } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Commonstyle from '../component/CommonStyle'
import Swiper from 'react-native-swiper'
import BaseContainer from '../component/BaseContainer'
@BaseContainer('', true)
export default class Splash extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                { url: 'https://s9.rr.itc.cn/r/wapChange/201610_17_20/a04awj7908101245855.jpeg' },
                { url: 'https://himg2.huanqiu.com/attachment2010/2013/0417/20130417075247234.jpg' },
                { url: 'https://photocdn.sohu.com/20080415/Img256308509.jpg' },
            ]
        }
        this.toHomePage = this.toHomePage.bind(this)
    }

    toHomePage() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'HomeNav' })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    renderSwiper() {

        return this.state.data.map((item, key) => {
            return (<View key={key}>
                <Image source={{ uri: item.url }} style={{ width: Commonstyle.screen_width, height: Commonstyle.screen_height }} />
                {key == 2 && <TouchableOpacity
                    onPress={this.toHomePage}
                    style={{ backgroundColor: '#0ff', position: 'absolute', borderRadius: 5, padding: 10, bottom: 80, left: (Commonstyle.screen_width - 80) / 2 }}>
                    <Text style={{ color: '#fff' }}>
                        立即体验
                    </Text>
                </TouchableOpacity>}
            </View>)
        })
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <Swiper loop={false}>
                    {this.renderSwiper()}
                </Swiper>
            </View>
        )
    }
}

