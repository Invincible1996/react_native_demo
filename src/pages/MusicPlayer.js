import React, { Component, } from 'react'
import { View, Text } from 'react-native'
import BasePage from '../component/BasePage'
// @BasePage
export default class MusicPlayer extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'MusicPlayer',
      headerBackTitleStyle: '返回',
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f7f7f7', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 15 }}>MusicPlayer</Text>
      </View>
    )
  }
}

// export default BasePage(MusicPlayer)