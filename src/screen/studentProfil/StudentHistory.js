import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet,
  AsyncStorage, ListView, Image, FlatList, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';
import { Icon } from 'react-native-elements';

import Moment from 'moment';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'
import Loading from './../../global/loading/Loading';
import * as cfg from "./../../Config";

@observer
export default class StudentHistory extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      Games: [],
      GameType: [],
      CurrentType: 0,
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
    if (this.props.screenProps.idGameType === '0')
    {
      fetch(cfg.API_URL + '/eleves/stats/gamesPlayed/' + this.props.screenProps.idStudent, {
        method: 'GET',
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          token: Store.Token,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({'Games':responseJson.response})

        fetch(cfg.API_URL + '/eleves/stats/getComps/' + this.props.screenProps.idStudent, {
          method: 'GET',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
            idEleve: this.props.screenProps.idStudent,

          },
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'GameType':responseJson.response})
          this.setState({'loading':false})
        })
        .catch((error) => {
          console.error(error);
        });


      })
      .catch((error) => {
        console.error(error);
      });

    } else {

      fetch(cfg.API_URL + '/eleves/stats/getGamesByCompEleve/' + this.props.screenProps.idStudent + '/' + this.props.screenProps.idGameType, {
        method: 'GET',
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          token: Store.Token,
          idMat: this.props.screenProps.idTypeGame,
          idEleve: this.props.screenProps.idStudent,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({'Games':responseJson.response})
        this.setState({'CurrentType':this.props.screenProps.idGameType})
        fetch(cfg.API_URL + '/eleves/stats/getComps/' + this.props.screenProps.idStudent, {
          method: 'GET',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
            idEleve: this.props.screenProps.idStudent,
          },
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'GameType':responseJson.response})
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
  }

  _setCurrentCat = async (param) => {
    fetch(cfg.API_URL + '/eleves/stats/getGamesByCompEleve/' + this.props.screenProps.idStudent + '/' + param.idComp, {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
        idMat: param.idComp,
        idEleve: this.props.screenProps.idStudent,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Games':responseJson.response})
      this.setState({'CurrentType':param.idComp})

    })
    .catch((error) => {
      console.error(error);
    });
  }

  _resetCat = async (param) => {
    fetch(cfg.API_URL + '/eleves/stats/gamesPlayed/' + this.props.screenProps.idStudent, {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Games':responseJson.response})
      this.setState({'CurrentType':0})

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
    else {
      return {
        backgroundColor: '#CECECE',
      }
    }

   }

   showNoResult(param) {
     if (this.state.Games == '') {
         return (
           <View style={{flex: 1, alignItems: 'center', paddingTop: 60}}>
             <Text style={{color: Store.Text2}}>Aucun résultat à afficher</Text>
           </View>
         )
       }
   }

   setColorFocused = function(param) {
     if (this.state.CurrentType.toString() === param.toString()) {
       return {
         backgroundColor: cfg.SECONDARY,
       }
     } else {
       return {
         backgroundColor: "#fcc296",
       }
     }
    }

   setColorTextFocused = function(param) {
     if (this.state.CurrentType.toString() === param.toString()) {
       return {
         color: '#FFF',
       }
     } else {
       return {
         color:cfg.SECONDARY,
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
        <View style={{flex:1, backgroundColor: Store.Back, padding: 4}}>

          <View style={{flex: 0.1, flexDirection:'row'}}>
              <View style={{width: 60, justifyContent:'center', alignItems:'center'}}>
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

            <TouchableOpacity style={{flex: 0.2}} onPress={() => this._resetCat(screenProps)}>
              <View style={[styles.buttonClass, this.setColorFocused('0')]}>
                <Text style={[styles.textClass, this.setColorTextFocused('0')]}>TOUT</Text>
              </View>
            </TouchableOpacity>

            <View style={{flex: 0.9}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.GameType}
                extraData={this.state}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                  <TouchableOpacity style={{flex: 1}} onPress={() => this._setCurrentCat(item)}>
                    <View style={[styles.buttonClass, this.setColorFocused(item.idComp)]}>
                      <Text style={[styles.textClass, this.setColorTextFocused(item.idComp)]}>{item.libelleComp.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
              }
              keyExtractor={item => item.idComp.toString()}
              />
            </View>
          </View>


          <View style={{flex: 0.9}}>
            {this.showNoResult()}
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.Games}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>

              <View style={{flex: 1}}>
                <View style={[styles.containerFlatList, {alignItems:'center', justifyContent:'center'}]}>
                  <Text style={styles.primetextwhite}>{item.nameGame}</Text>
                  <Text style={styles.primetextwhite}>{Moment(item.date).locale('fr').format('DD/MM/YYYY')}</Text>
                </View>

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={item.notes}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) =>
                    <View style={{flex: 1, backgroundColor: '#b1ebf6', height: 60, padding: 5, borderBottomWidth: 1, borderColor: cfg.SECONDARY, borderLeftWidth: 1, borderRightWidth: 1, flexDirection: 'row'}}>
                      <View style={{flex: 0.8, justifyContent:'center'}}>
                        <Text style={styles.subtextblue}>{item.libelleComp}</Text>
                      </View>
                      <View style={[styles.caseScore, this.setColorAccordingNote(item.note)]}>
                        <Text style={styles.primetextwhite}>{item.note}</Text>
                      </View>
                    </View>
              }
              keyExtractor={item => item.idComp.toString()}
              />

            </View>

            }
            keyExtractor={item => item.idGP.toString()}
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
      color: cfg.SECONDARY,
      fontWeight:'bold'
    },
    subtextblue: {
      fontSize: 20,
      color: cfg.SECONDARY,
    },
    buttonClass: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 2,
      marginBottom: 4,
      padding: 5,
      backgroundColor: '#FEE599'
    },
    containerFlatList: {
      flex: 1,
      marginTop: 10,
      padding: 5,
      backgroundColor: cfg.SECONDARY,
      justifyContent:'center',
    },
    caseScore: {
      flex: 0.2,
      justifyContent:'center',
      alignItems:'center',
    },
    containerNoteFlatList: {
      flex: 0.2,
      alignItems:'center',
      justifyContent:'center',
      marginRight: 10,
    },
    textClass: {
      fontSize: 14,
      color: cfg.SECONDARY,
      fontWeight: '600',
    },

  });
