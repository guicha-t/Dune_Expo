import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Store from './../global/store/Store'

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const localId = await AsyncStorage.getItem('localId');
    const localToken = await AsyncStorage.getItem('localToken');
    const localType = await AsyncStorage.getItem('localType');


    if (localId) {
      Store.setIdUser(localId)
      Store.setToken(localToken)
      Store.setTypeUser(localType)
    }
    this.props.navigation.navigate(localId ? 'Dashboard' : 'Start');
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
    backgroundColor: '#FEE599',
  },
});
