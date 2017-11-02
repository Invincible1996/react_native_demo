import React, { Component, } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native'

import BasePage from '../component/BasePage'

import CommonStyle from '../component/CommonStyle'
class Photos extends BasePage {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '上传图片',
      headerRight: (<View />),
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      images: [
        { title: 'kobe1', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
        { title: 'kobe2', url: 'https://i0.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-4.jpg' },
        { title: 'kobe3', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
        { title: 'kobe4', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-1.jpg' },
      ]
    }

    this.addPotos = this.addPotos.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.renderImages = this.renderImages.bind(this)
    this.renderImageList = this.renderImageList.bind(this)
  }

  addPotos() {
    console.log('456456456456456')
  }

  renderHeader() {
    return (
      <TouchableOpacity
        onPress={this.addPotos}
        style={{ backgroundColor: '#55393A3F', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text>添加照片</Text>
      </TouchableOpacity>
    )
  }

  goToBigImage() {
    alert('预览')
  }

  renderImages({ item }) {
    return (<TouchableOpacity 
      activeOpacity={1.0}
      style={{ margin: 2 }} 
      onPress={this.goToBigImage}>
      <Image source={{ uri: item.url }} style={{ width: CommonStyle.screen_width / 3 - 8, height: CommonStyle.screen_width / 3 - 8 }} />
    </TouchableOpacity>)
  }

  keyExtractor(item) {
    return item.title
  }

  renderImageList() {
    return (
      <View style={{padding:5}}>
        <FlatList
          numColumns={3}
          data={this.state.images}
          renderItem={this.renderImages}
          keyExtractor={this.keyExtractor}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{ padding: 0, flex: 1 }}>
        <View style={{padding:5}}>
        {this.renderHeader()}
        </View>
        {this.renderImageList()}
      </View>
    )
  }
}

export default Photos