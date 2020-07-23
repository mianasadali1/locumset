import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  TouchableOpacity,
  BackHandler
  }
from "react-native";
import { Block, Text, Button, theme} from "galio-framework";
import { Images } from "../../Themes/constants";
import { HeaderHeight } from "../../Themes/constants/utils";
import argonTheme from "../../Themes/constants/Theme";
// import Application from '../Services/Application';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import ProfileActions from ProfileRedux file
import ProfileActions from '../../Redux/ProfileRedux/ProfileRedux';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const p40 = 40/480*width;
const p30 = 30/480*width;
const p55 = 55/480*width;
const p50 = 50/480*width;
const p65 = 65/480*width;
const p10 = 10/480*width;
const p5 = 5/480*width;
const p14 = 14/480*width;
const p20 = 20/480*width;
const p22 = 22/480*width;
const p25 = 25/480*width;
const p17 = 17/480*width;
const p75 = 75/480*width;
const p80 = 80/480*width;
const p85 = 85/480*width;
const p90 = 90/480*width;
const p100 = 100/480*width;
const p150 = 150/480*width;
const p200 = 200/480*width;

// const AppClient = new Application();
class Profile extends React.Component {
  static propTypes = {
		dispatch: PropTypes.func,
		fetching: PropTypes.bool,
    token:PropTypes.string,
    attemptToGetHospitals: PropTypes.func,
	};
  constructor(props){
    super(props);
    this.user_id = props.navigation.state.params;
    this.props.attemptToGetHospitals();
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }

