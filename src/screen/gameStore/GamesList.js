import React, { Component } from 'react';
import { Alert, TextInput, View, Text,
StyleSheet, AsyncStorage, ListView, TouchableOpacity,
Picker, Item, FlatList, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Dimensions} from 'react-native';
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
    if (param === 'Enregistrées'){
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

    else if (param === 'Dune Store'){
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
        <View style={[styles.mainContainer, {backgroundColor: Store.Back}]}>
          <Header navigation={this.props.navigation} colorTheme={"#fcebb5"}/>
          <View style={[styles.classContainer, {backgroundColor: Store.Back}]}>
            <View style={{flex: 0.5, padding: 10}}>
              <TouchableOpacity style={styles.buttonClass} onPress={() => this._setCurrentGame("Enregistrées")}>
                <Text>Enregistrées</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5, padding: 10}}>
              <TouchableOpacity style={styles.buttonClass} onPress={() => this._setCurrentGame("Dune Store")}>
                <Text>Dune Store</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={[styles.searchContainer, {backgroundColor: Store.Back}]}>
          <Fumi
            label={'Chercher un jeu'}
            style={{ width: 270, backgroundColor:Store.Back, color:Store.Back}}
            value={this.state.Search}
            onChangeText={(Search) => this.setState({ Search })}
            iconClass={FontAwesomeIcon}
            iconName={'puzzle-piece'}
            iconColor={Store.Text2}
            labelStyle={{ color: Store.Text2 }}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
          />
          <View style={{ backgroundColor:Store.Back }}>
          <Button
            title={''}
            icon={{
              type: 'font-awesome',
              name: 'search',
              size: 20,
              color: Store.Text2,
            }}
            buttonStyle={{
              backgroundColor: Store.Back,
              borderRadius: 10,
              width: 60,
              height:61,
              alignItems:'center',
              paddingLeft: 10,
              justifyContent:'center',
            }}
            onPress={() => this._searchRequest()}
          />
          </View>
        </View>


        <View style={{flex: 0.8, width:Math.round(Dimensions.get('window').width), backgroundColor: Store.Back}}>
          <GridView
            itemDimension={100}
            spacing={1}
            items={this.state.GameList}
            style={styles.GridView}
            renderItem={item => (
              <View style={styles.itemContainer}>
                <TouchableOpacity style={{flex: 1, backgroundColor: Store.Back}} onPress={() => this._goToGameProfil(item.id)}>
                  <View style={{flex: 1, marginLeft: 10, marginRight: 10, backgroundColor: Store.Back}}>
                    <View style={{flex: 0.7, paddingTop: 10, backgroundColor: Store.Back}}>
                      <Image
                        style={{flex: 1, borderRadius:10}}
                        source={{uri: cfg.API_URL + '/files/apps/' + item.picPath}}
                        style={{flex:0.6, height: undefined, width: undefined}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center', backgroundColor: Store.Back}}>
                      <Text style={{fontSize: 12, color: Store.Text2, fontWeight: '600'}}>{item.nomApp}</Text>
                      <Text style={{fontSize: 12, color: Store.Text2, fontWeight: '600'}}>{item.nomCreator}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            />
        </View>
        <View style={{backgroundColor:Store.Back}}>
        <Button
          title=""
          onPress={()=>this.props.navigation.navigate('Dashboard')}
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
    backgroundColor: Store.Back,
  },
  classContainer: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: 2,
    backgroundColor: Store.Back,
  },
  searchContainer: {
    backgroundColor: Store.Back,
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center',
    justifyContent:'center',
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
    backgroundColor: Store.Back,
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
    backgroundColor: Store.Back,
    borderRadius:10,
  },
  itemName: {
    fontSize: 12,
    color: Store.Text2,
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
    flex: 1,
    margin:2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fcebb5",
    borderRadius:10,
  },
  textClass: {
    fontSize: 14,
    color: Store.Text2,
    fontWeight: '600',
  },
});
