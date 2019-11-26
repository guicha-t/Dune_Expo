import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { observer } from 'mobx-react';
import AlertPro from "react-native-alert-pro";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Fumi } from 'react-native-textinput-effects';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Button } from 'react-native-elements';


import Header from './../../global/header/Header';
import Store from './../../global/store/Store';
import * as cfg from "./../../Config";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

@observer
export default class RateApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      Commentaire:'',
      position:'',
      Status:0,
      Game:[],
      Notice:[],
    }
    this.starPos = this.starPos.bind (this);
  }

  componentDidMount(){

    fetch(cfg.API_URL + '/store/getApp', {
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



   fetch(cfg.API_URL + '/store/getUserAvis/' + Store.AppId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          if (JSON.stringify(responseJson.status) == 200){
            this.setState({'Notice':responseJson.response[0]})
            this.setState({'Commentaire': this.state.Notice.commentaire})
            this.setState({'position': this.state.Notice.note})
            this.setState({'Status': 1})
          }
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


    if (this.state.Status == 0){
    fetch(cfg.API_URL + '/store/addAvis', {
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
          this.AlertPro.open()
    })
    .catch((error) => {
      console.error(error);
    });
  }

    else {
    fetch(cfg.API_URL + '/store/updateUserAvis', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        idApp: Store.AppId,
        note:this.state.position,
        commentaire:this.state.Commentaire,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          this.AlertPro.open()
    })
    .catch((error) => {
      console.error(error);
    });
  }



  };


  starPos(rating) {
      this.setState({'position':rating})
  }

render() {
    return(
    <DismissKeyboard>
    <View style={styles.container}>
        <Header navigation={this.props.navigation}/>

       <KeyboardAvoidingView style={styles.container}  behavior="padding" >

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Store.Back}}>

            <View style={{flex:0.3, width:120, height:120, paddingBottom:20}}>
              <Image
                style={{flex: 1, borderRadius:10}}
                source={{uri: cfg.API_URL + '/files/apps/' + this.state.Game.picPath}}
              />
            </View>

            <View style={{flex: 0.1, alignItems: 'center', paddingBottom: 8}}>
              <Text style={{color: Store.Text2, fontWeight: 'bold', fontSize: 14,}}>Que pensez-vous cette application ?</Text>
            </View>
            <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
              <View style={{flex: 0.7}}>
                <Fumi
                  label={'Noter cette application'}
                  style={{ width: 270, backgroundColor:Store.Back}}
                  value={this.state.Commentaire}
                  onChangeText={(Commentaire) => this.setState({ Commentaire })}
                  iconClass={FontAwesomeIcon}
                  iconName={'comment'}
                  iconColor={Store.Text2}
                  labelStyle={{ color: Store.Text2 }}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                />
               </View>
            </View>

          <AirbnbRating
            count={5}
            reviews={["Echec", "Insuffisant", "Moyen", "Satisfaisant", "Très satisfaisant"]}
            defaultRating={this.state.position}
            size={30}
            onFinishRating={this.starPos}
          />

          <View style={{flex: 0.30, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{ flex: 0.40 }} onPress={this._cancelDemand}>
              <Button
                title=""
                onPress={()=>this.props.navigation.navigate('GamesList')}
                icon={{
                 type: 'font-awesome',
                 name: 'times',
                 size: 15,
                 color: 'white',
               }}
                buttonStyle={{
                  backgroundColor: cfg.SECONDARY,
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 30,
                  width: 60,
                  height:60,
                  paddingLeft: 20,
                }}
                containerStyle={{ height: 50, width: 250 }}
                titleStyle={{ fontWeight: 'bold' }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 0.20 }} onPress={this._confirmDemand}>
              <Button
                title=""
                onPress={()=>this.props.navigation.navigate('GamesList')}
                icon={{
                 type: 'font-awesome',
                 name: 'check',
                 size: 15,
                 color: 'white',
               }}
                buttonStyle={{
                  backgroundColor: cfg.SECONDARY,
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 30,
                  width: 60,
                  height:60,
                  paddingLeft: 20,
                }}
                containerStyle={{ height: 50, width: 250 }}
                titleStyle={{ fontWeight: 'bold' }}
              />
             </TouchableOpacity>
          </View>
          <AlertPro
            ref={ref => {
              this.AlertPro = ref;
            }}
            onConfirm={() => this.props.navigation.navigate('GameContainer')}
            showCancel={false}
            title="AVIS ENVOYÉ"
            message="Merci pour vos commentaires."
            textConfirm="Retour"
            closeOnPressMask={true}
            customStyles={{
              mask: {
                backgroundColor: "transparent"
              },
              container: {
                borderWidth: 1,
                borderColor: "#6ED528",
                shadowColor: "#000000",
                shadowOpacity: 0.1,
                shadowRadius: 10
              },
              buttonConfirm: {
                backgroundColor: "#6ED528"
              }
            }}
          />
        </View>
        </KeyboardAvoidingView>
    </View>
    </DismissKeyboard>

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
    color: cfg.SECONDARY,
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
