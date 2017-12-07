import React, { Component, } from 'react'
import { View, Text, Platform, BackHandler, Alert, StyleSheet } from 'react-native'
import BaseContainer from '../component/BaseContainer'
import { NavigationActions } from 'react-navigation'
@BaseContainer("IphoneX来啦")
class AndroidBackPress extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      back: true
    }
    this.onBackAndroid = this.onBackAndroid.bind(this)
    this.back = this.back.bind(this)
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  back() {
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }
  onBackAndroid() {
    console.log('-------------')
    let _this = this
    Alert.alert(
      '确定返回吗',
      " ",
      [
        { text: 'OK', onPress: () => { _this.back() } },
        { text: 'CANCLE', onPress: () => console.log('OK Pressed!') },
      ]
    )
    return true
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#0ff', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25, color: '#00f' }}>宝贝儿，哥哥送你个iPhone X</Text>
        <Text style={{ fontSize: 25, color: '#00f' }}>😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘</Text>
        <Text style={{ fontSize: 25, color: '#00f' }}>愿你开开心心！！！！！</Text>
        <Text style={{ fontSize: 25, color: '#00f' }}>😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘</Text>
        <Text style={styles.text}>愿你快快乐乐！！！！！</Text>
        <Text style={{ fontSize: 25, color: '#00f' }}>😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘</Text>
        <Text style={styles.text}>愿你永远漂亮！！！！！</Text>
        <Text style={{ fontSize: 25, color: '#00f' }}>😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘</Text>
        <Text style={styles.text}>愿你永远十八岁！！！！</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 25, color: 'blue'
  }
})
export default AndroidBackPress