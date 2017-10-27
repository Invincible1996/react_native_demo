import React, { Component, } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import BasePage from '../component/BasePage'
import Commonstyle from '../component/CommonStyle'

class Search extends BasePage {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };
  constructor(props) {
    super(props)
    this.state = {
      hotData: [
        { title: '休斯顿火箭' },
        { title: '洛杉矶湖人' },
        { title: '金州勇士' },
        { title: '迈阿密热火' },
        { title: '布鲁克林篮网' },
        { title: '波士顿凯尔特人' },
        { title: '圣安东尼奥马刺' },
        { title: '克利夫兰骑士' },
      ]

    }
    this.back = this.back.bind(this)
  }

  back() {
    this.props.navigation.goBack();
  }

  renderHotItem(item, key) {

    return (
      <TouchableOpacity
        key={key}
        style={{ backgroundColor: Commonstyle.color_blue, padding: 5, borderRadius: 5, margin: 6 }}>
        <Text style={{ color: Commonstyle.color_white }}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  onSearch() {
    alert('111111111')
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Commonstyle.color_blue }}>
        <View style={{ marginTop: Platform.OS === 'ios' ? 18 : 0, backgroundColor: Commonstyle.color_blue, justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.back} style={{ marginRight: 12 }}>
            <Text >返回</Text>
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

export default Search