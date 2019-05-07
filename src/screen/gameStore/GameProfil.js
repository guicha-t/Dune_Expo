import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, Image, TouchableOpacity, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import Star from 'react-native-star-view';
import { Divider } from 'react-native-elements';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';


@observer
export default class GameProfil extends Component {
  constructor(props){
    super(props);
    this.state = {
      Game: [],
      Status:'',
      Rating:[]
    }
  }

  componentDidMount(){

    Store.setAppId((this.props.id).toString())

    fetch('http://176.31.252.134:9001/api/v1/store/getAppStatus/' + this.props.navigation.getParam('id', this.props.id).toString(), {
       method: 'GET',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         token: Store.Token,
       },
     }).then((response) => response.json())
         .then((responseJson) => {
           this.setState({'Status':JSON.stringify(responseJson.appStatus)})
         })
         .catch((error) => {
           console.error(error);
         });


    fetch('http://176.31.252.134:9001/api/v1/store/nbAvis/' + this.props.navigation.getParam('id', this.props.id).toString(), {
       method: 'GET',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         token: Store.Token,
       },
     }).then((response) => response.json())
         .then((responseJson) => {
           this.setState({'Rating':responseJson.response[0]})
         })
         .catch((error) => {
           console.error(error);
         });

    fetch('http://176.31.252.134:9001/api/v1/store/getApp', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
           idApp: this.props.navigation.getParam('id', this.props.id).toString(),
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Game':responseJson.response[0]})
        })
        .catch((error) => {
          console.error(error);
        });
  }

  _ObtainApp(){
    if (this.state.Status === "\"1\""){
      Alert.alert('ERREUR', 'Vous possédez déjà cette application');
      return;
    }
    else{
      fetch('http://176.31.252.134:9001/api/v1/store/buyAppDirecteur', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
           idApp: this.props.navigation.getParam('id', this.props.id).toString(),
          })
        }).then((response) => response.json())
        .then((responseJson) => {
            Alert.alert('APPLICATION ENREGISTRE', 'Votre demande a bien été envoyée et l\'application a été ajoutée dans votre bibliothèque.');
           this.props.navigation.navigate('GameList');
        })
        .catch((error) => {
          console.error(error);
        });
      }
  }

  _checkIfBuyed(){
    if (this.state.Status === "\"1\""){
      Alert.alert('ERREUR', 'Cette application est déjà enregistrée dans votre bibliothèque.');
      return;
    }
    else
      this.props.navigation.navigate('RequestApp')
  }

  _renderAppRequest(){

  if (Store.TypeUser == 2)
    return(
      <View style={{paddingBottom: 10}}>
       <View style={{paddingBottom: 10}}>
        <Button
          title={'Obtenir cette application'}
          color='#363453'
          onPress={() => this._ObtainApp()}
        />
       </View>

        <Button
          title={'Noter cette application'}
          color='#363453'
          onPress={() => this.props.navigation.navigate('RateApp')}
        />
      </View>
    );
  else
    return(
      <View style={{paddingBottom: 10}}>
       <View style={{paddingBottom: 10}}>
        <Button
          title={'Demander cette application'}
          color='#363453'
          onPress={() => this._checkIfBuyed()}
        />
       </View>

        <Button
          title={'Noter cette application'}
          color='#363453'
          onPress={() => this.props.navigation.navigate('RateApp')}
        />
      </View>
    );
  }

  render() {
      const starStyle = {
        width: 100,
        height: 20,
        marginBottom: 20,
      };
      //const { navigation, id, screenProps } = { ...this.props };
      return(
        <ScrollView style={{flex:1, backgroundColor: '#fff'}}>
          <View style={{flex: 0.5, paddingTop: 30, paddingBottom: 20, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{height: 120, width: 120, marginBottom: 10, borderRadius: 30,}}
              source={{uri: 'http://176.31.252.134:9001/files/apps/' + this.state.Game.picPath}}
              resizeMode="contain"
              />
              <Text style={{color:'#363453', fontWeight: 'bold', fontSize: 18, paddingTop:10}}>{this.state.Game.nomApp}</Text>
              <Text style={{color:'#363453', fontSize:18, paddingTop:10, paddingBottom:15}}>{this.state.Game.nomCreator}</Text>
              <Star score={this.state.Rating.moyenne} style={starStyle} />
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AppNotice')} >
                <Text style={{textDecorationLine:'underline'}}>{this.state.Rating.nbAvis} Avis</Text>
              </TouchableOpacity>
              <Text style={{marginLeft:10, marginRight:10, color:'#363453', fontSize:18, fontWeight:'bold', paddingTop:50}}>{this.state.Game.description}</Text>
              <Text style={{color:'#363453', fontSize:18, paddingTop:15, paddingBottom:15}}>Version : {this.state.Game.current_version}</Text>
              <Text style={{color:'#32C532', fontSize:18, fontWeight:'bold', paddingTop:15}}>Prix : {this.state.Game.prix} €</Text>
              <View style={{paddingTop:30}}>
               {this._renderAppRequest()}
               <Button
                 title="Retour"
                 color='#363453'
                 onPress={() => this.props.navigation.navigate('GamesList')}
               />
              </View>
          </View>
        </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
  titleInfo: {
      color: '#363453',
      fontWeight: 'bold',
      fontSize: 16,
      paddingTop:20,
    },
  });
