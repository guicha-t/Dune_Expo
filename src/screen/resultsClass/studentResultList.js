import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage,
  Image, TouchableOpacity, TouchableHighlight, FlatList} from 'react-native';
import { observer } from 'mobx-react';
import Moment from 'moment';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';

@observer
export default class StudentResultList extends Component {
  constructor(props){
    super(props);
    this.state = {
      Student: [],
      StudentAlpha: [],
      StudentNote: [],
      NameGame: this.props.navigation.getParam('nameGame', 'Unknown'),
    }
  }

  componentDidMount() {
    fetch('http://176.31.252.134:7001/api/v1/eleves/stats/byGame/' + this.props.navigation.getParam('idGame', '0'), {
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
    })
    .catch((error) => {
      console.error(error);
    });
  }

  setAlpha() {
    this.setState({'Student':this.state.StudentAlpha})
  }

  setNote() {
    this.setState({'Student':this.state.StudentNote})
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
    return(
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation}/>
        <View style={styles.body}>

          <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}}>
            <Text style={styles.primetextblue}>{this.state.NameGame.toUpperCase()}</Text>
            <Text style={styles.primetextblue}>LISTE DES RÉSULTATS</Text>
          </View>

          <View style={{flex: 0.7}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.Student}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('StudentContainer', {idStudent: item.idEleve, idBack: '1',})}
                style={[styles.containerFlatList,this.setColorAccordingNote(item.note)]}>

                <View style={{flex: 0.5, paddingLeft: 10, justifyContent:'center'}}>
                    <Text style={styles.primetextwhite}>{item.nom.toUpperCase()}</Text>
                    <Text style={styles.primetextwhite}>{item.prenom}</Text>
                </View>

                <View style={{flex: 0.5, paddingRight: 10, alignItems:'flex-end', justifyContent:'center'}}>
                  <Text style={styles.primetextwhite}>{item.note}</Text>
                </View>

              </TouchableOpacity>
            }
            keyExtractor={item => item.idEleve.toString()}
            />
          </View>

          <View style={{flex: 0.1, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
            <Button
              title={'TRIER NOM'}
              style={styles.ButtonCo}
              color='#363453'
              onPress={() => this.setAlpha()}
              />
            <Button
              title={'RETOUR'}
              style={styles.ButtonCo}
              color='#363453'
              onPress={() => this.props.navigation.navigate('GameList')}
            />
            <Button
              title={'TRIER NOTE'}
              style={styles.ButtonCo}
              color='#363453'
              onPress={() => this.setNote()}
            />
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  containerFlatList: {
    flex: 1,
    marginBottom: 6,
    padding: 5,
    flexDirection:'row',
    justifyContent:'center',
  },
});
