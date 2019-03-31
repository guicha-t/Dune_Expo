import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text,
  StyleSheet, AsyncStorage, ListView, TouchableOpacity,
  Picker, Item, FlatList, Image, Keyboard, ActivityIndicator} from 'react-native';
  import { observer } from 'mobx-react';
  import { Avatar } from 'react-native-elements';

  import GridView from 'react-native-super-grid';

  import Header from './../../global/header/Header';
  import Store from './../../global/store/Store'

  @observer
  export default class StudentList extends Component {
    constructor(props){
      super(props);
      this.state = {
        Trombi: [],
        Classes: [],
        Class: 0,
        Search: '',
        loading: true,
      }
    }

    componentDidMount(){
      fetch('http://176.31.252.134:7001/api/v1/trombi/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          token: Store.Token,
        },
        body: JSON.stringify({
          typeUser: Store.TypeUser,
        }),
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({'Trombi':responseJson.response})

        fetch('http://176.31.252.134:7001/api/v1/trombi/classes', {
          method: 'GET',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Classes':responseJson.response})
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


    _goToStudentProfil = async (param) => {
      this.props.navigation.navigate('StudentContainer', {
        idStudent: param,
        idBack: '0',
      });
    };

    _setCurrentClass = async (param) => {
      fetch('http://176.31.252.134:7001/api/v1/trombi/byClasse', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          token: Store.Token,
        },
        body: JSON.stringify({
          typeUser: Store.TypeUser,
          idClasse: param.idClasse,
        }),
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({'Class': param.idClasse})
        this.setState({'Search': null})
        this.setState({'Trombi':responseJson.response})
      })
      .catch((error) => {
        console.error(error);
      });
    }

    _resetTrombi = async () => {
      fetch('http://176.31.252.134:7001/api/v1/trombi/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          token: Store.Token,
        },
        body: JSON.stringify({
          typeUser: Store.TypeUser,
        }),
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({'Class':0})
        this.setState({'Search':null})
        this.setState({'Trombi':responseJson.response})
      })
      .catch((error) => {
        console.error(error);
      });
    }

    _searchRequest = async () => {
      Keyboard.dismiss()
      if (this.state.Class === 0) {
        fetch('http://176.31.252.134:7001/api/v1/trombi/', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
            typeUser: Store.TypeUser,
            search: this.state.Search,
          }),
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Trombi':responseJson.response})
        })
        .catch((error) => {
          console.error(error);
        });
      }
      else {
        fetch('http://176.31.252.134:7001/api/v1/trombi/byClasse', {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            token: Store.Token,
          },
          body: JSON.stringify({
            typeUser: Store.TypeUser,
            idClasse: this.state.Class,
            search: this.state.Search,
          }),
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Trombi':responseJson.response})
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }

    displayClassLabel(param) {
        if (param.level === 1) {
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> PS-{param.num}</Text>;
        } else if (param.level === 2){
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> MS-{param.num}</Text>;
        } else if (param.level === 3){
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> GS-{param.num} </Text>;
        } else if (param.level === 4){
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> CP-{param.num}</Text>;
        } else if (param.level === 5){
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> CE1-{param.num}</Text>;
        } else if (param.level === 6){
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> CE2-{param.num}</Text>;
        } else if (param.level === 7){
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> CM1-{param.num}</Text>;
        } else if (param.level === 8){
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> CM2-{param.num} </Text>;
        } else if (param.level === 9){
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> '6e'-{param.num} </Text>;
        } else if (param.level === 10){
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> '5e'-{param.num}</Text>;
        } else if (param.level === 11){
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> '4e'-{param.num}</Text>;
        } else if (param.level === 12){
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> '3e'-{param.num}</Text>;
        } else {
            return <Text style={[styles.textClass, this.setColorTextFocused(param.idClasse)]}> Autre </Text>;
        }
    }

     setColorFocused = function(param) {
       if (this.state.Class === param) {
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
      if (this.state.Class === param) {
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

      if (this.state.loading) {
          return (
            <View style={{flex:1}}>
              <Header navigation={this.props.navigation}/>
              <View style={styles.loadingContainer}>
                <ActivityIndicator animating={true} />
              </View>
            </View>
          )
        }

      return (
        <View style={styles.mainContainer}>
          <Header navigation={this.props.navigation}/>

          <View style={styles.classContainer}>
            <View style={styles.allClassContainer}>
              <TouchableOpacity style={{flex: 1}} onPress={() => this._resetTrombi()}>
                <View style={[styles.buttonClassAll, this.setColorFocused(0)]}>
                  <Text style={[styles.textClass, this.setColorTextFocused(0)]}>TOUT</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.8}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.Classes}
                extraData={this.state}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                <View style={{width: 80}}>
                  <TouchableOpacity style={{ flex: 1 }} onPress={() => this._setCurrentClass(item)}>
                    <View style={[styles.buttonClass, this.setColorFocused(item.idClasse)]}>
                      {this.displayClassLabel(item)}
                    </View>
                  </TouchableOpacity>
                </View>
              }
              keyExtractor={item => item.idClasse.toString()}
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

        <View style={{flex: 1, backgroundColor: '#FCFCFC'}}>
          <GridView
            itemDimension={100}
            spacing={5}
            items={this.state.Trombi}
            style={styles.GridView}
            renderItem={item => (
              <View style={styles.itemContainer}>
                <TouchableOpacity style={{flex: 1}} onPress={() => this._goToStudentProfil(item.idEleve)}>

                  <View style={{flex: 1, padding: 4}}>

                    <View style={{flex: 0.7, backgroundColor:'#363453'}}>
                      <Image
                        style={{flex: 1, backgroundColor: '#252525'}}
                        source={{uri: 'http://176.31.252.134:7001/files/eleves/' + item.idEleve + '-eleve.png'}}
                        />
                    </View>

                    <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center', backgroundColor:'#363453'}}>
                      <Text style={styles.itemName}>{item.nomEleve.toUpperCase()}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#F9F9F9',
  },
  mainContainer: {
    flex:1,
    backgroundColor: '#FFF',
  },
  classContainer: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: 2,
  },
  searchContainer: {
    flex: 0.05,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
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
    backgroundColor: '#363453',
  },
  itemName: {
    fontSize: 14,
    color: '#FFF',
    fontWeight:'bold',
  },
  buttonClassAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin:2,
  },
  buttonClass: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  textClass: {
    fontSize: 14,
    fontWeight: '600',
  },
});
