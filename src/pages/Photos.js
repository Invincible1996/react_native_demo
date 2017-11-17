import React, { Component, } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, FlatList, Platform, NativeModules } from 'react-native'

import CommonStyle from '../component/CommonStyle'
let ImagePicker = NativeModules.PickerModule
import BaseContainer from '../component/BaseContainer'
@BaseContainer("上传图片")
class Photos extends Component {

  constructor(props) {
    super(props)
    this.state = {
      images: [
        // {
        //   title: 'kobe1',
        //   url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg'
        // },
        // {
        //   title: 'kobe2',
        //   url: 'https://i0.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-4.jpg'
        // },
        // {
        //   title: 'kobe3',
        //   url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg'
        // },
        // {
        //   title: 'kobe4',
        //   url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-1.jpg'
        // },
        // {
        //   title: 'kobe7',
        //   url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-1.jpg'
        // },
        // {
        //   title: 'kobe8',
        //   url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-1.jpg'
        // },
        // {
        //   title: 'kobe5',
        //   url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-1.jpg'
        // },
        // {
        //   title: 'kobe6',
        //   url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-1.jpg'
        // },
        // {
        //   title: 'kobe9',
        //   url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-1.jpg'
        // },
        // {
        //   title: 'kobe10',
        //   url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-1.jpg'
        // },
        // {
        //   title: 'kobe11',
        //   url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-1.jpg'
        // },
        // {
        //   title: 'kobe12',
        //   url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-1.jpg'
        // },
      ]
    }
    this.navigate = this.props.navigation.navigate;

    this.addPotos = this.addPotos.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.renderImages = this.renderImages.bind(this)
    this.renderImageList = this.renderImageList.bind(this)
  }

  addPotos() {
    if (Platform.OS === 'android') {
      // alert('打开安卓原生相册')
      ImagePicker.openPicker(null,).then(e => console.log('e', e));
    } else {
      this.navigate('PhotosSelect')
    }
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
      style={{ marginTop: 8, marginBottom: 8, marginLeft: 3, marginRight: 3, backgroundColor: 'red' }}
      onPress={this.goToBigImage}>
      <Image source={{ uri: item.url }} style={{ width: CommonStyle.screen_width / 3 - 10, height: CommonStyle.screen_width / 3 - 10 }} />
      <TouchableOpacity style={{ position: 'absolute', right: -6, top: -8 }}>
        <Image source={require('../res/images/deleteImage.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </TouchableOpacity>)
  }

  keyExtractor(item) {
    return item.title
  }

  renderImageList() {
    return (
      <View style={{ padding: 5, flex: 1 }}>
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
        <View style={{ padding: 5 }}>
          {this.renderHeader()}
        </View>
        {this.renderImageList()}
      </View>
    )
  }
}

export default Photos