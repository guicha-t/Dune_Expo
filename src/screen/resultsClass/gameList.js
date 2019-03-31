import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage,
  Image, TouchableOpacity, TouchableHighlight, FlatList, ActivityIndicator} from 'react-native';
import { observer } from 'mobx-react';
import Moment from 'moment';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';

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
    fetch('http://176.31.252.134:7001/api/v1/eleves/stats/byClasse/' + this.props.navigation.getParam('idClasse', '0'), {
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
          <View style={{flex: 1}}>
            <Header navigation={this.props.navigation}/>
            <View style={styles.loadingContainer}>
              <ActivityIndicator animating={true} />
            </View>
          </View>
        )
      }

    return(
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation}/>
        <View style={styles.body}>

          <View style={{flex: 0.1, alignItems:'center', justifyContent:'center'}}>
            <Text style={styles.primetextblue}>{this.state.labelClasse}</Text>
            <Text style={styles.primetextblue}>LISTE DES APPLICATIONS</Text>
          </View>

          <View style={{flex: 0.8}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.Games}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentResultList', {idGame: item.idGame, Game: item})} style={{flex: 1, backgroundColor: '#363453', marginBottom: 6, padding: 5, flexDirection:'row', justifyContent:'center'}}>

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
                    <Text style={styles.subtextwhite}>Moyenne: {item.moyenne}</Text>
                  </View>

                  <View style={{flex: 0.3}}>
                    <Text style={styles.subtextwhite}>{Moment(item.date).locale('fr').format('DD/MM/YYYY')}</Text>
                  </View>
                </View>

              </TouchableOpacity>
            }
            keyExtractor={item => item.idGame.toString()}
            />
          </View>

          <View style={{flex: 0.1, justifyContent:'center', alignItems:'center'}}>
            <Button
              title={'RETOUR'}
              style={styles.ButtonCo}
              color='#363453'
              onPress={() => this.props.navigation.navigate('ClassList')}
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
});
