import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage,
  Image, TouchableOpacity, TouchableHighlight, FlatList, ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-elements';
import { observer } from 'mobx-react';
import Moment from 'moment';

import Header from './../../global/header/Header';
import Loading from './../../global/loading/Loading';
import Store from './../../global/store/Store';

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
    fetch('http://51.38.187.216:9090/eleves/stats/bySession/' + this.props.navigation.getParam('idGame', '0'), {
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
        <Header navigation={this.props.navigation}/>
        <View style={styles.body}>

          <View style={{flex: 0.2, flexDirection:'row'}}>

            <View style={{flex: 0.2, justifyContent: 'center', paddingLeft: 6}}>
              <Icon
              raised
              onPress={()=>this.backAccordingId(this.state.idBack)}
              type='font-awesome'
              name='arrow-left'
              color='#FFF'
              containerStyle={{
                backgroundColor: '#363453',
              }}
              />
            </View>

            <View style={{flex: 0.6, alignItems:'center', justifyContent:'center'}}>
              <Text style={styles.primetextblue}>{this.state.Game.nameGame.toUpperCase()}</Text>
              <Text style={styles.subtextblue}>{this.state.Game.matiere}</Text>
              <Text style={styles.subtextblue}>{Moment(this.state.Game.date).locale('fr').format('DD/MM/YYYY HH:mm')}</Text>
              <Text style={styles.subtextblue}>Moyenne: {this.state.Game.moyenne.toFixed(2)}</Text>
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
                  backgroundColor: '#363453',
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
                  backgroundColor: '#363453',
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('StudentContainer', {idStudent: item.idEleve, idBack: '1', idGameType: this.state.Game.idMatiere})}
                style={[styles.containerFlatList]}>

                <View style={{flex: 0.8, paddingLeft: 10, justifyContent:'center'}}>
                    <Text style={styles.primetextwhite}>{item.nom.toUpperCase()}</Text>
                    <Text style={styles.subtextwhite}>{item.prenom}</Text>
                </View>

                <View style={[styles.containerNoteFlatList, this.setColorAccordingNote(item.note)]}>
                  <Text style={styles.primetextwhite}>{item.note}</Text>
                </View>

              </TouchableOpacity>
            }
            keyExtractor={item => item.idEleve.toString()}
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
  primetextblue: {
    fontSize: 20,
    color: '#363453',
    fontWeight:'bold'
  },
  subtextblue: {
    fontSize: 20,
    color: '#363453',
  },
  containerFlatList: {
    flex: 1,
    marginBottom: 6,
    padding: 5,
    backgroundColor: '#363453',
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
