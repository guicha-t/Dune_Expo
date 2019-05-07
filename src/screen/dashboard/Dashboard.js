import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, Image, TouchableOpacity, TouchableHighlight, Modal} from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import GridView from 'react-native-super-grid';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';
import Video from "expo/build/av/Video";

@observer
export default class Dashboard extends Component {
  state = {
    Table: '',
    Student: '',
    Notif: '',
    Class: '',
    Store: '',
    Day: '',
    Month: '',
    Profil: [],
    GamesLength:'',
    GamesRequested: [],
    i:0,
    idReadNotif:0,
    ModalVisibleStatus: false,
  }

  componentDidMount() {

        if (Store.TypeUser != 2){
          fetch('http://176.31.252.134:7001/api/v1/notifs/popUpMenu', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: Store.Token,
          },
        }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({'GamesRequested':responseJson.response});
              this.setState({'GamesLength':this.state.GamesRequested.length});
              if (this.state.GamesRequested.length > 0)
                this.setState({'ModalVisibleStatus': true});
              if (this.state.GamesLength > 0){
                while(this.state.i != this.state.GamesLength){
                  this.state.idReadNotif = this.state.GamesRequested[this.state.i].idNotif;
                  this.readNotification();
                  this.state.i++;
                }
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }


    fetch('http://176.31.252.134:7001/api/v1/dashboard/nbEleves', {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Student':JSON.stringify(responseJson.nbEleves)})
    })
    .catch((error) => {
      console.error(error);
    });

    fetch('http://176.31.252.134:7001/api/v1/dashboard/nbNotifsNonL', {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Notif':JSON.stringify(responseJson.nbNotifsNonL)})
    })
    .catch((error) => {
      console.error(error);
    });

    fetch('http://176.31.252.134:7001/api/v1/dashboard/nbClasses', {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Class':JSON.stringify(responseJson.nbClasses)})
    })
    .catch((error) => {
      console.error(error);
    });

    fetch('http://176.31.252.134:7001/api/v1/games/nbGames', {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Store':JSON.stringify(responseJson.response[0].nbGames)})
    })
    .catch((error) => {
      console.error(error);
    });

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    this.setState({
          Day: date,
          Month: month,
        });

    fetch('http://176.31.252.134:7001/api/v1/users/infos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Profil':JSON.parse(JSON.stringify(responseJson.response[0]))})
        })
        .catch((error) => {
          console.error(error);
        });
  }

  readNotification = () => {
      fetch('http://176.31.252.134:7001/api/v1/notifs/read/' + this.state.idReadNotif.toString(), {
          method: 'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              token: Store.Token,
          }
      }).then((response) => response.json())
          .then((responseJson) => {
          })
          .catch((error) => {
              console.error(error);
          });
  }

  getCurrentMonth(param) {
      if (param === '1') {
          return <Text>JANVIER</Text>;
      } if (param === '2') {
          return <Text>FÉVRIER</Text>;
      } if (param === '3') {
          return <Text>MARS</Text>;
      } if (param === '4') {
          return <Text>AVRIL</Text>;
      } if (param === '5') {
          return <Text>MAI</Text>;
      } if (param === '6') {
          return <Text>JUIN</Text>;
      } if (param === '7') {
          return <Text>JUILLET</Text>;
      } if (param === '8') {
          return <Text>AOÛT</Text>;
      } if (param === '9') {
          return <Text>SEPTEMBRE</Text>;
      } if (param === '10') {
          return <Text>OCTOBRE</Text>;
      } if (param === '11') {
          return <Text>NOVEMBRE</Text>;
      } if (param === '12') {
          return <Text>DÉCEMBRE</Text>;
      } else {
          return;
      }
  }

  addplural(param) {
      if (param === '') {
          return;
      } if (param === '0') {
          return;
      } if (param === '1') {
          return;
      } else {
          return <Text>S</Text>;
      }
  }

  renderAlertsDir(){
    if (Store.TypeUser == 2){
      if (this.state.Notif != 0)
        return (
              <View style={{flex: 0.2, flexDirection: 'row'}}>
                <View style={{flex: 0.3}}></View>
                  <TouchableOpacity style={{flex: 0.4, backgroundColor:'#FFF',padding: 5, borderRadius: 200, justifyContent:'center'}} onPress={() => this.props.navigation.navigate('UserDemands')}>
                    <Image
                      style={{flex: 1, height: undefined, width: undefined}}
                      source={{uri: 'https://user-images.githubusercontent.com/3471415/31066487-f29af78e-a76a-11e7-90c1-2f01642294d7.gif'}}
                      resizeMode="contain"
                      />
                  </TouchableOpacity>
                <View style={{flex: 0.3}}></View>
              </View>);
      else
        return (
              <View style={{flex: 0.2, flexDirection: 'row'}}>
                <View style={{flex: 0.3}}></View>
                <TouchableOpacity style={{flex: 0.4, backgroundColor:'#FFF',padding: 5, borderRadius: 200, justifyContent:'center'}} onPress={() => this.props.navigation.navigate('UserDemands')}>
                  <Image
                    style={{flex: 1, height: undefined, width: undefined}}
                    source={{uri: 'https://user-images.githubusercontent.com/3471415/31066486-ede76d76-a76a-11e7-9146-d9119c952a5e.png'}}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={{flex: 0.3}}></View>
              </View>);
    }
    return null;
  }

  renderAlertsText(){
    if (Store.TypeUser == 2){
      if (this.state.Notif != 0)
        return (
              <View style={styles.datacase}>
                <Text style={styles.primetextwhite}>{this.state.Notif}</Text>
                <Text style={styles.datetext}>NOTIFICATION{this.addplural(this.state.Notif)}</Text>
                <Text style={styles.datetext}>NON-LUE{this.addplural(this.state.Notif)}</Text>
              </View>);
      else
        return (
              <View style={styles.datacase}>
                <Text style={styles.datetext}>AUCUNE{this.addplural(this.state.Notif)}</Text>
                <Text style={styles.datetext}>NOTIFICATION{this.addplural(this.state.Notif)}</Text>
              </View>);
    }
  }

  ShowModalFunction = (visible) => {
    this.setState({'ModalVisibleStatus': visible});
  }

  renderTextNotifProf = (text) => {
    if (text === "Votre demande d'achat a été validée par le directeur.")
     return(
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.NotifName}>Validée</Text>
      </View>);
    else
     return(
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.NotifName}>Refusée</Text>
      </View>);
  }

  renderAlertsProf(){
              return(
                <View>
                    <Modal
                        transparent={true}

                        animationType={"slide"}

                        visible={this.state.ModalVisibleStatus}

                          onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                          }}>
                        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.ModalInsideView}>
                                <Text style={styles.TextStyle}>
                                   Vous avez une ou plusieurs demande(s) d'application(s) traîtée(s)
                                </Text>
                                <GridView
                                    itemDimension={100}
                                    spacing={1}
                                    items={this.state.GamesRequested}
                                    style={{paddingTop: 25, flex: 1}}
                                    renderItem={item => (
                                        <View style={styles.itemContainer}>
                                                <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                                                    <View style={{flex: 1, paddingTop: 10}}>
                                                        <Image
                                                            style={{flex: 1, borderRadius: 10}}
                                                            source={{uri: 'http://176.31.252.134:7001/files/apps/' + item.game_image}}
                                                        />
                                                    </View>
                                                </View>
                                                {this.renderTextNotifProf(item.textNotif)}
                                        </View>
                                    )}
                                />
                                <Button title={'Retour'} color='#363453' onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } />
                            </View>
                        </View>
                    </Modal>
                </View>

              );
  }

  render() {
    return(
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation}/>
        <View style={styles.body}>



          <View>
            {this.renderAlertsProf()}
          </View>





          <View style={styles.topbody}>
            <View style={[styles.leftcase, styles.topleftcase]}>
              <View style={styles.caseTopRight}>
                <Text style={styles.datetext}>{this.state.Day}</Text>
                <Text style={styles.datetext}>{this.getCurrentMonth(this.state.Month.toString())}</Text>
              </View>
              <View style={{flex: 0.6, alignItems:'center', justifyContent: 'center'}}>
                <Text style={styles.datetext}>BONJOUR</Text>
                <Text style={styles.datetext}>{this.state.Profil.nomUser}</Text>
                <Text style={styles.datetext}>{this.state.Profil.prenomUser}</Text>
              </View>
            </View>

            <View style={[styles.rightcase, styles.topleftcase]}>
              {this.renderAlertsText()}
              {this.renderAlertsDir()}
            </View>
          </View>

          <View style={styles.midbody}>
            <View style={styles.leftcase}>
              <View style={styles.datacase}>
                <Text style={styles.primetext}>{this.state.Class}</Text>
                <Text style={styles.subtext}>CLASSE{this.addplural(this.state.Class)}</Text>
              </View>
              <View style={{flex: 0.2, flexDirection: 'row'}}>
                <View style={{flex: 0.3}}></View>
                <TouchableOpacity style={styles.buttonCase} onPress={() => this.props.navigation.navigate('QRCode')}>
                  <Image
                    style={{flex: 1, height: undefined, width: undefined}}
                    source={require('./../../picture/dashboard/class.png')}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={{flex: 0.3}}></View>
              </View>
            </View>

            <View style={styles.rightcase}>
              <View style={styles.datacase}>
                <Text style={styles.primetext}>{this.state.Student}</Text>
                <Text style={styles.subtext}>ÉLÈVE{this.addplural(this.state.Student)}</Text>
              </View>
              <View style={{flex: 0.2, flexDirection: 'row'}}>
                <View style={{flex: 0.3}}></View>
                <TouchableOpacity style={styles.buttonCase} onPress={() => this.props.navigation.navigate('StudentList')}>
                  <Image
                    style={{flex: 1, height: undefined, width: undefined}}
                    source={require('./../../picture/dashboard/student.png')}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={{flex: 0.3}}></View>
              </View>
            </View>
          </View>

          <View style={styles.botbody}>
            <View style={styles.leftcase}>
              <View style={styles.datacase}>
                <Text style={styles.primetext}>{this.state.Store}</Text>
                <Text style={styles.subtext}>APPLICATION{this.addplural(this.state.Store)}</Text>
                <Text style={styles.subtext}>POSSÉDÉE{this.addplural(this.state.Store)}</Text>
              </View>
              <View style={{flex: 0.2, flexDirection: 'row'}}>
                <View style={{flex: 0.3}}></View>
                <TouchableOpacity style={styles.buttonCase} onPress={() => this.props.navigation.navigate('GamesList')}>
                  <Image
                    style={{flex: 1, height: undefined, width: undefined}}
                    source={require('./../../picture/dashboard/store.png')}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={{flex: 0.3}}></View>
              </View>
            </View>

            <View style={styles.rightcase}>
              <View style={styles.datacase}>
                <Text style={styles.primetext}>{this.state.Table}0</Text>
                <Text style={styles.subtext}>TABLE{this.addplural(this.state.Table)}</Text>
                <Text style={styles.subtext}>CONNECTÉE{this.addplural(this.state.Table)}</Text>
              </View>
              <View style={{flex: 0.2, flexDirection: 'row'}}>
                <View style={{flex: 0.3}}></View>
                <TouchableOpacity style={styles.buttonCase} onPress={() => this.props.navigation.navigate('QRCode')}>
                  <Image
                    style={{flex: 1, height: undefined, width: undefined}}
                    source={require('./../../picture/dashboard/table.png')}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={{flex: 0.3}}></View>
              </View>
            </View>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  topbody: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 2,
  },
  midbody: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 2,
    paddingBottom: 2,
  },
  botbody: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 2,
  },
  caseTopRight: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent:'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
  },
  itemContainer: {
    flex: 1,
    height: 130,
    backgroundColor: '#FFF',
    borderRadius:10,
  },
  leftcase: {
    flex: 1,
    backgroundColor: '#FFF',
    marginRight: 2,
    padding: 10,
  },
  rightcase: {
    flex: 1,
    backgroundColor: '#FFF',
    marginLeft: 2,
    padding: 10,
  },
  topleftcase: {
    backgroundColor: '#363453',
  },
    ModalInsideView:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : "#363453",
        height: 280 ,
        width: '90%',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'

    },
  NotifName: {
    fontSize: 12,
    color: '#434B77',
    fontWeight: '600',
  },
    TextStyle:{

        fontSize: 20,
        color: "#fff",
        textAlign: 'center'
  },
  datacase: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  datetext: {
    fontSize: 20,
    color: '#FFF',
  },
  primetext: {
    fontSize: 60,
    color: '#363453',
    fontWeight: 'bold',
  },
  primetextwhite: {
    fontSize: 60,
    color: '#FFF',
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: 20,
    color: '#363453',
  },
  buttonCase: {
    flex: 0.4,
    backgroundColor: '#363453',
    borderRadius: 200,
    padding: 7,
  },



});
