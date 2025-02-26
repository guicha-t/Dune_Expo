import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage, FlatList, TouchableHighlight, Modal} from 'react-native';
import { observer } from 'mobx-react';
import { List, ListItem } from "react-native-elements";
import { Avatar, Icon, Button } from 'react-native-elements';
import AlertPro from "react-native-alert-pro";
import GridView from 'react-native-super-grid';
import moment from "moment";
import 'moment/locale/fr'
moment.locale('fr')

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';
import * as cfg from "./../../Config";

@observer
export default class UserDemands extends Component {
  constructor(props){
    super(props);
    this.state = {
      GamesRequested: [],
      ProfArray:[],
        ModalVisibleStatus: false,
        idAppModal: null,
        nomAppModal: null,
        dateDemandeModal: null,
        commentaireModal: null,
        idToNotify: null,
        idNotif: null,
        TokenLeft: 0,
    }

    this.ts = new Date();

    this.contentToRender = []
  }

  componentDidMount(){


    fetch(cfg.API_URL + '/store/getAppStatus/' + Store.AppId, {
       method: 'GET',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         token: Store.Token,
       },
     }).then((response) => response.json())
         .then((responseJson) => {
           if (JSON.stringify(responseJson.apps_left) != null)
             this.setState({'TokenLeft':JSON.stringify(responseJson.apps_left)})
         })
         .catch((error) => {
           console.error(error);
         });



