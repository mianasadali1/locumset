import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler
  }
from "react-native";
import { Block, Text, Button, theme} from "galio-framework";
import { argonTheme, Images } from '../../Themes/constants';
import { connect } from 'react-redux';
import ProfileActions from '../../Redux/ProfileRedux/ProfileRedux'
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-crop-picker';

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

class EditBasicInfo extends React.Component {
  constructor(props){
    super(props);
    this.handleBackPress = this.handleBackPress.bind(this);
  }
  static propTypes = {
      dispatch: PropTypes.func,
      fetching: PropTypes.bool,
      attemptUpdateProfile: PropTypes.func,
  };
  state = {
    email: this.props.user.email,
    phone: this.props.user.mobile,
    address: this.props.user.address,
    Gender: '',
    hospital_id: this.props.user.hospital_id,
    dept_id: this.props.user.dept_id,
    hospital_name: this.props.user.doc_hosp_name,
    dept_name: this.props.user.doc_dept_name,
    Grade: '',
    Password: '',
    image: this.props.user_image || '',
    imageBase: ''
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

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  EditBasicInfo = async () => {
    const { Email, Phone, Address, Gender, Hospital, Department, Grade, Hospital_id, Password } = this.state

    try {
      // here place your completeprofile logic
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }

  onSubmit = () => {
    let data = {
      address: this.state.address,
      phone: this.state.phone,
    }
    console.log('update call', data)
    this.props.attemptUpdateProfile(data);
  }

  render() {
    const { user,fetching, up_fetching, user_image } = this.props;
    console.log('user', user, this.state)
    return (
      <Block flex>
      <KeyboardAwareScrollView
          ref={ref => this.scrollView = ref} keyboardShouldPersistTaps={'handled'}
          style={{ flex: 1 }}
        >
        <Block>
          <View style={{width: width, height: 70, backgroundColor: '#009D8B', flexDirection: 'row', paddingTop:15}}>
            <View style={{flex: 0.25, padding: 10, paddingLeft: 0, paddingVertical: 15,}}>
              <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                <Image source={require('../assets/images/back_ic.png')} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.6, padding: 5, paddingVertical:15, marginBottom:5, paddingRight:30, textAlign: 'center'}}>
              <Text center style={{color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 19}}>Edit Basic Info</Text>
            </View>
          </View>
        </Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width, marginTop: 0 }}
          keyboardShouldPersistTaps={'always'}>
          <Spinner
            visible={up_fetching}
            // textContent={'Saving...'}
          />
          <Block flex style={styles.profileCard}>
            <Block middle style={styles.avatarContainer}>
              {this.state.image ? <Image
                source={{ uri: this.state.image }}
                style={styles.avatar}
              /> : <Image
              source={require('../../Themes/assets/imgs/icon/new_doc.png')}
                style={styles.avatar}
              />}
            </Block>
            <Block center style={{marginBottom:25}}>
              <View style={{flexDirection: 'row',marginTop:'3%',}}>
                <Text style={styles.textStyle}>
                  {user.first_name}
                </Text>
                <Text style={styles.textStyle1}>
                  {user.sur_name}
                </Text>
              </View>
              <Text style={styles.textStyle2}>
                {user.gmc}
              </Text>
            </Block>
          </Block>
          <Block center style={styles.container1}>
            <View style={{marginBottom:'3%', marginTop: 10}}>
              <TextInput
                style={styles.input}
                ref={ref => this.email = ref}
                value={this.state.email}
                placeholder={'Email'}
                returnKeyType="next"
                onSubmitEditing={() => this.phone.focus()}
                placeholderTextColor='#9E9E9E'
              />
              <TextInput
                style={styles.input}
                ref={ref => this.phone = ref}
                placeholder='Phone Number'
                autoCapitalize="none"
                placeholderTextColor='#9E9E9E'
                value={this.state.phone}
                returnKeyType="next"
                onSubmitEditing={() => this.address.focus()}
                onChangeText={val => this.onChangeText('phone', val)}
              />
              <TextInput
                style={styles.input}
                ref={ref => this.address = ref}
                placeholder='Address'
                autoCapitalize="none"
                placeholderTextColor='#9E9E9E'
                value={this.state.address}
                returnKeyType="next"
                onSubmitEditing={() => this.hospital_id.focus()}
                onChangeText={val => this.onChangeText('address', val)}
              />
              <TextInput
                style={styles.input}
                ref={ref => this.hospital_id = ref}
                placeholder='Job in current hospital'
                placeholderTextColor='#9E9E9E'
                value={this.state.hospital_name}
                returnKeyType="next"
                onSubmitEditing={() => this.dept_id.focus()}
              />
              <TextInput
                style={styles.input}
                ref={ref => this.dept_id = ref}
                placeholder='Job in current Department'
                placeholderTextColor='#9E9E9E'
                value={this.state.dept_name}
                returnKeyType="next"
                onSubmitEditing={() => this.onSubmit()}
              />
              <View style={styles.buttonContainer, {textAlign: 'right'}}>
                <Button onPress={() => this.onSubmit()} style={{backgroundColor: '#059A87', borderRadius: 5, width: 320}}>
                  <Text size={18} color={argonTheme.COLORS.WHITE}>
                    SAVE
                  </Text>
                </Button>
              </View>
            </View>
          </Block>
        </ScrollView>
        </KeyboardAwareScrollView>
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
    height: 40,
    marginBottom: 20
  },
  // Top header text
  headText: {
    color: "#FFFFFF",
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 16,
    textAlign: 'center'
  },
  profile: {
    //marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    backgroundColor:'#f7f7f7',
    //marginBottom: -HeaderHeight * 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 0, //navigation bar occured by changing value from 1 to 0
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
    backgroundColor: '#f7f7f7',
  },
  avatarContainer: {
    position: "relative",
    marginTop:45
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 62,
    borderWidth: 1,
    borderColor: '#009B8B',
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
    color: '#c5c8c9',
    fontSize: p22,

  },
  container1:{
    marginTop: 10,
    position: 'relative',
    backgroundColor:'#FFFFFF',
    width: width,
  },
  button: {
    width: 320,
    height: 44,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 20,
    marginBottom: '3%'
  },
  input: {
    width: 320,
    height: 44,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 8,
    color: 'black',
    borderRadius: 5,
    fontSize: p14,
    borderColor: '#069987',
    borderWidth: 0.5,
  },
  buttonContainer: {
    flex: 0.8,
    marginRight: 10,
  },
});

const mapStateToProps = state => ({
  user: state.account.user,
  fetching: state.profile.fetching,
  up_fetching: state.profile.up_fetching,
  user_image: state.account.user_image
});

const mapDispatchToProps = dispatch => ({
  attemptUpdateProfile: data => dispatch(ProfileActions.updateProfileRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBasicInfo);
