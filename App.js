import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import { Provider} from 'mobx-react';


import DrawerMenu from './src/global/navigation/DrawerMenu';
import Store from './src/global/store/Store';

export default class App extends Component<Props> {
  render() {
    return (
      <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
        <StatusBar
           barStyle="dark-content"
           backgroundColor="#F5FCFF"
           />
        <Provider Store={Store}>
          <DrawerMenu />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
