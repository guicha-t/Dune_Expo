import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Alert,
} from 'react-native';

import Store from './../../global/store/Store'

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const localId = await AsyncStorage.getItem('localId');
    const localToken = await AsyncStorage.getItem('localToken');
    const localType = await AsyncStorage.getItem('localType');

    fetch('http://176.31.252.134:7001/api/v1/tokens/verifyToken', {
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
        <ActivityIndicator />
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
