import React, { Component, } from 'react'
import { View, Text, Platform, Alert, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native'
import { NavigationActions } from 'react-navigation'
import CommonStyle from '../component/CommonStyle'


export default class Login extends Component {

    static navigationOptions = ({ navigation }) => {

        return {
            header: null
        }
    }

    constructor(props) {
        super(props)
        this.state = {}
        this.toHomePage = this.toHomePage.bind(this)
    }

    toHomePage() {
        console.log('1122332211')
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'HomeNav' })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../res/images/login_bg.png')} style={{ width: CommonStyle.screen_width, height: CommonStyle.screen_height,alignItems:'center'}}>
                <View style={{
                    // width:CommonStyle.screen_width/2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 150,
                    backgroundColor: '#EAC100',
                    paddingVertical: 30,
                    paddingHorizontal:10,
                    borderRadius:10
                }}>
                    <Text style={{color:'#fff',fontSize:18}}>ReactNative</Text>
                </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 50,
                        backgroundColor: null,
                        padding: 20
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            paddingTop: 10,
                            // backgroundColor: '#fff',
                            // paddingLeft: 20, 
                            borderBottomColor: '#9c9c9c',
                            paddingBottom: 5,
                            borderBottomWidth: 1,
                        }}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                numberOfLines={1}
                                placeholder='用户名/手机号/邮箱'
                                style={{
                                    flex: 1,
                                    padding:0
                                }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            paddingTop: 10,
                            // backgroundColor: '#fff',
                            // paddingLeft: 20, 
                            paddingBottom: 5,
                            borderBottomColor: '#9c9c9c',
                            borderBottomWidth: 1
                        }}>
                            <TextInput style={{
                                flex: 1,
                                padding:0
                            }}
                                underlineColorAndroid='transparent'
                                placeholder='密码'
                            />
                        </View>
                        <TouchableOpacity
                            onPress={this.toHomePage}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#EAC100',
                                padding: 10,
                                marginTop: 20,
                                width: CommonStyle.screen_width * 0.7,
                                borderRadius: 5
                            }}>
                            <Text style={{ color: 'white' }}>登录</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 30 }}>
                        <Text>登录即是代表同意</Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'blue' }}>服务协议</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground >
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

})