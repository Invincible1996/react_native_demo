import React, { Component, } from 'react'
import { View, Text ,WebView} from 'react-native'
export default class BaiduMap extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '百度地图',
      headerBackTitleStyle: '返回',
    }
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f7f7f7', justifyContent: 'center', alignItems: 'center' }}>
        <WebView javaScriptEnabled={true} source={{uri:'https://3g.163.com/v/video/VQ3DIKQOE.html'}} />
      </View>
    )
  }
}