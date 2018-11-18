import React, { Component } from 'react';
import {StyleSheet, Text, View, Menu, Platform, Image, Button, FlatList, TouchableOpacity} from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerMenu}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image source={require('./../../picture/header/openDrawer.png')} style={{width:24, height:24}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.containerLogo}>
          <Image
            style={{flex: 1, height: undefined, width: undefined}}
            source={require('./../../picture/header/dunelogo.png')}
            resizeMode="contain"
            />
        </View>

        <View style={styles.containerProfil}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profil')}>
            <Image
              style={{height: 32, width: 32}}
              source={require('./../../picture/header/profil.png')}
              resizeMode="contain"
              />
          </TouchableOpacity>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#FEE599',
    borderBottomColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  containerMenu: {
    paddingLeft: 10,
  },
  containerLogo: {
    flex: 1,
  },
  containerProfil: {
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
});
