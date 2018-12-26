import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../global/header/Header';
import Store from './../global/store/Store'

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
    this.props.navigation.navigate('StudentList');
  };

  render() {
      return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
          <Header navigation={this.props.navigation}/>
          <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
            <Text>EDITION</Text>
            <Text>Prenom: {this.state.Prenom}</Text>
            <Text>Nom: {this.state.Nom}</Text>
            <Text>ID: {this.state.Id}</Text>


            <TextInput
             style={styles.input}
             placeholder='Nom'
             onChangeText={(Nom) => this.setState({Nom})}
             value={this.state.Nom}
            />

            <TextInput
             style={styles.input}
             placeholder='Prenom'
             onChangeText={(Prenom) => this.setState({Prenom})}
             value={this.state.Prenom}
            />

            <TouchableOpacity onPress={this._cancelEdit}>
              <Image
                style={{height: 42, width: 42}}
                source={require('./../picture/profil/error.png')}
                resizeMode="contain"
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={this._confirmEdit}>
              <Image
                style={{height: 42, width: 42}}
                source={require('./../picture/profil/success.png')}
                resizeMode="contain"
                />
            </TouchableOpacity>


          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    input: {
      width: 220,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
  });
