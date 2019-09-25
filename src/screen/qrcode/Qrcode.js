import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AlertPro from "react-native-alert-pro";

import * as cfg from "./../../Config";
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


    handleBarCodeScanned = ({ type, data }) => {
          this.setState({ scanned: true });
          fetch(cfg.API_URL + '/cnxTable2/useToken', {
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
                if (responseJson.status == 200) {
                   this.AlertPro.open()
                }
                else {
                  Alert.alert('Token invalide')
                }
              })
              .catch((error) => {
                console.error(error);
              });
    };



    render() {
      const { hasCameraPermission, scanned } = this.state;

      if (hasCameraPermission === null) {
        return <Text>Demande d'autorisation de caméra</Text>;
      }
      if (hasCameraPermission === false) {
        return <Text>Pas d'accès à la caméra</Text>;
      }
      return (



      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>


          <AlertPro
            ref={ref => {
              this.AlertPro = ref;
            }}
            onConfirm={() => this.props.navigation.navigate('Dashboard')}
            showCancel={false}
            title="TABLE CONNECTÉE"
            message="Vous pouvez désormais utiliser les fonctionnalités de la table."
            textConfirm="Compris"
            closeOnPressMask={true}
            customStyles={{
              mask: {
                backgroundColor: "transparent"
              },
              container: {
                borderWidth: 1,
                borderColor: "#6ED528",
                shadowColor: "#000000",
                shadowOpacity: 0.1,
                shadowRadius: 10
              },
              buttonConfirm: {
                backgroundColor: "#6ED528"
              }
            }}
          />




          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />

          {scanned && (
            <Button title={'Cliquez pour scanner de nouveau'} onPress={() => this.setState({ scanned: false })} />
          )}


        <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={styles.bottomBar}>
          <Text style={styles.cancelButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
      );
    }
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
