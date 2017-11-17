import React, { Component, } from 'react'
import { View, Text, WebView, TouchableOpacity, FlatList, Image, CameraRoll, StyleSheet } from 'react-native'

import CommonStyle from '../component/CommonStyle'
import ImageCell from '../cell/ImageCell'

export default class PhotosSelect extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: '选择照片',
            headerRight: (<TouchableOpacity
                onPress={navigation.state.params && navigation.state.params.clickParams}
                style={{ marginRight: 5, padding: 5, flexDirection: 'row' }}>
                <Text style={{ color: '#fff' }}>{`完成(${navigation.state.params && navigation.state.params.count})`}</Text>
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
        this.props.navigation.setParams({ count: (this.state.count) + 1 })
        this.setState({ count: (this.state.count) + 1 }, () => console.log('--------', this.state.count))

    }

    addImgs(index, isSelect) {
        let data = [1, 2, 3, 4, 5]
        let newData = []
        if (isSelect) {
            newData = data.concat(index)
        } else {
            newData = data.splice(index, 1)
        }
        console.log('data', newData)
    }

    renderItem(item) {
        return (<ImageCell item={item} addImgs={this.addImgs} />)
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
                    extraData={this.state}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.3}
                    numColumns={3}
                    data={this.state.images}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
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