import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'

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
    fetch('http://api.dune-table.com/v1/eleves/update', {
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
          <View style={styles.containerBody}>
            <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
              <View style={{flex: 0.3, alignItems: 'center', paddingBottom: 8}}>
                <Text style={styles.titleInfo}>Nom</Text>
              </View>
              <View style={{flex: 0.7}}>
                <TextInput
                 style={styles.input}
                 placeholder='Nom'
                 onChangeText={(Nom) => this.setState({Nom})}
                 value={this.state.Nom}
                />
               </View>
            </View>

            <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
              <View style={{flex: 0.3, alignItems: 'center', paddingBottom: 8}}>
                <Text style={styles.titleInfo}>Prénom</Text>
              </View>
              <View style={{flex: 0.7}}>
                <TextInput
                   style={styles.input}
                   placeholder='Prénom'
                   onChangeText={(Prenom) => this.setState({Prenom})}
                   value={this.state.Prenom}
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
