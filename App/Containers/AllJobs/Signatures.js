import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  View,
  Picker,
  TouchableWithoutFeedback,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  Alert
} from "react-native";
import { Images } from '../../Themes';
import { argonTheme } from '../../Themes/constants';
import { connect } from 'react-redux';
import { Block, Text, theme, Button } from "galio-framework";
import DatePicker from 'react-native-datepicker';
import Popover from 'react-native-popover-view';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Signature from 'react-native-signature-canvas';
import PropTypes from 'prop-types';
import moment from 'moment'
import Spinner from 'react-native-loading-spinner-overlay';

import TimesheetActions from '../../Redux/TimeSheetRedux/TimeSheetRedux'


const { width, height } = Dimensions.get("screen");

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
const p23 = 23/480*width;
const p25 = 25/480*width;
const p17 = 17/480*width;
const p15 = 15/480*width;
const p75 = 75/480*width;
const p80 = 80/480*width;
const p85 = 85/480*width;
const p90 = 90/480*width;
const p100 = 100/480*width;
const p150 = 150/480*width;
const p200 = 200/480*width;


const jobs = [
  {
    id: 1,
    type: '1',
    title: 'Test Surgery',
    hospital_name: 'London Bridge Hospital',
    rate: '£60/h',
    date: '07/11',
    start_time: '08:00',
    end_time: '23:00',
  },
];
state = {
  comment: '',
};

onChangeText = (key, val) => {
  this.setState({ [key]: val })
}

