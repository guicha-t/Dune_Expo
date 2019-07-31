import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage, KeyboardAvoidingView} from 'react-native';
import { observer } from 'mobx-react';
import {Button, Icon, Divider } from 'react-native-elements';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
    fetch('http://51.38.187.216:9000/api/v1/users/update', {
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
    fetch('http://51.38.187.216:9000/api/v1/users/changeEmail', {
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
      fetch('http://51.38.187.216:9000/api/v1/users/changePassword', {
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
                    backgroundColor: '#363453',
                  }}
                  />
                </View>
                <View style={{flex: 0.6, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontWeight:'bold'}}>INFORMATIONS PERSONNELLES</Text>
                </View>
                <View style={{flex: 0.2}}></View>
              </View>
            </View>

            <View style={{height: 160, justifyContent:'center', alignItems:'center'}}>

              <Fumi
                label={'Prénom'}
                style={{ width: 280, backgroundColor:'#363453', borderRadius: 30}}
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
                style={{ width: 280, backgroundColor:'#363453', marginTop: 10}}
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
            </View>

            <Divider style={{ backgroundColor: '#363453' }} />







          </ScrollView>

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
});
