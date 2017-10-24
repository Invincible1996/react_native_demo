import React, { Component, } from 'react'
import { View,StyleSheet } from 'react-native'

class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
        title: '首页',
        tabBarLabel: '首页',
        headerStyle: {
            backgroundColor: '#0f0'
        },
        headerTitleStyle: {
            fontSize: 16
        },
        tabBarVisible: true,
        headerTintColor: '#ffffff',
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
  container:{
    flex:1,
    backgroundColor:'red'
  }
})
export default Home