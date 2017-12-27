import React, { Component, } from 'react'
import {
    View,
    Text,
    Platform,
    Alert,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ImageBackground,
    AsyncStorage
} from 'react-native'

import { NavigationActions } from 'react-navigation'
import Toast from 'react-native-root-toast';
import { BubblesLoader } from 'react-native-indicator';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';

import CommonStyle from '../component/CommonStyle'

export default class Login extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            password: '',
            isLoading: false
        }

        this.startLogin = this.startLogin.bind(this)
        this.checkAccount = this.checkAccount.bind(this)
        this.toHomePage = this.toHomePage.bind(this)
        this.saveUserInfo = this.saveUserInfo.bind(this)
    }

    startLogin(phone, password) {
        //1,校验手机号和密码是否为空
        this.checkAccount(phone, password)

        // console.log('phone:', phone)
        // console.log('password:', password)
        // console.log('DevicesInfo', DeviceInfo.getUserAgent())
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



    /**
     * 校验手机号和密码
     * @param {*} phone 
     * @param {*} password 
     */
    checkAccount(phone, password) {
        var teleReg = /^((0\d{2,3})-)(\d{7,8})$/;
        var mobileReg = /^1\d{10}$/;
        if (phone.length != 0 && !teleReg.test(phone) && !mobileReg.test(phone)) {
            Toast.show('手机号码格式不正确', { duration: Toast.durations.SHORT, position: Toast.positions.CENTER })
        } else if (phone.length == 0) {
            return
        } else {
            if (this.state.phone.length > 0 && this.state.password.length > 0 && !this.state.isLoading) {
                let phoneType = Platform.OS === 'android' ? 2 : 1;
                let params = {
                    clientType: phoneType,
                    password: this.state.password,
                    phone: this.state.phone
                }

                let customHeader = {
                    'Accept': 'application/json',
                    'userAgent': DeviceInfo.getUserAgent() || '',
                    'os': Platform.OS,
                    'appVersion': DeviceInfo.getReadableVersion(),
                    'deviceId': DeviceInfo.getUniqueID(),
                    'apiVersion': '3',
                }

                console.log('customHeader', customHeader)

                let url = Config.API + makeUrl('/apis/auth/loginByPassword.do', params)

                console.log('-----url', url)
                this.setState({ isLoading: true })
                fetch(url, {
                    method: 'GET',
                    headers: customHeader,
                    body: null
                })
                    .then((res) => {
                        let response = JSON.parse(res._bodyInit);
                        console.log('response', response.response)
                        if (response.response && response.response.code == 0) {
                            // this.setState({ isLoading: false })
                            // this.toHomePage()
                        }
                        if (response.response.code == 5) {
                            Toast.show(response.response.message, { position: Toast.positions.CENTER })
                        }

                    }).catch((err) => {
                        console.log('err', err)
                    })
            }

        }
    }

    async saveUserInfo(data) {
        try {
            await AsyncStorage.setItem('UserInfo', JSON.stringify(data));
            this.toHomePage()
        } catch (err) {

        }
    }

    downKey() {
        this.refs.account.blur();
        this.refs.password.blur();
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.downKey()}
                style={styles.container}>
                <ImageBackground source={require('../res/images/login_bg.png')} style={styles.imgBg}>
                    <View style={styles.logoContainer}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>RN</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                        backgroundColor: null,
                        padding: 20
                    }}>
                        <View style={styles.inputView}>
                            <TextInput
                                autoFocus={true}
                                ref='account'
                                underlineColorAndroid='transparent'
                                numberOfLines={1}
                                placeholder='用户名/手机号/邮箱'
                                onChangeText={(text) => { this.setState({ phone: text }) }}
                                style={{
                                    flex: 1,
                                    padding: 0
                                }} />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput style={{
                                flex: 1,
                                padding: 0
                            }}
                                underlineColorAndroid='transparent'
                                placeholder='密码'
                                ref='password'
                                secureTextEntry={true}
                                onChangeText={(text) => { this.setState({ password: text }) }}
                            />
                        </View>
                        <TouchableOpacity
                            disabled={this.state.phone.length == 0 || this.state.isLoading}
                            onPress={() => this.startLogin(this.state.phone, this.state.password, 'code')}
                            style={[styles.loginBtnView, { backgroundColor: this.state.phone.length == 0 || this.state.password.length == 0 ? '#DEDDDE' : '#EAC100', }]}>
                            <Text style={{
                                color: this.state.phone.length == 0 || this.state.password.length == 0 ? '#9c9c9c' : 'white',
                                fontSize: 16,
                                alignSelf: 'center'
                            }}>
                                登录
                            </Text>
                            {this.state.isLoading && <View style={{ marginLeft: 5 }}>
                                <BubblesLoader size={20} color="#fff" dotRadius={4} />
                            </View>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 30 }}>

                        <Text>登录即是代表同意</Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'blue' }}>服务协议</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground >
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: CommonStyle.screen_height,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgBg: {
        width: CommonStyle.screen_width,
        height: CommonStyle.screen_height, alignItems: 'center'
    },
    logoContainer: {
        marginTop: 50,
        backgroundColor: '#EAC100',
        padding: 20,
        borderRadius: 10
    },
    inputView: {
        flexDirection: 'row',
        paddingTop: 10,
        borderBottomColor: '#9c9c9c',
        paddingBottom: 5,
        borderBottomWidth: 1,
    },
    loginBtnView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        width: CommonStyle.screen_width * 0.7,
        borderRadius: 5,
        flexDirection: 'row'
    },
})

function makeFetch(url, query, method, user) {
    let params = method.toUpperCase() === 'GET' ? null : query
    let uri = method.toUpperCase() === 'GET' ? makeUrl(url, query) : url
    let requestUrl = Config.API + uri
    console.log('requestUrl: -----' + requestUrl)
    let customHeader = {
        'Accept': 'application/json',
        'userAgent': DeviceInfo.getUserAgent() || '',
        'os': Platform.OS,
        'appVersion': DeviceInfo.getReadableVersion(),
        'deviceId': DeviceInfo.getUniqueID(),
        'apiVersion': '3',
    }
    if (user.token) {
        customHeader['Cookie'] = `TOKEN=${user.token}`;
        customHeader['token'] = user.token;
    }
    console.log(customHeader)
    return fetch(requestUrl, {
        method: method.toUpperCase(),
        headers: customHeader,
        body: params ? JSON.stringify(params) : null
    })
        .then((response) => { console.log(response) })
}

function makeUrl(queryUrl, param) {
    if ('object' !== typeof param || !param || !Object.keys(param).length) return queryUrl
    let arr = []
    for (let key in param) {
        arr.push(key + '=' + param[key])
    }
    const url = queryUrl + (queryUrl.endsWith('?') ? '&' : '?') + arr.join('&')
    console.log('requestUrl: ' + url)
    return url
}