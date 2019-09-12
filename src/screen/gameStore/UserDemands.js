import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage, FlatList, TouchableHighlight, Modal} from 'react-native';
import { observer } from 'mobx-react';
import { List, ListItem } from "react-native-elements";
import GridView from 'react-native-super-grid';

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
        idNotif: null
    }

    this.ts = new Date();

    this.contentToRender = []
  }

  componentDidMount(){
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


    render() {
    return (
        <View style={styles.mainContainer}>
          <Header navigation={this.props.navigation}/>
    	<View style={{flex:0.2, alignItems: 'center', justifyContent:'center',}}>
          <Text style={{fontSize:20,}}>
             Application(s) demandée(s)
          </Text>
        </View>
            <View style={{flex: 0.8}}>
                <List>
                    <FlatList
                        data={this.state.GamesRequested}
                        extraData={this.state}
                        rightIcon={'../../picture/profil/eye.png'}
                        renderItem={({ item }) => (
                            <ListItem
                                title={`${ item.nomApp }`}
                                onPress={() => this.ShowProfInModal(true, item)}
                            />
                            )}
                        keyExtractor={item => item.idNotif.toString()}
                    />
                </List>
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
                                <Text onPress={() => this.props.navigation.navigate('GameContainer', {id: this.state.idAppModal})}  style={{textDecorationLine: 'underline',fontSize: 20, color: "#fff", textAlign: 'center'}}>
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
                                                Alert.alert(item.dateDemande, item.commentaire);
                                            }}>
                                                <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                                                    <View style={{flex: 0.7, paddingTop: 10}}>
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
                                <Button title={'Retour'} color='#363453' onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#FEE599',
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
        backgroundColor : "#363453",
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
