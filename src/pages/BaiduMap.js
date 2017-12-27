import React, { Component, } from 'react'
import { View, Text, WebView } from 'react-native'
import PropTypes from 'prop-types'
export default class BaiduMap extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '百度地图',
      headerBackTitleStyle: '返回',
    }
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.context.store.register()
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f7f7f7', justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.context.store}</Text>
      </View>
    )
  }
}