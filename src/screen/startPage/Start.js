import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage, KeyboardAvoidingView} from 'react-native';
import { observer } from 'mobx-react';

import Store from './../../global/store/Store'

@observer
export default class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      pwdhide: true,
      opacity: 1,
    };
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

    fetch('http://176.31.252.134:7001/api/v1/login/', {
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
            Alert.alert('Nom de compte ou mot de passe incorrect')
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  _fgtPass = async () => {
        Store.setToken('Unknown Token')
        this.props.navigation.navigate('ForgottenPass');
      };

  _pwdhide = async () => {
    if (this.state.pwdhide === true) {
      this.setState({'pwdhide':false})
      this.setState({'opacity':0.1})
    } else {
      this.setState({'pwdhide':true})
      this.setState({'opacity':1})
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
                <TextInput
                  value={this.state.username}
                  onChangeText={(username) => this.setState({ username })}
                  placeholder={'Nom de compte'}
                  autoCapitalize = 'none'
                  style={styles.input}
                  />
              </View>
              <View style={{flex: 0.2}}></View>
            </View>

            <View style={{flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 0.2}}></View>
              <View style={{flex: 0.6, alignItems: 'center', justifyContent:'center'}}>
                <TextInput
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                  placeholder={'Mot de passe'}
                  secureTextEntry={this.state.pwdhide}
                  autoCapitalize = 'none'
                  style={styles.input}
                  />
              </View>
              <View style={{flex: 0.2}}>
                <TouchableOpacity onPress={this._pwdhide} style={{flex: 1, justifyContent:'center', marginRight: 10}}>
                  <Image
                    style={{flex: 0.4, height: undefined, width: undefined, opacity: this.state.opacity}}
                    source={require('./../../picture/start/eye.png')}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
              <Button
                title={'Connexion'}
                style={styles.ButtonCo}
                color='#363453'
                onPress={this.onLogin.bind(this)}
                />
              </View>
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
});
