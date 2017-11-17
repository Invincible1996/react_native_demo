import React, { Component, } from 'react'
import { View, Text } from 'react-native'

export default (title, isShowNavigation) => (ComposedComponent) => class extends Component {

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
    this.state = { data: '2' };
  }
  // componentDidMount() {
  //   this.setState({ data: 'Hello' });
  // }
  render() {
    return <ComposedComponent {...this.props} data={this.state.data} />;
  }
};

