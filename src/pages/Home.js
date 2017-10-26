import React, { Component, } from 'react'
import { View, StyleSheet, Text } from 'react-native'

class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '首页',
      tabBarLabel: '首页',
      headerStyle: {
        backgroundColor: '#0f0'
      },
      headerLeft:(<View></View>),
      headerTitleStyle: {
        fontSize: 16
      },
      tabBarVisible: true,
      headerTintColor: '#ffffff',
      tabBarIcon: ({ tintColor, focused }) => {
        return (focused ? <View style={{ backgroundColor: 'red', width: 20, height: 10, borderRadius: 5,marginBottom:3 }} />
          : <View style={{ backgroundColor: '#ccc', width: 20, height: 10, borderRadius: 10,marginBottom:3 }} />)
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
        <Text>首页</Text>
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
export default Home