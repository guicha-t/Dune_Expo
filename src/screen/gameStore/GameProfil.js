import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, AsyncStorage, Image, TouchableOpacity, ScrollView, Modal, FlatList, Dimensions} from 'react-native';
import { observer } from 'mobx-react';
import Star from 'react-native-star-view';
import { Divider, Button } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AlertPro from "react-native-alert-pro";

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';
import * as cfg from "./../../Config";

@observer
export default class GameProfil extends Component {
  constructor(props){
    super(props);
    this.state = {
      Game: [],
      Status: '',
      Rating:[],
      Skills:[],
      Disabled: false,
      ModalVisibleStatus: false,
    }
  }

  componentDidMount(){

    Store.setAppId((this.props.id).toString())

    fetch(cfg.API_URL + '/store/getAppStatus/' + this.props.navigation.getParam('id', this.props.id).toString(), {
       method: 'GET',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         token: Store.Token,
       },
     }).then((response) => response.json())
         .then((responseJson) => {
           this.setState({'Status':JSON.stringify(responseJson.appStatus)})
          if (this.state.Status === "\"0\"") {
            this.setState({'Disabled': false})
           } else {
             this.setState({'Disabled': true})
           }
         })
         .catch((error) => {
           console.error(error);
         });


    fetch(cfg.API_URL + '/store/nbAvis/' + this.props.navigation.getParam('id', this.props.id).toString(), {
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

    fetch(cfg.API_URL + '/store/getApp', {
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

    fetch(cfg.API_URL + '/competences/getAppComps/' + this.props.navigation.getParam('id', this.props.id).toString(), {
       method: 'GET',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         token: Store.Token,
       },
     }).then((response) => response.json())
         .then((responseJson) => {
           this.setState({'Skills': responseJson.response})
           //Alert.alert("lol", JSON.stringify(this.state.Skills))
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
      fetch(cfg.API_URL + '/store/buyAppDirecteur', {
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
            this.AlertPro.open()
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

  _checkPriceApp(){
  if (this.state.Game.prix == 0 || this.state.Game.prix == null)
    return(
         <Button
           title={'ENREGISTRER'}
           icon={{
             type: 'font-awesome',
             name: 'download',
             size: 15,
             color: 'white',
           }}
           onPress={() => this._ObtainApp()}
             buttonStyle={{
               backgroundColor: cfg.SECONDARY,
               borderColor: 'white',
               borderRadius: 30,
               width: 180,
               height:50,
               alignItems:'center',
               paddingLeft: 10,
               justifyContent:'center',
             }}
         />
    )

  else
    return(
         <Button
           title={'ACHETER'}
           icon={{
             type: 'font-awesome',
             name: 'download',
             size: 15,
             color: 'white',
           }}
           onPress={() => this._ObtainApp()}
             buttonStyle={{
               backgroundColor: cfg.SECONDARY,
               borderColor: 'white',
               borderRadius: 30,
               width: 180,
               height:50,
               alignItems:'center',
               paddingLeft: 10,
               justifyContent:'center',
             }}
         />
    )
  }

  _renderAppRequest(){
  if (Store.TypeUser == 2)
    return(
      <View style={{paddingBottom: 10}}>
       <View style={{paddingBottom: 10}}>

        {this._checkPriceApp()}

       </View>

        <Button
          title={'NOTER'}
          icon={{
            type: 'font-awesome',
            name: 'star',
            size: 15,
            color: 'white',
          }}
          onPress={() => this.props.navigation.navigate('RateApp')}
            buttonStyle={{
              backgroundColor: cfg.SECONDARY,
              borderColor: 'white',
              borderRadius: 30,
              width: 180,
              height:50,
              alignItems:'center',
              paddingLeft: 10,
              justifyContent:'center',
            }}
        />
      </View>
    );
  else
    return(
      <View style={{paddingBottom: 10}}>
       <View style={{paddingBottom: 10}}>
        <Button
          title={'DEMANDER'}
          disabled={this.state.Disabled}
          icon={{
            type: 'font-awesome',
            name: 'download',
            size: 15,
            color: 'white',
          }}
           onPress={() => this._checkIfBuyed()}
             buttonStyle={{
               backgroundColor: cfg.SECONDARY,
               borderColor: 'white',
               borderRadius: 30,
               width: 180,
               height:50,
               alignItems:'center',
               paddingLeft: 10,
               justifyContent:'center',
            }}
        />
       </View>

        <Button
          title={'NOTER'}
          icon={{
            type: 'font-awesome',
            name: 'star',
            size: 15,
            color: 'white',
          }}
          onPress={() => this.props.navigation.navigate('RateApp')}
            buttonStyle={{
              backgroundColor: cfg.SECONDARY,
              borderColor: 'white',
              borderRadius: 30,
              width: 180,
              height:50,
              alignItems:'center',
              paddingLeft: 10,
              justifyContent:'center',
            }}
        />
      </View>
    );
  }

  _goToNotice() {

  if (this.state.Rating.nbAvis > 0)
    this.props.navigation.navigate('AppNotice')

  }

  _printPrice(){

  if (this.state.Game.prix != null)
    return (this.state.Game.prix)
  else
    return ('gratuit')

  }

  ShowModalFunction = (visible) => {
    this.setState({'ModalVisibleStatus': visible});
  }


  _printArraySkills(){
        return(
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.Skills}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
                <View style={{flex: 1, paddingLeft: 10, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                  <Text style={{textAlign:'center', justifyContent:'center', alignItems:'center', fontWeight:'bold', color:Store.TRose, fontSize:20}}>- {item.libelleComp}</Text>
                </View>
            }
            keyExtractor={item => item.idComp.toString()}
            />
        );
  }


  render() {
      const starStyle = {
        width: 100,
        height: 20,
        marginBottom: 20,
      };

      const count = parseFloat(this.state.Rating.moyenne, 10)

      return(
        <ScrollView style={{flex:1, backgroundColor: Store.Back}}>
          <View style={{marginTop:15}}>
            <Button
              title=""
              onPress={()=>this.props.navigation.navigate('GamesList')}
              icon={{
               type: 'font-awesome',
               name: 'arrow-left',
               size: 15,
               color: 'white',
             }}
              buttonStyle={{
                backgroundColor: cfg.SECONDARY,
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
                width: 60,
                paddingLeft: 20,
              }}
              containerStyle={{ height: 50, width: 250 }}
              titleStyle={{ fontWeight: 'bold' }}
            />
          </View>
          <View style={{flex: 1, paddingTop: 30, paddingBottom: 20, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{height: 120, width: 120, marginBottom: 10, borderRadius: 30,}}
              source={{uri: cfg.API_URL + '/files/apps/' + this.state.Game.picPath}}
              resizeMode="contain"
              />
              <Text style={{color:Store.Text2, fontWeight: 'bold', fontSize: 18, paddingTop:10}}>{this.state.Game.nomApp}</Text>
              <Text style={{color:Store.Text2, fontSize:18, paddingTop:10, paddingBottom:15}}>{this.state.Game.nomCreator}</Text>

              <Star score={count} style={starStyle} />

              <TouchableOpacity onPress={() => this._goToNotice()} >
                <Text style={{color:Store.Text2, textDecorationLine:'underline'}}>{this.state.Rating.nbAvis} Avis</Text>
              </TouchableOpacity>
              <Text style={{color:Store.Text2, marginLeft:10, marginRight:10, fontSize:18, fontWeight:'bold', paddingTop:50}}>{this.state.Game.description}</Text>




                <View>
                    <Modal
                        transparent={true}

                        animationType={"slide"}

                        visible={this.state.ModalVisibleStatus}

                        onRequestClose={() => {
                          Alert.alert('Modal has been closed.');
                        }}>

                        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.ModalInsideView}>
                                <Text style={styles.TextStyle}>
                                   Voici la liste des compétences que vos élèves pourront acquérir en utilisant cette application :
                                </Text>

                                <View style={{flex: 0.8, width:Math.round(Dimensions.get('window').width), alignItems:'center', justifyContent:'center'}}>
                                  <View style={{flex: 1, paddingLeft: 10, flexDirection: 'row'}}>
                                    {this._printArraySkills()}
                                  </View>
                                </View>

                                <Button
                                  title={'RETOUR'}
                                  icon={{
                                    type: 'font-awesome',
                                    name: 'arrow-left',
                                    size: 15,
                                    color: 'white',
                                  }}
                                   onPress={() => {this.ShowModalFunction(!this.state.ModalVisibleStatus)}}
                                     buttonStyle={{
                                       backgroundColor: cfg.SECONDARY,
                                       borderColor: 'white',
                                       borderRadius: 30,
                                       width: 180,
                                       height:50,
                                       alignItems:'center',
                                       paddingLeft: 10,
                                       justifyContent:'center',
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>




              <TouchableOpacity onPress={() => {this.ShowModalFunction(true);}} >
                <Text style={{textDecorationLine:'underline', color:Store.Text2, fontSize: 18, paddingTop:10}}>compétences associées</Text>
              </TouchableOpacity>
              <Text style={{color:Store.Text2, fontSize:18, paddingTop:15, paddingBottom:15}}>Version : {this.state.Game.current_version}</Text>
              <Text style={{color:'#32C532', fontSize:18, fontWeight:'bold', paddingTop:15}}>€ : {this._printPrice()}</Text>
              <View style={{paddingTop:30}}>
               {this._renderAppRequest()}
              </View>
          </View>
          <AlertPro
            ref={ref => {
              this.AlertPro = ref;
            }}
            onConfirm={() => this.props.navigation.navigate('GamesList')}
            showCancel={false}
            title="APPLICATION ENREGISTRÉE"
            message="Votre demande a bien été envoyée et l'application a été ajoutée dans votre bibliothèque."
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
        </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
  titleInfo: {
      color: cfg.SECONDARY,
      fontWeight: 'bold',
      fontSize: 16,
      paddingTop:20,
    },
  ModalInsideView:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : cfg.SECONDARY,
      height: 450 ,
      width: '90%',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff'

  },
  TextStyle:{
      fontSize: 20,
      color: "#fff",
      textAlign: 'center'
  },

  });
