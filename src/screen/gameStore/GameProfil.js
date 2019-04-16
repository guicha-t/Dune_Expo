import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import Star from 'react-native-star-view';

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

    fetch('http://176.31.252.134:7001/api/v1/store/getAppStatus/' + this.props.navigation.getParam('id', this.props.id).toString(), {
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


    fetch('http://176.31.252.134:7001/api/v1/store/nbAvis/' + this.props.navigation.getParam('id', this.props.id).toString(), {
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

    fetch('http://176.31.252.134:7001/api/v1/store/getApp', {
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

  _renderAppRequest(){

  /*if (this.state.Status == 1)
    return(
      <View style={{paddingBottom: 10}}>
        <Button
          title={'Demander cette application'}
          color='#363453'
          onPress={() => this.props.navigation.navigate('RequestApp')}
        />
      </View>
    );
  if (this.state.Status == 0)*/
    return(
      <View style={{paddingBottom: 10}}>
       <View style={{paddingBottom: 10}}>
        <Button
          title={'Demander cette application'}
          color='#363453'
          onPress={() => this.props.navigation.navigate('RequestApp')}
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
      return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width:120, height:120}}>
              <Image
                style={{flex: 1, borderRadius:10}}
                source={{uri: 'http://176.31.252.134:7001/files/apps/' + this.state.Game.picPath}}
              />
            </View>
            <View style={{paddingTop:20}}>
              <Text style={styles.titleInfo}>Nom : {this.state.Game.nomApp}</Text>
              <Text style={styles.titleInfo}>Créateur : {this.state.Game.nomCreator}</Text>
              <Text style={styles.titleInfo}>ID : {this.state.Game.id}</Text>
            </View>
            <View style={{paddingTop:20, alignItems:'center', justifyContent:'center'}}>
              <Star score={this.state.Rating.moyenne} style={starStyle} />
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AppNotice')} >
                <Text style={{textDecorationLine:'underline'}}>{this.state.Rating.nbAvis} Avis</Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingTop:30}}>

            {this._renderAppRequest()}

            <Button
              title="Retour"
              color='#363453'
              onPress={() => this.props.navigation.navigate('GamesList')}
            />
            </View>
          </View>
        </View>
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
