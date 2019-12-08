import React, { Component } from 'react';
import {StyleSheet, Text, View, Menu, Platform,
  Image, Button, FlatList, TouchableOpacity, AsyncStorage, Alert, ImageBackground, AppRegistry} from 'react-native';

import Store from './../../global/store/Store'
import * as cfg from "./../../Config";
import AlertPro from "react-native-alert-pro";


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

  _checkToUMenu(param){
    if (Store.Flog == '1' && param == 1)
        this.props.navigation.openDrawer();
    else if (Store.Flog == '1' && param == 2)
        this.props.navigation.navigate('Dashboard');
    else if (Store.Flog == '1' && param == 3)
        this.props.navigation.navigate('Profil');
    else
        this.AlertPro.open();
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: !this.props.colorTheme ? cfg.PRIMARY : this.props.colorTheme}]}>
        <View style={{flex: 0.3, justifyContent:'center', paddingLeft: 10}}>
          <TouchableOpacity onPress={() => this._checkToUMenu(1)}>
            <Image source={require('./../../picture/header/openDrawer.png')} style={{width:24, height:24}}/>
          </TouchableOpacity>
        </View>

        <View style={{flex: 0.4}}>
          <TouchableOpacity style={styles.containerLogo} onPress={() => this._checkToUMenu(2)}>
            <Image
              style={{flex: 1, height: undefined, width: undefined}}
              source={require('./../../picture/header/dunelogo.png')}
              resizeMode="contain"
              />
          </TouchableOpacity>
        </View>

        <View style={{flex: 0.3, justifyContent:'center', alignItems:'flex-end', paddingRight: 10}}>
          <TouchableOpacity onPress={() => this._checkToUMenu(3)}>
            <Image
              style={{height: 32, width: 32}}
              source={require('./../../picture/header/profil.png')}
              resizeMode="contain"
              />
          </TouchableOpacity>
        </View>

        <AlertPro
           ref={ref => {
             this.AlertPro = ref;
           }}
           onConfirm={() => this.AlertPro.close()}
           showCancel={false}
           title="ATTENTION !"
           message="Vous devez accepter les conditions d'utilisation avant de pouvoir utiliser l'application."
           textConfirm="COMPRIS"
           closeOnPressMask={true}
           customStyles={{
             mask: {
               backgroundColor: "transparent"
             },
             container: {
               borderWidth: 1,
               borderColor: "#ea4335",
               shadowColor: "#000000",
               shadowOpacity: 0.1,
               shadowRadius: 10
             },
             buttonConfirm: {
               backgroundColor: "#ea4335"
             }
           }}
         />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    elevation: 5,
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
