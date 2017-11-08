import React, { Component, } from 'react'
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native'
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
        <ScrollView style={{flex:1}}>
          <Swiper
            autoplay={true}
            loop={true}
            height={CommonStyle.screen_height / 3}
            dot={<View style={styles.dotViewStyle} />}
            activeDot={<View style={styles.activeDotStyle} />}
            paginationStyle={styles.paginationStyle}
          >
            {this.renderBaner()}
          </Swiper>
          <View style={{ flex: 2, backgroundColor: '#eee', padding: 5,margin:10,borderRadius:5 }}>
            <Text style={{ color: 'blue' }}>    独自空等 我怕你会不知这份爱 多么想告知你其实我 一生只爱你一人仍愿意痴心为你等就在雨夜 你悄悄的走过已占据 初恋里我的心凝望你今天 走到我身旁来让我讲一声 I LOVE YOU冷雨悄悄停吧 天真的心因为你那管多风雨天 仍和你一起告诉你我其实 多么的想你其实我 我真的爱着你独自空等 我怕你会不知这份爱 多么想告知你其实我 一生只爱你一人仍愿意痴心为你等就在雨夜 你悄悄的走过已占据 初恋里我的心凝望你今天 走到我身旁来让我讲一声 I LOVE YOU冷雨悄悄停吧 天真的心因为你那管多风雨天 仍和你一起告诉你我其实 多么的想你其实我 我真的爱着你多么想将心里说话告知你告诉你爱是没法逃避但为求陪伴你我一生只想与你 一起冷雨悄悄停吧 天真的心因为你那管多风雨天 仍和你一起告诉你我其实 多么的想你其实我 我真的爱着你(其实我 我多么爱你)</Text>
            <Text style={{ color: 'blue',marginTop:5 }}>    依靠窗前凝着雨,等到夜静已经只感到无法再一起世界像似风已静伤心始终究竟想永远在一起 抱紧你这伤悲爱到梦内万千说话我对你不只为在这歌声中感动你因为爱上你心依然当作我生命自醉心灵全是爱这刻醒来倍感伤感慨 别离始终爱像永远逝去一样天涯求遇见但是无情障碍往昔无情的雨夜向星语诉心愿你回来伤心始终究竟想永远在一起 抱紧你这伤悲爱到梦内万千说话我对你不只为在这歌声中感动你因为爱上你心依然当作我生命自醉心灵全是爱这刻醒来倍感伤感慨 别离始终爱像永远逝去一样天涯求遇见但是无情障碍往昔无情的雨夜向星语诉心愿你回来自醉心灵全是爱这刻醒来倍感伤感慨 别离始终爱像永远逝去一样天涯求遇见但是无情障碍往昔无情的雨夜向星语诉心愿你回来。。。</Text>
          </View>
        </ScrollView>
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