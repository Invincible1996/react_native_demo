import React, { Component, } from 'react'
import { View, } from 'react-native'

class BaiduMap extends Component {


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '百度地图',
      headerBackTitleStyle:'返回',
    }
    };

    constructor(props) {
      super(props)
      this.state = {}
    }

    render() {
      return (
        <View>

        </View>
      )
    }
  }

  export default BaiduMap