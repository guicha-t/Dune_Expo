import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';
import { observer } from 'mobx-react';

import { Button, Icon } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';

import Store from './../../global/store/Store'

@observer
export default class ForgottenPass extends Component {

static navigationOptions = {
   drawerLockMode: 'locked-open',
}

  constructor(props) {
    super(props);

  this.state = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    const { username, password } = this.state;

    fetch('http://51.38.187.216:9000/api/v1/login/reset', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status == 200) {
	    this.props.navigation.navigate('Start')
            Alert.alert('E-mail de récupération envoyé')
          }
          else {
            Alert.alert('Adresse E-mail introuvable')
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={{flex: 0.5}}>
            <Image
              style={{flex: 1, height: undefined, width: undefined}}
              source={require('./../../picture/header/dunelogo.png')}
              resizeMode="contain"
              />
          </View>

           <View style={{flex:0.4}}>
            <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.primetextblue}>RECUPERATION DU MOT DE PASSE</Text>
            </View>
            <View style={{flex: 0.6, justifyContent:'center', alignItems:'center'}}>
              <Fumi
                label={'E-mail'}
                style={{ width: 220, backgroundColor:'#363453'}}
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                iconClass={FontAwesomeIcon}
                iconName={'at'}
                iconColor={'#FFF'}
                labelStyle={{ color: '#FFF' }}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                />
            </View>

            <View style={{flex: 0.2,flexDirection:'row'}}>
              <View style={{flex: 0.5, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

                <Button
                  title=""
                  onPress={()=>this.props.navigation.navigate('Start')}
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
                    alignItems:'center',
                    paddingLeft: 20,
                  }}
                  containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
                  titleStyle={{ fontWeight: 'bold' }}
                />

              </View>

              <View style={{flex: 0.5, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

                <Button
                  title=""
                  onPress={this.onLogin.bind(this)}
                  icon={{
                   type: 'font-awesome',
                   name: 'check',
                   size: 15,
                   color: 'white',
                 }}
                  buttonStyle={{
                    backgroundColor: '#363453',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                    width: 60,
                    alignItems:'center',
                    paddingLeft: 20,
                  }}
                  containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
                  titleStyle={{ fontWeight: 'bold' }}
                />

              </View>
            </View>
          </View>
          <View style={{flex: 0.1}}></View>
        </KeyboardAvoidingView>
      </View>
        );
      }
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEE599',
  },
  input: {
    width: 220,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#363453',
  },
  primetextblue: {
    fontSize: 20,
    color: '#363453',
    fontWeight: 'bold'
  },

});
