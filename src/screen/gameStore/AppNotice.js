import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import Star from 'react-native-star-view';
import { Divider, Button } from 'react-native-elements';
import moment from "moment";
import 'moment/locale/fr'
moment.locale('fr')

import { Rating, AirbnbRating } from 'react-native-ratings';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';
import * as cfg from "./../../Config";

const starStyle = {
  width: 100,
  height: 20,
};

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
    NextPage:1,
    PrevPage:0,
    CurrentRow:0,
    CurrentPage:1,
    Prof1IsEmpty:0,
    Prof2IsEmpty:0,
    Prof3IsEmpty:0,
    Prof4IsEmpty:0,
    Prof5IsEmpty:0,
    Rating:[],
    }
  }


  componentDidMount(){


    fetch(cfg.API_URL + '/store/nbAvis/' + Store.AppId, {
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



    fetch(cfg.API_URL + '/store/avis/', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
            idApp: Store.AppId,
            depart:0,
            nbRes:5,
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          if (JSON.stringify(responseJson.response[0]) == null){
            this.setState({'Prof1IsEmpty': 1})
          }
          else{
            this.setState({'Prof1':responseJson.response[0]})
            this.setState({'Moyenne1':this.state.Prof1.note})
          }
          if (JSON.stringify(responseJson.response[1]) == null){
            this.setState({'Prof2IsEmpty': 1})
          }
          else{
            this.setState({'Prof2':responseJson.response[1]})
            this.setState({'Moyenne2':this.state.Prof2.note})
          }
          if (JSON.stringify(responseJson.response[2]) == null){
            this.setState({'Prof3IsEmpty': 1})
          }
          else{
            this.setState({'Prof3':responseJson.response[2]})
            this.setState({'Moyenne3':this.state.Prof3.note})
          }
          if (JSON.stringify(responseJson.response[3]) == null){
            this.setState({'Prof4IsEmpty': 1})
          }
          else{
            this.setState({'Prof4':responseJson.response[3]})
            this.setState({'Moyenne4':this.state.Prof4.note})
          }
          if (JSON.stringify(responseJson.response[4]) == null){
            this.setState({'Prof5IsEmpty': 1})
          }
          else{
            this.setState({'Prof5':responseJson.response[4]})
            this.setState({'Moyenne5':this.state.Prof5.note})
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

_printFirstNotice() {
   if (this.state.Prof1IsEmpty == 0)
   return(
          <View style={{paddingTop:10, paddingBottom:30, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:80, height:80}}>
              <Image
                style={{flex: 1, borderRadius:50}}
                source={{uri: cfg.API_URL + '/files/profs/' + this.state.Prof1.photo}}
              />
            </View>
            <View style={styles.ProfContainer}>
              <Text style={styles.profInfo, {color:Store.Text2}}>{this.state.Prof1.nomProf}</Text>
              <Text style={styles.profInfo, {color:Store.Text2}}> {this.state.Prof1.prenomProf}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Star score={this.state.Moyenne1} style={starStyle} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.commentaire, {color:Store.Text2}}>{this.state.Prof1.commentaire}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.commentaire, {color:Store.Text2}}>{moment(this.state.Prof1.date).format("DD-MM-YYYY à HH:mm:ss")}</Text>
            </View>
          </View>
   );
   else
   return;
}

_printSecondNotice() {
    if (this.state.Prof2IsEmpty == 0)
    return(
              <View style={{paddingTop:10, paddingBottom:30, justifyContent:'center', alignItems:'center'}}>
                <View style={{width:80, height:80}}>
                  <Image
                    style={{flex: 1, borderRadius:50}}
                    source={{uri: cfg.API_URL + '/files/profs/' + this.state.Prof2.photo}}
                  />
                </View>
                <View style={styles.ProfContainer}>
                  <Text style={styles.profInfo, {color:Store.Text2}}>{this.state.Prof2.nomProf}</Text>
                  <Text style={styles.profInfo, {color:Store.Text2}}> {this.state.Prof2.prenomProf}</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
                  <Star score={this.state.Moyenne2} style={starStyle} />
                </View>
                <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
                  <Text style={styles.commentaire, {color:Store.Text2}}>{this.state.Prof2.commentaire}</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
                  <Text style={styles.commentaire, {color:Store.Text2}}>{moment(this.state.Prof2.date).format("DD-MM-YYYY à HH:mm:ss")}</Text>
                </View>
              </View>
    );
    else
    return;
}

_printThirdNotice() {
    if (this.state.Prof3IsEmpty == 0)
    return (
          <View style={{paddingTop:10, paddingBottom:30, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:80, height:80}}>
              <Image
                style={{flex: 1, borderRadius:50}}
                source={{uri: cfg.API_URL + '/files/profs/' + this.state.Prof3.photo}}
              />
            </View>
            <View style={styles.ProfContainer}>
              <Text style={styles.profInfo, {color:Store.Text2}}>{this.state.Prof3.nomProf}</Text>
              <Text style={styles.profInfo, {color:Store.Text2}}> {this.state.Prof3.prenomProf}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Star score={this.state.Moyenne3} style={starStyle} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.commentaire, {color:Store.Text2}}>{this.state.Prof3.commentaire}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.commentaire, {color:Store.Text2}}>{moment(this.state.Prof3.date).format("DD-MM-YYYY à HH:mm:ss")}</Text>
            </View>
          </View>
    );
    else
    return;
}

_printForthNotice () {
    if (this.state.Prof4IsEmpty == 0)
    return (
          <View style={{paddingTop:10, paddingBottom:30, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:80, height:80}}>
              <Image
                style={{flex: 1, borderRadius:50}}
                source={{uri: cfg.API_URL + '/files/profs/' + this.state.Prof4.photo}}
              />
            </View>
            <View style={styles.ProfContainer}>
              <Text style={styles.profInfo, {color:Store.Text2}}>{this.state.Prof4.nomProf}</Text>
              <Text style={styles.profInfo, {color:Store.Text2}}> {this.state.Prof4.prenomProf}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Star score={this.state.Moyenne4} style={starStyle} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.commentaire, {color:Store.Text2}}>{this.state.Prof4.commentaire}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.commentaire, {color:Store.Text2}}>{moment(this.state.Prof4.date).format("DD-MM-YYYY à HH:mm:ss")}</Text>
            </View>
          </View>
    );
    else
    return;
}