  getPreferences = () =>{
    // let headers = {
    //   Authorization: "Bearer " + this.props.token
    // }
    // AppClient.getHospitals(headers).then((res) =>{
      if(this.props.hospitalsData) {
        this.props.navigation.navigate('Preferences',{
          data: this.props.hospitalsData
        })
      }
    // });
  }
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
  render() {
    const { navigation, token, hospitalsData, user, user_image } = this.props;
    console.log('user image', user_image)
    return (
      <Block center flex style={styles.profile}>
        <ImageBackground source={require('../assets/images/header_img.png')} style={{width: width}}>
          <View style={{width: width, height: 60, flexDirection: 'row'}}>
            <View style={{flex: 0.2, padding: 10, paddingLeft: 0, paddingVertical: 15,}}>
              <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                <Image source={require('../assets/images/back_ic.png')} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.6, padding: 20, paddingVertical:20}}>
              <Text center style={{color: '#fff', textAlign: 'center', fontWeight: '600', fontSize:19}}>Profile</Text>
            </View>
            <View style={{flex: 0.2}}>
            </View>
          </View>
          <View style={{width: width, marginTop:-20, height: 100}}>
          </View>
        </ImageBackground>
        <View style={{ backgroundColor: '#F2F8F6'}}>
          <View style={{flexDirection: 'row', backgroundColor: '#ffffff', width: width*0.8, borderRadius: 10,  marginTop: -60, height: 120, padding:10}}>
            <Block middle style={styles.avatarContainer, {flex: 0.4}}>
              {user_image ? <Image
                style={styles.avatar}
                source={{uri: user_image}}
              /> : <Image
                style={styles.avatar}
                source={require('../../Themes/assets/imgs/icon/new_doc.png')}
              />}
            </Block>
            <Block style={{flex: 0.6}}>
              <View style={{flexDirection: 'row',marginTop:12, width: '100%'}}>
                <Text style={styles.textStyle} numberOfLines={2} ellipsizeMode='tail'>
                  {user ? user.first_name : ''} {user ? user.sur_name : ''}
                </Text>
              </View>
              <Text style={styles.textStyle2}>
                GMC - {user ? user.gmc : ''}
              </Text>
            </Block>
          </View>
        </View>
        <Block style={{backgroundColor:'#f7f7f7'}}>
          <Block style={styles.profileCard}>
            {/*<Block middle style={styles.avatarContainer}>
              {user && user.image_path ? <Image
                style={styles.avatar}
                source={{uri: user.image_path}}
              /> : <Image
                style={styles.avatar}
                source={require('../../Themes/assets/imgs/icon/new_doc.png')}
              />}
            </Block>
            <Block center>
              <View style={{flexDirection: 'row',marginTop:12}}>
                <Text style={styles.textStyle}>
                  {user ? user.first_name : ''}
                </Text>
                <Text style={styles.textStyle1}>
                  {user ? user.sur_name : ''}
                </Text>
              </View>
              <Text style={styles.textStyle2}>
                {user ? user.gmc : ''}
              </Text>
            </Block>*/}
          </Block>
        </Block>
        <Block style={styles.container1}>
          <Button
            style={styles.button}
            color={argonTheme.COLORS.WHITE}
            onPress={() => navigation.navigate("BasicInfo", this.user_id)}
          >
            <Image source={require('../assets/imgs/icon/basic_info_ic.png')} style={{flex:0.07, paddingHorizontal: 5,width:14, height:27}}/>
             <View style={{flex:0.008}}>
            </View>
            <Text style={{flex:0.912,width:'92%', paddingHorizontal: 5, color: argonTheme.COLORS.BLACK, fontWeight: '300', fontSize: p20}}>
              Basic Info
            </Text>
            <Image source={require('../assets/imgs/icon/chevron_right.png')} style={{flex:0.01,paddingHorizontal: 5, height:14}}/>
          </Button>
          <Button
            style={styles.button}
            color={argonTheme.COLORS.WHITE}
            onPress={() => navigation.navigate("Experience", {data: hospitalsData})}
          >
            <Image source={require('../assets/imgs/icon/experience_ic.png')} style={{flex:0.067, paddingHorizontal: 5,width:12, height:30}}/>
            <View style={{flex:0.009}}>
            </View>
            <Text style={{flex:0.915,width:'92%', paddingHorizontal: 5, color: argonTheme.COLORS.BLACK, fontWeight: '300', fontSize: p20}}>
              Experience
            </Text>
            <Image source={require('../assets/imgs/icon/chevron_right.png')} style={{flex:0.01,paddingHorizontal: 5, height:14}}/>
          </Button>
          <Button
            style={styles.button}
            color={argonTheme.COLORS.WHITE}
            onPress={() => this.getPreferences()}
          >
            <Image source={require('../assets/imgs/icon/preferences_ic.png')} style={{flex:0.0701, paddingHorizontal: 5,width:14, height:29}}/>
            <View style={{flex:0.009}}>
            </View>
            <Text style={{flex:0.9109,width:'92%', paddingHorizontal: 5, color: argonTheme.COLORS.BLACK, fontWeight: '300', fontSize: p20}}>
              Preferences
            </Text>
            <Image source={require('../assets/imgs/icon/chevron_right.png')} style={{flex:0.01,paddingHorizontal: 5, height:14}}/>
          </Button>
          <Button
            style={styles.button}
            color={argonTheme.COLORS.WHITE}
            onPress={() => navigation.navigate("JobHistory")}
          >
            <Image source={require('../assets/imgs/icon/job_history_ic.png')} style={{flex:0.068, paddingHorizontal: 5, height:30}}/>
            <View style={{flex:0.01}}>
            </View>
            <Text style={{flex:0.912,width:'92%', paddingHorizontal: 5, color: argonTheme.COLORS.BLACK, fontWeight: '300', fontSize: p20}}>
              Locumset Shift History
            </Text>
            <Image source={require('../assets/imgs/icon/chevron_right.png')} style={{flex:0.01,paddingHorizontal: 5, height:14}}/>
          </Button>
          <Button
            style={styles.button}
            color={argonTheme.COLORS.WHITE}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Image source={require('../assets/imgs/icon/notifications_ic.png')} style={{flex:0.065, paddingHorizontal: 5,width:12, height:27}}/>
            <View style={{flex:0.01}}>
            </View>
            <Text style={{flex:0.915,width:'93%', paddingHorizontal: 5, color: argonTheme.COLORS.BLACK, fontWeight: '300', fontSize: p20}}>
              Notifications
            </Text>
            <Image source={require('../assets/imgs/icon/chevron_right.png')} style={{flex:0.01,paddingHorizontal: 5, height:14}}/>
          </Button>
          <Button
            style={styles.button}
            color={argonTheme.COLORS.WHITE}
            onPress={() => navigation.navigate("Settings")}
          >
            <Image source={require('../assets/imgs/icon/settings_ic.png')} style={{flex:0.052, paddingHorizontal: 5,width:11, height:30}}/>
            <View style={{flex:0.033}}>
            </View>
            <Text style={{flex:0.905,width:'93%', paddingHorizontal: 5, color: argonTheme.COLORS.BLACK, fontWeight: '300', fontSize: p20}}>
              Settings
            </Text>
            <Image source={require('../assets/imgs/icon/chevron_right.png')} style={{flex:0.01,paddingHorizontal: 5, height:14}}/>
          </Button>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  // Top Header
  header: {
    flex: 0,
    backgroundColor: '#009D8B',
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 40
  },
  // Top header text
  headText: {
    color: "#FFFFFF",
    fontFamily: 'sans-serif',
    fontSize: p20,
    fontWeight: "600",
    paddingTop: 16,
    textAlign: 'center'
  },
  profile: {
    //marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    backgroundColor:'#f7f7f7',
    height: height,
    //marginBottom: -HeaderHeight * 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 0, //navigation bar occured by changing value from 1 to 0
  },
  profileBackground: {
    width: width,
    height: height,
  },
  profileCard: {
    position: "relative",
    marginTop: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    flex:0.2
  },
  avatarContainer: {
    position: "relative",
    marginTop: 5
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 62,
    borderWidth: 1,
    borderColor: '#009B8B',
    marginTop: 5
  },
  button: {
    width: '100%',
    paddingHorizontal:10,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    flexDirection: 'row',
    flex:1
  },
  thumb: {
    borderRadius: 3,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  textStyle: {
    color: 'black',
    fontSize: p22,
  },
  textStyle1: {
    color: 'black',
    paddingLeft: '2%',
    fontSize: p22,
  },
  textStyle2: {
    marginTop:'1%',
    color: '#c5c8c9',
    fontSize: p22,
  },
  container1:{
    //marginTop: '15%',
    position: 'relative',
    width:'100%',
    flex:1,
    marginTop:20,
  },
});

const mapStateToProps = state => ({
  token: state.account.token,
  user: state.account.user,
  hospitalsData: state.profile.hospitalsData,
  user: state.account.user,
  user_image: state.account.user_image,
});

const mapDispatchToProps = dispatch => ({
  attemptToGetHospitals: token => dispatch(ProfileActions.hospitalsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
