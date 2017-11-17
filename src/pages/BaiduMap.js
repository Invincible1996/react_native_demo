import React, { Component, } from 'react'
import { View, Text } from 'react-native'
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
        <Text style={{fontSize:15}}>地图暂未集成哦</Text>
      </View>
    )
  }
}