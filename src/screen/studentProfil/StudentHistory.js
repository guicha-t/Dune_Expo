import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet,
  AsyncStorage, ListView, Image, FlatList, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';
import { Icon } from 'react-native-elements';

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
    if (this.props.screenProps.idGameType==='0')
    {
      fetch('http://51.38.187.216:9090/eleves/stats/gamesPlayed/' + this.props.screenProps.idStudent, {
        method: 'GET',
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          token: Store.Token,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({'Games':responseJson.response})

        fetch('http://51.38.187.216:9090/eleves/' + this.props.screenProps.idStudent, {
          method: 'GET',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Student':responseJson.response[0]})

          fetch('http://51.38.187.216:9090/eleves/stats/getMat/' + this.props.screenProps.idStudent, {
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

      })
      .catch((error) => {
        console.error(error);
      });

    } else {
      fetch('http://51.38.187.216:9090/eleves/stats/getGamesByMatEleve/' + this.props.screenProps.idStudent + '/' + this.props.screenProps.idGameType, {
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

        fetch('http://51.38.187.216:9090/eleves/' + this.props.screenProps.idStudent, {
          method: 'GET',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Student':responseJson.response[0]})

          fetch('http://51.38.187.216:9090/eleves/stats/getMat/' + this.props.screenProps.idStudent, {
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

      })
      .catch((error) => {
        console.error(error);
      });
    }


  }

  _setCurrentCat = async (param) => {
    fetch('http://51.38.187.216:9090/eleves/stats/getGamesByMatEleve/' + this.props.screenProps.idStudent + '/' + param.idTypeGame, {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
        idMat: param.idTypeGame,
        idEleve: this.props.screenProps.idStudent,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Games':responseJson.response})
      this.setState({'CurrentType':param.idTypeGame})

    })
    .catch((error) => {
      console.error(error);
    });
  }

  _resetCat = async (param) => {
    fetch('http://51.38.187.216:9090/eleves/stats/gamesPlayed/' + this.props.screenProps.idStudent, {
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

   setColorFocused = function(param) {
     if (this.state.CurrentType.toString() === param.toString()) {
       return {
         backgroundColor: '#363453',
       }
     } else {
       return {
         backgroundColor:'#FEE599',
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
         color:'#363453',
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

          <View style={{flex: 0.1, flexDirection:'row'}}>
              <View style={{width: 60, justifyContent:'center', alignItems:'center'}}>
                <Icon
                  raised
                  onPress={() => this._goBackAccordingId(screenProps)}
                  type='font-awesome'
                  name='arrow-left'
                  color='#FFF'
                  containerStyle={{
                    backgroundColor: '#363453',
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
                    <View style={[styles.buttonClass, this.setColorFocused(item.idTypeGame)]}>
                      <Text style={[styles.textClass, this.setColorTextFocused(item.idTypeGame)]}>{item.labelType.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
              }
              keyExtractor={item => item.idTypeGame.toString()}
              />
            </View>
          </View>


          <View style={{flex: 0.9}}>
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
    textClass: {
      fontSize: 14,
      color: '#363453',
      fontWeight: '600',
    },

  });
