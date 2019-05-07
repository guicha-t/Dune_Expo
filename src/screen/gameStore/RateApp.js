import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity, Platform } from 'react-native';
import { observer } from 'mobx-react';

import { Rating, AirbnbRating } from 'react-native-ratings';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';

@observer
export default class RateApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      Commentaire:'',
      position:'',
      Game:[],
    }
    this.starPos = this.starPos.bind (this);
  }

  componentDidMount(){

    fetch('http://176.31.252.134:9001/api/v1/store/getApp', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
           idApp: Store.AppId,
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Game':responseJson.response[0]})
        })
        .catch((error) => {
          console.error(error);
        });
  }


_cancelDemand = async () => {
    this.props.navigation.navigate('GameContainer');
  };

  _confirmDemand = async () => {
      if (this.state.Commentaire === ''){
        Alert.alert('ATTENTION', 'Veuillez remplir la section \'Commentaire\'.');
        return;
    }
      if (this.state.position.length == 0){
        Alert.alert('ATTENTION', 'Veuillez noter l\'application.');
        return;
    }


    fetch('http://176.31.252.134:9001/api/v1/store/addAvis', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        idGame: Store.AppId,
        note:this.state.position,
        commentaire:this.state.Commentaire,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          Alert.alert('AVIS ENVOYÉ', 'Merci pour vos commentaires.');
          this.props.navigation.navigate('GameContainer');
    })
    .catch((error) => {
      console.error(error);
    });
  };


  starPos(rating) {
      this.setState({'position':rating})
  }

render() {
    return(
    <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        <View style={styles.containerBody}>

            <View style={{flex:0.3, width:120, height:120, paddingBottom:20}}>
              <Image
                style={{flex: 1, borderRadius:10}}
                source={{uri: 'http://176.31.252.134:9001/files/apps/' + this.state.Game.picPath}}
              />
            </View>

            <View style={{flex: 0.1, alignItems: 'center', paddingBottom: 8}}>
              <Text style={styles.titleInfo}>Que pensez-vous cette application ?</Text>
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

          <AirbnbRating
            count={5}
            reviews={["Echec", "Insuffisant", "Moyen", "Satisfaisant", "Très satisfaisant"]}
            defaultRating={0}
            size={30}
            onFinishRating={this.starPos}
          />

          <View style={{flex: 0.30, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{ flex: 0.20 }} onPress={this._cancelDemand}>
              <Image
                style={{height: 42, width: 42}}
                source={require('./../../picture/profil/error.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.12 }} onPress={this._confirmDemand}>
              <Image
                style={{height: 42, width: 42}}
                source={require('./../../picture/profil/success.png')}
                resizeMode="contain"
               />
             </TouchableOpacity>
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
