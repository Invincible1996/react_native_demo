import React, { Component, } from 'react'
import { View, Text, Platform, BackHandler, Alert } from 'react-native'
import BaseContainer from '../component/BaseContainer'
import { NavigationActions } from 'react-navigation'
@BaseContainer("安卓物理返回键")
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
      <View style={{}}>

      </View>
    )
  }
}

export default AndroidBackPress