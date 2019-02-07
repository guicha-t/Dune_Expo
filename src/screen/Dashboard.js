import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet, AsyncStorage, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Header from './../global/header/Header';
import Store from './../global/store/Store'

@observer
export default class Dashboard extends Component {
  state = {
    Id: '',
    Token: '',
    Type: '',
  }

  componentDidMount() {
    AsyncStorage.getItem('localId').then((value) => this.setState({ 'Id': value }))
    AsyncStorage.getItem('localToken').then((value) => this.setState({ 'Token': value }))
    AsyncStorage.getItem('localType').then((value) => this.setState({ 'Type': value }))
  }

  render() {
    return(

      <View style={{flex:1}}>
        <Header navigation={this.props.navigation}/>


          <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('UserDemands')}>
              <Image style={{width:50, height:50}} source={{uri: 'https://user-images.githubusercontent.com/3471415/31066487-f29af78e-a76a-11e7-90c1-2f01642294d7.gif'}} />
	    </TouchableHighlight>
            <Text style={{fontWeight:'bold'}}>Demande(s) traitée(s)</Text>
          </View>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Local Id: {this.state.Id}</Text>
          <Text>Mobx Id: {Store.IdUser}</Text>

          <Text>Local Type: {this.state.Type}</Text>
          <Text>Mobx Type: {Store.TypeUser}</Text>

          <Text>Local Token: {this.state.Token}</Text>
          <Text>Mobx Token: {Store.Token}</Text>

        </View>
      </View>
    );
  }
}
