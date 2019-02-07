import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage, FlatList, SectionList} from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';

@observer
export default class UserDemands extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.navigation.getParam('name', ''),
      lastname: this.props.navigation.getParam('lastname', ''),
      email: this.props.navigation.getParam('email', ''),
    }
  }

  _cancelEdit = async () => {
    this.props.navigation.navigate('Profil');
  };

  _confirmEdit = async () => {
    fetch('http://176.31.252.134:9001/api/v1/users/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUser: Store.IdUser,
        nomUser: this.state.lastname,
        prenomUser: this.state.name,
        emailUser: this.state.email,
        token: Store.Token,

      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          //Handle what you want
        })
        .catch((error) => {
          console.error(error);
        });
    this.props.navigation.navigate('Profil');
  };

  render() {
    return(

      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>

	<View style={{flex:0.4, alignItems: 'center', justifyContent:'center',}}>
          <Text style={{fontSize:20,}}>
             Mes demandes d'application
          </Text>
        </View>


      <View style={styles.containerList}>
        <SectionList
          sections={[
            {title: 'Récent(s)', data: ['Zelda : validé']},
            {title: 'Accepté(s)', data: ['Candy Crush', 'Puzzle', 'Zelda']},
            {title: 'Refusé(s)', data: ['Fallout 76']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>


    </View>
    );
  }
}

const styles = StyleSheet.create({


  containerList: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },


  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  input: {
    width: 220,
    height: 44,
    padding: 10,
    borderWidth: 0,
    borderColor: 'black',
    marginBottom: 10,
  },
  containerBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleInfo: {
    color: '#363453',
    fontWeight: 'bold',
    fontSize: 14,
  },
  containerFooter: {
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent:'space-around',
  },
});
