import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../global/header/Header';
import Store from './../global/store/Store'

@observer
export default class StudentHistory extends Component {

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('./../picture/profil/evolution.png')} style={{width:32, height:32}}/>
    }
  }

  render() {
      const { navigation, idStudent, screenProps } = { ...this.props };

      return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>EVOLUTION</Text>
            <Text>ID Eleve: {screenProps.idStudent}</Text>

          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
  });
