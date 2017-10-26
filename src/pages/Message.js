import React, { Component, } from 'react'
import { View, StyleSheet, Text } from 'react-native'

class Message extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '消息',
      tabBarLabel: '消息',
      headerStyle: {
        backgroundColor: '#0f0'
      },
      headerTitleStyle: {
        fontSize: 16
      },
      headerLeft:(<View></View>),
      tabBarVisible: true,
      headerTintColor: '#ffffff',
      tabBarIcon: ({ tintColor, focused }) => {
        return (focused ? <View style={{ backgroundColor: 'red', width: 20, height: 10, borderRadius: 10 ,marginBottom:3}} />
          :
          <View style={{ backgroundColor: '#ddd', width: 20, height: 10, borderRadius: 10,marginBottom:3 }} />)
      }
    }
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Message</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  }
})

export default Message