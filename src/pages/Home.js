import React, { Component, } from 'react'
import { View, StyleSheet, Text, Image, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Commonstye from '../component/CommonStyle'
import LoadingPage from '../component/LoadingPage'
class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '首页',
      tabBarLabel: '首页',
      headerStyle: {
        backgroundColor: '#0f0'
      },
      headerLeft: (<View />),
      headerTitleStyle: {
        fontSize: 16
      },
      tabBarVisible: true,
      headerTintColor: '#ffffff',
      tabBarIcon: ({ tintColor, focused }) => (<Icon name="home" size={24} color={focused ? tintColor : '#9c9c9c'} />)
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true
    }

    this.renderItem=this.renderItem.bind(this)
    this.ListFooterComponent=this.ListFooterComponent.bind(this)
  }

  componentDidMount() {
    this.getMoviesFromApi()
    // this.getNetData()
  }

  async getMoviesFromApi() {
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch('https://japi.juhe.cn/joke/img/text.from?key=8aad35fd1e3384b259293e9f491cab5e&page=1&pagesize=10');
      let responseJson = await response.json();
      console.log('responseJson', responseJson.result.data)
      this.setState({
        data: responseJson.result.data,
        isLoading:false
      }, () => console.log('this,state,data', this.state.data))
      // return responseJson.movies;
    } catch (error) {
      console.error(error);
    }
  }

  async getNetData() {

  }

  renderItem({ item }) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', margin: 5, padding: 5, borderRadius: 5 }}>
        <Text>{item.content}</Text>
        <Image source={{ uri: item.url }} style={{ width: 200, height: 100, margin: 5 }} />
        <Text style={{ alignSelf: 'flex-end' }}>{item.updatetime}</Text>
      </View>
    )
  }

  keyExtractor(item) {
    console.log('item', item)
    return item.content
  }

  ListFooterComponent() {
    if(this.state.data && this.state.data.length >0){
      return (<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: null, padding: 10 }}>
      <Text>没有更多数据。。</Text>
    </View>)
    }else{
      return(<View/>)
    }
   
  }

  render() {
    return (
      <View style={styles.container}>
       
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ListFooterComponent={this.ListFooterComponent}
        />
        {this.state.isLoading && <LoadingPage/>}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
})
export default Home