import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { observer } from 'mobx-react';
import { Sae, Fumi } from 'react-native-textinput-effects';
import AlertPro from "react-native-alert-pro";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


import Header from './../../global/header/Header';
import Store from './../../global/store/Store';


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

    fetch('http://51.38.187.216:9090/users/add', {
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
          //this.props.navigation.navigate('Profil');
        })
        .catch((error) => {
          console.error(error);
        });
  };

  render() {
    return(

      <DismissKeyboard>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
        <Header navigation={this.props.navigation}/>

	<View style={{flex:0.4, alignItems: 'center', justifyContent:'center',}}>
          <Text style={{fontSize:20,}}>
             Ajouter un professeur
          </Text>
        </View>

        <View style={styles.containerBody}>

          <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex: 0.7}}>
              <Fumi
                label={'Nom'}
                style={{ width: 300, backgroundColor:'#FFF'}}
                onChangeText={(lastname) => this.setState({lastname})}
                value={this.state.lastname}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={'#363453'}
                labelStyle={{ color: '#363453' }}
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
                style={{ width: 300, backgroundColor:'#FFF'}}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={'#363453'}
                labelStyle={{ color: '#363453' }}
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
                style={{ width: 300, backgroundColor:'#FFF'}}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
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


         </View>

         <View style={styles.containerFooter}>
           <TouchableOpacity onPress={this._cancelEdit}>
             <Image
               style={{height: 42, width: 42}}
               source={require('./../../picture/profil/error.png')}
               resizeMode="contain"
               />
           </TouchableOpacity>

           <TouchableOpacity onPress={this._confirmEdit}>
             <Image
               style={{height: 42, width: 42}}
               source={require('./../../picture/profil/success.png')}
               resizeMode="contain"
               />
           </TouchableOpacity>
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
    width: 220,
    height: 44,
    padding: 10,
    borderWidth: 0,
    borderColor: 'black',
    marginBottom: 10,
  },
  containerBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleInfo: {
    color: '#363453',
    fontWeight: 'bold',
    fontSize: 14,
  },
  containerFooter: {
    flexDirection: 'row',
    paddingBottom: 50,
    justifyContent:'space-around',
  },
});
