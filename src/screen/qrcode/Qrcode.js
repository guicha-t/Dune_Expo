import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'

export default class App extends Component {




















    state = {
      hasCameraPermission: null,
      scanned: false,
    };

    async componentDidMount() {
      this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    };

    render() {
      const { hasCameraPermission, scanned } = this.state;

      if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }
      return (



      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>

          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />

          {scanned && (
            <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
          )}


        <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={styles.bottomBar}>
          <Text style={styles.cancelButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
      );
    }

    handleBarCodeScanned = ({ type, data }) => {
          this.setState({ scanned: true });
          fetch('http://51.38.187.216:9090/cnxTable2/useToken', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              token: Store.Token,
            },
            body: JSON.stringify({
              tokenTable: data,
            }),
          }).then((response) => response.json())
              .then((responseJson) => {
               Alert.alert('lol')

                if (responseJson.status == 200) {
      	           this.props.navigation.navigate('Profil')
                   Alert.alert('Table connectée')
                }
                else {
                  Alert.alert('ça marche pas')
                }
              })
              .catch((error) => {
                console.error(error);
              });
    };











}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});
