import React , {Component} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Picker} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Fumi } from 'react-native-textinput-effects';
import { FormLabel, FormInput, FormValidationMessage, Icon, Button } from 'react-native-elements';
import AlertPro from "react-native-alert-pro";

import Header from './../../global/header/Header';

export default class ContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      problem: '',
      pwdhide: true,
      opacity: 'eye',
      item:'',
    };
  }

render(){
return(

 <View style={{flex:1}}>
   <Header navigation={this.props.navigation}/>


          <View style={{flex: 0.4}}>

            <View style={{marginTop: 100, flex: 0.3, flexDirection: 'row'}}>
              <View style={{flex: 0.2}}></View>
              <View style={{flex: 0.6, alignItems: 'center', justifyContent:'flex-end'}}>
                <Fumi
                  label={'E-mail'}
                  style={{ width: 300, backgroundColor:'#FFF'}}
                  value={this.state.username}
                  onChangeText={(username) => this.setState({ username })}
                  iconClass={FontAwesomeIcon}
                  iconName={'at'}
                  iconColor={'#363453'}
                  labelStyle={{ color: '#363453' }}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  />
              </View>
              </View>
              <View style={{flex: 0.2}}></View>


              <View style={{marginTop: 80, flex: 0.3, flexDirection: 'row'}}>
                <View style={{flex: 0.2}}></View>
                  <View style={{flex: 0.6,  alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{fontWeight: 'bold', color:'#363453'}}>Votre problème est lié à...</Text>
                    <Picker selectedValue={this.state.item} style={{ height: 50, width: 155 }} onValueChange={(itemValue, itemIndex) => this.setState({item: itemValue})}>
                      <Picker.Item label='Un jeu' value='JEU' />
                      <Picker.Item label='La table' value='TABLE' />
                      <Picker.Item label='Application mobile' value='MOBILE' />
                  </Picker>
               </View>
              </View>
              <View style={{flex: 0.2}}></View>



              <View style={{marginTop:80, flex: 0.3, flexDirection:'row'}}>
                <View style={{flex: 0.2}}></View>
                  <View style={{flex: 0.6,  alignItems: 'center', justifyContent:'center'}}>
                    <Fumi
                      label={'Problème détaillé'}
                      style={{ width: 300, backgroundColor:'#FFF'}}
                      value={this.state.problem}
                      onChangeText={(problem) => this.setState({ problem })}
                      iconClass={FontAwesomeIcon}
                      iconName={'italic'}
                      iconColor={'#363453'}
                      labelStyle={{ color: '#363453' }}
                      iconSize={20}
                      iconWidth={40}
                      inputPadding={16}
                      />
                  </View>
              </View>

            <View style={{marginTop: 70, flex: 0.2, flexDirection:'row', justifyContent:'center'}}>

              <Button
                title=""
                icon={{
                 type: 'font-awesome',
                 name: 'paper-plane',
                 size: 15,
                 color: 'white',
               }}
                buttonStyle={{
                  backgroundColor: '#363453',
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 30,
                  width: 80,
                  height:60,
                  alignItems:'center',
                  paddingLeft: 20,
                }}
                containerStyle={{ marginVertical: 10, marginLeft: 40, height: 50, width: 250 }}
                titleStyle={{ fontWeight: 'bold' }}
              />
            </View>


          </View>

 </View>

 );

}

}


const styles = {

  container:{
    alignItems: 'center'
  },

}