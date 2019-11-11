import React, { Component } from 'react';
import {StyleSheet, Text, View, Menu, Platform,
  Image, Button, FlatList, TouchableOpacity, AsyncStorage, Alert, ImageBackground, AppRegistry} from 'react-native';

import Store from './../../global/store/Store'
import * as cfg from "./../../Config";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.checkIsLogToken();
  }


  async _removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }


  checkIsLogToken = async () => {
    fetch(cfg.API_URL + '/tokens/verifyToken', {
      method: 'POST',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        token: Store.Token,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.response != 'Token valid') {
        this._removeItemValue("localToken")
        this._removeItemValue("localType")
        Store.setToken('');
        Store.setTypeUser('')
        Store.setIsLog(false);
        Alert.alert('Session expirée - Déconnexion');
        this.props.navigation.navigate('Start');
        }
      })
      .catch((error) => {
      console.error(error);
    });
  };


  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 0.3, justifyContent:'center', paddingLeft: 10}}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image source={require('./../../picture/header/openDrawer.png')} style={{width:24, height:24}}/>
          </TouchableOpacity>
        </View>

        <View style={{flex: 0.3}}>
          <TouchableOpacity style={styles.containerLogo} onPress={() => this.props.navigation.navigate('Dashboard')}>
            <Image
              style={{flex: 1, height: undefined, width: undefined}}
              source={require('./../../picture/header/dunelogo.png')}
              resizeMode="contain"
              />
          </TouchableOpacity>
        </View>

        <View style={{flex: 0.3, justifyContent:'center', alignItems:'flex-end', paddingRight: 10}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profil')}>
            <Image
              style={{height: 32, width: 32}}
              source={require('./../../picture/header/profil.png')}
              resizeMode="contain"
              />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: cfg.PRIMARY,
    borderBottomColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  containerMenu: {
    paddingLeft: 10,
  },
  containerLogo: {
    flex: 1,
  },
  containerProfil: {
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
});
