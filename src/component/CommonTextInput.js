import React, { Component, } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default class CommonTextInput extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    onChangeText(text) {
        this.props.onChangeText(text, this.props.titleName)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.text}>{`${this.props.titleName}：`}</Text>
                <TextInput
                    onChangeText={(text) => this.onChangeText(text)}
                    underlineColorAndroid='transparent'
                    style={styles.input} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'red',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    text: {
        color: 'white',
        fontSize: 15
    },
    input: {
        flex: 1,
        padding: 0,
        color: 'white'
    }
})