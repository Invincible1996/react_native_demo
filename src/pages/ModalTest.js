import React, { Component, } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Platform,
    Modal,
    StyleSheet,
    BackHandler,
    ToastAndroid
} from 'react-native'
import BaseContainer from '../component/BaseContainer'
import CommonStyle from '../component/CommonStyle'
var count = 2;
@BaseContainer("ModalTest")
export default class ModalTest extends Component {
    state = {
        showModal: true
    }

    back() {
        // if (count >= 1) {
        //     this.setState({
        //         showModal: false
        //     }, () => console.log('this.state.showModal', this.state.showModal))
        //     ToastAndroid.show('收到点击返回键信息...' + count, ToastAndroid.SHORT);
        //     count--;
        //     return true;
        // } else {
        //     ToastAndroid.show('收到点击返回键信息...' + count, ToastAndroid.SHORT);
        //     return true;
        // }
        // console.log('456')
    }
    //组件挂载的时候调用
    componentDidMount() {
        // BackHandler.addEventListener('hardwareBackPress', this.back());
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    BackAndroid模块使用实例
      </Text>
                <Text style={styles.instructions}>
                    请点击返回键查看效果...
      </Text>
                {this.state.showModal &&
                    <Modal visible={this.state.showModal} onRequestClose={() => { this.setState({ showModal: false }) }}>
                        <Text>123654789</Text>
                    </Modal>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});