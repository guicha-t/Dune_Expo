import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';

@observer
export default class AddUserDirector extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.navigation.getParam('name', ''),
      lastname: this.props.navigation.getParam('lastname', ''),
      email: this.props.navigation.getParam('email', ''),
    }
  }

  _cancelEdit = async () => {
    this.props.navigation.navigate('Profil');
  };

  _confirmEdit = async () => {
    fetch('http://51.38.187.216:9000/api/v1/users/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUser: Store.IdUser,
        nomUser: this.state.lastname,
        prenomUser: this.state.name,
        emailUser: this.state.email,
        token: Store.Token,

      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          //Handle what you want
        })
        .catch((error) => {
          console.error(error);
        });
    this.props.navigation.navigate('Profil');
  };

  render() {
    return(

      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>

	<View style={{flex:0.4, alignItems: 'center', justifyContent:'center',}}>
          <Text style={{fontSize:20,}}>
             Ajouter un professeur
          </Text>
        </View>

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


          <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex: 0.3, alignItems: 'center', paddingBottom: 8}}>
              <Text style={styles.titleInfo}>E-mail</Text>
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


         </View>

         <View style={styles.containerFooter}>
           <TouchableOpacity onPress={this._cancelEdit}>
             <Image
               style={{height: 42, width: 42}}
               source={require('./../../picture/profil/error.png')}
               resizeMode="contain"
               />
           </TouchableOpacity>

           <TouchableOpacity onPress={this._confirmEdit}>
             <Image
               style={{height: 42, width: 42}}
               source={require('./../../picture/profil/success.png')}
               resizeMode="contain"
               />
           </TouchableOpacity>

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
    borderWidth: 0,
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
