import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, ListView, Image, ScrollView } from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'

@observer
export default class StudentGradebook extends Component {
  constructor(props){
    super(props);
    this.state = {
      Student: [],
    }
  }

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('./../../picture/profil/evolution.png')} style={{width:32, height:32}}/>
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

      return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
          <View style={{flex: 0.1, justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.primetextblue}>{this.state.Student.prenomEleve} {this.state.Student.nomEleve}</Text>
          </View>
          <View style={{flex: 0.8}}>
            <View style={{backgroundColor: '#363453', height: 60, flexDirection: 'row', paddingLeft: 10}}>
              <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#fff'}}>
                <Text style={styles.gridtextwhite}>MATIERE /</Text>
                <Text style={styles.gridtextwhite}>NOMBRE SESSION</Text>
              </View>
              <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#fff'}}>
                <Text style={styles.gridtextwhite}>MOY.</Text>
                <Text style={styles.gridtextwhite}>ELEVE</Text>
              </View>
              <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.gridtextwhite}>MOY.</Text>
                <Text style={styles.gridtextwhite}>CLASSE</Text>
              </View>
            </View>
            <ScrollView style={{flex: 1}}>

              <View style={{backgroundColor: '#FFF', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
                <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>Mathématiques</Text>
                  <Text style={styles.gridtextblue}>6 résultats</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>12</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.gridtextblue}>11.6</Text>
                </View>
              </View>

              <View style={{backgroundColor: '#FFF', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
                <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>Français</Text>
                  <Text style={styles.gridtextblue}>12 résultats</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>05</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.gridtextblue}>13</Text>
                </View>
              </View>

              <View style={{backgroundColor: '#FFF', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
                <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>Français</Text>
                  <Text style={styles.gridtextblue}>12 résultats</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>05</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.gridtextblue}>13</Text>
                </View>
              </View>

              <View style={{backgroundColor: '#FFF', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
                <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>Français</Text>
                  <Text style={styles.gridtextblue}>12 résultats</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>05</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.gridtextblue}>13</Text>
                </View>
              </View>

              <View style={{backgroundColor: '#FFF', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
                <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>Français</Text>
                  <Text style={styles.gridtextblue}>12 résultats</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>05</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.gridtextblue}>13</Text>
                </View>
              </View>

              <View style={{backgroundColor: '#FFF', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
                <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>Français</Text>
                  <Text style={styles.gridtextblue}>12 résultats</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>05</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.gridtextblue}>13</Text>
                </View>
              </View>

              <View style={{backgroundColor: '#FFF', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
                <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>Français</Text>
                  <Text style={styles.gridtextblue}>12 résultats</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>05</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.gridtextblue}>13</Text>
                </View>
              </View>

              <View style={{backgroundColor: '#FFF', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
                <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>Français</Text>
                  <Text style={styles.gridtextblue}>12 résultats</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>05</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.gridtextblue}>13</Text>
                </View>
              </View>

              <View style={{backgroundColor: '#FFF', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
                <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>Français</Text>
                  <Text style={styles.gridtextblue}>12 résultats</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>05</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.gridtextblue}>13</Text>
                </View>
              </View>

              <View style={{backgroundColor: '#363453', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
                <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#FFF'}}>
                  <Text style={styles.gridtextwhite}>Moyenne Générale</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#FFF'}}>
                  <Text style={styles.gridtextwhite}>13.8</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.gridtextwhite}>12</Text>
                </View>
              </View>

            </ScrollView>
          </View>
          <View style={{flex: 0.1, alignItems:'center', justifyContent:'center'}}>
            <Button
              title={'Retour'}
              style={styles.ButtonCo}
              color='#363453'
              onPress={() => this._goBackAccordingId(screenProps)}
            />
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    primetextblue: {
      fontSize: 20,
      color: '#363453',
      fontWeight:'bold'
    },
    gridtextwhite: {
      fontSize: 15,
      color: '#FFF',
      fontWeight:'bold'
    },
    gridtextblue: {
      fontSize: 15,
      color: '#363453',
      fontWeight:'bold'
    },
  });
