import React, { Component, } from 'react'
import { View, Text } from 'react-native'
import BaseContainer from '../component/BaseContainer'

@BaseContainer("MusicPlayer")
export default class MusicPlayer extends Component {

  constructor(props) {
    super(props)
    console.log(typeof BaseContainer)
    this.state = {
      data: []
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('props', nextProps)
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f7f7f7', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 15 }}>MusicPlayer</Text>
      </View>
    )
  }
}
// export default BaseContainer   ('Players')(MusicPlayer)