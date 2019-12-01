import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet,
  AsyncStorage, ListView, Image, TouchableOpacity, ActivityIndicator,
  FlatList, Modal} from 'react-native';
import { Icon } from 'react-native-elements';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Loading from './../../global/loading/Loading';
import Store from './../../global/store/Store'
import * as cfg from "./../../Config";

@observer
export default class StudentSkills extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      modalVisible: false,
      skills: [],
      studentSkill: [],
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('./../../picture/profil/star-button.png')} style={{width:32, height:32}}/>
    }
  }

  componentDidMount(){

    fetch(cfg.API_URL + '/competences/getCompetences/', {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
        idEleve: this.props.screenProps.idStudent,

      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'skills':responseJson.response})

      fetch(cfg.API_URL + '/competences/getCompByStudent/' + this.props.screenProps.idStudent, {
        method: 'GET',
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          token: Store.Token,
          idEleve: this.props.screenProps.idStudent,

        },
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({'studentSkill':responseJson.response})
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

  _goBackAccordingId = async (param) => {
    if (param.idBack === '1') {
      param.navigation.navigate('StudentResultList')
    } else {
      param.navigation.navigate('StudentList')
    }
  };



  _addSkill = async (param) => {
    fetch(cfg.API_URL + '/competences/validateCompStud', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        idEleve: this.props.screenProps.idStudent,
        idComp: param.idComp,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {

          fetch(cfg.API_URL + '/competences/getCompByStudent/' + this.props.screenProps.idStudent, {
            method: 'GET',
            Accept: 'application/json',
            headers: {
              'Content-Type': 'application/json',
              token: Store.Token,
              idEleve: this.props.screenProps.idStudent,
            },
          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({'studentSkill':responseJson.response})
            this.setState({'loading':false})
          })
          .catch((error) => {
            console.error(error);
          });

          this.setModalVisible(!this.state.modalVisible);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  _removeSkill = async (param) => {
    fetch(cfg.API_URL + '/competences/unvalidateCompStud', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
      body: JSON.stringify({
        idEleve: this.props.screenProps.idStudent,
        idComp: param.idComp,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {

          fetch(cfg.API_URL + '/competences/getCompByStudent/' + this.props.screenProps.idStudent, {
            method: 'GET',
            Accept: 'application/json',
            headers: {
              'Content-Type': 'application/json',
              token: Store.Token,
              idEleve: this.props.screenProps.idStudent,

            },
          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({'studentSkill':responseJson.response})
            this.setState({'loading':false})
          })
          .catch((error) => {
            console.error(error);
          });

          console.warn(JSON.stringify(responseJson))
    })
    .catch((error) => {
      console.error(error);
    });
  };

  _confirmSelection = async (param) => {
    Alert.alert(
      'CONFIRMATION',
      'Voulez-vous valider '+ param.libelleComp.toString() + ' ?',
      [
        {text: 'NON', onPress: () => this.setModalVisible(!this.state.modalVisible), style: 'cancel'},
        {text: 'OUI', onPress: () => this._addSkill(param)},
      ]
    );
  };

  _confirmDeletion = async (param) => {
    Alert.alert(
      'CONFIRMATION',
      'Voulez-vous invalider '+ param.libelleComp.toString() + ' ?',
      [
        {text: 'NON', onPress: () => this.setModalVisible(false), style: 'cancel'},
        {text: 'OUI', onPress: () => this._removeSkill(param)},
      ]
    );
  };

  render() {
      const { navigation, idStudent, screenProps } = { ...this.props };

      if (this.state.loading) {
          return (
              <Loading navigation={this.props.navigation}/>
          )
        }

      return (
        <View style={{flex:1, backgroundColor: Store.Back, paddingTop: 4}}>




          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <View style={{flex: 1, backgroundColor: Store.Back, paddingTop: 20}}>

              <View style={{flex: 0.1, flexDirection: 'row'}}>
                <View style={{flex: 0.3}}>
                  <View style={{width: 60, justifyContent:'center'}}>
                    <Icon
                      raised
                      onPress={() => this.setModalVisible(!this.state.modalVisible)}
                      type='font-awesome'
                      name='arrow-left'
                      color='#FFF'
                      containerStyle={{
                        backgroundColor: cfg.SECONDARY,
                      }}
                      />
                  </View>
                </View>
              </View>

               <View style={{flex: 0.9}}>
                 <FlatList
                   showsHorizontalScrollIndicator={false}
                   data={this.state.skills}
                   showsVerticalScrollIndicator={false}
                   renderItem={({item}) =>
                   <TouchableOpacity
                     onPress={() => this._confirmSelection(item)}
                     style={{flex: 1, backgroundColor: cfg.SECONDARY, marginBottom: 6, padding: 5, flexDirection:'row', justifyContent:'center'}}>
                     <View style={{flex: 1, paddingLeft: 10, flexDirection: 'row'}}>
                       <Text style={{fontSize: 20, color: '#FFF'}}>{item.libelleComp}</Text>
                     </View>
                   </TouchableOpacity>
                 }
                 keyExtractor={item => item.idComp.toString()}
                 />
               </View>
             </View>
           </Modal>








          <View style={{flex: 0.1, flexDirection:'row'}}>
            <View style={{flex: 0.3}}>
              <View style={{width: 60, justifyContent:'center'}}>
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
            </View>
            <View style={{flex: 0.4, justifyContent:'center', alignItems:'center'}}>
              <Text style={{color: Store.Text2, fontSize: 20, fontWeight: 'bold'}}>
                COMPÉTENCES
              </Text>
            </View>
            <View style={{flex: 0.3, alignItems:'flex-end', paddingRight:4}}>
              <View style={{width: 60, justifyContent:'center'}}>
                <Icon
                  raised
                  onPress={() => this.setModalVisible(true)}
                  type='font-awesome'
                  name='plus'
                  color='#FFF'
                  containerStyle={{
                    backgroundColor: cfg.SECONDARY,
                  }}
                  />
              </View>
            </View>
          </View>

          <View style={{flex: 0.8}}>

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.studentSkill}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
              <TouchableOpacity
                onLongPress={() => this._confirmDeletion(item)}
                style={{flex: 1, backgroundColor: cfg.SECONDARY, marginBottom: 6, padding: 5, flexDirection:'row', justifyContent:'center'}}>
                <View style={{flex: 1, paddingLeft: 10, flexDirection: 'row'}}>
                  <Text style={{fontSize: 20, color: '#FFF'}}>{item.libelleComp}</Text>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={item => item.idComp.toString()}
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
    primetextblue: {
      fontSize: 20,
      color: 'black',
      fontWeight:'bold'
    },
    gridtextwhite: {
      fontSize: 16,
      color: '#FFF',
      fontWeight:'bold'
    },
    gridtextblue: {
      fontSize: 16,
      color: cfg.SECONDARY,
      fontWeight:'bold'
    },
    containerFlatList: {
      flex: 1,
      marginBottom: 6,
      padding: 5,
      backgroundColor: cfg.SECONDARY,
      flexDirection:'row',
      justifyContent:'center',
    },
    containerNoteFlatList: {
      flex: 0.2,
      alignItems:'center',
      justifyContent:'center',
      marginRight: 10,
    },
  });
