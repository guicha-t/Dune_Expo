import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { observer } from 'mobx-react';
import AlertPro from "react-native-alert-pro";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Fumi } from 'react-native-textinput-effects';
import { FormLabel, FormInput, FormValidationMessage, Icon, Button } from 'react-native-elements';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


@observer
export default class RequestApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      Commentaire:'',
    }
  }


_cancelDemand = async () => {
    this.props.navigation.navigate('GameContainer');
  };

  _confirmDemand = async () => {
    if (this.state.Commentaire === ''){
        Alert.alert('ATTENTION', 'Veuillez remplir la section \'Commentaire\'.');
        return;
    }
    fetch('http://51.38.187.216:9090/store/buyApp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        idApp: Store.AppId,
        commentaire:this.state.Commentaire,
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

          <View style={{marginTop:15}}>
            <Button
              title=""
              onPress={()=>this._cancelDemand()}
              icon={{
               type: 'font-awesome',
               name: 'arrow-left',
               size: 15,
               color: 'white',
             }}
              buttonStyle={{
                backgroundColor: '#363453',
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

       <KeyboardAvoidingView style={styles.container}  behavior="padding" >

        <View style={styles.containerBody}>
          <View style={{height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex: 0.7}}>
              <Fumi
                label={'Pourquoi cette application ?'}
                style={{ width: 270, backgroundColor:'#FFF'}}
                value={this.state.Commentaire}
                onChangeText={(Commentaire) => this.setState({ Commentaire })}
                iconClass={FontAwesomeIcon}
                iconName={'question'}
                iconColor={'#363453'}
                labelStyle={{ color: '#363453' }}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
              />
            </View>
          </View>
          <View style={styles.containerFooter}>
            <Button
              onPress={this._confirmDemand}
              title="VALIDER"
              icon={{
               type: 'font-awesome',
               name: 'share',
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
            onConfirm={() => this.props.navigation.navigate('GameContainer')}
            showCancel={false}
            title="DEMANDE ENVOYÉE"
            message="Votre demande a bien été envoyée et est en attente de traîtement."
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
    color: '#363453',
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
