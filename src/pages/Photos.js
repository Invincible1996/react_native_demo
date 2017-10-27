import React, { Component, } from 'react'
import { View, Text } from 'react-native'

import BasePage from '../component/BasePage'
class Photos extends BasePage {
  

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>获取相册图片并展示</Text>
      </View>
    )
  }
}

export default Photos