   fetch(cfg.API_URL + '/notifs/popUpMenu', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'GamesRequested':responseJson.response});
        })
        .catch((error) => {
          console.error(error);
        });
  }

  renderProfArray = (param) => {

      fetch(cfg.API_URL + '/notifs/getArrayProf/' + param.toString(), {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              token: Store.Token,
          },
      }).then((response) => response.json())
          .then((responseJson) => {
              this.setState({'ProfArray': responseJson.response});
          })
          .catch((error) => {

              console.error(error);
          });

  }

  readNotification = () => {
      fetch(cfg.API_URL + '/notifs/read/' + this.state.idNotif.toString(), {
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

  _confirmDemand = () => {

  if (this.state.TokenLeft <= 0){
    this.AlertPro.open()
  }
  else{
  fetch(cfg.API_URL + '/store/buyAppFree', {
      method: 'POST',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
       idApp: this.state.idAppModal.toString(),
      })
    }).then((response) => response.json())
    .then((responseJson) => {
        if (responseJson.status === 200){
            fetch(cfg.API_URL + '/store/validating', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: Store.Token,
              },
              body: JSON.stringify({
                idDemande: this.state.idToNotify,
                validate: 1,
              }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.readNotification();
                    this.ShowModalFunction(!this.state.ModalVisibleStatus);
                    this.props.navigation.navigate('Dashboard');
            })
            .catch((error) => {
                Alert.alert("ERROR", error);
              console.error(error);
            });
        }
    })
    .catch((error) => {
      console.error(error);
    });
    }
  }


  _cancelDemand = () => {
    fetch(cfg.API_URL + '/store/validating', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        idDemande: this.state.idToNotify,
        validate: '0',
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
            this.readNotification();
            this.ShowModalFunction(!this.state.ModalVisibleStatus);
            this.props.navigation.navigate('Dashboard');
    })
    .catch((error) => {
        Alert.alert("ERROR", error);
      console.error(error);
    });
  }


    ShowProfInModal = (visible, item) =>{

        this.renderProfArray(item.idToNotify);

        this.setState({idToNotify: item.idToNotify.toString()});

        this.setState({ModalVisibleStatus: visible});

        this.setState({idAppModal: item.idApp});

        this.setState({nomAppModal: item.nomApp});

        this.setState({dateDemandeModal: item.dateDemande});

        this.setState({commentaireModal: item.commentaire});

        this.setState({idNotif: item.idNotif});

    }

    ShowModalFunction = (visible) => {

      this.setState({'ModalVisibleStatus': visible});

    }

    RenderUserDemands(){

    if (Object.keys(this.state.GamesRequested).length > 0)
      return(
        <List>
            <FlatList
                data={this.state.GamesRequested}
                extraData={this.state}
                rightIcon={'../../picture/profil/eye.png'}
                style={{backgroundColor:Store.Back}}
                renderItem={({ item }) => (
                    <ListItem
                        titleStyle={{color:Store.Text2}}
                        title={`${ item.nomApp }`}
                        onPress={() => this.ShowProfInModal(true, item)}
                    />
                    )}
                keyExtractor={item => item.idNotif.toString()}
            />
        </List>
      );
    else
      return(
        <Text style={{fontSize:20, color:Store.Text2, textAlign:'center', paddingTop:80}}> Aucune notification. </Text>
      );

    }


    render() {
    return (
        <View style={styles.mainContainer}>
          <Header navigation={this.props.navigation}/>
          <View style={{flex:1, backgroundColor:Store.Back}}>
          <View style={{marginTop:15, backgroundColor:Store.Back}}>
            <Button
              title=""
              onPress={()=>this.props.navigation.navigate('GamesList')}
              icon={{
               type: 'font-awesome',
               name: 'arrow-left',
               size: 15,
               color: 'white',
             }}
              buttonStyle={{
                backgroundColor: cfg.SECONDARY,
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
            <View style={{flex:0.2, alignItems: 'center', justifyContent:'center', backgroundColor: Store.Back}}>
              <Text style={{fontSize:20, color:Store.Text2, textAlign:'center'}}>
                 Accepter une demande d'application vous fera utiliser l'un de vos {this.state.TokenLeft.toString()} crédit(s) gratuit(s).
              </Text>
            </View>
            <View style={{flex: 0.8, backgroundColor:Store.Back}}>

                {this.RenderUserDemands()}

                <View>
                    <Modal
                        transparent={true}
                        animationType={"slide"}
                        visible={this.state.ModalVisibleStatus}
                        onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
                        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.ModalInsideView}>
                                    <Text style={styles.TextStyle}> Vous avez une demande sur l'application
                                            { " " + this.state.nomAppModal }.
                                    </Text>
                                <Text onPress={() => this.props.navigation.navigate('GameContainer', {id: this.state.idAppModal})}  style={{textDecorationLine: 'underline',fontSize: 20, color: Store.TRose, textAlign: 'center'}}>
                                    Voir l'application
                                </Text>
                                <Text  style={styles.TextProfStyle}> Cette demande a été faite par:</Text>
                                <GridView
                                    itemDimension={100}
                                    spacing={1}
                                    items={this.state.ProfArray}
                                    style={styles.GridView}
                                    renderItem={item => (
                                        <View style={styles.itemContainer}>
                                            <Text>{item.length}</Text>
                                            <TouchableOpacity style={{flex: 1}} onPress={() => {
                                                Alert.alert(moment(item.dateDemande).format("DD-MM-YYYY à HH:mm:ss"), item.commentaire);
                                            }}>
                                                <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                                                    <View style={{flex: 1, paddingTop: 10}}>
                                                        <Image
                                                            style={{flex: 1, borderRadius: 10}}
                                                            source={{uri: cfg.API_URL + '/files/profs/' + item.picPath}}
                                                        />
                                                    </View>
                                                    <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
                                                        <Text style={styles.ProfName}>{item.nomPrenom}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                                <View style={{flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginTop: '10%', marginBottom: '5%'}}>
                                    <TouchableOpacity style={{margin: '5%'}} onPress={ this._cancelDemand}>
                                        <Image
                                            style={{height: 50, width: 50}}
                                            source={require('./../../picture/profil/errorWhite.png')}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{margin: '5%'}} onPress={this._confirmDemand}>
                                        <Image
                                            style={{height: 50, width: 50}}
                                            source={require('./../../picture/profil/successWhite.png')}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Button
                                  title={'RETOUR'}
                                  icon={{
                                    type: 'font-awesome',
                                    name: 'arrow-left',
                                    size: 15,
                                    color: 'white',
                                  }}
                                   onPress={() => {this.ShowModalFunction(!this.state.ModalVisibleStatus)}}
                                     buttonStyle={{
                                       backgroundColor: cfg.SECONDARY,
                                       borderColor: 'white',
                                       borderRadius: 30,
                                       width: 180,
                                       height:50,
                                       alignItems:'center',
                                       paddingLeft: 10,
                                       justifyContent:'center',
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
          </View>
          <AlertPro
            ref={ref => {
              this.AlertPro = ref;
            }}
            onConfirm={() => this.AlertPro.close()}
            title="ATTENTION"
            message={"Vous n'avez plus assez de crédit gratuit, pour acheter cette application, rendez-vous sur l'application web pour choisir un autre moyen de paiement."}
            textConfirm="RETOUR"
            closeOnPressMask={true}
            showCancel={false}
            customStyles={{
              mask: {
                backgroundColor: "transparent"
              },
              container: {
                color: Store.Text2,
                borderWidth: 1,
                borderColor: Store.Text2,
                shadowColor: "#000000",
                shadowOpacity: 0.1,
                shadowRadius: 10
              },
              title: {
                color: 'red'
              },
              buttonConfirm: {
                backgroundColor: Store.Text2
              },
              message: {
                color: Store.Text2
              }
            }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({


  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },


  mainContainer: {
    flex:1,
    backgroundColor: Store.Back,
  },
  classContainer: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: 2,
  },
  searchContainer: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: 2,
    alignItems: 'center',
    margin: 5,
  },
  input: {
    flex: 1,
    height: 44,
    padding: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  ButtonSearch: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  allClassContainer: {
    flex:0.2,
  },
  gridView: {
    paddingTop: 25,
    flex: 1
  },
  itemContainer: {
    flex: 1,
    height: 130,
    backgroundColor: '#FFF',
    borderRadius:10,
  },
  itemName: {
    fontSize: 18,
    color: '#434B77',
    fontWeight: '600',
  },
  buttonClassAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cfg.PRIMARY,
    margin:2,
  },
  buttonClass: {
    width:178,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    backgroundColor: '#FEE599',
    borderRadius:10,
  },
  textClass: {
    fontSize: 14,
    color: '#434B77',
    fontWeight: '600',
  },
  ProfName: {
    fontSize: 12,
    color: '#434B77',
    fontWeight: '600',
  },
    MainContainer :{

        flex:1,
        justifyContent: 'center',
        alignItems: 'center'

    },

    ModalInsideView:{

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : cfg.SECONDARY,
        height: 450 ,
        width: '90%',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'

    },

    TextStyle:{

        fontSize: 20,
        color: "#fff",
        textAlign: 'center'

    },
    TextProfStyle:{
        fontSize: 20,
        color: "#fff",
        textAlign: 'center',
        padding: 20
    }
});