_printFifthNotice () {
    if (this.state.Prof5IsEmpty == 0)
    return (
          <View style={{paddingTop:10, paddingBottom:30, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:80, height:80}}>
              <Image
                style={{flex: 1, borderRadius:50}}
                source={{uri: cfg.API_URL + '/files/profs/' + this.state.Prof5.photo}}
              />
            </View>
            <View style={styles.ProfContainer}>
              <Text style={styles.profInfo, {color:Store.Text2}}>{this.state.Prof5.nomProf}</Text>
              <Text style={styles.profInfo, {color:Store.Text2}}> {this.state.Prof5.prenomProf}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Star score={this.state.Moyenne5} style={starStyle} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.commentaire, {color:Store.Text2}}>{this.state.Prof5.commentaire}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
              <Text style={styles.commentaire, {color:Store.Text2}}>{moment(this.state.Prof5.date).format("DD-MM-YYYY à HH:mm:ss")}</Text>
            </View>
          </View>
    );
    else
    return;
}

_printPlusButton (){

    if (this.state.Prof5IsEmpty == 1 || this.state.Prof4IsEmpty == 1 || this.state.Prof3IsEmpty == 1 || this.state.Prof2IsEmpty == 1 || this.state.Prof1IsEmpty == 1  || ((this.state.CurrentPage * 5) == this.state.Rating.nbAvis))
      return(
            <Button
              title=""
              buttonStyle={{
                backgroundColor: Store.Back,
                borderWidth: 2,
                borderColor: Store.Back,
                borderRadius: 30,
                width: 60,
                paddingLeft: 20,
              }}
              containerStyle={{ height: 50, width: 250 }}
              titleStyle={{ fontWeight: 'bold' }}
            />
      );
    else{
      return(
            <Button
              title=""
              onPress={()=>this._addRowplus()}
              icon={{
               type: 'font-awesome',
               name: 'arrow-right',
               size: 15,
               color: 'white',
             }}
              buttonStyle={{
                backgroundColor: cfg.SECONDARY,
                borderWidth: 2,
                borderColor: Store.Back,
                borderRadius: 30,
                width: 60,
                paddingLeft: 20,
              }}
              containerStyle={{ height: 50, width: 250 }}
              titleStyle={{ fontWeight: 'bold' }}
            />
      );
    }
}

_printMenusButton (){
    if (this.state.CurrentRow == 0)
      return(
            <Button
              title=""
              buttonStyle={{
                backgroundColor: Store.Back,
                borderWidth: 2,
                borderColor: Store.Back,
                borderRadius: 30,
                width: 60,
                paddingLeft: 20,
              }}
              containerStyle={{ height: 50, width: 250 }}
              titleStyle={{ fontWeight: 'bold' }}
            />
      );
    else{
      return(
            <Button
              title=""
              onPress={()=>this._addRowmenus()}
              icon={{
               type: 'font-awesome',
               name: 'arrow-left',
               size: 15,
               color: 'white',
             }}
              buttonStyle={{
                backgroundColor: cfg.SECONDARY,
                borderWidth: 2,
                borderColor: Store.Back,
                borderRadius: 30,
                width: 60,
                paddingLeft: 20,
              }}
              containerStyle={{ height: 50, width: 250 }}
              titleStyle={{ fontWeight: 'bold' }}
            />
      );
    }
}

