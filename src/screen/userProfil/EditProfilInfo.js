import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage, KeyboardAvoidingView} from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'

@observer
export default class EditProfilInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.navigation.getParam('name', 'Unknown'),
      lastname: this.props.navigation.getParam('lastname', 'Unknown'),
      id: this.props.navigation.getParam('id', 'Unknown'),
      password: '',
      email: '',
      oldpassword: '',
      newpassword: '',
      newpasswordbis: '',
      pwdhide: true,
    }
  }

  _cancelEdit = async () => {
    this.props.navigation.navigate('Profil');
  };

  _confirmEditName = async () => {
    fetch('http://api.dune-table.com/v1/users/update', {
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
    fetch('http://api.dune-table.com/v1/users/changeEmail', {
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
        <KeyboardAvoidingView behavior="padding" enabled style={styles.containerBody}>

          <View style={{flex: 0.3, borderBottomWidth: 2}}>


            <View style={{flex: 0.2, flexDirection:'row'}}>
              <View style={{flex: 0.2, justifyContent:'center', paddingLeft: 6}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profil')}>
                  <Image source={require('./../../picture/global/back.png')} style={{width:30, height: 30}}/>
                </TouchableOpacity>
              </View>
              <View style={{flex: 0.6, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontWeight: 'bold'}}>INFORMATIONS PERSONNELLES</Text>
              </View>
              <View style={{flex: 0.2}}>

              </View>

            </View>


            <View style={{flex: 0.6}}>
              <View style={{flex: 0.5, flexDirection:'row'}}>
                <View style={{flex: 0.3, justifyContent:'center', alignItems:'center', paddingBottom: 10}}>
                  <Text>Nom</Text>
                </View>
                <View style={{flex: 0.7, justifyContent:'center'}}>
                  <TextInput
                  style={styles.input}
                  placeholder='Nom'
                  onChangeText={(lastname) => this.setState({lastname})}
                  value={this.state.lastname}
                  />
                </View>
              </View>

              <View style={{flex: 0.5, flexDirection:'row'}}>
                <View style={{flex: 0.3, justifyContent:'center', alignItems:'center', paddingBottom: 10}}>
                  <Text>Prénom</Text>
                </View>
                <View style={{flex: 0.7, justifyContent:'center'}}>
                  <TextInput
                  style={styles.input}
                  placeholder='Prénom'
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                  />
                </View>
              </View>

            </View>
            <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
              <Button
                title={'Valider'}
                style={styles.ButtonCo}
                color='#363453'
                onPress={this._confirmEditName}
                />

            </View>

            </View>


          <View style={{flex: 0.3, borderBottomWidth: 2}}>
            <View style={{flex: 0.2, flexDirection: 'row'}}>
              <View style={{flex: 0.2}}>
              </View>
              <View style={{flex: 0.6, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontWeight: 'bold'}}>EMAIL</Text>
              </View>
              <View style={{flex: 0.2}}>
                <TouchableOpacity onPress={this._pwdhide} style={{flex: 1, justifyContent:'center'}}>
                  <Image
                    style={{flex: 0.6, height: undefined, width: undefined}}
                    source={require('./../../picture/start/eye.png')}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
              </View>

            </View>
            <View style={{flex: 0.6}}>
              <View style={{flex: 0.5, flexDirection:'row'}}>
                <View style={{flex: 0.3, justifyContent:'center', alignItems:'center', paddingBottom: 10}}>
                  <Text>Nouvel Email</Text>
                </View>
                <View style={{flex: 0.7, justifyContent:'center'}}>
                  <TextInput
                   style={styles.input}
                   placeholder='Email'
                   onChangeText={(email) => this.setState({email})}
                   value={this.state.email}
                  />
                </View>
              </View>

              <View style={{flex: 0.5, flexDirection:'row'}}>
                <View style={{flex: 0.3, justifyContent:'center', alignItems:'center', paddingBottom: 10}}>
                  <Text>Mot de passe</Text>
                </View>
                <View style={{flex: 0.7, justifyContent:'center'}}>
                  <TextInput
                     style={styles.input}
                     placeholder='Mot de passe'
                     onChangeText={(password) => this.setState({password})}
                     secureTextEntry={this.state.pwdhide}
                     value={this.state.password}
                   />
                </View>
              </View>

            </View>
            <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
              <Button
                title={'Valider'}
                style={styles.ButtonCo}
                color='#363453'
                onPress={this._confirmEditMail}
                />

            </View>
          </View>

          <View style={{flex: 0.4}}>
          <View style={{flex: 0.2, flexDirection: 'row'}}>
            <View style={{flex: 0.2}}>
            </View>
            <View style={{flex: 0.6, justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontWeight: 'bold'}}>MOT DE PASSE</Text>
            </View>
            <View style={{flex: 0.2}}>
              <TouchableOpacity onPress={this._pwdhide} style={{flex: 1, justifyContent:'center'}}>
                <Image
                  style={{flex: 0.5, height: undefined, width: undefined}}
                  source={require('./../../picture/start/eye.png')}
                  resizeMode="contain"
                  />
              </TouchableOpacity>
            </View>

          </View>

            <View style={{flex: 0.6}}>
              <View style={{flex: 0.33, flexDirection:'row'}}>
                <View style={{flex: 0.3, justifyContent:'center', alignItems:'center', paddingBottom: 10}}>
                  <Text>Ancien</Text>
                </View>
                <View style={{flex: 0.7, justifyContent:'center'}}>
                  <TextInput
                     style={styles.input}
                     placeholder='Mot de passe'
                     onChangeText={(oldpassword) => this.setState({oldpassword})}
                     secureTextEntry={this.state.pwdhide}
                     value={this.state.oldpassword}
                   />
                </View>
              </View>

              <View style={{flex: 0.33, flexDirection:'row'}}>
                <View style={{flex: 0.3, justifyContent:'center', alignItems:'center', paddingBottom: 10}}>
                  <Text>Nouveau*</Text>
                </View>
                <View style={{flex: 0.7, justifyContent:'center'}}>
                <TextInput
                   style={styles.input}
                   placeholder='Mot de passe'
                   onChangeText={(newpassword) => this.setState({newpassword})}
                   secureTextEntry={this.state.pwdhide}
                   value={this.state.newpassword}
                 />
                </View>
              </View>

              <View style={{flex: 0.33, flexDirection:'row'}}>
                <View style={{flex: 0.3, justifyContent:'center', alignItems:'center', paddingBottom: 10}}>
                  <Text>Nouveau*</Text>
                </View>
                <View style={{flex: 0.7, justifyContent:'center'}}>
                  <TextInput
                     style={styles.input}
                     placeholder='Mot de passe'
                     onChangeText={(newpasswordbis) => this.setState({newpasswordbis})}
                     secureTextEntry={this.state.pwdhide}
                     value={this.state.newpasswordbis}
                   />
                </View>
              </View>


            </View>
            <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
              <Button
                title={'Valider'}
                style={styles.ButtonCo}
                color='#363453'
                onPress={this._confirmEditPwd}
                />

            </View>

          </View>

        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  input: {
    width: 220,
    height: 38,
    borderRadius: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  containerBody: {
    flex: 1,
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
