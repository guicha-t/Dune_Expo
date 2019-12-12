import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet,
  AsyncStorage, ListView, Image, TouchableOpacity, ActivityIndicator,
  FlatList} from 'react-native';
import { Icon } from 'react-native-elements';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Loading from './../../global/loading/Loading';
import Store from './../../global/store/Store'
import * as cfg from "./../../Config";

@observer
export default class StudentProfil extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      Student: [],
      Gradebook: [],
      StudentAvg: 0,
      ClassAvg: 0,
    }
  }

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('./../../picture/profil/information.png')} style={{width:32, height:32}}/>
    }
  }

  componentDidMount(){
    fetch(cfg.API_URL + '/eleves/' + this.props.screenProps.idStudent, {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Student':responseJson.response[0]})

      fetch(cfg.API_URL + '/eleves/stats/bulletin/' + this.props.screenProps.idStudent, {
        method: 'GET',
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          token: Store.Token,
          idEleve: this.props.screenProps.idStudent,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({'Gradebook':responseJson.response})
        if (responseJson.moyenneGeneralEleve != null) {
          this.setState({'StudentAvg':responseJson.moyenneGeneralEleve})
          this.setState({'ClassAvg':responseJson.moyenneGeneraleClasse})
        }
        this.setState({'loading':false})
      })
      .catch((error) => {
        console.error(error);
      });

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

  addplural(param) {
      if (param === '') {
          return;
      } if (param === '0') {
          return;
      } if (param === '1') {
          return;
      } else {
          return <Text>s</Text>;
      }
  }

  showNoResult(param) {
    if (this.state.Gradebook == "") {
        return (
          <View style={{flex: 1, alignItems: 'center', paddingTop: 60}}>
            <Text style={{color: Store.Text2}}>Aucun résultat à afficher</Text>
          </View>
        )
      }
  }

  render() {
      const { navigation, idStudent, screenProps } = { ...this.props };

      if (this.state.loading) {
          return (
              <Loading navigation={this.props.navigation}/>
          )
        }

      return (
        <View style={{flex:1, backgroundColor: Store.Back}}>

          <View style={{flex: 0.2, flexDirection:'row'}}>

            <View style={{width: 60, justifyContent:'center'}}>
              <Icon
                raised
                onPress={() => this._goBackAccordingId(screenProps)}
                type='font-awesome'
                name='arrow-left'
                color='#FFF'
                containerStyle={{
                  backgroundColor: cfg.SECONDARY,
                }}
                />
            </View>
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
              <Text style={[styles.primetextblue, {color: Store.Text1}]}>{this.state.Student.nomEleve.toUpperCase()}</Text>
              <Text style={[styles.primetextblue, {color: Store.Text1}]}>{this.state.Student.prenomEleve}</Text>
            </View>

            <View style={{width: 70, justifyContent:'center'}}>
              <Icon
                raised
                onPress={() => screenProps.navigation.navigate('StudentEdit', {
                  Nom: this.state.Student.nomEleve,
                  Prenom: this.state.Student.prenomEleve,
                  Id: this.state.Student.idEleve,})}
                type='font-awesome'
                name='edit'
                color='#FFF'
                containerStyle={{
                  backgroundColor: cfg.SECONDARY,
                }}
                />
            </View>


          </View>

          <View style={{flex: 0.8}}>

            <View style={{backgroundColor: cfg.SECONDARY, height: 60, flexDirection: 'row', paddingLeft: 10}}>
              <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#fff'}}>
                <Text style={styles.gridtextwhite}>MATIÈRE /</Text>
                <Text style={styles.gridtextwhite}>NOMBRE SESSION</Text>
              </View>
              <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#fff'}}>
                <Text style={styles.gridtextwhite}>MOY.</Text>
                <Text style={styles.gridtextwhite}>ÉLÈVE</Text>
              </View>
              <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.gridtextwhite}>MOY.</Text>
                <Text style={styles.gridtextwhite}>CLASSE</Text>
              </View>
            </View>

            <View style={{flex: 1}}>
              {this.showNoResult()}
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={this.state.Gradebook}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                <View style={{backgroundColor: '#FFF', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: cfg.SECONDARY}}>
                  <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: cfg.SECONDARY}}>
                    <Text style={styles.gridtextblue}>{item.labeltype}</Text>
                    <Text style={styles.gridtextblue}>{item.nbPlayed} résultat{this.addplural(item.nbPlayed.toString())}</Text>
                  </View>
                  <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: cfg.SECONDARY}}>
                    <Text style={styles.gridtextblue}>{parseFloat(item.moyenne, 10).toFixed(2)}</Text>
                  </View>
                  <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.gridtextblue}>{parseFloat(item.moyenneClasse, 10).toFixed(2)}</Text>
                  </View>
                </View>
              }
              keyExtractor={item => item.labeltype.toString()}
              />
            </View>

            <View style={{backgroundColor: cfg.SECONDARY, height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: cfg.SECONDARY}}>
              <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#FFF'}}>
                <Text style={styles.gridtextwhite}>GÉNÉRALE</Text>
              </View>
              <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#FFF'}}>
                <Text style={styles.gridtextwhite}>{this.state.StudentAvg.toFixed(2)}</Text>
              </View>
              <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.gridtextwhite}>{this.state.ClassAvg}</Text>
              </View>
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
    primetextblue: {
      fontSize: 20,
      color: 'black',
      fontWeight:'bold'
    },
    gridtextwhite: {
      fontSize: 16,
      color: '#FFF',
      fontWeight:'bold'
    },
    gridtextblue: {
      fontSize: 16,
      color: cfg.SECONDARY,
      fontWeight:'bold'
    },
    containerFlatList: {
      flex: 1,
      marginBottom: 6,
      padding: 5,
      backgroundColor: cfg.SECONDARY,
      flexDirection:'row',
      justifyContent:'center',
    },
    containerNoteFlatList: {
      flex: 0.2,
      alignItems:'center',
      justifyContent:'center',
      marginRight: 10,
    },
  });
