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
    this.state = {
      data: [

      ]
    }

    this.navigate = this.props.navigation.navigate;

    this.goToMap = this.goToMap.bind(this)
  }

  goToMap() {
    this.navigate('BaiduMap')
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.goToMap}
          style={styles.btn}>
          <Text style={styles.btnText}>百度地图</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff'
  }
})
export default Person