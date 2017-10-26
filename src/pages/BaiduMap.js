import React, { Component, } from 'react'
import { View, } from 'react-native'

class BaiduMap extends Component {


  static navigationOptions = ({ navigation }) => {
    return {
      title: '百度地图'
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