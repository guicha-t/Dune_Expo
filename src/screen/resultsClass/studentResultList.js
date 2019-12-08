import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage,
  Image, TouchableOpacity, TouchableHighlight, FlatList, ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-elements';
import { observer } from 'mobx-react';
import Moment from 'moment';

import Header from './../../global/header/Header';
import Loading from './../../global/loading/Loading';
import Store from './../../global/store/Store';
import * as cfg from "./../../Config";

@observer
export default class StudentResultList extends Component {
  constructor(props){
    super(props);
    this.state = {
      Student: [],
      StudentAlpha: [],
      StudentNote: [],
      Game: this.props.navigation.getParam('Game', 'Unknown'),
      loading: true,
      idBack: this.props.navigation.getParam('idBack', 'Unknown'),
      alphaOpacity: 0.2,
      numOpacity: 1,
    }
  }

  componentDidMount() {
    fetch(cfg.API_URL + '/eleves/stats/bySession/' + this.props.navigation.getParam('idGame', '0'), {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
        idGame: this.props.navigation.getParam('idGame', '0'),
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'StudentAlpha':responseJson.ascEleve})
      this.setState({'StudentNote':responseJson.descNote})
      this.setState({'Student':this.state.StudentAlpha})
      this.setState({'loading':false})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  backAccordingId() {
    if (this.state.idBack === '0') {
      this.props.navigation.navigate('GameList', {idBack: '0',});
    } else if (this.state.idBack === '1'){
      this.props.navigation.navigate('StudentContainer', {
        idBack: '1',
      });
    }
  }

  setAlpha() {
    this.setState({'Student':this.state.StudentAlpha})
    this.setState({'alphaOpacity':0.2})
    this.setState({'numOpacity':1})

  }

  setNote() {
    this.setState({'Student':this.state.StudentNote})
    this.setState({'alphaOpacity':1})
    this.setState({'numOpacity':0.2})

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
   }


  render() {
    if (this.state.loading) {
        return (
          <Loading navigation={this.props.navigation}/>
        )
      }


    return(
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation} colorTheme={"#b1ebf6"}/>
        <View style={[styles.body, {backgroundColor: Store.Back}]}>
          <View style={{flex: 0.2, flexDirection:'row'}}>
            <View style={{flex: 0.2, justifyContent: 'center', paddingLeft: 6}}>
              <Icon
              raised
              onPress={()=>this.backAccordingId(this.state.idBack)}
              type='font-awesome'
              name='arrow-left'
              color='#FFF'
              containerStyle={{
                backgroundColor: cfg.SECONDARY,
              }}
              />
            </View>

            <View style={{flex: 0.6, alignItems:'center', justifyContent:'center'}}>
              <Text style={[styles.primetextblue, {color:Store.Text2}]}>{this.state.Game.nameGame.toUpperCase()}</Text>
              <Text style={[styles.subtextblue, {color:Store.Text2}]}>{Moment(this.state.Game.date).locale('fr').format('DD/MM/YYYY HH:mm')}</Text>
            </View>

            <View style={{flex: 0.2, padding: 5}}>

              <View style={{flex: 0.5, justifyContent:'center', alignItems:'center'}}>
                <Icon
                raised
                onPress={()=>this.setAlpha()}
                type='font-awesome'
                name='sort-alpha-asc'
                color='#FFF'
                containerStyle={{
                  backgroundColor: cfg.SECONDARY,
                  opacity: this.state.alphaOpacity,
                }}
                />

              </View>

              <View style={{flex: 0.5, justifyContent:'center', alignItems:'center'}}>
                <Icon
                raised
                onPress={()=>this.setNote()}
                type='font-awesome'
                name='sort-numeric-desc'
                color='#FFF'
                containerStyle={{
                  backgroundColor: cfg.SECONDARY,
                  opacity: this.state.numOpacity,
                }}
                />
              </View>

            </View>
          </View>


          <View style={{flex: 0.8}}>


            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.Student}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>

              <View style={{flex: 1}}>
                <View style={[styles.containerFlatList]}>
                  <Text style={styles.primetextwhite}>{item.libelleComp}</Text>
                </View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={item.notes}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) =>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('StudentContainer', {idStudent: item.idEleve, idBack: '1', idGameType: item.idComp})}
                    style={{flex: 1, backgroundColor: '#b1ebf6', height: 60, padding: 5, borderBottomWidth: 1, borderColor: cfg.SECONDARY, borderLeftWidth: 1, borderRightWidth: 1, flexDirection: 'row'}}>
                      <View style={{flex: 0.8, justifyContent:'center'}}>
                        <Text style={styles.subtextblue}>{item.prenomEleve} {item.nomEleve}</Text>
                      </View>
                      <View style={[styles.caseScore, this.setColorAccordingNote(item.score)]}>
                        <Text style={styles.primetextwhite}>{item.score}</Text>
                      </View>
                    </TouchableOpacity>
              }
              keyExtractor={item => item.idEleve.toString()}
              />

            </View>

            }
            keyExtractor={item => item.idComp.toString()}
            />

          </View>
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
  caseScore: {
    flex: 0.2,
    justifyContent:'center',
    alignItems:'center',
  },
  primetextblue: {
    fontSize: 20,
    color: cfg.SECONDARY,
    fontWeight:'bold'
  },
  subtextblue: {
    fontSize: 20,
    color: cfg.SECONDARY,
  },
  containerFlatList: {
    flex: 1,
    marginTop: 10,
    padding: 5,
    backgroundColor: cfg.SECONDARY,
    justifyContent:'center',
  },
  containerNoteFlatList: {
    flex: 0.2,
    alignItems:'center',
    justifyContent:'center',
    marginRight: 10,
  },
});
