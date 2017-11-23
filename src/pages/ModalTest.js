import React, { Component, } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Platform,
    Modal,
    StyleSheet,
    BackHandler,
    ToastAndroid,
    Al
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import BaseContainer from '../component/BaseContainer'
import CommonStyle from '../component/CommonStyle'
var count = 2;
@BaseContainer("ModalTest")
export default class ModalTest extends Component {

    

    constructor(props){
        super(props)
        this.state={
            showModal: true
        }
    }
   
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
           
            

            return true
        });
    }
    render() {
        return (
            <View style={styles.container}>
             
                <TouchableOpacity onPress={()=>{
                    const backAction = NavigationActions.back()
                    this.props.navigation.dispatch(backAction)
                }}>
                    <Text>back</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});