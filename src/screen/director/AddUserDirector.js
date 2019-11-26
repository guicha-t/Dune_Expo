import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { observer } from 'mobx-react';
import { Sae, Fumi } from 'react-native-textinput-effects';
import {Button} from 'react-native-elements'
import AlertPro from "react-native-alert-pro";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


import Header from './../../global/header/Header';
import Store from './../../global/store/Store';
import * as cfg from "./../../Config";


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


@observer
export default class AddUserDirector extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.navigation.getParam('name', ''),
      lastname: this.props.navigation.getParam('lastname', ''),
      email: this.props.navigation.getParam('email', ''),
    }
  }

  _cancelEdit = async () => {
    this.props.navigation.navigate('Dashboard');
  };

  _confirmEdit = async () => {

    if (this.state.lastname.length == 0 || this.state.name.length == 0 || this.state.email.length == 0){
        Alert.alert('ERREUR', 'Veuillez remplir tous les champs')
        return;
    }

    fetch(cfg.API_URL + '/users/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUser: Store.IdUser,
        nomUser: this.state.lastname,
        prenomUser: this.state.name,
        emailUser: this.state.email,
        token: Store.Token,

      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          this.AlertPro.open()
        })
        .catch((error) => {
          console.error(error);
        });
  };

  render() {
    return(

      <DismissKeyboard>
      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>

        <View style={{flex: 1, backgroundColor:Store.Back}}>
        <View style={{backgroundColor:Store.Back, marginTop:15}}>
            <Button
              title=""
              onPress={()=>this.props.navigation.navigate('Dashboard')}
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

        <View style={styles.containerBody}>

          <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex: 0.7}}>
              <Fumi
                label={'Nom'}
                style={{ width: 300, backgroundColor:Store.Back}}
                onChangeText={(lastname) => this.setState({lastname})}
                value={this.state.lastname}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={Store.Text2}
                labelStyle={{ color: Store.Text2 }}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
              />
            </View>
          </View>

          <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex: 0.7}}>
              <Fumi
                label={'Prénom'}
                style={{ width: 300, backgroundColor:Store.Back}}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={Store.Text2}
                labelStyle={{ color: Store.Text2 }}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
              />
            </View>
          </View>


          <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex: 0.7}}>
              <Fumi
                label={'Email'}
                style={{ width: 300, backgroundColor:Store.Back}}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                iconClass={FontAwesomeIcon}
                iconName={'at'}
                iconColor={Store.Text2}
                labelStyle={{ color: Store.Text2 }}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
              />
            </View>
          </View>
        </View>

         <View style={styles.containerFooter}>
              <Button
                onPress={this._confirmEdit}
                title="VALIDER"
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
                  width: 160,
                  height:60,
                  alignItems:'center',
                  paddingLeft: 10,
                }}
                containerStyle={{ marginVertical: 10, marginLeft: 40, height: 50, width: 250 }}
                titleStyle={{ fontWeight: 'bold' }}
              />
         </View>


            <AlertPro
               ref={ref => {
                 this.AlertPro = ref;
               }}
               onConfirm={() => this.props.navigation.navigate('Dashboard')}
               showCancel={false}
               title="SUCCÈS"
               message="Le professeur a bien été ajouté au trombinoscope"
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
      </View>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Store.Back,
    flex: 1
  },
  input: {
    width: 220,
    height: 44,
    padding: 10,
    borderWidth: 0,
    borderColor: 'black',
    marginBottom: 10,
  },
  containerBody: {
    flex: 1,
    paddingBottom:90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleInfo: {
    color: Store.Text2,
    fontWeight: 'bold',
    fontSize: 14,
  },
  containerFooter: {
    flexDirection: 'row',
    paddingBottom: 100,
    justifyContent:'center',
    alignItems:'center'
  },
});
