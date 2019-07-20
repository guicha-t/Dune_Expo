import React , {Component} from 'react';
import {Icon, Text, Button, View, Container, Content, Form, Item, Input, Label, Picker } from 'native-base';

import Header from './../../global/header/Header';

export default class ContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
    loading: true,
    selected2: undefined
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

render(){
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <View style={{flex:1}}>
      <Container>
         <Header navigation={this.props.navigation}/>
         <Text style={styles.title}>Nous contacter</Text>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nom</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Prénom</Label>
              <Input />
            </Item>
            <Item picker style={{marginTop:30}}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Choisissez votre type de problème..." value="key0" />
                <Picker.Item label="Problème matériel lié à la table" value="key1" />
                <Picker.Item label="Problème logiciel lié à la table" value="key2" />
                <Picker.Item label="Problème lié à mon abonnement" value="key3" />
                <Picker.Item label="Problème lié à un jeu" value="key4" />
                <Picker.Item label="Problème de connexion (compte)" value="key5" />
              </Picker>
            </Item>
            <Item regular style={{marginTop:30}}>
              <Input placeholder='Décrivez votre problème...' />
            </Item>
          </Form>
          <View style={{marginTop:50, flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Button block >
              <Text>Envoyer</Text>
            </Button>
          </View>
        </Content>
      </Container>
      </View>
    )
}


}

const styles = {
  title: {
      marginTop: 20,
      fontSize: 22,
      alignSelf: 'center'
  },
  button:{
      backgroundColor: '#136AC7',
      borderRadius: 5,
      padding: 10
  },
  buttonLabel:{
      fontSize: 14,
      color: '#FFF',
      alignSelf: 'center'
  }
}