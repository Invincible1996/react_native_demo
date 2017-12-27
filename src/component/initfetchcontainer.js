/**
 * query一般用于分页查询，或进入页面后才进行的查询，比如搜索
 *   updater用于分页时使用，用于配置数据是附加在前还是后，append有俩值：['start','end'],listName指定服务端返回的哪个key存放分页的数组
 *   当updater有值时，onSuccess不需要处理返回的data,一般做取消loading之类的;并且直接通过this.props.data传过去
 *   当updater无值时，做为主动的第一次查询或者非分页类型，直接通过callback传递给onSuccess
 *   当onSuccess和updater都不传时，按默认行为，及通过props.data传递
 *   在config中传入unAuth值为true时，为不验证是否登录。（query与mutation都是）
 *   config的key属性必须填写，为存放在store里的值，需要唯一，注意不要冲突，一般为服务端返回的data下面的，如果data下面直接是数据，则需要填写,否则会冲突
 *  beforeSend默认显示loading，如果不需要显示loading，请传一个空函数。如果有其他需求，则传自定义函数，比如进度条
 */
import React, {Component} from 'react'
import {Platform, View, StyleSheet, AsyncStorage, Alert} from 'react-native'
import Toast from 'react-native-root-toast';
// import {JMessage, JPush} from "react-native-jmessage";

import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import {BubblesLoader} from 'react-native-indicator';
import {NavigationActions} from 'react-navigation'
import PropTypes from 'prop-types'

