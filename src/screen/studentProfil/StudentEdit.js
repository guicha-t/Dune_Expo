import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { observer } from 'mobx-react';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'
import * as cfg from "./../../Config";

var {height, width} = Dimensions.get('window');

@observer
export default class StudentEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      Nom: this.props.navigation.getParam('Nom', 'Unknown'),
      Prenom: this.props.navigation.getParam('Prenom', 'Unknown'),
      Id: this.props.navigation.getParam('Id', 'Unknown'),
    }
  }

  _cancelEdit = async () => {
    this.props.navigation.navigate('StudentContainer', {
      idStudent: this.state.Id,
    });
  };

  _confirmEdit = async () => {
    fetch(cfg.API_URL + '/eleves/update', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        idEleve: this.state.Id,
        nomEleve: this.state.Nom,
        prenomEleve: this.state.Prenom,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          this.props.navigation.navigate('StudentContainer', {
            idStudent: this.state.Id,
          });
    })
    .catch((error) => {
      console.error(error);
    });
  };

  render() {
      return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
          <Header navigation={this.props.navigation}/>

          <View style={{flex: 0.2,}}></View>
          <View style={{flex: 0.2,}}>
            <Image
              source={{uri: 'http://51.38.187.216:9090/files/eleves/' + this.state.Id + '-eleve.png'}}
              style={{flex: 1, borderRadius: 1000}}
              resizeMode="contain"
              />
          </View>
          <View style={{flex: 0.5, alignItems:'center', justifyContent:'center'}}>
            <Fumi
              label={'Nom'}
              style={{ width: width-40, backgroundColor:cfg.SECONDARY}}
              value={this.state.Nom}
              onChangeText={(Nom) => this.setState({ Nom })}
              iconClass={FontAwesomeIcon}
              iconName={'user'}
              iconColor={'#FFF'}
              labelStyle={{ color: '#FFF' }}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              />
            <Fumi
              label={'Prénom'}
              style={{ width: width-40, backgroundColor:cfg.SECONDARY, marginTop: 10}}
              value={this.state.Prenom}
              onChangeText={(Prenom) => this.setState({ Prenom })}
              iconClass={FontAwesomeIcon}
              iconName={'user'}
              iconColor={'#FFF'}
              labelStyle={{ color: '#FFF' }}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              />
          </View>

          <View style={{flex: 0.1, flexDirection:'row', justifyContent:'space-around'}}>

            <Icon
              raised
              onPress={this._cancelEdit}
              type='font-awesome'
              name='ban'
              color='#FFF'
              containerStyle={{
                backgroundColor: '#ea4335',
              }}
              />
            <Icon
              raised
              onPress={this._confirmEdit}
              type='font-awesome'
              name='check'
              color='#FFF'
              containerStyle={{
                backgroundColor: '#4caf50',
              }}
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
    input: {
      width: 220,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    containerBody: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleInfo: {
      color: cfg.SECONDARY,
      fontWeight: 'bold',
      fontSize: 14,
    },
    containerFooter: {
      flex: 0.1,
      flexDirection: 'row',
      paddingBottom: 10,
      justifyContent:'space-around',
    },
  });
