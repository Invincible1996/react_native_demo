import React, { Component, } from 'react'
import { View, } from 'react-native'

class DrawerPage extends Component {

  static navigationOptions = {
    drawerLabel: '月落乌啼霜满天',
    headerTitle:'sssss',
    // drawerIcon: ({ tintColor }) => (
    //   <Image
    //     source={require('./notif-icon.png')}
    //     style={[styles.icon, {tintColor: tintColor}]}
    //   />
    // ),
    headerBackTitleStyle:'返回'
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={{backgroundColor:'#0ff',flex:1}}>
          
      </View>
    )
  }
}

export default DrawerPage