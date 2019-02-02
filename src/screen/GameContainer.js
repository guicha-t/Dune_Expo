import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image } from 'react-native';
import { observer } from 'mobx-react';
import { createBottomTabNavigator } from 'react-navigation';

import Header from './../global/header/Header';
import Store from './../global/store/Store';

import StudentProfil from './GameProfil';
import StudentHistory from './StudentHistory';

const Tabs = createBottomTabNavigator({
  'Profil': StudentProfil,
  'Historique': StudentHistory,
}, {
  tabBarOptions: {
    activeBackgroundColor: '#e5c35c',
    inactiveBackgroundColor:'#FEE599',
    showIcon: false,
    showLabel: true,
  }
});

@observer
export default class GameContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id', 'Unknown'),
    }
  }

  render() {
      const screenProps = {navigation: this.props.navigation, id: this.props.navigation.getParam('id', 'Unknown')}

      return (
        <View style={{flex: 1}}>
          <Header navigation={this.props.navigation}/>
          <Tabs screenProps={screenProps}/>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
  });
