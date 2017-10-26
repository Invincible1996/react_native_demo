/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing
} from 'react-native';
import { StackNavigator, TabNavigator } from "react-navigation";

import Home from './src/pages/Home'
import Message from './src/pages/Message'
import Person from './src/pages/Person'
import BaiduMap from './src/pages/BaiduMap'


const TabConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#000',
    //tabBarComponent: 'TabBarBottom',
    inactiveTintColor: '#666666',
    indicatorStyle: { height: 0 },
    showIcon: true,
    labelStyle: {
      fontSize: 13,
      top: -4,
      //color:'#666666',
    },
    style: {
      backgroundColor: '#fff',
      height: 50,
      //flex:1,
      //top:-60
    },
  },
  lazy: true,
  animationEnabled: false,
  swipeEnabled: false
}

const HomeNav = TabNavigator({
  Home: { screen: Home },
  Message: { screen: Message },
  Person: { screen: Person },
}, Object.assign({}, TabConfig, {
  initialRouteName: 'Home',
}))

const StackNav = StackNavigator({
  HomeNav: { screen: HomeNav },
  BaiduMap: { screen: BaiduMap },
}, {
    initialRouteName: 'HomeNav',
    // initialRouteParams: { projectId: 5 },
    navigationOptions: ({ navigation }) => ({
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: '#0f0',
        elevation: 0,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#ff9000',
        shadowOpacity: 10,
        shadowRadius: 5,
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontSize: 16
      }
    }),
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
export default StackNav;
