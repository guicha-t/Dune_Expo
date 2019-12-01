import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage,
  Image, TouchableOpacity, TouchableHighlight, FlatList, ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-elements';

import { observer } from 'mobx-react';
import Moment from 'moment';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';
import Loading from './../../global/loading/Loading';
import * as cfg from "./../../Config";


@observer
export default class GameList extends Component {
  constructor(props){
    super(props);
    this.state = {
      Games: [],
      idClasse: this.props.navigation.getParam('idClasse', '0'),
      labelClasse: this.props.navigation.getParam('labelClasse', 'Unknown'),
      loading: true,
    }
  }

  componentDidMount() {
    fetch(cfg.API_URL + '/eleves/stats/byClasse/' + this.props.navigation.getParam('idClasse', '0'), {
      method: 'GET',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        token: Store.Token,
        idClasse: this.props.navigation.getParam('idClasse', '0'),
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({'Games':responseJson.response})
      this.setState({'loading':false})
    })
    .catch((error) => {
      console.error(error);
    });
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
        <Header navigation={this.props.navigation} colorTheme={"#b1ebf6"}/>
        <View style={[styles.body, {backgroundColor: Store.Back}]}>

          <View style={{flex: 0.1, flexDirection: 'row'}}>
            <View style={{flex: 0.2, justifyContent:'center', paddingLeft: 6}}>
              <Icon
              raised
              onPress={()=>this.props.navigation.navigate('ClassList')}
              type='font-awesome'
              name='arrow-left'
              color='#FFF'
              containerStyle={{
                backgroundColor: cfg.SECONDARY,
              }}
              />

            </View>

            <View style={{flex: 0.6, justifyContent:'center', alignItems:'center'}}>
              <Text style={[styles.primetextblue, {color: Store.Text2}]}>{this.state.labelClasse}</Text>
              <Text style={[styles.primetextblue, {color: Store.Text2}]}>HISTORIQUE</Text>
            </View>

            <View style={{flex: 0.2}}>
            </View>
          </View>


          <View style={{flex: 0.9}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.Games}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('StudentResultList', {idGame: item.idGP, Game: item, idBack: '0'})}
                style={{flex: 1, backgroundColor: cfg.SECONDARY, marginBottom: 6, padding: 5, flexDirection:'row', justifyContent:'center'}}>

                <View style={{flex: 0.5, paddingLeft: 10}}>
                  <View style={{flex: 0.5, justifyContent:'center'}}>
                    <Text style={styles.primetextwhite}>{item.nameGame.toUpperCase()}</Text>
                  </View>
                  <View style={{flex: 0.5, justifyContent:'center'}}>
                    <Text style={styles.subtextwhite}>{item.matiere}</Text>
                  </View>
                </View>

                <View style={{flex: 0.5, paddingRight: 10, alignItems:'flex-end'}}>
                  <View style={{flex: 0.3}}>
                    <Text style={styles.subtextwhite}>Participant{this.addplural(item.nbJoueurs)}: {item.nbJoueurs}</Text>
                  </View>

                  <View style={{flex: 0.4}}>
                    <Text style={styles.subtextwhite}>Moyenne: {item.moyenne.toFixed(2)}</Text>
                  </View>

                  <View style={{flex: 0.3}}>
                    <Text style={styles.subtextwhite}>{Moment(item.date).locale('fr').format('DD/MM/YYYY')}</Text>
                  </View>
                </View>

              </TouchableOpacity>
            }
            keyExtractor={item => item.idGP.toString()}
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
    fontSize: 16,
    color: '#FFF',
  },
  primetextblue: {
    fontSize: 20,
    color: cfg.SECONDARY,
    fontWeight:'bold'
  },
});
