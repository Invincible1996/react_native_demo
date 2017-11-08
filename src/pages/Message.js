import React, { Component, } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import CommonStyle from '../component/CommonStyle'
import Swiper from 'react-native-swiper'
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
      headerLeft: (<View />),
      tabBarVisible: true,
      headerTintColor: '#ffffff',
      tabBarIcon: ({ tintColor, focused }) => (<Icon name="message" size={24} color={focused ? tintColor : '#9c9c9c'} />)
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      data: [
        { url: 'https://imgcache.cjmx.com/star/201605/20160531151803699.jpg' },
        { url: 'https://imgcache.cjmx.com/star/201605/20160531151803428.jpg' },
        { url: 'https://imgcache.cjmx.com/star/201605/20160531151803644.jpg' },
        { url: 'https://imgcache.cjmx.com/star/201605/20160531151803683.jpg' },
      ]
    }
    this.renderBaner = this.renderBaner.bind(this)
  }

  renderBaner() {
    return (this.state.data.map((item, key) => {
      console.log(item.url)
      return (<Image source={{ uri: item.url }} key={key} style={{ width: CommonStyle.screen_width, height: CommonStyle.screen_height / 2 }} />)
    }))

  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          autoplay={true}
          loop={true}
          height={CommonStyle.screen_height / 2}
          dot={<View style={styles.dotViewStyle} />}
          activeDot={<View style={styles.activeDotStyle} />}
          paginationStyle={styles.paginationStyle}
        >
          {this.renderBaner()}
        </Swiper>
        <View style={{ flex: 2 }}>
          <Text>123456</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  dotViewStyle: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDotStyle: {
    backgroundColor: 'white',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  paginationStyle: {
    bottom: 3,
  },
})

export default Message