import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage,
  Image, TouchableOpacity, TouchableHighlight, FlatList, ActivityIndicator} from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Loading from './../../global/loading/Loading';
import Store from './../../global/store/Store';
import * as cfg from "./../../Config";

@observer
export default class ClassList extends Component {
  constructor(props){
    super(props);
    this.state = {
      Classes: [],
      loading: true,
    }
  }

  componentDidMount() {
    fetch(cfg.API_URL + '/classes/profs', {
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
  }

  displayClassLabel(param) {
      if (param.level === 1) {
          return <Text style={styles.textClass}>PS - {param.num}</Text>;
      } else if (param.level === 2){
          return <Text style={styles.textClass}>MS - {param.num}</Text>;
      } else if (param.level === 3){
          return <Text style={styles.textClass}>GS - {param.num} </Text>;
      } else if (param.level === 4){
          return <Text style={styles.textClass}>CP - {param.num}</Text>;
      } else if (param.level === 5){
          return <Text style={styles.textClass}>CE1 - {param.num}</Text>;
      } else if (param.level === 6){
          return <Text style={styles.textClass}>CE2 - {param.num}</Text>;
      } else if (param.level === 7){
          return <Text style={styles.textClass}>CM1 - {param.num}</Text>;
      } else if (param.level === 8){
          return <Text style={styles.textClass}>CM2 - {param.num} </Text>;
      } else if (param.level === 9){
          return <Text style={styles.textClass}>'6e' - {param.num} </Text>;
      } else if (param.level === 10){
          return <Text style={styles.textClass}>'5e' - {param.num}</Text>;
      } else if (param.level === 11){
          return <Text style={styles.textClass}>'4e' - {param.num}</Text>;
      } else if (param.level === 12){
          return <Text style={styles.textClass}>'3e' - {param.num}</Text>;
      } else {
          return <Text style={styles.textClass}>Autre </Text>;
      }
  }

  addplural(param) {
      if (param === '') {
          return;
      } if (param === 0) {
          return;
      } if (param === 1) {
          return;
      } else {
          return <Text>s</Text>;
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

          <View style={{flex: 0.1, flexDirection: 'row'}}>

            <View style={{flex: 0.2, justifyContent:'center', paddingLeft: 6}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                <Image source={require('./../../picture/global/back.png')} style={{width:30, height: 30}}/>
              </TouchableOpacity>
            </View>

            <View style={{flex: 0.6, justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.primetextblue}>LISTE DES CLASSES</Text>
            </View>
            <View style={{flex: 0.2}}>

            </View>


          </View>

          <View style={{flex: 0.9}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.Classes}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('GameList', {idClasse: item.idClasse, labelClasse:this.displayClassLabel(item)})}
                style={{flex: 1, backgroundColor: '#363453', marginBottom: 6, padding: 5, flexDirection:'row', justifyContent:'center'}}>
                <View style={{flex: 1, paddingLeft: 10, flexDirection: 'row'}}>
                  <Text style={styles.primetextwhite}>{this.displayClassLabel(item)}</Text>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={item => item.idClasse.toString()}
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
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#F9F9F9',
  },
  body: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 4,
  },
  primetextwhite: {
    fontSize: 40,
    color: '#FFF',
  },
  primetextblue: {
    fontSize: 20,
    color: '#363453',
    fontWeight: 'bold'
  },
  subtextwhite: {
    fontSize: 18,
    color: '#FFF',
  },
});
