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
    } else {
      this.setState({'pwdhide':true})
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



          <View style={{flex: 0.4, alignItems:'center', justifyContent:'center'}}>

            <TextInput
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              placeholder={'Nom de compte'}
              autoCapitalize = 'none'
              style={styles.input}
            />
            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              placeholder={'Mot de passe'}
              secureTextEntry={this.state.pwdhide}
              autoCapitalize = 'none'
              style={styles.input}
            />

          <View style={{flex: 0.4, marginBottom: 20}}>
            <Button
              title={'AFFICHER'}
              style={styles.ButtonHide}
              color='#FEE599'
              onPress={this._pwdhide}
            />
          </View>
            <Button
              title={'Connexion'}
              style={styles.ButtonCo}
              color='#363453'
              onPress={this.onLogin.bind(this)}
            />
        </View>



        <View style={{flex: 0.1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20}}>
          <TouchableOpacity onPress={this._fgtPass}>
            <Text>
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
    borderColor: 'black',
    marginBottom: 10,
  },
  ButtonCo: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
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
