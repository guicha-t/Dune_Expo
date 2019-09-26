import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import { Provider} from 'mobx-react';


import DrawerMenu from './src/global/navigation/DrawerMenu';
import Store from './src/global/store/Store';

export default class App extends Component<Props> {
  render() {
    return (
      <View style={{flex: 1, paddingTop: STATUSBAR_HEIGHT, backgroundColor: "#FEE599"}}>
          <StatusBar
          barStyle="dark-content"
          />
         <Provider Store={Store}>
          <DrawerMenu />
        </Provider>
      </View>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;


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
