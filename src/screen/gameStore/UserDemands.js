import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage, FlatList, SectionList} from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';

@observer
export default class UserDemands extends Component {
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
            {title: 'En attente', data: ['Puzzle']},
            {title: 'Accepté(s)', data: ['Candy Crush', 'Zelda']},
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