_addRowplus () {

    this.state.NextPage = this.state.CurrentRow + 5;
    this.state.CurrentRow = this.state.CurrentRow + 5;
    this.state.CurrentPage = this.state.CurrentPage + 1;
    fetch(cfg.API_URL + '/store/avis/', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
            idApp: Store.AppId,
            depart:this.state.NextPage,
            nbRes:5,
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          if (JSON.stringify(responseJson.response[0]) == null){
            this.setState({'Prof1IsEmpty': 1})
          }
          else{
            this.setState({'Prof1':responseJson.response[0]})
            this.setState({'Moyenne1':this.state.Prof1.note})
            this.setState({'Prof1IsEmpty': 0})
          }
          if (JSON.stringify(responseJson.response[1]) == null){
            this.setState({'Prof2IsEmpty': 1})
          }
          else{
            this.setState({'Prof2':responseJson.response[1]})
            this.setState({'Moyenne2':this.state.Prof2.note})
            this.setState({'Prof2IsEmpty': 0})
          }
          if (JSON.stringify(responseJson.response[2]) == null){
            this.setState({'Prof3IsEmpty': 1})
          }
          else{
            this.setState({'Prof3':responseJson.response[2]})
            this.setState({'Moyenne3':this.state.Prof3.note})
            this.setState({'Prof3IsEmpty': 0})
          }
          if (JSON.stringify(responseJson.response[3]) == null){
            this.setState({'Prof4IsEmpty': 1})
          }
          else{
            this.setState({'Prof4':responseJson.response[3]})
            this.setState({'Moyenne4':this.state.Prof4.note})
            this.setState({'Prof4IsEmpty': 0})
          }
          if (JSON.stringify(responseJson.response[4]) == null){
            this.setState({'Prof5IsEmpty': 1})
          }
          else{
            this.setState({'Prof5':responseJson.response[4]})
            this.setState({'Moyenne5':this.state.Prof5.note})
            this.setState({'Prof5IsEmpty': 0})
          }
        })
        .catch((error) => {
          console.error(error);
        });
}


_addRowmenus() {

this.state.CurrentPage = this.state.CurrentPage - 1;
this.state.PrevPage = this.state.CurrentRow - 5;
this.state.CurrentRow = this.state.CurrentRow - 5;
    fetch(cfg.API_URL + '/store/avis/', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
            idApp: Store.AppId,
            depart:this.state.PrevPage,
            nbRes:5,
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          if (JSON.stringify(responseJson.response[0]) == null){
            this.setState({'Prof1IsEmpty': 1})
          }
          else{
            this.setState({'Prof1':responseJson.response[0]})
            this.setState({'Moyenne1':this.state.Prof1.note})
            this.setState({'Prof1IsEmpty': 0})
          }
          if (JSON.stringify(responseJson.response[1]) == null){
            this.setState({'Prof2IsEmpty': 1})
          }
          else{
            this.setState({'Prof2':responseJson.response[1]})
            this.setState({'Moyenne2':this.state.Prof2.note})
            this.setState({'Prof2IsEmpty': 0})
          }
          if (JSON.stringify(responseJson.response[2]) == null){
            this.setState({'Prof3IsEmpty': 1})
          }
          else{
            this.setState({'Prof3':responseJson.response[2]})
            this.setState({'Moyenne3':this.state.Prof3.note})
            this.setState({'Prof3IsEmpty': 0})
          }
          if (JSON.stringify(responseJson.response[3]) == null){
            this.setState({'Prof4IsEmpty': 1})
          }
          else{
            this.setState({'Prof4':responseJson.response[3]})
            this.setState({'Moyenne4':this.state.Prof4.note})
            this.setState({'Prof4IsEmpty': 0})
          }
          if (JSON.stringify(responseJson.response[4]) == null){
            this.setState({'Prof5IsEmpty': 1})
          }
          else{
            this.setState({'Prof5':responseJson.response[4]})
            this.setState({'Moyenne5':this.state.Prof5.note})
            this.setState({'Prof5IsEmpty': 0})
          }
        })
        .catch((error) => {
          console.error(error);
        });

}

render() {

  return(
    <View style={{flex:1, backgroundColor:Store.Back}}>
        <Header navigation={this.props.navigation}/>
        <View style={{marginTop:15}}>
          <Button
            title=""
            onPress={()=>this.props.navigation.navigate('GameContainer')}
            icon={{
             type: 'font-awesome',
             name: 'arrow-left',
             size: 15,
             color: '#F9F9F9',
           }}
            buttonStyle={{
              backgroundColor: cfg.SECONDARY,
              borderWidth: 2,
              borderColor: '#F9F9F9',
              borderRadius: 30,
              width: 60,
              paddingLeft: 20,
            }}
            containerStyle={{ height: 50, width: 250 }}
            titleStyle={{ fontWeight: 'bold' }}
          />
        </View>
        <View style={styles.containerBody}>
          <ScrollView showsVerticalScrollIndicator={false} >


          {this._printFirstNotice()}
          {this._printSecondNotice()}
          {this._printThirdNotice()}
          {this._printForthNotice()}
          {this._printFifthNotice()}

         </ScrollView>
        </View>
          <View style={{justifyContent:'center', alignItems:'center', flexDirection: 'row'}}>
            {this._printMenusButton()}
            <Text style={{textDecorationLine:'underline', color:Store.Text2}}>{this.state.CurrentPage}</Text>
            {this._printPlusButton()}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profInfo: {
    color:Store.Text2,
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentaire:{
    color:Store.Text2,
    fontWeight: 'normal',
    fontSize: 12,
    fontStyle: 'italic',
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
