import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
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
    }
  }

  _cancelEdit = async () => {
    this.props.navigation.navigate('Profil');
  };

  _confirmEdit = async () => {
    fetch('http://176.31.252.134:7001/api/v1/users/update', {
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

  render() {
    return(

      <View style={styles.container}>
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
               onChangeText={(lastname) => this.setState({lastname})}
               value={this.state.lastname}
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
                 onChangeText={(name) => this.setState({name})}
                 value={this.state.name}
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
