import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'

@observer
export default class EditPassUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      oldpassword: '',
      newpassword: '',
      newpasswordbis: '',
      pwdhide: true,
      opacity: 1,
    }
  }

  _cancelEdit = async () => {
    this.props.navigation.navigate('Profil');
  };

  _confirmEdit = async () => {
    if (this.state.newpassword === this.state.newpasswordbis)
    {
      fetch('http://api.dune-table.com/v1/users/changePassword', {
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
              Alert.alert(responseJson.error)
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
      this.setState({'opacity':0.1})
    } else {
      this.setState({'pwdhide':true})
      this.setState({'opacity':1})
    }
  };



  render() {
    return(

      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>

        <View style={styles.containerBody}>

          <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex: 0.3, alignItems: 'center', paddingBottom: 8}}>
              <Text style={styles.titleInfo}>Ancien</Text>
            </View>
            <View style={{flex: 0.7}}>
              <TextInput
                 style={styles.input}
                 placeholder='Mot de passe'
                 onChangeText={(oldpassword) => this.setState({oldpassword})}
                 secureTextEntry={this.state.pwdhide}
                 value={this.state.oldpassword}
               />
             </View>
          </View>

          <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex: 0.3, alignItems: 'center', paddingBottom: 8}}>
              <Text style={styles.titleInfo}>Nouveau*</Text>
            </View>
            <View style={{flex: 0.7}}>
              <TextInput
                 style={styles.input}
                 placeholder='Mot de passe'
                 onChangeText={(newpassword) => this.setState({newpassword})}
                 secureTextEntry={this.state.pwdhide}
                 value={this.state.newpassword}
               />
             </View>
          </View>

          <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex: 0.3, alignItems: 'center', paddingBottom: 8}}>
              <Text style={styles.titleInfo}>Nouveau*</Text>
            </View>
            <View style={{flex: 0.7}}>
              <TextInput
                 style={styles.input}
                 placeholder='Mot de passe'
                 onChangeText={(newpasswordbis) => this.setState({newpasswordbis})}
                 secureTextEntry={this.state.pwdhide}
                 value={this.state.newpasswordbis}
               />
             </View>
          </View>

          <View>
            <TouchableOpacity onPress={this._pwdhide}>
              <Image
                style={{height: 40, width: 40, opacity: this.state.opacity}}
                source={require('./../../picture/start/eye.png')}
                resizeMode="contain"
                />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 10}}>* le nouveau mot de passe doit contenir au minimum 8 caractères.</Text>


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
