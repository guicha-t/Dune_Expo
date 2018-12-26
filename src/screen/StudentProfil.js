import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../global/header/Header';
import Store from './../global/store/Store'

@observer
export default class StudentProfil extends Component {
  constructor(props){

    super(props);
    this.state = {
      Student: [],
      IdStudent: '',
    }
  }

  componentDidMount(){
    fetch('http://176.31.252.134:7001/api/v1/eleves/' + this.props.screenProps.idStudent, {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Student':responseJson.response[0]})
    })
    .catch((error) => {
      console.error(error);
    });
  }


  render() {
      const { navigation, idStudent, screenProps } = { ...this.props };
      return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>PROFIL ELEVE</Text>
            <Text>Nom: {this.state.Student.nomEleve}</Text>
            <Text>Prenom: {this.state.Student.prenomEleve}</Text>
            <Text>ID: {this.state.Student.idEleve}</Text>

            <Button
              title="Edition"
              onPress={() => screenProps.navigation.navigate('StudentEdit', {
                Nom: this.state.Student.nomEleve,
                Prenom: this.state.Student.prenomEleve,
                Id: this.state.Student.idEleve,
              })}
              />

            <Button
              title="Retour"
              onPress={() => screenProps.navigation.navigate('StudentList')}
              />
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
  });
