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

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const localId = await AsyncStorage.getItem('localId');
    const localToken = await AsyncStorage.getItem('localToken');
    const localType = await AsyncStorage.getItem('localType');

    fetch('http:/51.38.187.216:9000/api/v1/tokens/verifyToken', {
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
      if ((responseJson.response != 'Token valid') && (localToken))
      {
        AsyncStorage.clear();
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
        <BarIndicator color='#363453'/>
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
