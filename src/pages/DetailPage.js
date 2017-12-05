import React, { Component, } from 'react'
import { View, Text, WebView, TouchableOpacity } from 'react-native'
import EmptyView from '../component/EmptyView'
export default class DetailPage extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: '详情',
            headerRight: (<TouchableOpacity
                onPress={navigation.state.params && navigation.state.params.clickParams}
                style={{ marginRight: 5, padding: 5, flexDirection: 'row' }}>
                <Text style={{ color: '#fff' }}>完成</Text>
            </TouchableOpacity>),
        }
    };

    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state
        this.state = {
            index: params.index,
            chooseList: [4,5,6]
        }

        this.chooseList = []
        this.clickSave = this.clickSave.bind(this)
    }

    componentWillMount() {
        this.props.navigation.setParams({ clickParams: this.clickSave })
    }

    clickSave() {
        const { navigate, goBack, state } = this.props.navigation;
        state.params.callBack(this.state.chooseList);
        goBack(null)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>我是详情页面</Text>
            </View>
        )
    }
}