import React, { Component, } from 'react'
import { View, StyleSheet } from 'react-native'

class Person extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '我的',
      tabBarLabel: '我的',
      headerStyle: {
        backgroundColor: '#0f0'
      },
      headerTitleStyle: {
        fontSize: 16
      },
      tabBarVisible: true,
      headerTintColor: '#ffffff',
      tabBarIcon: ({ tintColor, focused }) => {
        return (focused ? <View style={{ backgroundColor: 'red', width: 20, height: 10, borderRadius: 10 }} />
          :
          <View style={{ backgroundColor: '#ddd', width: 20, height: 10, borderRadius: 10 }} />)
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
export default Person