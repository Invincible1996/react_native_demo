import React, { Component, } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

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
    this.state = {
      data:[
        
      ]
    }
  }

  renderItem(title) {
    return (
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderItem('地图')}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingVertical: 6,
    paddingRight: 10,
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: '#0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    // marginRight:15,
    // marginLeft:15
  },
  btnText: {
    color: '#fff'
  }
})
export default Person