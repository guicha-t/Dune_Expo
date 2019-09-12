import React, { Component } from 'react';
import { Alert, TextInput, View, Text,
StyleSheet, AsyncStorage, ListView, TouchableOpacity,
Picker, Item, FlatList, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import { observer } from 'mobx-react';
import { Avatar, Icon, Button } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Fumi } from 'react-native-textinput-effects';


import Header from './../../global/header/Header';
import Store from './../../global/store/Store';
import * as cfg from "./../../Config";


  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );


  @observer
  export default class GamesList extends Component {
    constructor(props){
      super(props);
      this.state = {
        GameList: [],
        Search: '',
	    Viewtype: '0',
      }
    }

    componentDidMount(){
        fetch(cfg.API_URL + '/store/', {
                method: 'POST',
                Accept: 'application/json',
                headers: {
                  'Content-Type': 'application/json',
                  token: Store.Token,
                },
                body: JSON.stringify({
                  idType: 0,
                }),
              }).then((response) => response.json())
              .then((responseJson) => {
                this.setState({'GameList':responseJson.response})
              })
              .catch((error) => {
                console.error(error);
              });
    }

    _goToGameProfil = async (param) => {
      this.props.navigation.navigate('GameContainer', {
        id:param,
      });
    };

    _setCurrentGame = async (param) => {
    if (param.key === 'Enregistrées'){
    fetch(cfg.API_URL + '/store/getAppsEcole', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: Store.Token,
          },
        }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({'GameList':responseJson.response})
            })
            .catch((error) => {
              console.error(error);
            });
      }

    else if (param.key === 'Dune Store'){
    fetch(cfg.API_URL + '/store/', {
            method: 'POST',
            Accept: 'application/json',
            headers: {
              'Content-Type': 'application/json',
              token: Store.Token,
            },
            body: JSON.stringify({
              idType: 0,
            }),
          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({'GameList':responseJson.response})
          })
          .catch((error) => {
            console.error(error);
          });
        }
    }

    _searchRequest = async () => {
      Keyboard.dismiss()
              fetch(cfg.API_URL + '/store/', {
                method: 'POST',
                Accept: 'application/json',
                headers: {
                  'Content-Type': 'application/json',
                  token: Store.Token,
                },
                body: JSON.stringify({
                  search: this.state.Search,
                  idType: 0,
                }),
              }).then((response) => response.json())
              .then((responseJson) => {
                this.setState({'GameList':responseJson.response})
              })
              .catch((error) => {
                console.error(error);
              });
    }

    render() {

      return (
        <DismissKeyboard>
        <View style={styles.mainContainer}>
          <Header navigation={this.props.navigation}/>
          <View style={styles.classContainer}>
            <View style={{flex: 1}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={[{key: 'Enregistrées'}, {key: 'Dune Store'}]}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                <View style={{width: 178}}>
                  <TouchableOpacity style={{ flex: 1 }} onPress={() => this._setCurrentGame(item)}>
                    <View style={styles.buttonClass}>
                        <Text style={styles.textClass}>{item.key}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }
              />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Fumi
            label={'Chercher un jeu'}
            style={{ width: 270, backgroundColor:'#FFF'}}
            value={this.state.Search}
            onChangeText={(Search) => this.setState({ Search })}
            iconClass={FontAwesomeIcon}
            iconName={'puzzle-piece'}
            iconColor={'#363453'}
            labelStyle={{ color: '#363453' }}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
          />
          <Button
            title={''}
            icon={{
              type: 'font-awesome',
              name: 'search',
              size: 20,
              color: '#363453',
            }}
            buttonStyle={{
              backgroundColor: 'white',
              borderColor: 'white',
              borderRadius: 10,
              width: 60,
              height:50,
              alignItems:'center',
              paddingLeft: 10,
              justifyContent:'center',
            }}
            onPress={() => this._searchRequest()}
          />
        </View>


        <View style={{flex: 0.8}}>
          <GridView
            itemDimension={100}
            spacing={1}
            items={this.state.GameList}
            style={styles.GridView}
            renderItem={item => (
              <View style={styles.itemContainer}>
                <TouchableOpacity style={{flex: 1}} onPress={() => this._goToGameProfil(item.id)}>
                  <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                    <View style={{flex: 0.7, paddingTop: 10}}>
                      <Image
                        style={{flex: 1, borderRadius:10}}
                        source={{uri: cfg.API_URL + '/files/apps/' + item.picPath}}
                      />
                    </View>
                    <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.itemName}>{item.nomApp}</Text>
                      <Text style={styles.itemName}>{item.nomCreator}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            />
        </View>
      </View>
      </DismissKeyboard>
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
    backgroundColor: '#363453',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    width: 160,
    height:60,
    alignItems:'center',
    paddingLeft: 10,
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
    fontSize: 12,
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
});
