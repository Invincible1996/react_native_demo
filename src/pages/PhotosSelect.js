import React, { Component, } from 'react'
import { View, Text, WebView, TouchableOpacity, FlatList, Image } from 'react-native'

import EmptyView from '../component/EmptyView'
import CommonStyle from '../component/CommonStyle'

export default class PhotosSelect extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: '选择照片',
            headerRight: (<TouchableOpacity
                onPress={navigation.state.params && navigation.state.params.clickParams}
                style={{ marginRight: 5, padding: 5, flexDirection: 'row' }}>
                <Text style={{ color: '#fff' }}>完成</Text>
            </TouchableOpacity>),
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            images: [
                { title: 'kobe1', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
                { title: 'kobe2', url: 'https://i0.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-4.jpg' },
                { title: 'kobe3', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
                { title: 'kobe4', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-1.jpg' },
                { title: 'kobe5', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
                { title: 'kobe6', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
                { title: 'kobe7', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-4.jpg' },
                { title: 'kobe8', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
                { title: 'kobe9', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
                { title: 'kobe10', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
                { title: 'kobe11', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-4.jpg' },
                { title: 'kobe12', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
                { title: 'kobe13', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
                { title: 'kobe14', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
                { title: 'kobe15', url: 'https://i2.letvimg.com/lc04_crawler/201710/31/23/05/1509462330636-2.jpg' },
            ]
        }

        this.clickSave = this.clickSave.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.goToBigImage = this.goToBigImage.bind(this)
    }

    componentWillMount() {
        this.props.navigation.setParams({ clickParams: this.clickSave, count: this.state.count })
    }

    clickSave() {
        const { navigate, goBack, state } = this.props.navigation;
        // state.params.callBack(this.state.subCateId,this.goodsList);
        // setTimeout(()=>goBack(null),0)
        goBack(null)
    }

    goToBigImage(item) {
        // console.log('gotobigimage',item.index)
        this.setState({ count: (this.state.count) + 1 }, () => console.log('--------', this.state.count))
    }

    renderItem(item) {
        return (<TouchableOpacity
            activeOpacity={1.0}
            style={{ margin: 4 }}
            onPress={() => this.goToBigImage(item)}>
            <Image source={{ uri: item.item.url }} style={{ width: CommonStyle.screen_width / 3 - 8, height: CommonStyle.screen_width / 3 - 8 }} />
        </TouchableOpacity>)
    }

    keyExtractor(item) {
        return item.title
    }

    render() {
        return (<View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    numColumns={3}
                    data={this.state.images}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
            </View>
            <View style={{ backgroundColor: '#393A3F', padding: 10 }}>
                <Text style={{ color: 'white', alignSelf: 'flex-end' }}>{`已选择(${this.state.count})`}</Text>
            </View>
        </View>)
    }
}