export default ({url = "", query = {}, method = "GET", key} = {}) => (Componend) => class extends Component {
    static navigationOptions = Componend.navigationOptions;
    static contextTypes = {
        store: PropTypes.object.isRequired
    }
    state = {
        data: {},
        page: {},
        showLoading: false,
        //unReadNum: 0,
        preStore: {}
    }

    constructor(props, context) {
        super(props, context)
        this.query = this.query.bind(this)
        this.makeFetch = this.makeFetch.bind(this)
        this.mutation = this.mutation.bind(this)
        this.makeUnAuthFetch = this.makeUnAuthFetch.bind(this)
        this.goToLogin = this.goToLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.isFirstAlert = true;
    }

    handleChange(payload, self) {
        if (!self.context || !self.context.store) {
            const {setParams} = global.store.navigation || {}
            if (setParams) {
                setParams({
                    unReadNum: global.store.unReadNum,
                    chatUnReadCount: global.store.chatUnReadCount,
                })
            }
            return
        }

        const dataValue = payload.value[payload.key] || payload.value
        self.context.store.setStore(payload.key, dataValue);
        const storeState = self.context.store.getStore()
        const preStore = self.state.preStore;

        const unReadNum = storeState.message && storeState.message.worker_app_notice && storeState.message.worker_app_notice.unReadNum || 0;
        const chatUnReadCount = storeState.chatUnReadCount || 0;
        const {setParams} = self.props.navigation && self.props.navigation || {}

        if (setParams) {
            setParams({
                unReadNum,
                chatUnReadCount,
            })
        }

        global.store.unReadNum = unReadNum
        global.store.chatUnReadCount = chatUnReadCount

        if (preStore === storeState) {
            console.log('pre store === cur store')
            return
        }
        self.setState(() => ({preStore: storeState, data: storeState}))
    }

    // mutation config:{url,input,method="POST"}
    mutation({config, beforeSend, onSuccess, onError}) {
        if (beforeSend) {
            beforeSend()
        } else {
            this.setState({showLoading: true})
        }
        if (config.unAuth) {
            this.makeUnAuthFetch(config.url, config.input, config.method || "POST", onSuccess, onError)
        } else {
            this.makeFetch(config.url, config.input, config.method || "POST", onSuccess, onError)
        }
    }// 更新数据用
    // query config: {url,query,method},updater:['start','end'],如果有updater(用于分页）参数，onSuccess不需要处理data
    query({config, beforeSend, onSuccess, onError, updater}) {
        let initConfig = {url, query, method, key}
        Object.assign(initConfig, config)
        if (!initConfig.key && !updater) throw new Error('查询的config必须配置key属性')
        let Fetch = initConfig.unAuth ? this.makeUnAuthFetch : this.makeFetch;
        if (beforeSend) {
            beforeSend()
        } else {
            this.setState({showLoading: true})
        }
        Fetch(initConfig.url, initConfig.query, initConfig.method,
            (data, page) => {
                if (updater) {
                    let key = updater.listName || updater.key || initConfig.url;// 由于读取数据都是根据接口返回接口，所以默认需要配置key
                    if (updater.append === 'start') {
                        this.context.store.dispatch({key, value: data}, this)//data由store管理
                        this.setState({
                            //data,
                            page
                        })
                        onSuccess && onSuccess(data, page)
                    }// 暂时直接使用新的替代，后期附加到老数据的开头

                    if (updater.append === 'end') {
                        //需要判断data是对象还是数组
                        if (data instanceof Array) {
                            data.length > 0 && this.context.store.dispatch({key, value: data}, this)
                            //  this.setState({
                            //      data: this.state.data.concat(data)
                            //  })
                        } else if (data instanceof Object) {
                            let result = data;

                            if (!result || !result[key]) {
                                result = this.state.data[key]
                            } else {
                                result[key] && (result[key] = result[key].length > 0 ? this.state.data[key].concat(data[key]) : this.state.data[key])
                            }
                            this.context.store.dispatch({key, value: result}, this)
                            this.setState({
                                //data: result,
                                page
                            })
                            onSuccess && onSuccess(result, page)
                        }
                        if (data === undefined || data === null) {
                            this.setState({
                                page
                            }, () => onSuccess && onSuccess(this.state.data, page))

                        }
                    }//如果新数据要附加到老的。
                } else {
                    this.setState({
                        //data,
                        page,
                    })

                    this.context.store.dispatch({key: initConfig.key, value: data}, this);
                    onSuccess && onSuccess(data, page)
                }
            },
            onError
        )
    }

    goToLogin() {

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Login'})
            ]

        })
        this.props.navigation.dispatch(resetAction)
    }

    async makeFetch(url, params, method, onSuccess, onError) {
        let user = await AsyncStorage.getItem("UserInfo")
        if (user) {
            let userObj = JSON.parse(user)
            if (userObj && userObj.token) {
                makeFetch(url, params, method, userObj)
                    .then((response) => {
                        if (response.response && (response.response.code === 0 || response.response.code === 2)) {
                            console.log(response.response)
                            onSuccess && onSuccess(response.response.data || {}, response.response.page || {})
                        } else {
                            if (response.response && response.response.code === -4) {
                                AsyncStorage.clear().catch();
                                // JPush.removeAlias()
                                // JMessage.logout()
                                this.goToLogin();
                                //如果被踢下线就跳回登陆页
                            } else if (response.response && response.response.code === -5) {
                                AsyncStorage.clear().catch()
                                // JPush.setAlias('')
                                // JMessage.logout()
                                if (this.isFirstAlert) {
                                    this.isFirstAlert = false
                                    Alert.alert('消息', response.response.message || '您的设备在其他地方登录，请重新登录', [
                                        {text: '确定', onPress: this.goToLogin}
                                    ])
                                }
                            } else {
                                onError ? onError(response.response) : Toast.show('error-101 ' + response.response.message, {
                                    duration: Toast.durations.SHORT,
                                    position: Toast.positions.CENTER
                                })

                            }
                        }
                        this.setState({showLoading: false})
                    })
                    .catch((error) => {
                        this.setState({showLoading: false})
                        console.log(error.stack || error)
                        onError ? onError(error) : Toast.show('error-102 ' + error.message, {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.CENTER
                        })
                    })
            } else {
                this.setState({showLoading: false})
                onError ? onError({
                    code: 5,
                    message: '登录信息不存在'
                }) : Toast.show('error-106 登录信息不存在', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER
                })
            }
        } else {
            this.setState({showLoading: false})
            onError ? onError({
                code: 5,
                message: '登录信息不存在'
            }) : Toast.show('error-107 登录信息不存在', {duration: Toast.durations.SHORT, position: Toast.positions.CENTER})
        }
    }

    makeUnAuthFetch(url, params, method, onSuccess, onError) {
        makeFetch(url, params, method, {})
            .then((response) => {
                if (response.response && response.response.code === 0) {
                    onSuccess && onSuccess(response.response.data || {}, response.response.page || {})
                } else {
                    onError ? onError(response.response) : Toast.show('error-103 ' + response.response.message, {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER
                    })
                }
                this.setState({showLoading: false})
            })
            .catch((error) => {
                this.setState({showLoading: false})
                console.log(error.stack || error)
                onError ? onError(error) : Toast.show('error-104 ' + error.message, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER
                })
            })
    }

    componentWillUnmount() {
        this.removeListener && this.removeListener.remove()//移除android的硬件返回键监听
        this.storeListener && this.storeListener.remove()// store的数据变化监听移除
    }

    componentDidMount() {
        if (this.props.navigation) {
            // global.store.navigation = this.props.navigation
        }
        this.storeListener = this.context.store ? this.context.store.register(this.handleChange) : null//注册store变化并setState
        if (Componend.backHander && typeof Componend.backHander === 'function' && !this.removeListener) {
            this.removeListener = Componend.backHander(this.props.navigation)
        }
        !!url && this.setState(() => ({showLoading: true}), () => Promise.resolve(this.makeFetch(
            url,
            query,
            method,
            (data, page) => {
                this.context.store.dispatch({key, value: data}, this)
                this.setState({
                    //data,
                    page
                })
            }, (error) => {
                console.log(error.stack || error)
                Toast.show('error-105 ' + error.message, {position: Toast.positions.CENTER})
            }
        )))
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Componend data={this.state.data} context={this} {...this.props} query={this.query}
                           mutation={this.mutation} page={this.state.page}/>
                {this.state.showLoading && (<View style={styles.modal}>
                    <BubblesLoader size={40} color="#ff9000" dotRadius={4}/>
                </View>)}

            </View>
        )
    }
}

function makeFetch(url, query, method, user) {
    let params = method.toUpperCase() === 'GET' ? null : query
    let uri = method.toUpperCase() === 'GET' ? makeUrl(url, query) : url
    let requestUrl = Config.API + uri
    console.log('url', requestUrl)
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
    console.log('customHeader',customHeader)
    return fetch(requestUrl, {
        method: method.toUpperCase(),
        headers: customHeader,
        body: params ? JSON.stringify(params) : null
    })
        .then((response) => response.json())
}

function makeUrl(queryUrl, param) {
    if ('object' !== typeof param || !param || !Object.keys(param).length) return queryUrl
    let arr = []
    for (let key in param) {
        arr.push(key + '=' + param[key])
    }
    const url = queryUrl + (queryUrl.endsWith('?') ? '&' : '?') + arr.join('&')
    // log.i('requestUrl: ' + url)
    console.log('requestUrl: ' + url)
    return url
}

var styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //flex:1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        //zIndex:1
    },
})
