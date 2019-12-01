import React, { Component } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, TouchableOpacity, Linking,
  AsyncStorage, ImageBackground, Switch} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';

import CustomDrawerItems from './CustomDrawerItem'
import * as cfg from "./../../Config";


import Loading from './../../screen/startPage/Loading';
import Start from './../../screen/startPage/Start';
import ForgottenPass from './../../screen/startPage/ForgottenPass';

import Dashboard from './../../screen/dashboard/Dashboard';
import TermsOfUse from './../../screen/dashboard/TermsOfUse';
import ContactForm from './../../screen/dashboard/ContactForm';

import QRCode from './../../screen/qrcode/Qrcode';

import Profil from './../../screen/userProfil/Profil';
import EditProfilInfo from './../../screen/userProfil/EditProfilInfo';
import EditEmailUser from './../../screen/userProfil/EditEmailUser';
import EditPassUser from './../../screen/userProfil/EditPassUser';

import StudentList from './../../screen/trombinoscope/StudentList';

import StudentProfil from './../../screen/studentProfil/StudentProfil';
import StudentEdit from './../../screen/studentProfil/StudentEdit';
import StudentContainer from './../../screen/studentProfil/StudentContainer';

import ClassList from './../../screen/resultsClass/classList';
import GameList from './../../screen/resultsClass/gameList';
import StudentResultList from './../../screen/resultsClass/studentResultList';

import GamesList from './../../screen/gameStore/GamesList';
import GameProfil from './../../screen/gameStore/GameProfil';
import GameContainer from './../../screen/gameStore/GameContainer';
import UserDemands from './../../screen/gameStore/UserDemands';
import RequestApp from './../../screen/gameStore/RequestApp';
import RateApp from './../../screen/gameStore/RateApp';
import AppNotice from './../../screen/gameStore/AppNotice';

import UserManual from './../../screen/userManual/userManual';


import AddUserDirector from './../../screen/director/AddUserDirector';



const CustomDrawerContentComponent = (props) => (
  <View style={styles.drawerContainer}>
    <ImageBackground source={require('./../../picture/global/imagedunerose.png')} style={{width: '100%', height: '100%'}}>
    <View style={{flex:0.8, justifyContent:'center', alignItems:'center'}}>
    <Image source={require('./../../picture/header/dunelogo.png')}
      style={{flex:0.6, height: '60%', width: '60%', justifyContent: 'center', alignItems: 'center'}}
      resizeMode="contain"/>
    </View>
    <View style={styles.ListItems}>
      <CustomDrawerItems navigation={props.navigation}/>
    </View>
    </ImageBackground>
  </View>
)

const DrawerMenu = createDrawerNavigator(
  {
    'Loading': {screen: Loading},
    'Start': {screen: Start},
    'Dashboard': {screen: Dashboard},
    'Profil': {screen: Profil},
    'EditProfilInfo': {screen: EditProfilInfo},
    'EditEmailUser': {screen: EditEmailUser},
    'EditPassUser': {screen: EditPassUser},
    'StudentList': {screen: StudentList},
    'StudentContainer': {screen: StudentContainer},
    'StudentEdit': {screen: StudentEdit},
    'StudentProfil': {screen: StudentProfil},
    'QRCode': {screen: QRCode},
    'ForgottenPass': {screen: ForgottenPass},
    'GamesList': {screen: GamesList},
    'GameContainer': {screen: GameContainer},
    'GameProfil': {screen: GameProfil},
    'AddUserDirector': {screen: AddUserDirector},
    'UserDemands' : {screen: UserDemands},
    'RequestApp': {screen: RequestApp},
    'RateApp': {screen: RateApp},
    'AppNotice': {screen: AppNotice},

    'UserManual' : {screen: UserManual},

    'ClassList': {screen: ClassList},
    'GameList': {screen: GameList},
    'StudentResultList': {screen: StudentResultList},
    'TermsOfUse' : {screen: TermsOfUse},
    'ContactForm' : {screen: ContactForm},
  },
  {
    initialRouteName: 'Loading',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,

  }
);

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: cfg.PRIMARY,
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
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
