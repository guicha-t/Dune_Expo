import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet,
  AsyncStorage, ListView, Image, FlatList, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';

import Moment from 'moment';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'
import Loading from './../../global/loading/Loading';

@observer
export default class StudentHistory extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      Games: [],
      Student: [],
    }
  }
  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('./../../picture/profil/history.png')} style={{width:32, height:32}}/>
    }
  }

  _goBackAccordingId = async (param) => {
    if (param.idBack === '1') {
      param.navigation.navigate('StudentResultList')
    } else {
      param.navigation.navigate('StudentList')
    }
  };

  componentDidMount(){
    fetch('http://176.31.252.134:7001/api/v1/eleves/stats/gamesPlayed/' + this.props.screenProps.idStudent, {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Games':responseJson.response})

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

    })
    .catch((error) => {
      console.error(error);
    });
  }

  setColorAccordingNote = function(param) {
    if (param >= 0 && param < 25) {
      return {
        backgroundColor: '#d70302',
      }
    }
    else if (param >= 25 && param < 50){
      return {
        backgroundColor: '#ea560d',
      }
    }
    else if (param >= 50 && param < 75){
      return {
        backgroundColor: '#f0b104',
      }
    }
    else if (param >= 75 && param <= 100){
      return {
        backgroundColor: '#297334',
      }
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
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.Games}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => this.props.screenProps.navigation.navigate('StudentResultList', {idGame: item.idGP, Game: item, idBack: '1'})}
                style={[styles.containerFlatList]}>

                <View style={{flex: 0.8, paddingLeft: 10, justifyContent:'center'}}>
                    <Text style={styles.primetextwhite}>{item.nameGame.toUpperCase()}</Text>
                    <Text style={styles.subtextwhite}>{item.matiere}</Text>
                    <Text style={styles.subtextwhite}>{Moment(item.date).locale('fr').format('DD/MM/YYYY')}</Text>
                </View>

                <View style={[styles.containerNoteFlatList, this.setColorAccordingNote(item.note)]}>
                  <Text style={styles.primetextwhite}>{item.note}</Text>
                </View>

              </TouchableOpacity>

            }
            keyExtractor={item => item.idGP.toString()}
            />
          </View>

          <View style={{flex: 0.1, justifyContent:'center', alignItems:'center'}}>
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
    body: {
      flex: 1,
      backgroundColor: '#F9F9F9',
      padding: 4,
    },
    primetextwhite: {
      fontSize: 20,
      color: '#FFF',
      fontWeight: 'bold'
    },
    subtextwhite: {
      fontSize: 20,
      color: '#FFF',
    },
    primetextblue: {
      fontSize: 20,
      color: '#363453',
      fontWeight:'bold'
    },
    subtextblue: {
      fontSize: 20,
      color: '#363453',
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
