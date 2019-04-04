import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet,
  AsyncStorage, ListView, Image, ScrollView, FlatList} from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'
import Loading from './../../global/loading/Loading';

@observer
export default class StudentGradebook extends Component {
  constructor(props){
    super(props);
    this.state = {
      Student: [],
      Gradebook: [],
      loading: true,
      StudentAvg: '',
      ClassAvg: '',
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

      fetch('http://176.31.252.134:7001/api/v1/eleves/stats/bulletin/' + this.props.screenProps.idStudent, {
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
        this.setState({'StudentAvg':responseJson.moyenneGeneralEleve})
        this.setState({'ClassAvg':responseJson.moyenneGeneraleClasse})
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


  render() {
      const { navigation, idStudent, screenProps } = { ...this.props };

      if (this.state.loading) {
          return (
                <Loading navigation={this.props.navigation}/>
          )
        }

      return (

        <View style={{flex:1, backgroundColor: '#fff', padding: 4}}>
          <View style={{flex: 0.1, justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.primetextblue}>{this.state.Student.prenomEleve} {this.state.Student.nomEleve}</Text>
          </View>

          <View style={{flex: 0.8}}>

            <View style={{backgroundColor: '#363453', height: 60, flexDirection: 'row', paddingLeft: 10}}>
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

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.Gradebook}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
              <View style={{backgroundColor: '#FFF', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
                <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>{item.labeltype}</Text>
                  <Text style={styles.gridtextblue}>{item.nbPlayed} résultat{this.addplural(item.nbPlayed.toString())}</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#363453'}}>
                  <Text style={styles.gridtextblue}>{item.moyenne.toFixed(2)}</Text>
                </View>
                <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.gridtextblue}>{item.moyenneClasse.toFixed(2)}</Text>
                </View>
              </View>
            }
            keyExtractor={item => item.labeltype.toString()}
            />

            <View style={{backgroundColor: '#363453', height: 60, flexDirection: 'row', paddingLeft: 10, borderBottomWidth: 1, borderColor: '#363453'}}>
              <View style={{flex: 0.6, justifyContent:'center', borderRightWidth: 1, borderColor: '#FFF'}}>
                <Text style={styles.gridtextwhite}>GÉNÉRALE</Text>
              </View>
              <View style={{flex: 0.2, justifyContent:'center', alignItems:'center', borderRightWidth: 1, borderColor: '#FFF'}}>
                <Text style={styles.gridtextwhite}>{this.state.StudentAvg.toFixed(2)}</Text>
              </View>
              <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.gridtextwhite}>{this.state.ClassAvg.toFixed(2)}</Text>
              </View>
            </View>

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
    containerFlatList: {
      flex: 1,
      marginBottom: 6,
      padding: 5,
      backgroundColor: '#363453',
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
