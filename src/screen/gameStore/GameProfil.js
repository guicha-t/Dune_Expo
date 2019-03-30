import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, Image } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'

@observer
export default class GameProfil extends Component {
  constructor(props){
    super(props);
    this.state = {
      Game: [],
      Status:'',
    }
  }

  componentDidMount(){

    fetch('http://176.31.252.134:7001/api/v1/store/getAppStatus/' + this.props.id.toString(), {
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

    fetch('http://176.31.252.134:7001/api/v1/store/getApp', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
           idApp: this.props.id,
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

  Alert.alert(this.state.Status)

  if (this.state.Status == 1)
    return(
      <View style={{paddingBottom: 10}}>
        <Button
          title={'Demander cette application'}
          color='#363453'
          onPress={() => this.props.navigation.navigate('RequestApp')}
        />
      </View>
    );
  if (this.state.Status == 0)
    return(
      <View style={{paddingBottom: 10}}>
        <Button
          title={'Noter cette application'}
          color='#363453'
          onPress={() => this.props.navigation.navigate('RequestApp')}
        />
      </View>
    );
  }

  render() {
      //const { navigation, id, screenProps } = { ...this.props };
      //Store.setAppId(this.state.Game.id)
      return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width:150, height:150}}>
              <Image
                style={{flex: 1, borderRadius:10}}
                source={{uri: 'http://176.31.252.134:7001/files/apps/' + this.state.Game.picPath}}
              />
            </View>
            <View style={{paddingTop:40}}>
            <Text style={styles.titleInfo}>Nom : {this.state.Game.nomApp}</Text>
            <Text style={styles.titleInfo}>Créateur : {this.state.Game.nomCreator}</Text>
            <Text style={styles.titleInfo}>ID : {this.state.Game.id}</Text>
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
