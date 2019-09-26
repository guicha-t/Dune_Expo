import React , {Component} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';

import Header from './../../global/header/Header';


const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

class TermsAndConditions extends Component{

  state = {
      accepted: false
  }

_tosAcceptation = async loginKey => {
  await AsyncStorage.setItem('firstLogin', '1')
  this.props.navigation.navigate('UserManual')
};

  render(){
    return (
      <View style={{flex:1, backgroundColor: "#F5FCFF"}}>
         <Header navigation={this.props.navigation}/>

             <View style={styles.container}>
                    <ScrollView
                    style={styles.tcContainer}
                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                          this.setState({
                              accepted: true
                          })
                        }
                      }}
                    >
                    <Text style={styles.title}>Conditions générales d'utilisation</Text>
                        <Text style={styles.tcP}>Bienvenue sur notre application. Si vous continuez à naviguer et à utiliser cette application, vous acceptez de respecter et d'être lié par les conditions d'utilisation suivantes, qui, avec notre politique de confidentialité, régissent la relation de Dune avec vous relativement à cette application. Si vous n'êtes pas d'accord avec une partie quelconque de ces termes et conditions, veuillez ne pas utiliser notre application.</Text>
                        <Text style={styles.tcP}>Les termes " Dune " ou " nous " ou désignent le propriétaire du site Web dont le siège social est [adresse]. Le numéro d'enregistrement de notre société est [numéro d'enregistrement de la société et lieu d'enregistrement]</Text>
                            <Text style={styles.tcL}>{'\u2022'} Application: désigne les applications développées par la Société Dune pour faire fonctionner les Services sur des téléphones mobiles, notamment les systèmes d’exploitation iPhone et Android.</Text>
                            <Text style={styles.tcL}>{'\u2022'} Formulaire: désigne la procédure qui permet à l’Utilisateur de fournir les informations demandées par l’application.</Text>
                            <Text style={styles.tcL}>{'\u2022'} Contenus: désigne l’ensemble des éléments qu’un Utilisateur peut retrouver sur l’application.</Text>
                            <Text style={styles.tcL}>{'\u2022'} Services: désigne les services fournis à l’Utilisateur par Dune tels que décrits à l’article « 2 »</Text>
                            <Text style={styles.tcL}>{'\u2022'} Utilisateur: toute personne physique qui a utilisé et exploité l’application.</Text>
                            <Text style={styles.tcL}>{'\u2022'} Les présentes Conditions Générales d'Utilisation ont pour objet de définir les relations contractuelles entre tout Utilisateur et la société Dune.</Text>
                            <Text style={styles.tcL}>{'\u2022'} L’acceptation des Conditions Générales d’Utilisation par tout Utilisateur est un préalable indispensable et obligatoire à toute utilisation des Services par un Utilisateur. L'Utilisateur reconnaît expressément qu’il a pris connaissance et accepté les présentes Conditions Générales d’Utilisation.</Text>
                            <Text style={styles.tcL}>{'\u2022'} La société Dune se réserve le droit d’apporter des modifications aux Conditions Générales d'Utilisation et/ou des Services. Toute modification entre en vigueur à compter de sa date de mise en ligne.</Text>

                            <Text style={styles.tcP}>{'\u2022'} 1.Objet</Text>
                            <Text style={styles.tcL}>{'\u2022'} 1.Dune propose aux utilisateurs, via une Application Mobile, un service complémentaire à la table Dune qui permet de jouir de différentes fonctionnalités liées à cette dernière.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 2.Les présentes Conditions Générales d'Utilisation (ci-après dénommées « les Conditions ») sont destinées à régir les relations entre Dune, exploitant l’application et de toutes ses déclinaisons (ci-après dénommé « le Service ») et l’utilisateur (ci-après dénommé « l'Utilisateur »).</Text>
                            <Text style={styles.tcL}>{'\u2022'} 3.Tout accès et/ou utilisation de l’Application suppose l'acceptation et le respect de l'ensemble des termes des présentes Conditions et leur acceptation inconditionnelle.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 4.À partir des documents transmis, l’Utilisateur accepte d’être contacté par les services de Dune afin de lui voir proposer une optimisation de l’abonnement transmis. Cette mise en relation est gratuite et n’entraîne aucune obligation de souscription ou d’abonnement.</Text>

                            <Text style={styles.tcP}>{'\u2022'} 2.Accès au Service</Text>
                            <Text style={styles.tcL}>{'\u2022'} 1.Le Service est accessible dans le cadre d'un usage privé, à toute personne majeure et domiciliée en France métropolitaine.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 2.L’usage du Service, qui emporte acceptation des présentes Conditions Générales d’Utilisation, se fait via les applications disponibles via les plate-formes de téléchargement mobiles telles que AppStore ou PlayStore.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 3.Hors les cas de force majeure, Dune s’engage, dans le cadre d’une obligation de moyens, à assurer la disponibilité et l’accessibilité aux Services. Les Services sont disponibles 24h/24 et 7j/7 hormis les périodes d’interruption nécessaires à la mise à jour de l’Application.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 4.Dune se réserve la possibilité d'interrompre, de suspendre momentanément ou de modifier sans préavis l'accès à tout ou partie du Service sans que l'interruption ou la modification n'ouvre droit à aucune obligation ni indemnisation.</Text>

                            <Text style={styles.tcP}>{'\u2022'} 3.Données personnelles</Text>
                            <Text style={styles.tcL}>{'\u2022'} 1.Déclaration du fichier CNIL : n°1593044. Le destinataire exclusif des données est Dune.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 2.Les informations collectées lors de l’utilisation d'un ou plusieurs services proposés par Dune font l'objet d'un traitement informatique destiné à analyser les comportements de l’Utilisateur dans l'objectif de lui proposer un service optimal.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 3.Conformément à la loi « informatique et libertés » du 6 Janvier 1978 modifiée en 2004, vous bénéficiez d'un droit d'accès et de rectification aux informations qui vous concernent. Vous pouvez exercer ce droit par simple demande écrite à Dune – 44 Avenue de la République, 33200, Bordeaux CEDEX. L'annulation sera effective dans un délai de 5 jours ouvrés à réception de votre demande. Vous pouvez également, pour des motifs légitimes, vous opposer au traitement des données vous concernant en adressant votre demande écrite à l'adresse indiquée ci-dessus.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 4.L'accès à certaines sections ainsi que le bon fonctionnement du Service nécessite la transmission de documents ainsi que l'utilisation et le remplissage de formulaires. Ces données, que l'Utilisateur choisit librement de communiquer à Dune sont des éléments d’ordre personnel et confidentiel. Il appartient à l'Utilisateur de prendre toutes les dispositions nécessaires permettant de protéger ses propres données contre toute atteinte.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 5.Les données transmises par l’Utilisateur sont destinées à l’usage exclusif de Dune. Dune garantit la confidentialité des données à caractère personnel recueillies, qui ne peuvent faire l’objet d’aucune cession à des tiers même à titre gracieux.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 6.L’Utilisateur donne son consentement explicite à l'utilisation des données à caractère personnel le concernant, collectées sur l’Application, dans le cadre exclusif du bon fonctionnement des services.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 7.L’Utilisateur est susceptible de recevoir des notifications de la part de Dune via l’application Dune. La réception de ces notifications est librement paramétrable via le menu d’accueil de son terminal mobile.</Text>

                            <Text style={styles.tcP}>{'\u2022'} 4.Limites de responsabilité</Text>
                            <Text style={styles.tcL}>{'\u2022'} 1.Dans le cadre de sa mission d'information, Dune ne peut être tenu responsable de la non exactitude d'une information. Tout Utilisateur détectant une erreur peut la signaler par courrier électronique à l'adresse Dune@hotmail.fr.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 2.L'utilisateur admet connaître les limitations et contraintes propres au réseau internet et, à ce titre, reconnaît notamment l'impossibilité d'une garantie totale de la sécurisation des échanges de données. Dune ne pourra pas être tenue responsable des préjudices découlant de la transmission de toute information.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 3.Dune ne pourra en aucun cas, dans la limite du droit applicable, être tenue responsable des dommages et/ou préjudices, directs ou indirects, matériels ou immatériels, ou de quelque nature que ce soit, résultant d'une indisponibilité du Service ou de toute utilisation du Service. Le terme « Utilisation » doit être entendu au sens large, c'est-à-dire tout usage de l’application quel qu'il soit, licite ou non.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 4.L'Utilisateur s'engage, d'une manière générale, à respecter l'ensemble de la réglementation en vigueur en France.</Text>

                            <Text style={styles.tcP}>{'\u2022'} 5.Réclamation</Text>
                            <Text style={styles.tcL}>{'\u2022'} Pour toute réclamation	concernant les	informations fournies sur l’Application, Dune met à disposition de tout Utilisateur un formulaire de contact accessible depuis le Site www.Dune.fr conformément	aux dispositions de l’article 6-I-5 de la LCEN auprès du service client.</Text>

                            <Text style={styles.tcP}>{'\u2022'} 6.Droit applicable et juridiction compètente</Text>
                            <Text style={styles.tcL}>{'\u2022'} 1.Le Service se réserve le droit de modifier les termes, conditions et mentions du présent contrat à tout moment.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 2.Le présent contrat est conclu pour une durée indéterminée à compter de l'Utilisation du Service par l'Utilisateur.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 3.Les règles en matière de droit, applicables aux contenus et aux transmissions de données sur et autour de l’application, sont déterminées par la loi française. En cas de litige, n'ayant pu faire l'objet d'un accord à l'amiable, seuls les tribunaux français sont compétents.</Text>

                            <Text style={styles.tcP}>{'\u2022'} 7.Propriété intellectuelle</Text>
                            <Text style={styles.tcL}>{'\u2022'} 1.©Dune, tous droits réservés. La reproduction du contenu de cette application, en tout ou partie, est strictement interdite sans la permission écrite de Dune. Tout autre matériel contenu sur cette application ne nous appartenant pas (photos, textes, images, logos, noms de produits ou de marques…) est la propriété de leurs détenteurs respectifs.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 2.Dune est une marque déposée à l'Institut National de la Propriété Industrielle. Toute reproduction non autorisée de cette marque, logo et signe distinctif constitue une contrefaçon passible de sanctions pénales. Le contrevenant s'expose à des sanctions civiles et pénales rappelées aux articles L. 335.2 et L. 343.1 du code de la Propriété Intellectuelle. Les Services, le Site et l’Application sont protégés par des droits de propriété intellectuelle et/ou autres droits que Dune détient ou dont elle est autorisée à faire usage.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 3.L'Utilisateur ne peut en aucun cas stocker (hors session de connexion, le cas échéant), reproduire, représenter, modifier, transmettre, publier, adapter sur quelque support que ce soit, par quelque moyen que ce soit, ou exploiter de quelque manière que ce soit, les éléments du Service et/ou des Applications sans l’autorisation préalable écrite de Dune.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 4.L'Utilisateur est seul responsable du Contenu Utilisateur qu'il transmet via le Service, ainsi que des textes et/ou opinions qu'il formule dans la « zone commentaire ». Il s'engage notamment à ce que ces données ne soient pas de nature à porter atteinte aux intérêts légitimes de tiers quels qu'ils soient.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 5.Toute extraction et/ou réutilisation sans autorisation d’une ou de plusieurs bases de données tirées ou copiées ou faites à partir du contenu de l’application et/ou des Services, de manière directe ou non, est sanctionnée civilement et pénalement.</Text>
                            <Text style={styles.tcL}>{'\u2022'} 6.Tout Utilisateur devra respecter toutes les mentions relatives aux droits de propriété intellectuelle figurant aux présentes Conditions Générales d’Utilisation et ne pas les altérer, supprimer, modifier ou autrement y porter atteinte.</Text>


                    </ScrollView>

                    <TouchableOpacity disabled={ !this.state.accepted } onPress={ ()=>this._tosAcceptation() } style={ this.state.accepted ? styles.button : styles.buttonDisabled }><Text style={styles.buttonLabel}>Accepter</Text></TouchableOpacity>
             </View>

      </View>
    );
  }

}

const { width , height } = Dimensions.get('window');

const styles = {

  container:{
    marginTop: 20,
    marginLeft: 10,
    flex: 1,
    marginRight: 10,
    marginBottom:20
  },
  title: {
      fontSize: 22,
      alignSelf: 'center'
  },
  tcP: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcP:{
      marginTop: 10,
      fontSize: 12
  },
  tcL:{
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcContainer: {
      marginTop: 15,
      marginBottom: 15,
      height: height * .7
  },

  button:{
      backgroundColor: '#363453',
      borderRadius: 5,
      padding: 10
  },

  buttonDisabled:{
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
 },

  buttonLabel:{
      fontSize: 14,
      color: '#FFF',
      alignSelf: 'center'
  }

}

export default TermsAndConditions;
