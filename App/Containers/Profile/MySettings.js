import React from 'react';
import {
  TextInput,
  View,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
  AsyncStorage,
  Switch,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { argonTheme } from '../../Themes/constants';
//import Images from "../constants/Images";
import { Block, Text, Button, theme} from "galio-framework";
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

//import Auth from '@services/Auth';
//import {BASE_URL} from '../Config/URLs';
//import { saveToken, saveUserToken, loading , saveUserInfo, userFetch, saveUser} from '../Redux/actions/auth';
//import { Dropdown } from 'react-native-material-dropdown';
//import CheckBox from 'react-native-check-box';
//import { Switch } from "../components/";
import PropTypes from 'prop-types';
import SettingsActions from '../../Redux/ProfileRedux/SettingsRedux'
import LogoutActions from '../../Redux/LogoutRedux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const { height, width } = Dimensions.get("screen");

const rem = width / 380;
const p40 = 40/480*width;
const p45 = 45/480*width;
const p30 = 30/480*width;
const p55 = 55/480*width;
const p50 = 50/480*width;
const p65 = 65/480*width;
const p10 = 10/480*width;
const p14 = 14/480*width;
const p15 = 15/480*width;
const p20 = 20/480*width;
const p25 = 25/480*width;
const p17 = 17/480*width;
const p75 = 75/480*width;
const p80 = 80/480*width;
const p85 = 85/480*width;
const p90 = 90/480*width;
const p100 = 100/480*width;
const p150 = 150/480*width;
const p200 = 200/480*width;


class MySettings extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
  static propTypes = {
    dispatch: PropTypes.func,
    // saveFetching: PropTypes.bool,
    attemptToSaveSettings: PropTypes.func,
    attemptToLogout: PropTypes.func,
  };
	constructor(props) {
		super(props);
		this.state ={
			status:false
		}
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress () {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }

  state = {
    "switch-1": true,
    password: '',
    confirmpassword: '',
  };

  toggleSwitch = switchId =>
    this.setState({ [switchId]: !this.state[switchId] });
    onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  ShowHideTextComponentView = () =>{

    if(this.state.status == true)
    {
      this.setState({status: false})
    }
    else
    {
      this.setState({status: true})
    }
  }
  _Login = () =>{
    // AsyncStorage.removeItem('loginUserData');
  	// this.props.navigation.navigate('Auth');
    console.log('do log out')
    this.props.attemptToLogout(this.props.mobileId);
  }
  savePassword = () => {
    console.log('savePassword  : ');
  }

render() {
  const { password,confirmpassword} = this.state;
  const {saveFetching, fetching} = this.props;
  console.log(this.props.mobileId);
    return (
      <Block style={styles.container}>
      <Spinner
        visible={saveFetching}
      />
      <Spinner
        visible={fetching}
      />
        <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
          ref={ref => this.scrollView = ref} keyboardShouldPersistTaps={'handled'}
          style={{ flex: 1 }}
        >
       <View style={{width: width, height: 70, backgroundColor: '#009D8B', flexDirection: 'row'}}>
          <View style={{flex: 0.25, padding: 10, paddingLeft: 0, paddingVertical: 15}}>
            <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
              <Image source={require('../assets/images/back_ic.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.5, padding: 10, paddingVertical:17,}}>
            <Text center style={{color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 19}}>Settings</Text>
          </View>
        </View>
          <Button
            style={styles.button4}
            color={argonTheme.COLORS.WHITE}
            onPress={this.ShowHideTextComponentView}
          >
            <View>
            <Text style={{color: argonTheme.COLORS.BLACK, fontSize: p17,}}>
              Change Password
            </Text>
</View>
<View>
            <Image source={require('../assets/imgs/icon/chevron_down.png')} style={{height:14,alignSelf:'flex-end'}}/>
</View>
          </Button>
          <Block style={styles.container1}>
          {
            // Pass any View or Component inside the curly bracket.
            // Here the ? Question Mark represent the ternary operator.
            this.state.status ?
              <Block center>
                <View style={{backgroundColor:'#f7f7f7',marginTop:'5%'}}>
                  <TextInput
                    ref={ref => this.password = ref}
                    value={this.state.password}
                    onChangeText={val => this.onChangeText('password', val)}
                    placeholder={'Enter Current Password'}
                    secureTextEntry={true}
                    style={styles.input}
                    returnKeyType="next"
                    onSubmitEditing={() => this.changepassword.focus()}
                  />
                </View>
              </Block>
            : null
          }
          {
            // Pass any View or Component inside the curly bracket.
            // Here the ? Question Mark represent the ternary operator.
            this.state.status ?
              <Block center>
                <View style={{backgroundColor:'#f7f7f7'}}>
                  <TextInput
                  ref={ref => this.changepassword = ref}
                  value={this.state.changepassword}
                  onChangeText={val => this.onChangeText('changepassword', val)}
                  placeholder={'Enter New Password'}
                  secureTextEntry={true}
                  style={styles.input}
                  returnKeyType="next"
                  />
                </View>
              </Block>
            : null
          }
          {
            this.state.status ?
              <View style={{flexDirection: 'row',marginTop:'5%',backgroundColor:'#f7f7f7'}}>
                <Button
                  style={styles.button1}
                  color={argonTheme.COLORS.CANCEL}
                  onPress={ this.ShowHideTextComponentView}
                  textStyle={{ color: argonTheme.COLORS.WHITE,fontSize: p17, fontWeight: '500',marginBottom:'10%' }}
                >
                  CANCEL
                </Button>
                <Button
                  style={styles.button2}
                  color={argonTheme.COLORS.DEFAULTCOLOR}
                  onPress={() => {
                      let params_data ={

                          old_password : this.state.password,
                          current_password : this.state.changepassword

                      }
                      //saveSettings
                      this.props.attemptToSaveSettings(params_data)
                  }
                  }
                  textStyle={{ color: argonTheme.COLORS.WHITE, fontSize: p17,fontWeight: '500',marginBottom:'10%' }}
                >
                  CONFIRM
                </Button>
              </View>
            : null
          }
        </Block>
        <Button
          style={styles.button}
          color={argonTheme.COLORS.WHITE}
          onPress={this._Login}
        >
          <Text style={{flex:1, color: argonTheme.COLORS.BLACK, fontSize: p17}}>
            Logout
          </Text>
        </Button>
        </KeyboardAwareScrollView>
      </Block>
    );
  }
}

const mapStateToProps = state => ({
    isSave: state.settings.isSave,
    saveFetching: state.settings.saveFetching,
    notifSaveMessage : state.settings.notifSaveMessage,
    mobileId: state.account.mobileId,
    fetching: state.logout.fetching
});

const mapDispatchToProps = dispatch => ({
    attemptToSaveSettings: (data) => dispatch(SettingsActions.saveSettingsRequest(data)),
    attemptToLogout: (mobileId) => dispatch(LogoutActions.dlogout(mobileId))
});

const styles = StyleSheet.create({
  // Top Header
  header: {
    flex: 0,
    backgroundColor: '#009D8B',
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 40,
    marginBottom: 20
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
  button: {
    flex:1,
    alignItems:'flex-start',
    paddingHorizontal: 10,
    width:'100%'
  },
  button4:{
    flex:1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%'

  },
  button1:{
    width: 160,
    height: 44,
    marginLeft:'9%',
    borderRadius: 5,
    marginBottom:'5%',
  },
  button2:{
    width: 160,
    height: 44,
    marginLeft:'5%',
    borderRadius: 5,
    marginBottom:'5%',
  },
  container1: {
    justifyContent: 'flex-start',
    backgroundColor:'#f7f7f7'
  },
  input:{
    width: 350,
    height: 44,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 8,
    color: 'black',
    borderRadius: 5,
    fontSize: p17,
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
  container:{
    backgroundColor: '#FFFFFF',
    width: width,
    height: height,
    flex:1
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MySettings);
