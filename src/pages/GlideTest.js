import React, { Component, } from 'react'
import { View, Text, Image, NativeModules, TouchableOpacity, ScrollView } from 'react-native'
import CommonStyle from '../component/CommonStyle'

export default class GlideTest extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'GlideTest',
            headerBackTitleStyle: '返回',

        }
    };

    constructor(props) {
        super(props)
        this.state = {
            isSelect: false,
            backIndex: -1,
            path: '',
            chooseList: [],
            isChoosed:false,
            data: [
                { title: '火箭' },
                { title: '湖人' },
                { title: '勇士' },
                { title: '森林狼' },
                { title: '热火' },
                { title: '骑士' },
                { title: '76人' },
            ],
          
        }
    }

    componentDidMount() {

    }

    goToDetailPage(item, key) {
        this.props.navigation.navigate('DetailPage', {
            index: key,
            callBack: (data) => {
                console.log('data', data)
                this.setState({
                    chooseList: data
                }, () => {
                    console.log(this.state.chooseList)
                })
            }
        })
    }

    isSelect(key) {
        
        // return this.state.chooseList.includes(key)
        return this.state.chooseList.some((item, keys, a)=>{
            if(keys == key) {
                console.log('-------', item, keys, a, key)
                return true;
            }
        })

    }

    renderItem(item, key) {

        return (
            <TouchableOpacity key={key} style={{
                padding: 10,
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}
                onPress={() => this.goToDetailPage(item, key)}
            >
                <Text>{item.title}</Text>
                {this.isSelect(key) && <Text style={{ color: 'red' }}>已选择</Text>}
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f7f7f7', }}>
                <ScrollView>
                    {this.state.data.map((item, key) => this.renderItem(item, key))}
                </ScrollView>
            </View>
        )
    }
}