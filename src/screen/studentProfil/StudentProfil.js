import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet,
  AsyncStorage, ListView, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Loading from './../../global/loading/Loading';
import Store from './../../global/store/Store'

@observer
export default class StudentProfil extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      Student: [],
    }
  }

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('./../../picture/profil/information.png')} style={{width:32, height:32}}/>
    }
  }

  componentDidMount(){
    fetch('http://176.31.252.134:7001/api/v1/eleves/' + this.props.screenProps.idStudent, {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Student':responseJson.response[0]})
      this.setState({'loading':false})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _goBackAccordingId = async (param) => {
    if (param.idBack === '1') {
      param.navigation.navigate('StudentResultList')
    } else {
      param.navigation.navigate('StudentList')
    }
  };

  render() {
      const { navigation, idStudent, screenProps } = { ...this.props };

      if (this.state.loading) {
          return (
              <Loading navigation={this.props.navigation}/>
          )
        }

      return (
        <View style={{flex:1, backgroundColor: '#fff'}}>

          <View style={styles.topBodyPicture}>
            <Image
              source={{uri: 'http://176.31.252.134:7001/files/eleves/' + this.state.Student.idEleve + '-eleve.png'}}
              style={styles.profilPicture}
              resizeMode="contain"
              />
            <Text style={styles.title}>{this.state.Student.prenomEleve} {this.state.Student.nomEleve}</Text>
          </View>

          <View style={styles.bodyInfo}>

            <View style={{paddingBottom: 10}}>
              <Button
                title={'Modifier les informations'}
                style={styles.ButtonCo}
                color='#363453'
                onPress={() => screenProps.navigation.navigate('StudentEdit', {
                  Nom: this.state.Student.nomEleve,
                  Prenom: this.state.Student.prenomEleve,
                  Id: this.state.Student.idEleve,})}
              />
            </View>

            <View style={{paddingBottom: 10}}>
              <Button
                title={'Retour'}
                style={styles.ButtonCo}
                color='#363453'
                onPress={() => this._goBackAccordingId(screenProps)}
              />
            </View>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor:'#F9F9F9',
    },
    topBodyPicture: {
      flex: 0.5,
      paddingTop: 20,
      paddingBottom: 20,
      alignItems: 'center',
    },
    profilPicture: {
      height: 120,
      width: 120,
      marginBottom: 10,
      borderRadius: 1000,
    },
    bodyInfo: {
      flex: 1,
      justifyContent:'flex-end',
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      marginBottom: 10,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    subtitle: {
      fontSize: 18,
    },
  });
