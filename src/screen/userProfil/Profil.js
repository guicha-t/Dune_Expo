import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet,
  ScrollView, Image, TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native';
import { observer } from 'mobx-react';

import Header from './../../global/header/Header';
import Store from './../../global/store/Store'

@observer
export default class Profil extends Component {
  constructor(props){
    super(props);
    this.state = {
      Profil: [],
      loading: true,
    }
  }

  componentDidMount(){
    fetch('http://176.31.252.134:7001/api/v1/users/infos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: Store.Token,
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({'Profil':JSON.parse(JSON.stringify(responseJson.response[0]))})
          this.setState({'loading':false})
        })
        .catch((error) => {
          console.error(error);
        });
    }

    _goToEditProfil = async () => {
      this.props.navigation.navigate('EditProfilInfo', {
        id: this.state.Profil.idUser,
        name: this.state.Profil.prenomUser,
        lastname: this.state.Profil.nomUser,
      });
    };

    _disconnect = async () => {
      await AsyncStorage.clear();
      Store.setToken('')
      Store.setTypeUser('')
      Store.setIsLog(false)
      this.props.navigation.navigate('Loading');
    };

    displayTypeLabel(param) {
        if (param.typeUser === 1) {
            return <Text style={styles.title}> Professeur</Text>;
        } else if (param.typeUser === 2){
            return <Text style={styles.title}> Directeur</Text>;
        } else {
            return <Text style={styles.title}> Poste inconnu </Text>;
        }
    }


  render() {

    if (this.state.loading) {
        return (
          <View style={{flex:1}}>
            <Header navigation={this.props.navigation}/>
            <View style={styles.loadingContainer}>
              <ActivityIndicator animating={true} />
            </View>
          </View>
        )
      }
      

    return(
      <View style={{flex:1, backgroundColor: '#fff'}}>
        <Header navigation={this.props.navigation}/>

        <View style={styles.topBodyPicture}>
          <Image
            style={styles.profilPicture}
            source={{uri: 'http://176.31.252.134:7001/files/profs/' + this.state.Profil.picPath}}
            resizeMode="contain"
            />
            <Text style={styles.title}>{this.state.Profil.prenomUser} {this.state.Profil.nomUser}</Text>
            {this.displayTypeLabel(this.state.Profil)}
            <Text style={styles.subtitle}>{this.state.Profil.emailUser}</Text>
        </View>

        <View style={styles.bodyInfo}>
          <View style={{paddingBottom: 10}}>
            <Button
              title={'Modifier les informations'}
              style={styles.ButtonCo}
              color='#363453'
              onPress={this._goToEditProfil}
            />
          </View>

          <View style={{paddingBottom: 10}}>
            <Button
              title={'Modifier l \' E-mail'}
              style={styles.ButtonCo}
              color='#363453'
              onPress={() => this.props.navigation.navigate('EditEmailUser')}
            />
          </View>

          <View style={{paddingBottom: 10}}>
            <Button
              title={'Modifier le mot de passe'}
              style={styles.ButtonCo}
              color='#363453'
              onPress={() => this.props.navigation.navigate('EditPassUser')}
            />
          </View>

          <View style={{}}>
            <Button
              title={'Déconnexion'}
              style={styles.ButtonCo}
              color='#363453'
              onPress={this._disconnect}
            />
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBodyPicture: {
    flex: 0.5,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilPicture: {
    height: 120,
    width: 120,
    marginBottom: 10,
    borderRadius: 200,
  },
  bodyInfo: {
    flex: 1,
    justifyContent:'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 18,
  },
});
