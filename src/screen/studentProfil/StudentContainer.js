import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image } from 'react-native';
import { observer } from 'mobx-react';
import { createBottomTabNavigator } from 'react-navigation';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';

import StudentProfil from './StudentProfil';
import StudentHistory from './StudentHistory';
import * as cfg from "./../../Config";


const Tabs = createBottomTabNavigator({
  'Historique': StudentHistory,
  'Profil': StudentProfil,
}, {
  initialRouteName: 'Historique',
  tabBarOptions: {
    activeBackgroundColor: '#f2b88c',

    inactiveBackgroundColor:"#fcc296",
    showIcon: true,
    showLabel: false,
  }
});

@observer
export default class StudentContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      idStudent: this.props.navigation.getParam('idStudent', 'Unknown'),
      idBack: this.props.navigation.getParam('idBack', 'Unknown'),
      idGameType: this.props.navigation.getParam('ididGameType', 'Unknown'),

    }
  }

  render() {
      const screenProps = {
        navigation: this.props.navigation,
        idStudent: this.props.navigation.getParam('idStudent', 'Unknown'),
        idBack: this.props.navigation.getParam('idBack', 'Unknown'),
        idGameType: this.props.navigation.getParam('idGameType', 'Unknown'),
      }

      return (
        <View style={{flex: 1}}>
          <Header navigation={this.props.navigation} colorTheme={"#fcc296"}/>
          <Tabs screenProps={screenProps}/>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
  });
