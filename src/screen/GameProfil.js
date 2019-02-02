import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../global/header/Header';
import Store from './../global/store/Store'

@observer
export default class GameProfil extends Component {
  constructor(props){

    super(props);
    this.state = {
      Game: [],
      id:'',
    }
  }

  componentDidMount(){
    fetch('http://176.31.252.134:7001/api/v1/store/getApp', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
           idApp: this.props.screenProps.id,
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Game':responseJson.response[0]})
        })
        .catch((error) => {
          console.error(error);
        });
  }


  render() {
      const { navigation, id, screenProps } = { ...this.props };
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
            <Button
              title="Retour"
              onPress={() => screenProps.navigation.navigate('GamesList')}
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
