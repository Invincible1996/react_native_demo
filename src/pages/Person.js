import React, { Component, } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import CommonStyle from '../component/CommonStyle'
import Icon from 'react-native-vector-icons/Ionicons'
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

      headerLeft: (<View></View>),
      tabBarVisible: true,
      headerTintColor: '#00f',
      tabBarIcon: ({ tintColor, focused }) => (<Icon name="md-contact" size={24} color={focused ? tintColor : '#9c9c9c'} />)
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
    this.goToPhotos = this.goToPhotos.bind(this)
    this.gotoSearch = this.gotoSearch.bind(this)
    this.goToTextInputTest = this.goToTextInputTest.bind(this)
  }

  goToMap() {
    this.navigate('BaiduMap')
  }

  goToPhotos() {
    this.navigate('Photos')
  }

  gotoSearch() {
    this.navigate('Search')
  }

  goToTextInputTest() {
    this.navigate('TextInputTest')
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.goToMap}
          style={styles.btn}>
          <Text style={styles.btnText}>百度地图</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.goToPhotos}
          style={styles.btn}>
          <Text style={styles.btnText}>图片展示</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.gotoSearch}
          style={styles.btn}>
          <Text style={styles.btnText}>搜索</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.goToTextInputTest}
          style={styles.btn}>
          <Text style={styles.btnText}>多个TextInput</Text>
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
    // paddingRight: 10,
    // paddingLeft: 10,
  },
  btn: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
    // borderRadius: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  btnText: {
    color: '#333'
  }
})
export default Person