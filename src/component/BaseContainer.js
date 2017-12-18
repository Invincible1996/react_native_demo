import React, { Component, } from 'react'
import { View, Text } from 'react-native'

export default (title, isShowNavigation, url) => (ComposedComponent) => class extends Component {

  static navigationOptions = ({ navigation }) => {
    if (isShowNavigation) {
      return {
        header: null
      }
    }
    return {
      headerTitle: title,
      headerBackTitleStyle: '返回',
    }
  }
  constructor(props) {
    super(props)
    console.log('title', title)
    this.state = {
      data: []
    };

    this.query = this.query.bind(this)
  }
  componentDidMount() {
    // this.setState({ data: 'Hello' });
  }

  async query(url) {
    try {
      console.log('url', url)
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      // console.log('Config:', Config)
      // console.log('api:', Config.applicationId + '--' + Config.API)
      // let response = await fetch(Config.API);
      let response = await fetch(url);
      let responseJson = await response.json();
      console.log('responseJson', responseJson)
      // this.setState({
      //   data: responseJson.data
      // })
      return responseJson.data;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return <ComposedComponent {...this.props} data={this.state.data} query={() => this.query(url)} />;
  }
};

