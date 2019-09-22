import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image, I18nManager } from 'react-native';
import { LinearGradient } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';

I18nManager.forceRTL(false);

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

const slides = [
  {
    key: 'help1',
    image: require('./../../picture/userManual/DB_Notif.png'),
  },
  {
    key: 'help2',
    image: require('./../../picture/userManual/DB_Historique.png'),
  },
  {
    key: 'help3',
    image: require('./../../picture/userManual/DB_Trombi.png'),
  },
  {
    key: 'help4',
    image: require('./../../picture/userManual/DB_Store.png'),
  },
  {
    key: 'help5',
    image: require('./../../picture/userManual/DB_QRCode.png'),
  },
  {
    key: 'help6',
    image: require('./../../picture/userManual/DB_User.png'),
  },


];

export default class UserManual extends React.Component {

  _renderItem = ({ item, dimensions }) => (
    <View style={{flex: 1, backgroundColor: '#404040'}}>
      <Image style={{flex: 1, height: undefined, width: undefined}} resizeMode="contain" source={item.image}/>
    </View>
  );

  _onDone = () => {
      this.props.navigation.navigate('Dashboard')
    };

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        onDone={this._onDone}
        bottomButton
        doneLabel='Fin'
        nextLabel='Suivant'
      />
    );
  }
}
