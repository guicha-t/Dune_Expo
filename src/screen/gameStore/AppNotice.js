import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
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
    Moyenne1:0,
    Prof2:[],
    Moyenne2:0,
    Prof3:[],
    Moyenne3:0,
    Prof4:[],
    Moyenne4:0,
    Prof5:[],
    Moyenne5:0,

    }
  }


  componentDidMount(){

    fetch('http://51.38.187.216:9000/api/v1/store/avis/', {
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
          this.setState({'Moyenne1':this.state.Prof1.note})
          this.setState({'Prof2':responseJson.response[1]})
          this.setState({'Moyenne2':this.state.Prof2.note})
          this.setState({'Prof3':responseJson.response[2]})
          this.setState({'Moyenne3':this.state.Prof3.note})
          this.setState({'Prof4':responseJson.response[3]})
          this.setState({'Moyenne4':this.state.Prof4.note})
          this.setState({'Prof5':responseJson.response[4]})
          this.setState({'Moyenne5':this.state.Prof5.note})

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
          <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{paddingTop:10, paddingBottom:30, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:80, height:80}}>
              <Image
                style={{flex: 1, borderRadius:50}}
                source={{uri: 'http://51.38.187.216:9000/files/profs/' + this.state.Prof1.photo}}
              />
            </View>
            <View style={styles.ProfContainer}>
              <Text style={styles.titleInfo}>{this.state.Prof1.nomProf}</Text>
              <Text style={styles.titleInfo}> {this.state.Prof1.prenomProf}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Star score={this.state.Moyenne1} style={starStyle} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.titleInfo}>{this.state.Prof1.commentaire}</Text>
            </View>
          </View>

          <View style={{paddingTop:10, paddingBottom:30, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:80, height:80}}>
              <Image
                style={{flex: 1, borderRadius:50}}
                source={{uri: 'http://51.38.187.216:9000/files/profs/' + this.state.Prof2.photo}}
              />
            </View>
            <View style={styles.ProfContainer}>
              <Text style={styles.titleInfo}>{this.state.Prof2.nomProf}</Text>
              <Text style={styles.titleInfo}> {this.state.Prof2.prenomProf}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Star score={this.state.Moyenne2} style={starStyle} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.titleInfo}>{this.state.Prof2.commentaire}</Text>
            </View>
          </View>

          <View style={{paddingTop:10, paddingBottom:30, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:80, height:80}}>
              <Image
                style={{flex: 1, borderRadius:50}}
                source={{uri: 'http://51.38.187.216:9000/files/profs/' + this.state.Prof3.photo}}
              />
            </View>
            <View style={styles.ProfContainer}>
              <Text style={styles.titleInfo}>{this.state.Prof3.nomProf}</Text>
              <Text style={styles.titleInfo}> {this.state.Prof3.prenomProf}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Star score={this.state.Moyenne3} style={starStyle} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.titleInfo}>{this.state.Prof3.commentaire}</Text>
            </View>
          </View>

          <View style={{paddingTop:10, paddingBottom:30, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:80, height:80}}>
              <Image
                style={{flex: 1, borderRadius:50}}
                source={{uri: 'http://51.38.187.216:9000/files/profs/' + this.state.Prof4.photo}}
              />
            </View>
            <View style={styles.ProfContainer}>
              <Text style={styles.titleInfo}>{this.state.Prof4.nomProf}</Text>
              <Text style={styles.titleInfo}> {this.state.Prof4.prenomProf}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Star score={this.state.Moyenne4} style={starStyle} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.titleInfo}>{this.state.Prof4.commentaire}</Text>
            </View>
          </View>

          <View style={{paddingTop:10, paddingBottom:30, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:80, height:80}}>
              <Image
                style={{flex: 1, borderRadius:50}}
                source={{uri: 'http://51.38.187.216:9000/files/profs/' + this.state.Prof5.photo}}
              />
            </View>
            <View style={styles.ProfContainer}>
              <Text style={styles.titleInfo}>{this.state.Prof5.nomProf}</Text>
              <Text style={styles.titleInfo}> {this.state.Prof5.prenomProf}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Star score={this.state.Moyenne5} style={starStyle} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.titleInfo}>{this.state.Prof5.commentaire}</Text>
            </View>
          </View>
         </ScrollView>
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
    flexDirection: 'row',
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
