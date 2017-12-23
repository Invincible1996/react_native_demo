import React, { Component, } from 'react'
import { View, Text, Platform, Alert, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
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
    }

    render() {
        return (
            <ScrollView stye={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ width: 200, height: 200, backgroundColor: 'red', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>1122334455</Text>
                    </View>
                    <View style={{ width: 200, height: 200, backgroundColor: 'red', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>1122334455</Text>
                    </View>
                    <View style={{
                        marginTop: 15,
                        flexDirection: 'row',
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 30,
                        paddingVertical: 10,

                    }}>
                        <Text>账号</Text>
                        <TextInput placeholder='请输入用户名' style={{ flex: 1, marginLeft: 12 }} underlineColorAndroid='transparent' />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 30,
                        paddingVertical: 10,
                        flex: 1
                    }}>
                        <Text>密码</Text>
                        <TextInput placeholder='请输入密码' style={{ flex: 1, marginLeft: 12 }} underlineColorAndroid='transparent' />
                    </View>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0ff',
        justifyContent: 'center',
        alignItems: 'center',
    },

})