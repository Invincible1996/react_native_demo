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
  View
} from 'react-native';
import { StackNavigator, TabNavigator } from "react-navigation";

import Home from './src/pages/Home'
import Message from './src/pages/Message'
import Person from './src/pages/Person'


const TabConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
      activeTintColor: '#ff9000',
      //tabBarComponent: 'TabBarBottom',
      inactiveTintColor: '#666666',
      indicatorStyle: { height: 0 },
      showIcon: true,
      labelStyle: {
          fontSize: 12,
          top: -4,
          //color:'#666666',
      },
      style: {
          backgroundColor: '#0ff',
          height: 50,
          //flex:1,
          //top:-60
      },
  },
  lazy: true,
  animationEnabled: false,
}

const HomeNav = TabNavigator({
  Home: { screen: Home },
  Message: { screen: Message },
  Person: { screen: Person },
})

const StackNav = StackNavigator({
  HomeNav: { screen: HomeNav }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
export default StackNav;
