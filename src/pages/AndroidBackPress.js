import React, { Component, } from 'react'
import { View, Text, Platform, BackHandler, Alert, StyleSheet } from 'react-native'
import BaseContainer from '../component/BaseContainer'
import { NavigationActions } from 'react-navigation'
@BaseContainer("IphoneX来啦", '', "https://japi.juhe.cn/joke/img/text.from?key=8aad35fd1e3384b259293e9f491cab5e&page=5&pagesize=10")
class AndroidBackPress extends Component {

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

  componentDidMount() {
    this.props.query()
    console.log('this.props.data', this.props.data.length)
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