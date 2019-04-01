import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store';

@observer
export default class Dashboard extends Component {
  render() {
    return(
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation}/>
        <View style={styles.loadingContainer}>
          <BarIndicator color='#363453'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