class Signatures extends React.Component {
  static propTypes = {
      dispatch: PropTypes.func,
      fetching: PropTypes.bool,
      timefetching: PropTypes.bool,
      chj_fetching: PropTypes.bool,
      attemptToSubmitTimeSheet: PropTypes.func,
    }
  state = {
    signature: null,
    saveSignature: false
  }
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
  constructor(props){
    super(props)
    this.data = props.navigation.state.params.data;
    console.log('props navigation data on signature', this.data)
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

  handleSignature = (value) => {
    console.log('value' , value)
    this.setState({ fetching: true })
    setTimeout(() => {
      this.setState({ signature: value, fetching: false })
    }, 1000)

  }

  onSubmit = () => {
    if(!this.state.signature) {
      alert('Please save signature first!')
    } else {
      this.data.signature = this.state.signature;
      console.log('show data before call', this.data)
      this.props.attemptToSubmitTimeSheet(this.data)
    }

  }
  render() {
    const { fetching } = this.props;
    return (
        <Block center flex style={{color: '#fff'}}>
          <Spinner
            visible={fetching || this.state.fetching}
          />
          <ImageBackground source={require('../assets/images/header_img.png')} style={{width: width,aspectRatio: 3}}>
            <View style={{width: width, flexDirection: 'row' }}>
              <View style={{flex: 0.33, padding: 10, paddingLeft: 0, paddingVertical: 15, marginTop:3}}>
                <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                  <Image source={require('../assets/images/back_ic.png')} />
                </TouchableOpacity>
              </View>
              <View style={{flex: 0.65, padding: 10, paddingTop: 0, textAlign: 'left',marginTop:40}}>
                <Text center style={{color: '#fff', textAlign: 'left', fontWeight: '600',fontSize:p25}}>Signature</Text>
              </View>
            </View>
            <View style={{width: width, marginTop:-20, height: 100}}>
            </View>
          </ImageBackground>
          <View center style={{width: width, height:38, borderRadius: 5, paddingBottom:0, backgroundColor:'#f7f7f7', flexDirection: 'row',justifyContent:'center'}}>
            <Text style={{fontSize: 32, paddingBottom:3,marginTop:-9, fontWeight: '500',color:'#cde7e3', justifyContent:'center', paddingRight:8}}>
                  .
            </Text>
            <Text style={{fontSize: 32, paddingBottom:3,marginTop:-9, fontWeight: '500',color:'#cde7e3'}}>
                  .
            </Text>
            <Text style={{fontSize: 32, paddingBottom:3,marginTop:-9, fontWeight: '500',color:'#33ab9f', paddingLeft:8}}>
                  .
            </Text>
          </View>
          <ScrollView keyboardShouldPersistTaps={'always'} style={{width: width}}>
          <View center style={{backgroundColor: '#fff', width: width, padding: 10}}>
            <Text center style={{color: '#000000', fontSize: p20, fontWeight: '500'}}>
              Doctor sign the details as correct
            </Text>
            <View style={{marginTop:15}}>
              <View style={{backgroundColor:'#62b9b0', height:250, marginLeft: 10,borderRadius:12, marginTop:5}}>
                <Text center style={{color: '#FFF', paddingTop:5, alignSelf:'center', fontSize: p15, height:30, paddingLeft: 1, fontWeight: '600'}}>
                  Signature
                </Text>
                <View style={{ flex: 1, height: 250, backgroundColor:'#62b9b0',borderRadius:12 }}>
                  <Signature
                    onOK={this.handleSignature}
                    onEmpty={() => console.log("empty")}
                    descriptionText="Sign"
                    // clear button text
                    clearText="Clear"
                    confirmText="Save"
                    webStyle={`.m-signature-pad--footer
                      .button {
                        background-color: lightseagreen;
                        color: #FFF;
                      }`}
                  />
                </View>
              </View>
            </View>
          </View>
          <View center style={{backgroundColor: '#fff', width: width, padding: 10}}>
            <Text style={{color: '#bfc4c4', fontSize: p15,marginTop: 5}}>
              By submitting this timesheet, you confirm this
            </Text>
          </View>
          <KeyboardAwareScrollView
            ref={ref => this.scrollView = ref} keyboardShouldPersistTaps={'handled'}
            style={{ flex: 1 }}
          >
            <View style={ pickerSelectStyles.container }>
              {jobs.map((item, key) => {
                  if (item.type == '1') {
                    return (
                    <View style={{flexDirection: 'row',backgroundColor:'#fff',marginTop:5, flex:1}}>
                      <View style={{flex:0.05}}>
                      </View>
                      <Button
                        style={{height: 40, borderRadius: 30, flex:0.4, marginBottom:'5%',justifyContent:'center'}}
                          color={argonTheme.COLORS.CANCEL}
                          onPress={() => this.props.navigation.navigate('CalculateShiftSalary')}
                          textStyle={{ color: argonTheme.COLORS.WHITE, fontWeight: '500',marginBottom:'10%',fontSize:p15 }}
                        >
                        Back
                      </Button>
                      <View style={{flex:0.1}}>
                      </View>
                      <Button
                        style={{height: 40, borderRadius: 30, flex:0.4, marginBottom:'5%',justifyContent:'center'}}
                        color={argonTheme.COLORS.DEFAULTCOLOR}
                        onPress={ this.onSubmit}
                        textStyle={{ color: argonTheme.COLORS.WHITE, fontWeight: '500',marginBottom:'10%',fontSize:p15 }}
                      >
                        Submit
                      </Button>
                      <View style={{flex:0.05}}>
                      </View>
                    </View>
                    );
                  }
              })}
            </View>
            </KeyboardAwareScrollView>
          </ScrollView>
        </Block>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  buttonContainer: {
    flex: 1,
    marginRight: 10,
  },
  inputIOS: {
    fontSize: 16,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    color: 'black',
    marginBottom: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'grey',
    color: 'black',
    marginBottom: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  container: {
    paddingBottom: 10,
    backgroundColor: '#fff',
 },
 text: {
    color: '#4f603c',
    padding: 10,
    width: width*0.33,
    flex: 1,
 },
 button1:{
    width: 140,
    height: 44,
    marginLeft:'12%',
    borderRadius: 30,
    marginBottom:'5%',
  },
  button2:{
    width: 140,
    height: 44,
    marginLeft:'7%',
    borderRadius: 30,
    marginBottom:'5%',
  },
});

const mapStateToProps = state => ({
  fetching: state.timeSheet.fetching,
  // marker: state.device.deviceInfo.position
});

const mapDispatchToProps = dispatch => ({
  // getUserToken: token => dispatch(getUserToken(token))
    attemptToSubmitTimeSheet: data => dispatch(TimesheetActions.timeSheetRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signatures);
