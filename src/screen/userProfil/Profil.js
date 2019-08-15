import React, { Component } from 'react';
import { Alert, TextInput, View, Text, StyleSheet,
  ScrollView, Image, TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native';
import { observer } from 'mobx-react';
import { Avatar, Button, Icon } from 'react-native-elements';


import Loading from './../../global/loading/Loading';
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
    fetch('http://51.38.187.216:9090/users/infos', {
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
            return <Text style={styles.subtitle}>Professeur</Text>;
        } else if (param.typeUser === 2){
            return <Text style={styles.subtitle}>Directeur</Text>;
        } else {
            return <Text style={styles.subtitle}>Poste non renseigné</Text>;
        }
    }


  render() {

    if (this.state.loading) {
        return (
          <Loading navigation={this.props.navigation}/>
        )
      }


    return(
      <View style={{flex:1, backgroundColor: '#fff'}}>
        <Header navigation={this.props.navigation}/>

        <View style={{flex: 0.3, alignItems:'center', justifyContent:'center'}}>
          <Avatar
            rounded
            xlarge
            source={{
              uri: 'http://51.38.187.216:9090/files/profs/' + this.state.Profil.picPath
            }}
            />
        </View>

        <View style={{flex: 0.6}}>

          <View style={{flex: 0.2, flexDirection:'row'}}>
            <View style={{flex: 0.3, justifyContent:'center', alignItems:'flex-end'}}>
              <Icon
              raised
              type='font-awesome'
              name='id-card'
              color='#FFF'
              containerStyle={{
                backgroundColor: '#363453',
              }}
              />
            </View>
            <View style={{flex: 0.7, justifyContent:'center', paddingLeft: 20}}>
              <Text style={styles.subtitle}>{this.state.Profil.prenomUser} {this.state.Profil.nomUser}</Text>
            </View>
          </View>

          <View style={{flex: 0.2, flexDirection:'row'}}>
            <View style={{flex: 0.3, justifyContent:'center', alignItems:'flex-end'}}>
              <Icon
              raised
              type='font-awesome'
              name='briefcase'
              color='#FFF'
              containerStyle={{
                backgroundColor: '#363453',
              }}
              />
            </View>
            <View style={{flex: 0.7, justifyContent:'center', paddingLeft: 20}}>
              {this.displayTypeLabel(this.state.Profil)}
            </View>

          </View>


          <View style={{flex: 0.2, flexDirection:'row'}}>
            <View style={{flex: 0.3, justifyContent:'center', alignItems:'flex-end'}}>
              <Icon
              raised
              type='font-awesome'
              name='at'
              color='#FFF'
              containerStyle={{
                backgroundColor: '#363453',
              }}
              />
            </View>
            <View style={{flex: 0.7, justifyContent:'center', paddingLeft: 20}}>
              <Text style={styles.subtitle}>{this.state.Profil.emailUser}</Text>
            </View>

          </View>
          <View style={{flex: 0.4}}></View>
        </View>

        <View style={{flex: 0.1, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>

          <Button
            title=""
            onPress={()=>this.props.navigation.navigate('Dashboard')}
            icon={{
             type: 'font-awesome',
             name: 'arrow-left',
             size: 15,
             color: 'white',
           }}
            buttonStyle={{
              backgroundColor: '#363453',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
              width: 60,
              paddingLeft: 20,
            }}
            containerStyle={{ height: 50, width: 250 }}
            titleStyle={{ fontWeight: 'bold' }}
          />

          <Button
            title=""
            onPress={this._goToEditProfil}
            icon={{
             type: 'font-awesome',
             name: 'mouse-pointer',
             size: 15,
             color: 'white',
           }}
            buttonStyle={{
              backgroundColor: '#363453',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 0,
              width: 60,
              paddingLeft: 20,
            }}
            containerStyle={{ height: 50, width: 250 }}
            titleStyle={{ fontWeight: 'bold' }}
          />

          <Button
            title=""
            onPress={this._disconnect}
            icon={{
             type: 'font-awesome',
             name: 'sign-out',
             size: 15,
             color: 'white',
           }}
            buttonStyle={{
              backgroundColor: '#ea4335',
              borderWidth: 1,
              borderColor: '#363453',
              borderRadius: 30,
              width: 60,
              paddingLeft: 20,
            }}
            containerStyle={{ height: 50, width: 250 }}
            titleStyle={{ fontWeight: 'bold' }}
          />

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBodyPicture: {
  },
  profilPicture: {
    flex: 1,
    marginBottom: 10,
  },
  bodyInfo: {
    flex: 0.4,
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
