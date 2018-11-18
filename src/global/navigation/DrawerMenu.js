import React, { Component } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, TouchableOpacity, Linking, AsyncStorage} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';

import CustomDrawerItems from './CustomDrawerItem'

import Start from './../../screen/Start';
import Dashboard from './../../screen/Dashboard';
import Profil from './../../screen/Profil';
import QRCode from './../../screen/Qrcode';
import Loading from './../../screen/Loading';
import ForgottenPass from './../../screen/ForgottenPass';
import EditProfilInfo from './../../screen/EditProfilInfo';

const CustomDrawerContentComponent = (props) => (
  <View style={styles.drawerContainer}>
    <Image source={require('./../../picture/header/dunelogo.png')}
      style={{flex:0.6, height: undefined, width: undefined}}
      resizeMode="contain"/>
    <View style={styles.ListItems}>
      <CustomDrawerItems navigation={props.navigation}/>
    </View>
    <View style={styles.drawerFooter}>
    </View>
  </View>
)

const DrawerMenu = createDrawerNavigator(
  {
    'Loading': {screen: Loading},
    'Start': {screen: Start},
    'Dashboard': {screen: Dashboard},
    'Profil': {screen: Profil},
    'EditProfilInfo': {screen: EditProfilInfo},
    'QRCode': {screen: QRCode},
    'ForgottenPass': {screen: ForgottenPass},
  },
  {
    initialRouteName: 'Loading',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,

  }
);

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: '#FEE599',
    flex: 1,
    paddingTop: 24,
  },
  ListItems: {
    flex: 1,
  },
  drawerFooter: {
    flex:0.4,
    borderTopWidth: 1,
    borderTopColor: '#FEE599',
  },
  topFooter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

});

export default DrawerMenu;
