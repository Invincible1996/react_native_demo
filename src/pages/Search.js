import React, { Component, } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform,Image } from 'react-native'
import Commonstyle from '../component/CommonStyle'

import BaseContainer from '../component/BaseContainer'
@BaseContainer('',true)
export default class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hotData: [
        { title: '休斯顿火箭', url: 'https://www.jd.com' },
        { title: '洛杉矶湖人', url: 'https://nba.hupu.com/teams/lakers' },
        { title: '金州勇士', url: '' },
        { title: '迈阿密热火', url: '' },
        { title: '布鲁克林篮网', url: '' },
        { title: '波士顿凯尔特人', url: '' },
        { title: '圣安东尼奥马刺', url: '' },
        { title: '克利夫兰骑士', url: '' },
      ]
    }

    this.navigate = this.props.navigation.navigate;
    this.back = this.back.bind(this)
    this.goToWedPage = this.goToWedPage.bind(this)

  }

  back() {
    this.props.navigation.goBack();
  }

  goToWedPage(item) {
    this.navigate('WebPage', { title: item.title, url: 'https://yun.kujiale.com/design/3FO4M5GRNYH0/show' })
  }

  renderHotItem(item, key) {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => this.goToWedPage(item)}
        style={{ backgroundColor: Commonstyle.color_blue, padding: 5, borderRadius: 5, margin: 6 }}>
        <Text style={{ color: Commonstyle.color_white }}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  onSearch() {
    console.log('111111111')
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#313237' }}>
        <View style={{ marginTop: Platform.OS === 'ios' ? 18 : 0, backgroundColor: Commonstyle.color_dark, justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.back} style={{ marginRight: 12,flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../res/images/back_white_button.png')}/>
            <Text style={{color:'#fff',fontSize:16}}>返回</Text>
          </TouchableOpacity>
          <TextInput
            returnKeyType='search'
            onSubmitEditing={this.onSearch}
            placeholder='请输入内容'
            underlineColorAndroid='transparent'
            style={{ flex: 1, backgroundColor: '#f7f7f7', borderRadius: 5, padding: 0, marginLeft: 5, height: 25, paddingLeft: 5 }} />
          <TouchableOpacity style={{ padding: 4, backgroundColor: '#eee', marginLeft: 12, borderRadius: 5, padding: 3 }}>
            <Text>搜索</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, backgroundColor: '#f7f7f7', flexDirection: 'column', }}>
          <View style={{ padding: 10, borderBottomColor: '#9c9c9c', borderBottomWidth: 1 }}>
            <Text style={{ marginLeft: 5 }}>你可能喜欢。。。</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10 }}>
            {this.state.hotData.map((item, key) => this.renderHotItem(item, key))}
          </View>
        </View>
      </View>
    )
  }
}

