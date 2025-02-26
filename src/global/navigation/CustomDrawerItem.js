import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ScrollView, Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native';

import Store from './../store/Store'
import * as cfg from "./../../Config";

export default class CustomDrawerItems extends Component {

  RenderElement(){
   if(Store.TypeUser == 2)
        return <TouchableOpacity onPress={() => this.props.navigation.navigate('AddUserDirector')}>
          <View style={styles.button}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Ajouter un professeur</Text>
            </View>
          </View>
        </TouchableOpacity>;
   return null;
  }

  RenderNotification(){
    if (Store.TypeUser == 2){
      return(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('UserDemands')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Notifications</Text>
              </View>
            </View>
          </TouchableOpacity>
      );
    }

  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>

        <View style={{height: 40, borderBottomWidth: 1, borderColor: 'white', justifyContent:'flex-end', alignItems: 'flex-end',paddingRight: 20, opacity:0.5}}>
          <Text style={{color: 'white', fontSize:16, fontWeight:'bold',}}>
            ACCUEIL
          </Text>
        </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Dashboard</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={{height: 40, borderBottomWidth: 1, borderColor: 'white', justifyContent:'flex-end', alignItems: 'flex-end',paddingRight: 20, opacity:0.5}}>
            <Text style={{color: 'white', fontSize:16, fontWeight:'bold',}}>
              STATISTIQUES
            </Text>
          </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('ClassList')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Historique</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentList')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Trombinoscope</Text>
              </View>
            </View>
          </TouchableOpacity>



          <View style={{height: 40, borderBottomWidth: 1, borderColor: 'white', justifyContent:'flex-end', alignItems: 'flex-end',paddingRight: 20, opacity:0.5}}>
            <Text style={{color: 'white', fontSize:16, fontWeight:'bold',}}>
              APPLICATIONS
            </Text>
          </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('GamesList')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Logithèque</Text>
              </View>
            </View>
          </TouchableOpacity>

          {this.RenderNotification()}

          <View style={{height: 40, borderBottomWidth: 1, borderColor: 'white', justifyContent:'flex-end', alignItems: 'flex-end',paddingRight: 20, opacity:0.5}}>
            <Text style={{color: 'white', fontSize:16, fontWeight:'bold',}}>
              TABLE
            </Text>
          </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('QRCode')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Scan QR-Code</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={{height: 40, borderBottomWidth: 1, borderColor: 'white', justifyContent:'flex-end', alignItems: 'flex-end',paddingRight: 20, opacity:0.5}}>
            <Text style={{color: 'white', fontSize:16, fontWeight:'bold'}}>
              DIVERS
            </Text>
          </View>

          {this.RenderElement() }

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profil')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Profil</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('TermsOfUse')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>CGU</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactForm')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Nous contacter</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('UserManual')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Guide d'utilisation</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={{height: 40}}>
          </View>

        </ScrollView>
      </View>
    );
  }
}

CustomDrawerItems.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
    button: {
      flexDirection: 'row',
      height: 42,
    },
    icon: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    labelContainer: {
      flex: 0.6,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 20,
      paddingTop: 5,
    },
    label: {
      color:'white',
      fontSize: 16,
      fontWeight:'bold',
    },

});
