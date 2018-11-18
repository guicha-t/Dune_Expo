import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../global/header/Header';
import Store from './../global/store/Store'

@observer
export default class Profil extends Component {
  constructor(props){
    super(props);
    this.state = {
      Profil: [],
    }
  }

  componentDidMount(){
    fetch('http://176.31.252.134:9001/api/v1/users/' + Store.IdUser, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Profil':JSON.parse(JSON.stringify(responseJson.response[0]))})
        })
        .catch((error) => {
          console.error(error);
        });
    }

    _goToEditProfil = async () => {
      this.props.navigation.navigate('EditProfilInfo', {
        name: this.state.Profil.prenomUser,
        lastname: this.state.Profil.nomUser,
        email: this.state.Profil.emailUser,
      });
    };

    _disconnect = async () => {
      await AsyncStorage.clear();
      Store.setToken('')
      Store.setIdUser('')
      Store.setIsLog(false)
      this.props.navigation.navigate('Loading');
    };

  render() {
    return(
      <View style={{flex:1, backgroundColor: '#fff'}}>
        <Header navigation={this.props.navigation}/>

        <View style={styles.topBodyPicture}>
            <Text style={styles.title}>{this.state.Profil.prenomUser} {this.state.Profil.nomUser}</Text>
            <Image
              style={styles.profilPicture}
              source={require('./../picture/profil/imageProf.jpg')}
              resizeMode="contain"
              />
        </View>

        <ScrollView style={styles.bodyInfo}>
          <View style={{flex: 1, paddingTop: 10}}>
            <View style={{flex: 1}}>
              <Text style={styles.titleInfo}>Nom</Text>
              <Text style={styles.contentInfo}>{this.state.Profil.nomUser}</Text>
            </View>
            <View style={styles.separator}></View>
          </View>

          <View style={{flex: 1, paddingTop: 10}}>
            <View style={{flex: 1}}>
              <Text style={styles.titleInfo}>Prénom</Text>
              <Text style={styles.contentInfo}>{this.state.Profil.prenomUser}</Text>
            </View>
            <View style={styles.separator}></View>
          </View>

          <View style={{flex: 1, paddingTop: 10}}>
            <View style={{flex: 1}}>
              <Text style={styles.titleInfo}>E-mail</Text>
              <Text style={styles.contentInfo}>{this.state.Profil.emailUser}</Text>
            </View>
            <View style={styles.separator}></View>
          </View>
        </ScrollView>

          <View style={{flexDirection:'row', justifyContent:'space-around'}}>

            <TouchableOpacity onPress={this._goToEditProfil}>
              <Image
                style={{height: 36, width: 36}}
                source={require('./../picture/profil/edit.png')}
                resizeMode="contain"
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={this._disconnect}>
              <Image
                style={{height: 42, width: 42}}
                source={require('./../picture/profil/logout.png')}
                resizeMode="contain"
                />
            </TouchableOpacity>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBodyPicture: {
    flex: 0.6,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#363453',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilPicture: {
    height: 150,
    width: 150,
    borderRadius: 64,
    marginTop: 10
  },
  bodyInfo: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: '#FFF'
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  titleInfo: {
    color: '#363453',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentInfo: {
    color: '#000000',
    fontSize: 14
  },
  separator: {
    marginTop: 10,
    backgroundColor: '#eaeaea',
    height: 1
  },
  buttonBottom: {
  }
});
