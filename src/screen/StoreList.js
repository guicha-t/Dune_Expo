import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text,
  StyleSheet, AsyncStorage, ListView, TouchableOpacity,
  Picker, Item, FlatList, Image, Keyboard} from 'react-native';
  import { observer } from 'mobx-react';
  import { Avatar } from 'react-native-elements';

  import GridView from 'react-native-super-grid';

  import Header from './../global/header/Header';
  import Store from './../global/store/Store'

  @observer
  export default class StudentList extends Component {
    constructor(props){
      super(props);
      this.state = {
        GamesList: [],
        AppsBuyed: [],
        Demands:[],
        Game: null,
        Search: '',
      }
    }

    componentDidMount(){
      fetch('http://176.31.252.134:7001/api/v1/store/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          token: Store.Token,
        },
        body: JSON.stringify({
          typeUser: Store.TypeUser,
          idUser: Store.IdUser,
        }),
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({'GamesList':responseJson.response})
      })
      .catch((error) => {
        console.error(error);
      });

      fetch('http://176.31.252.134:7001/api/v1/store/getAppsEcole', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          token: Store.Token,
        },
        body: JSON.stringify({
          typeUser: Store.TypeUser,
          idUser: Store.IdUser,
        }),
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({'AppsBuyed':responseJson.response})
      })
      .catch((error) => {
        console.error(error);
      });
    }

    _goToStudentProfil = async (param) => {
      this.props.navigation.navigate('StudentContainer', {
        idStudent: param,
      });
    };

    _searchRequest = async () => {
      Keyboard.dismiss()
      if (this.state.Game === null) {
        fetch('http://176.31.252.134:7001/api/v1/store/', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
            typeUser: Store.TypeUser,
            idUser: Store.IdUser,
            search: this.state.Search,
          }),
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'GamesList':responseJson.response})
        })
        .catch((error) => {
          console.error(error);
        });
      }
      else {
        fetch('http://176.31.252.134:7001/api/v1/store/getApp', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
            typeUser: Store.TypeUser,
            idUser: Store.IdUser,
            id /*TROUVER LA VARIABLE IDGAME*/: this.state.Game,
            search: this.state.Search,
          }),
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'GamesList':responseJson.response})
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }

    displayGamesLabel(param) {
        if (param.level === 1) {
            return <Text style={styles.textClass}> ENREGISTRÉES-{param.num}</Text>;
        } else if (param.level === 2){
            return <Text style={styles.textClass}> DISPONIBLES-{param.num}</Text>;
        } else if (param.level === 3){
            return <Text style={styles.textClass}> DEMANDES-{param.num} </Text>;
    }

    render() {
      return (
        <View style={styles.mainContainer}>
          <Header navigation={this.props.navigation}/>

            <View style={{flex: 0.8}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={[{key: 'ENREGISTRÉES'}, {key: 'DISPONIBLES'}, {key: 'DEMANDES'}]}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                <View style={{width: 80}}>
                  <TouchableOpacity style={{ flex: 1 }} onPress={() => this._setCurrentClass(item)}>
                    <View style={styles.buttonClass}>
                    {this.displayGamesLabel(item)}
                    </View>
                  </TouchableOpacity>
                </View>
              }
              keyExtractor={item => item.id /*CHANGER EN IDGAME */}
              />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            value={this.state.Search}
            onChangeText={(Search) => this.setState({ Search })}
            placeholder={'Rechercher'}
            autoCapitalize = 'none'
            style={styles.input}
          />
          <Button
            title={'Go'}
            style={styles.ButtonSearch}
            color='#363453'
            onPress={() => this._searchRequest()}
          />
        </View>


        <View style={{flex: 0.8}}>
          <GridView
            itemDimension={100}
            spacing={1}
            items={this.state.Trombi}
            style={styles.GridView}
            renderItem={item => (

              <View style={styles.itemContainer}>
                <TouchableOpacity style={{flex: 1}} onPress={() => this._goToStudentProfil(item.idEleve)}>
                  <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                    <View style={{flex: 0.7, paddingTop: 10}}>
                      <Image
                        style={{flex: 1}}
                        source={{uri: 'https://assets.vogue.com/photos/59726f1974b72106b2ef2a5d/master/w_780,c_limit/00-lede-prince-george-4th-birthday-portrait.jpg'}}
                        />
                    </View>
                    <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.itemName}>{item.nomEleve}</Text>
                      <Text style={styles.itemName}>{item.prenomEleve}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

            )}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: '#161616',
  },
  itemName: {
    fontSize: 12,
    color: '#FFF',
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    backgroundColor: '#FEE599',
  },
  textClass: {
    fontSize: 14,
    color: '#161616',
    fontWeight: '600',
  },
});
