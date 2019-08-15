import React , {Component} from 'react';
import { Alert, View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Picker, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Fumi } from 'react-native-textinput-effects';
import { FormLabel, FormInput, FormValidationMessage, Icon, Button } from 'react-native-elements';
import AlertPro from "react-native-alert-pro";

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
      email: '',
      problem: '',
      typeofpb:'',
    };
  }

sendEmail_ = () =>{

   if (this.state.email.length == 0 || this.state.problem.length == 0){
     Alert.alert('ERREUR', 'Veuillez remplir tous les champs')
     return;
   }

   fetch('http://51.38.187.216:9090/help/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        pbType: this.state.typeofpb,
        pbDetail: this.state.problem.problem,
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
 <View style={styles.container}>

   <KeyboardAvoidingView style={styles.container}  behavior="padding" >

   <Header navigation={this.props.navigation}/>

          <View style={{flex: 0.7}}>

            <View style={{marginTop: 80, flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 0.2}}></View>
              <View style={{flex: 0.6, alignItems: 'center', justifyContent:'flex-end'}}>
                <Fumi
                  label={'E-mail'}
                  style={{ width: 300, backgroundColor:'#FFF'}}
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                  iconClass={FontAwesomeIcon}
                  iconName={'at'}
                  iconColor={'#363453'}
                  labelStyle={{ color: '#363453' }}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  />
              </View>
              </View>
              <View style={{flex: 0.2}}></View>


              <View style={{marginTop: 80, flex: 0.3, flexDirection: 'row'}}>
                <View style={{flex: 0.2}}></View>
                  <View style={{flex: 0.6,  alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{fontWeight: 'bold', color:'#363453', width:200}}>Votre problème est lié à...</Text>
                    <Picker selectedValue={this.state.typeofpb} style={{ height: 50, width: 155 }} onValueChange={(itemValue, itemIndex) => this.setState({typeofpb: itemValue})}>
                      <Picker.Item label='Un jeu' value='JEU' />
                      <Picker.Item label='La table' value='TABLE' />
                      <Picker.Item label='Application mobile' value='MOBILE' />
                  </Picker>
               </View>
              </View>
              <View style={{flex: 0.2}}></View>



              <View style={{marginTop:80, flex: 0.3, flexDirection:'row'}}>
                <View style={{flex: 0.2}}></View>
                  <View style={{flex: 0.6,  alignItems: 'center', justifyContent:'center'}}>
                    <Fumi
                      label={'Problème détaillé'}
                      style={{ width: 300, backgroundColor:'#FFF'}}
                      value={this.state.problem}
                      onChangeText={(problem) => this.setState({ problem })}
                      iconClass={FontAwesomeIcon}
                      iconName={'comment'}
                      iconColor={'#363453'}
                      labelStyle={{ color: '#363453' }}
                      iconSize={20}
                      iconWidth={40}
                      inputPadding={16}
                      />
                  </View>
              </View>

            <View style={{marginTop: 70, flex: 0.2, flexDirection:'row', justifyContent:'center'}}>

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
                  backgroundColor: '#363453',
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

          </View>
 </KeyboardAvoidingView>
 </View>
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