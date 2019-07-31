import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage, KeyboardAvoidingView, Dimensions} from 'react-native';
import { observer } from 'mobx-react';

import { Button, Icon } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AlertPro from "react-native-alert-pro";


import Store from './../../global/store/Store'

@observer
export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      pwdhide: true,
      hideIcon: 'eye',
    };
  }

  static navigationOptions = {
     drawerLockMode: 'locked-open',
}

  _storeId = async (param) => {
  try {
    await AsyncStorage.setItem('localId', param);
  } catch (error) {
    // Error saving data
  }
}

  _storeToken = async (param) => {
  try {
    await AsyncStorage.setItem('localToken', param);
  } catch (error) {
    // Error saving data
  }
}

  _storeType = async (param) => {
  try {
    await AsyncStorage.setItem('localType', param);
  } catch (error) {
    // Error saving data
  }
}

  onLogin() {
    const { username, password } = this.state;

    fetch('http://51.38.187.216:9000/api/v1/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === 200) {
            Store.setToken(responseJson.token)
            Store.setTypeUser(responseJson.typeUser)
            Store.setIsLog(true)
            this._storeToken(responseJson.token)
            this._storeType(JSON.stringify(responseJson.typeUser))

            this.props.navigation.navigate('Dashboard')
          }
          else {
            this.AlertPro.open()
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  _fgtPass = async () => {
        Store.setToken('Unknown Token')
        //EXPLICATION
        this.props.navigation.navigate('ForgottenPass');
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
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          >
          <View style={{flex: 0.5}}>
            <Image
              style={{flex: 1, height: undefined, width: undefined}}
              source={require('./../../picture/header/dunelogo.png')}
              resizeMode="contain"
              />
          </View>

          <View style={{flex: 0.4}}>

            <View style={{flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 0.2}}></View>
              <View style={{flex: 0.6, alignItems: 'center', justifyContent:'flex-end'}}>
                <Fumi
                  label={'E-mail'}
                  style={{ width: 220, backgroundColor:'#363453'}}
                  value={this.state.username}
                  onChangeText={(username) => this.setState({ username })}
                  iconClass={FontAwesomeIcon}
                  iconName={'at'}
                  iconColor={'#FFF'}
                  labelStyle={{ color: '#FFF' }}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  />
              </View>
              <View style={{flex: 0.2}}></View>
            </View>

            <View style={{marginTop: 10, flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 0.2}}></View>
              <View style={{flex: 0.6, alignItems: 'center', justifyContent:'center'}}>
                <Fumi
                  label={'Mot de passe'}
                  style={{ width: 220, backgroundColor:'#363453'}}
                  value={this.state.password}
                  secureTextEntry={this.state.pwdhide}
                  onChangeText={(password) => this.setState({ password })}
                  iconClass={FontAwesomeIcon}
                  iconName={'lock'}
                  iconColor={'#FFF'}
                  labelStyle={{ color: '#FFF' }}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  />
              </View>
              <View style={{flex: 0.2, alignItems:'flex-end', justifyContent:'center'}}>

                  <Button
                    onPress={this._pwdhide}
                    icon={{
                      name: this.state.hideIcon,
                      type: 'font-awesome',
                      size: 20,
                      color: '#363453',
                    }}
                    iconContainerStyle={{
                      }}
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      borderWidth: 0,
                      borderRadius: 0,
                      width: 80,
                      alignItems:'center',
                      justifyContent:'center',
                      marginLeft: 10,
                    }}
                    containerStyle={{ width: 130 }}
                  />
              </View>
            </View>

            <View style={{marginTop: 10, flex: 0.2, flexDirection:'row', justifyContent:'center'}}>

              <Button
                title=""
                onPress={this.onLogin.bind(this)}
                icon={{
                 type: 'font-awesome',
                 name: 'check',
                 size: 15,
                 color: 'white',
               }}
                buttonStyle={{
                  backgroundColor: '#363453',
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 30,
                  width: 60,
                  alignItems:'center',
                  paddingLeft: 20,
                }}
                containerStyle={{ marginVertical: 10, marginLeft: 40, height: 50, width: 250 }}
                titleStyle={{ fontWeight: 'bold' }}
              />
            </View>

            <AlertPro
               ref={ref => {
                 this.AlertPro = ref;
               }}
               onConfirm={() => this.AlertPro.close()}
               showCancel={false}
               title="OUPS !"
               message="L'email ou le mot de passe est incorrect"
               textConfirm="REESAYER"
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



        <View style={{flex: 0.1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20}}>
          <TouchableOpacity onPress={this._fgtPass}>
            <Text style={{color: '#343653'}}>
              Mot de passe oublié
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEE599',
  },
  input: {
    width: 220,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#363453',
  },
  ButtonCo: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#363453',
    marginBottom: 10,
  },
  ButtonHide: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  buttonCase: {
    flex: 1,
  },
  triangleLeft: {
    position: 'absolute',
    left: -20,
    bottom: 0,
    width: 0,
    height: 0,
    borderRightWidth: 20,
    borderRightColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  triangleRight: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  inputContainerStyle: {
    marginTop: 16,
    width: '90%',
  },
});
