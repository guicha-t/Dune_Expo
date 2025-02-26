import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Alert,
} from 'react-native';

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

import Store from './../../global/store/Store'
import Header from './../../global/header/Header';
import * as cfg from "./../../Config";

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
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


  _bootstrapAsync = async () => {

    this.props.navigation.navigate('Start');

    const localId = await AsyncStorage.getItem('localId');
    const localToken = await AsyncStorage.getItem('localToken');
    const localType = await AsyncStorage.getItem('localType');
    const localDarkMode = await AsyncStorage.getItem('darkMode')


    fetch(cfg.API_URL + '/tokens/verifyToken', {
      method: 'POST',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        token: localToken,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if (localDarkMode === "true"){
        Store.EnableDarkTheme(true)
      } else {
        Store.EnableDarkTheme(false)
      }
      if ((responseJson.response != 'Token valid') && (localToken))
      {
        this._removeItemValue("localToken")
        this._removeItemValue("localType")
        Store.setToken('');
        Store.setTypeUser('')
        Store.setIsLog(false);
        Alert.alert('Session expirée - Déconnexion');
        this.props.navigation.navigate('Start');
      }
      else {
        if (localToken) {
          Store.setToken(localToken)
          Store.setTypeUser(localType)
        }
        this.props.navigation.navigate(localToken ? 'Dashboard' : 'Start');
      }

      })
      .catch((error) => {
      console.error(error);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <BarIndicator color={cfg.SECONDARY}/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
});
