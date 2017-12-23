import { Alert,BackHandler } from 'react-native'
import Toast from 'react-native-root-toast'

export const backAlert = (cb) => {
  Alert.alert(
      '提示',
      '您尚未提交，是否要放弃?',
      [
          {text: '否'},
          {text: '是', onPress: () => cb()},
      ],
      { cancelable: false }
  )
 }

// androi硬件返回的监听，可传Alert提示，解决硬件返回不触发alert问题。
// 带alert提示并跳转的例子：backAndroid(backAlert(()=>navigation.navigate('HomeNav')))
export const backAndroid= (cb) => {
  return BackHandler.addEventListener('hardwareBackPress', ()=>{
    cb()
    return true
  })
}//可能是goBack，或者是跳转到某个页面

// 移除返回按钮的监听事件，在react的componentWillUnmount时调用
//export const backAndroidRemove = () => {
//  BackHandler.removeEventListener('hardwareBackPress')
//}

global.log = {
  i(msg) { 
    console.log('%c' + JSON.stringify(msg), 'color: #ff9000') 
    // Toast.show(JSON.stringify(msg), { position: Toast.positions.CENTER })
  },
  s(msg) { 
    console.log('%c' + JSON.stringify(msg), 'color: #00f') 
    // Toast.show(JSON.stringify(msg), { position: Toast.positions.CENTER })
  },
  e(msg) { 
    console.log('%c' + JSON.stringify(msg), 'color: #f00') 
    // Toast.show(JSON.stringify(msg), { position: Toast.positions.CENTER })
  },
}

global.store = {}
