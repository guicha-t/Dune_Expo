import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage, FlatList, SectionList} from 'react-native';
import { observer } from 'mobx-react';
import { List, ListItem } from "react-native-elements";
import GridView from 'react-native-super-grid';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';

@observer
export default class UserDemands extends Component {
  constructor(props){
    super(props);
    this.state = {
      GamesRequested: [],
      ProfArray:[],
      Test:'',
    }
  }

  componentDidMount(){
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
        })
        .catch((error) => {
          console.error(error);
        });
  }

  renderProfArray = (param) => {
   fetch('http://176.31.252.134:7001/api/v1/notifs/getArrayProf/' + param.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'ProfArray':responseJson.response})
          //Alert.alert(this.state.ProfArray.length.toString())
          //Alert.alert(param.toString())
          Alert.alert(param.toString(), JSON.stringify(responseJson.response))
        })
        .catch((error) => {
          console.error(error);
        });
     return(
        <View style={{flex: 0.8}}>
          <GridView
            itemDimension={100}
            spacing={1}
            items={this.state.ProfArray}
            style={styles.GridView}
            renderItem={item => (
              <View style={styles.itemContainer}>
                <TouchableOpacity style={{flex: 1}} onPress={() => {Alert.alert(item.dateDemande, item.commentaire);}}>
                  <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                    <View style={{flex: 0.7, paddingTop: 10}}>
                      <Image
                        style={{flex: 1, borderRadius:10}}
                        source={{uri: 'http://176.31.252.134:7001/files/profs/' + item.picPath}}
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
        </View>
     );
  }


  _confirmDemand = (param) => {
    /*fetch('http://176.31.252.134:7001/api/v1/store/validating', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        idDemande: param,
        validate: 1,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          this.props.navigation.navigate('UserDemands');
    })
    .catch((error) => {
      console.error(error);
    });*/
  }


  _cancelDemand = (param) => {
    /*fetch('http://176.31.252.134:7001/api/v1/store/validating', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        idDemande: param,
        validate: 0,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          this.props.navigation.navigate('UserDemands');
    })
    .catch((error) => {
      console.error(error);
    });*/
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
                renderItem={({ item }) => (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.itemName}>{item.nomApp}</Text>
                      <View style={{flex: 0.5, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                        {this.renderProfArray(item.idToNotify)}
                      </View>
                      <View style={{flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                          <TouchableOpacity style={{ flex: 0.12 }} onPress={this._cancelDemand(item.idApp)}>
                             <Image
                               style={{height: 32, width: 32}}
                               source={require('./../../picture/profil/error.png')}
                               resizeMode="contain"
                              />
                          </TouchableOpacity>

                          <TouchableOpacity style={{ flex: 0.12 }} onPress={this._confirmDemand(item.idApp)}>
                             <Image
                               style={{height: 32, width: 32}}
                               source={require('./../../picture/profil/success.png')}
                               resizeMode="contain"
                             />
                          </TouchableOpacity>
                      </View>
                    </View>
                )}
            keyExtractor={item => item.nomApp}
            />
          </List>
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
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    height: 160,
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
});
