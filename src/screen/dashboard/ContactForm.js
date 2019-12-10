import React , {Component} from 'react';
import { Alert, View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Picker, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Fumi } from 'react-native-textinput-effects';
import { FormLabel, FormInput, FormValidationMessage, Icon, Button } from 'react-native-elements';
import AlertPro from "react-native-alert-pro";
import * as cfg from "./../../Config";

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class ContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      problem: '',
      typeofpb:'JEU',
    };
  }

sendEmail_ = () =>{

   if (this.state.problem.length == 0){
     Alert.alert('ERREUR', 'Veuillez remplir tous les champs')
     return;
   }

   fetch(cfg.API_URL + '/help/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        pbType: this.state.typeofpb,
        pbDetail: this.state.problem,
      }),
    }).then((response) => response.json())
       .then((responseJson) => {
        this.AlertPro.open()
    })
    .catch((error) => {
    });
}


render(){
return(

 <DismissKeyboard>
 <ScrollView style={styles.container, {backgroundColor:Store.Back}}>


   <Header navigation={this.props.navigation}/>

          <ScrollView style={{flex: 0.7, backgroundColor:Store.Back}}>

             <KeyboardAvoidingView style={styles.container, {backgroundColor:Store.Back}}  behavior="padding" >

              <View style={{marginTop:15, backgroundColor:Store.Back}}>
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

              <View style={{marginTop: 80, flex: 0.3, flexDirection: 'row', backgroundColor:Store.Back}}>
                <View style={{flex: 0.2}}></View>
                  <View style={{flex: 0.6,  alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{fontWeight: 'bold', color:Store.Text2, width:200}}>Votre problème est lié à...</Text>
                    <Picker selectedValue={this.state.typeofpb} style={{ height: 50, width: 155 }} onValueChange={(itemValue, itemIndex) => this.setState({typeofpb: itemValue})}>
                      <Picker.Item color={Store.TRose} label='Un jeu' value='JEU' />
                      <Picker.Item color={Store.TRose} label='La table' value='TABLE' />
                      <Picker.Item color={Store.TRose} label='Application mobile' value='MOBILE' />
                  </Picker>
               </View>
              </View>
              <View style={{flex: 0.2, backgroundColor:Store.Back}}></View>


              <View style={{marginTop:60, flex: 0.3, flexDirection:'row', backgroundColor:Store.Back}}>
                <View style={{flex: 0.2}}></View>
                  <View style={{flex: 0.6,  alignItems: 'center', justifyContent:'center'}}>
                   <TextInput
                       multiline={true}
                       numberOfLines={6}
                       value={this.state.problem}
                       onChangeText={(problem) => this.setState({ problem })}
                       style={{width:200, height:80, borderBottomColor:cfg.SECONDARY, borderBottomWidth:1, color:Store.Text2}}
                       textAlign={'center'}
                   />
                  </View>
              </View>

              </KeyboardAvoidingView>

            <View style={{marginTop: 100, flex: 0.2, flexDirection:'row', justifyContent:'center', backgroundColor:Store.Back}}>

              <Button
                onPress={this.sendEmail_}
                title="ENVOYER"
                icon={{
                 type: 'font-awesome',
                 name: 'paper-plane',
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

            <View style={{flex:1, paddingTop:170}}></View>

            <AlertPro
               ref={ref => {
                 this.AlertPro = ref;
               }}
               onConfirm={() => this.props.navigation.navigate('Dashboard')}
               showCancel={false}
               title="SUCCÈS"
               message="Votre messsage a bien été envoyé"
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
 </ScrollView>
 </DismissKeyboard>

 );

}

}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFF'
  }
});
