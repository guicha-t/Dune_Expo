import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { observer } from 'mobx-react';

import Store from './../global/store/Store'

@observer
export default class ForgottenPass extends Component {
  navigationOptions: {
  drawerLockMode: 'locked-closed'
}
  constructor(props) {
    super(props);

  this.state = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    const { username, password } = this.state;

    fetch('http://176.31.252.134:9001/api/v1/login/reset', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status == 200) {
	    this.props.navigation.navigate('Start')
            Alert.alert('E-mail de récupération envoyé')
          }
          else {
            Alert.alert('Adresse E-mail introuvable')
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  render() {
    return (
      <View style={styles.container}>
	<View style={{flex:0.4, alignItems: 'center', justifyContent:'center',}}>
	<Text style={{fontSize:20,}}>
	Réinitialiser votre mot de passe
	</Text>
	</View>
        <View style={{flex:0.1, alignItems: 'center', justifyContent:'center'}}>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Adresse e-mail'}
            autoCapitalize = 'none'
            style={styles.input}
          />
          <Button
            title={'Envoyer'}
            style={styles.input}
            color='#363453'
            onPress={this.onLogin.bind(this)}
          />
      </View>
      <View style={{flex: 0.1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Start')}>
          <Text>
            Retour
          </Text>
        </TouchableOpacity>
      </View>
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
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 0,
    borderColor: 'black',
    marginBottom: 10,
  },
});
