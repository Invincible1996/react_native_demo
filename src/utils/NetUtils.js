/**
 * NetUitl 网络请求的实现
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';

export default class NetUitl extends Component {

    /**
     * get请求
     * @param {*} url 
     * @param {*} params 
     * @param {*} callback 
     */
    static get(url, params, callback) {
        if (params) {
            let paramsArray = []
            //参数拼接
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        //fetch请求
        fetch(url, {
            method: 'GET',
        })
            .then((response) => {
                callback(response)
            }).done();
    }

    /**
     * post请求
     * @param {*} url 
     * @param {*} params 
     * @param {*} headers 
     * @param {*} callback 
     */
    static post(url, params, headers, callback) {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            })
    }
}


module.exports = NetUitl