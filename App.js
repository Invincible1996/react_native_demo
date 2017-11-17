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
import { 
  StackNavigator,
  TabNavigator, 
  DrawerNavigator
  } from "react-navigation";

import Home                     from './src/pages/Home'
import Message                  from './src/pages/Message'
import Person                   from './src/pages/Person'
import BaiduMap                 from './src/pages/BaiduMap'
import DrawerPage               from './src/pages/DrawerPage'
import Photos                   from './src/pages/Photos'
import Search                   from './src/pages/Search'
import WebPage                  from './src/pages/WebPage'
import TextInputTest            from './src/pages/TextInputTest'
import PhotosSelect             from './src/pages/PhotosSelect'
import ReceiveData              from './src/pages/ReceiveData'
import VideoPlayer              from './src/pages/VideoPlayer'
import MusicPlayer              from './src/pages/MusicPlayer'
import TabLayout                from './src/pages/TabLayoutTest'
import ModalTest                from './src/pages/ModalTest'


const TabConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#393A3F',
    //tabBarComponent: 'TabBarBottom',
    inactiveTintColor: '#9c9c9c',
    indicatorStyle: { height: 0 },
    showIcon: true,
    labelStyle: {
      fontSize: 13,
      top: -8,
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
  initialRouteName: 'Person',
}))

// const DrawerNav = DrawerNavigator({
//   Home: { screen: HomeNav },
//   DrawerPage: { screen: DrawerPage }
// })

const StackNav = StackNavigator({
  // DrawerNav: { screen: DrawerNav },
  HomeNav: { screen: HomeNav },
  BaiduMap: { screen: BaiduMap },
  Photos: { screen: Photos },
  Search: { screen: Search },
  WebPage: { screen: WebPage },
  TextInputTest: { screen: TextInputTest },
  PhotosSelect: { screen: PhotosSelect },
  ReceiveData: { screen: ReceiveData },
  VideoPlayer: { screen: VideoPlayer },
  MusicPlayer: { screen: MusicPlayer },
  TabLayout: { screen: TabLayout },
  ModalTest: { screen: ModalTest },
}, {
    initialRouteName: 'HomeNav',
    navigationOptions: ({ navigation }) => ({
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: '#393A3F',
        elevation: 0,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#ff9000',
        shadowOpacity: 10,
        shadowRadius: 5,
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontSize: 16,
        alignSelf: 'center'
      },
      headerRight: (<View></View>)
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
