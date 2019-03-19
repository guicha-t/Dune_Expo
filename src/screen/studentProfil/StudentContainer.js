import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image } from 'react-native';
import { observer } from 'mobx-react';
import { createBottomTabNavigator } from 'react-navigation';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';

import StudentProfil from './StudentProfil';
import StudentHistory from './StudentHistory';

const Tabs = createBottomTabNavigator({
  'Profil': StudentProfil,
  'Historique': StudentHistory,
}, {
  tabBarOptions: {
    activeBackgroundColor: '#e5c35c',
    inactiveBackgroundColor:'#FEE599',
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
    }
  }

  render() {
      const screenProps = {
        navigation: this.props.navigation,
        idStudent: this.props.navigation.getParam('idStudent', 'Unknown'),
        idBack: this.props.navigation.getParam('idBack', 'Unknown'),
      }

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
