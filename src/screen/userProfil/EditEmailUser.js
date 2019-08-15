import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'

@observer
export default class EditEmailUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      email: '',
    }
  }

  _confirmEdit = async () => {
    fetch('http://51.38.187.216:9090/users/changeEmail', {
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
            Alert.alert(responseJson.error)
          }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  _cancelEdit = async () => {
    this.props.navigation.navigate('Profil');
  };

  render() {
    return(

      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>

        <View style={styles.containerBody}>

            <View style={{flex: 0.3, alignItems: 'center', paddingBottom: 8}}>
            <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
              <Text style={styles.titleInfo}>Email</Text>
            </View>
            <View style={{flex: 0.7}}>
              <TextInput
               style={styles.input}
               placeholder='Email'
               onChangeText={(email) => this.setState({email})}
               value={this.state.email}
              />
             </View>
          </View>

          <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex: 0.3, alignItems: 'center', paddingBottom: 8}}>
              <Text style={styles.titleInfo}>Mot de passe</Text>
            </View>
            <View style={{flex: 0.7}}>
              <TextInput
                 style={styles.input}
                 placeholder='Mot de passe'
                 onChangeText={(password) => this.setState({password})}
                 secureTextEntry={true}
                 value={this.state.password}
               />
             </View>
          </View>
         </View>
         <View style={styles.containerFooter}>
           <Button
             title={'Retour'}
             style={styles.ButtonCo}
             color='#363453'
             onPress={this._cancelEdit}
           />
           <Button
             title={'Valider'}
             style={styles.ButtonCo}
             color='#363453'
             onPress={this._confirmEdit}
           />
         </View>

      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  containerBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 220,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  titleInfo: {
    color: '#363453',
    fontWeight: 'bold',
    fontSize: 14,
  },
  containerFooter: {
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent:'space-around',
  },
});
