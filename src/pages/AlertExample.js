import React, { Component, } from 'react'
import { View, TouchableOpacity, Text, Alert } from 'react-native'
import CommomAlert from '../component/CommonAlert'

import BaseContainer from '../component/BaseContainer'

@BaseContainer("AlertExample", '', 'http://192.168.250.175:3000/prod/data')
class AlertExample extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowAlert: false
    }
    this.showAlter = this.showAlter.bind(this)
  }

  showAlter() {
    this.setState({ isShowAlert: true })
  }

  componentDidMount() {
    this.props.query().then((result) =>{
      console.log('result',result);
    })
    //console.log('this.props.data', data)
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#0ff', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={this.showAlter}
          style={{ backgroundColor: 'red', padding: 15, borderRadius: 5 }}>
          <Text style={{ color: '#fff' }}>点击弹出提示框</Text>
        </TouchableOpacity>
        {this.state.isShowAlert && <CommomAlert isShowAlert={this.state.isShowAlert} title='Are you sure to exit' />}
      </View>
    )
  }
}

export default AlertExample