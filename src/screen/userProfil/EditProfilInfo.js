import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage, KeyboardAvoidingView,
Dimensions} from 'react-native';
import { observer } from 'mobx-react';
import {Button, Icon, Divider } from 'react-native-elements';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'
import * as cfg from "./../../Config";

var {height, width} = Dimensions.get('window');

@observer
export default class EditProfilInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.navigation.getParam('name', 'Unknown'),
      lastname: this.props.navigation.getParam('lastname', 'Unknown'),
      id: this.props.navigation.getParam('id', 'Unknown'),
      password: '',
      email: this.props.navigation.getParam('email', 'Unknown'),
      oldpassword: '',
      newpassword: '',
      newpasswordbis: '',
      pwdhide: true,
      hideIcon: 'eye',
    }
  }

  _cancelEdit = async () => {
    this.props.navigation.navigate('Profil');
  };

  _confirmEditName = async () => {
    fetch(cfg.API_URL + '/users/update', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        idUser: this.state.id,
        nomUser: this.state.lastname,
        prenomUser: this.state.name,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          this.props.navigation.navigate('Profil');
    })
    .catch((error) => {
      console.error(error);
    });
  };

  _confirmEditMail = async () => {
    fetch(cfg.API_URL + '/users/changeEmail', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        password: this.state.password,
        newEmail: this.state.email,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === 200) {
            this.props.navigation.navigate('Profil');
          } else {
            Alert.alert('information érronée')
          }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  _confirmEditPwd = async () => {
    if (this.state.newpassword === this.state.newpasswordbis)
    {
      fetch(cfg.API_URL + '/users/changePassword', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: Store.Token,
        },
        body: JSON.stringify({
          oldPassword: this.state.oldpassword,
          newPassword: this.state.newpassword,
        }),
      }).then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status === 200) {
              this.props.navigation.navigate('Profil');
            } else {
              Alert.alert('Information érronée')
            }
      })
      .catch((error) => {
        console.error(error);
      });

    } else {
      Alert.alert("Pas de concordance")
    }
  };


  _pwdhide = async () => {
    if (this.state.pwdhide === true) {
      this.setState({'pwdhide':false})
      this.setState({'hideIcon':'eye-slash'})
    } else {
      this.setState({'pwdhide':true})
      this.setState({'hideIcon':'eye'})
    }
  };

  render() {
    return(

      <View style={[styles.container, {backgroundColor: Store.Back}]}>
        <Header navigation={this.props.navigation}/>
        <KeyboardAvoidingView behavior="padding" enabled style={styles.containerBody}>
          <ScrollView style={{}}>

            <View style={{height: 60, paddingTop: 10}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Icon
                  raised
                  onPress={()=>this.props.navigation.navigate('Profil')}
                  type='font-awesome'
                  name='arrow-left'
                  color='#FFF'
                  containerStyle={{
                    backgroundColor: cfg.SECONDARY,
                  }}
                  />
                </View>
                <View style={{flex: 0.6, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontWeight:'bold', color: Store.Text1}}>INFORMATIONS PERSONNELLES</Text>
                </View>
                <View style={{flex: 0.2}}></View>
              </View>
            </View>

            <View style={{height: 220, justifyContent:'center', alignItems:'center'}}>
              <Fumi
                label={'Prénom'}
                style={{ width: width-40, backgroundColor:cfg.SECONDARY, borderRadius: 0}}
                value={this.state.name}
                onChangeText={(name) => this.setState({ name })}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={'#FFF'}
                labelStyle={{ color: '#FFF' }}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                />
              <Fumi
                label={'Nom'}
                style={{ width: width-40, backgroundColor:cfg.SECONDARY, marginTop: 10}}
                value={this.state.lastname}
                onChangeText={(lastname) => this.setState({ lastname })}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={'#FFF'}
                labelStyle={{ color: '#FFF' }}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                />

              <Icon
              raised
              onPress={this._confirmEditName}
              type='font-awesome'
              name='check'
              color='#FFF'
              containerStyle={{
                backgroundColor: '#4caf50',
                borderWidth: 1,
                borderColor:cfg.SECONDARY
              }}
              />
            </View>
            <Divider style={{ backgroundColor: cfg.SECONDARY }} />



            <View style={{height: 60, paddingTop: 10, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontWeight:'bold', color: Store.Text1}}>E-MAIL</Text>
            </View>
            <View style={{height: 220, justifyContent:'center', alignItems:'center'}}>
              <Fumi
                label={'E-mail'}
                style={{ width: width-40, backgroundColor:cfg.SECONDARY, borderRadius: 0}}
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                iconClass={FontAwesomeIcon}
                iconName={'at'}
                iconColor={'#FFF'}
                labelStyle={{ color: '#FFF' }}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                />
              <Fumi
                label={'Mot de passe'}
                style={{ width: width-40, backgroundColor:cfg.SECONDARY, marginTop: 10}}
                secureTextEntry={this.state.pwdhide}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                iconClass={FontAwesomeIcon}
                iconName={'lock'}
                iconColor={'#FFF'}
                labelStyle={{ color: '#FFF' }}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                />

              <View style={{flex: 1, flexDirection:'row'}}>
                <View style={{flex: 0.5, alignItems:'center', justifyContent:'center'}}>
                  <Icon
                  raised
                  onPress={this._confirmEditMail}
                  type='font-awesome'
                  name='check'
                  color='#FFF'
                  containerStyle={{
                    backgroundColor: '#4caf50',
                    borderWidth: 1,
                    borderColor:cfg.SECONDARY
                  }}
                  />
                </View>
                <View style={{flex: 0.5, alignItems:'center', justifyContent:'center'}}>
                  <Icon
                  raised
                  onPress={this._pwdhide}
                  type='font-awesome'
                  name={this.state.hideIcon}
                  color='#FFF'
                  containerStyle={{
                    backgroundColor: cfg.SECONDARY,
                    borderWidth: 1,
                    borderColor:cfg.SECONDARY
                  }}
                  />
                </View>
              </View>
            </View>
            <Divider style={{ backgroundColor: cfg.SECONDARY }} />




            <View style={{height: 60, paddingTop: 10, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontWeight:'bold', color: Store.Text1}}>MOT DE PASSE</Text>
            </View>
            <View style={{height: 300, justifyContent:'center', alignItems:'center'}}>
            <Fumi
              label={'Ancien mot de passe'}
              style={{ width: width-40, backgroundColor:cfg.SECONDARY, marginTop: 10}}
              secureTextEntry={this.state.pwdhide}
              value={this.state.oldPassword}
              onChangeText={(oldPassword) => this.setState({ oldPassword })}
              iconClass={FontAwesomeIcon}
              iconName={'lock'}
              iconColor={'#FFF'}
              labelStyle={{ color: '#FFF' }}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              />
            <Fumi
              label={'Nouveau mot de passe'}
              style={{ width: width-40, backgroundColor:cfg.SECONDARY, marginTop: 10}}
              secureTextEntry={this.state.pwdhide}
              value={this.state.newpassword}
              onChangeText={(newpassword) => this.setState({ newpassword })}
              iconClass={FontAwesomeIcon}
              iconName={'lock'}
              iconColor={'#FFF'}
              labelStyle={{ color: '#FFF' }}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              />
            <Fumi
              label={'Nouveau mot de passe'}
              style={{ width: width-40, backgroundColor:cfg.SECONDARY, marginTop: 10}}
              secureTextEntry={this.state.pwdhide}
              value={this.state.newpasswordbis}
              onChangeText={(newpasswordbis) => this.setState({ newpasswordbis })}
              iconClass={FontAwesomeIcon}
              iconName={'lock'}
              iconColor={'#FFF'}
              labelStyle={{ color: '#FFF' }}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              />
              <View style={{flex: 1, flexDirection:'row'}}>
                <View style={{flex: 0.5, alignItems:'center', justifyContent:'center'}}>
                  <Icon
                  raised
                  onPress={this._confirmEditPwd}
                  type='font-awesome'
                  name='check'
                  color='#FFF'
                  containerStyle={{
                    backgroundColor: '#4caf50',
                    borderWidth: 1,
                    borderColor:cfg.SECONDARY
                  }}
                  />
                </View>
                <View style={{flex: 0.5, alignItems:'center', justifyContent:'center'}}>
                  <Icon
                  raised
                  onPress={this._pwdhide}
                  type='font-awesome'
                  name={this.state.hideIcon}
                  color='#FFF'
                  containerStyle={{
                    backgroundColor: cfg.SECONDARY,
                    borderWidth: 1,
                    borderColor:cfg.SECONDARY
                  }}
                  />
                </View>
              </View>
            </View>
            <Divider style={{ backgroundColor: cfg.SECONDARY }} />

            <View style={{height: 220, justifyContent:'center', alignItems:'center'}}>
            </View>




          </ScrollView>

        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
