import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'

@observer
export default class RequestApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      Commentaire:'',
    }
  }


_cancelDemand = async () => {
    this.props.navigation.navigate('GameContainer');
  };

  _confirmDemand = async () => {
    if (this.state.Commentaire === ''){
        Alert.alert('ATTENTION', 'Veuillez remplir la section \'Commentaire\'.');
        return;
    }
    fetch('http://api.dune-table.com/api/v1/store/buyApp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        idApp: Store.AppId,
        commentaire:this.state.Commentaire,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          Alert.alert('DEMANDE ENVOYÉE', 'Votre demande a bien été envoyée et est en attente de traîtement.');
          this.props.navigation.navigate('GameContainer');
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
            <View style={{flex: 0.1, alignItems: 'center', paddingBottom: 8}}>
              <Text style={styles.titleInfo}>Pourquoi voulez-vous cette application ?</Text>
            </View>
          <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex: 0.7}}>
              <TextInput
               style={styles.input}
               placeholder='Commentaire...'
               onChangeText={(Commentaire) => this.setState({Commentaire})}
               value={this.state.Commentaire}
              />
             </View>
          </View>
          <View style={styles.containerFooter}>
           <Button
             title={'Valider'}
             color='#363453'
             onPress={this._confirmDemand}
           />
           <Button
             title={'Retour'}
             color='#363453'
             onPress={this._cancelDemand}
           />
          </View>
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
    width: 255,
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
      marginTop:10,
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'space-around',
  },
});
