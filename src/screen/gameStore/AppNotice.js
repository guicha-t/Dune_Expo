import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity, Platform } from 'react-native';
import { observer } from 'mobx-react';
import Star from 'react-native-star-view';

import { Rating, AirbnbRating } from 'react-native-ratings';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';

@observer
export default class AppNotice extends Component {
  constructor(props){
    super(props);
    this.state = {
    Prof1:[],
    Prof2:[],
    Prof3:[],
    Prof4:[],
    Prof5:[],

    }
  }


  componentDidMount(){

    fetch('http://176.31.252.134:7001/api/v1/store/avis/', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
            idApp: Store.AppId,
            depart:1,
            nbRes:5,
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Prof1':responseJson.response[0]})
          this.setState({'Prof2':responseJson.response[1]})
          this.setState({'Prof3':responseJson.response[2]})
          this.setState({'Prof4':responseJson.response[3]})
          this.setState({'Prof5':responseJson.response[4]})

        })
        .catch((error) => {
          console.error(error);
        });
  }


render() {
      const starStyle = {
        width: 100,
        height: 20,
      };
    return(
    <View style={styles.MainContainer}>
        <Header navigation={this.props.navigation}/>
    	<View style={{flex:0.3, alignItems: 'center', justifyContent:'center',}}>
          <Text style={{fontSize:20,}}>
             Avis Professeurs
          </Text>
        </View>
        <View style={styles.containerBody}>
          <View style={{paddingTop:10, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:80, height:80}}>
              <Image
                style={{flex: 1, borderRadius:50}}
                source={{uri: 'http://www.toupie.org/Photos/Bourdieu.jpg'}}
              />
            </View>
            <View style={styles.ProfContainer}>
              <Text style={styles.titleInfo}>{this.state.Prof1.nomProf}</Text>
              <Text style={styles.titleInfo}> {this.state.Prof1.prenomProf}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Star score={this.state.Prof1.note} style={starStyle} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.titleInfo}>Commentaire : {this.state.Prof1.commentaire}</Text>
            </View>
          </View>

          <View style={{paddingTop:10, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:80, height:80}}>
              <Image
                style={{flex: 1, borderRadius:50}}
                source={{uri: 'http://www.toupie.org/Photos/Bourdieu.jpg'}}
              />
            </View>
            <View style={styles.ProfContainer}>
              <Text style={styles.titleInfo}>{this.state.Prof2.nomProf}</Text>
              <Text style={styles.titleInfo}> {this.state.Prof2.prenomProf}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Star score={this.state.Prof1.note} style={starStyle} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.titleInfo}>Commentaire : {this.state.Prof2.commentaire}</Text>
            </View>
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
    flex: 0.7,
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
  },
  ProfContainer: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
    margin: 5,
  },
    MainContainer :{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
