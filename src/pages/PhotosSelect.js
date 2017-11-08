import React, { Component, } from 'react'
import { View, Text, WebView, TouchableOpacity, FlatList, Image, CameraRoll, StyleSheet } from 'react-native'

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
            page_info: {},
            images: []
        }

        this.clickSave = this.clickSave.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.goToBigImage = this.goToBigImage.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }

    componentWillMount() {
        this.props.navigation.setParams({ clickParams: this.clickSave, count: this.state.count })
    }

    componentDidMount() {
        CameraRoll.getPhotos({
            //groupTypes: 'PhotoStream',
            assetType: 'Photos',//mediaType,//All, Videos, Photos
            first: 21
        })
            .then(res => this.setState({ images: res.edges, page_info: res.page_info }))
            .catch(error => this.setState({ isError: true }))
    }

    clickSave() {
        const { navigate, goBack, state } = this.props.navigation;
        // state.params.callBack(this.state.subCateId,this.goodsList);
        goBack(null)
    }

    goToBigImage(item) {
        // console.log('gotobigimage',item.index)
        this.setState({ count: (this.state.count) + 1 }, () => console.log('--------', this.state.count))
    }

    renderItem(item) {
        return (<TouchableOpacity
            activeOpacity={1.0}
            style={{ margin: 3, borderColor: '#ddd', borderWidth: 1 }}
            onPress={() => this.goToBigImage(item)}>
            <Image
                source={{ uri: item.item.node.image.uri }}
                style={{ width: CommonStyle.screen_width / 3 - 8, height: CommonStyle.screen_width / 3 - 8 }} />
        </TouchableOpacity>)
    }

    keyExtractor(item, index) {
        return index
    }

    loadMore() {
        if (this.state.images.length > 0 && this.state.page_info.has_next_page) {
            CameraRoll.getPhotos({
                //groupTypes: 'PhotoStream',
                assetType: 'Photos',//All, Videos, Photos
                first: 21,
                after: this.state.page_info.end_cursor
            })
                .then((res) => {
                    let newEdges = this.state.images.concat(res.edges)
                    this.setState({
                        images: newEdges,
                        page_info: res.page_info
                    })
                })
        }
    }

    render() {
        console.log('this.state.images', this.state.images)
        return (<View style={styles.container}>
            <View style={{ flex: 1 }}>
                <FlatList
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.3}
                    numColumns={3}
                    data={this.state.images}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
            </View>
            <View style={{ backgroundColor: '#393A3F', padding: 15 }}>
                <Text style={{ color: 'white', alignSelf: 'flex-end' }}>{`已选择(${this.state.count})`}</Text>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    }
})