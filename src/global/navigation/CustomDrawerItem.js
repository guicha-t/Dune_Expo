import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ScrollView, Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Store from './../store/Store'

export default class CustomDrawerItems extends Component {

  renderElement(){
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

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Loading')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Loading</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Start')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Start</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Dashboard</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentList')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Liste des élèves</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('GamesList')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Store</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('UserDemands')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Mes demandes</Text>
              </View>
            </View>
          </TouchableOpacity>


          {this.renderElement() }

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profil')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Profil</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('QRCode')}>
            <View style={styles.button}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>QR-Code</Text>
              </View>
            </View>
          </TouchableOpacity>


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
      flex: 1
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
      color:'#363453',
      fontSize: 16,
    },

});
