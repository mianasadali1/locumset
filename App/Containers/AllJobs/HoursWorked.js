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
  RefreshControl,
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
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';

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
    startTimeVisible: false,
    endTimeVisible: false
  },
];




class HoursWorked extends React.Component {
  state = {
  }
  constructor(props){
    super(props)
    this.state = {
      start_time: '',
      end_time: props.navigation.state.params.data.job_end_time,
      startTimeVisible: false,
      endTimeVisible: false,
      startDateTime: '',
      endDateTime: '',
      to_date: moment(new Date()).format("DD/MM/YYYY"),
      from_date: moment(new Date()).format("DD/MM/YYYY"),
      comments: null,
    }
    this.data = props.navigation.state.params.data;
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

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  startTimePicker = (date) => {
    var time = moment(date).format('HH:mm')
    this.setState({
      startTimeVisible: false,
      start_time: time,
      startDateTime: date,
    })
  }

  endTimePicker = (date) => {
    var time = moment(date).format('HH:mm')
    this.setState({
      endTimeVisible: false,
      end_time: time,
      endDateTime: date
    })
  }

  showStartTimePicker = () => {
    this.setState({
      startTimeVisible: true
    })
  }
  hideStartTimePicker = () => {
    this.setState({
      startTimeVisible: false
    })
  }

  showEndTimePicker = () => {
    this.setState({
      endTimeVisible: true
    })
  }
  hideEndTimePicker = () => {
    this.setState({
      endTimeVisible: false
    })
  }
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }


  onNavigation = () => {
    let job_time = moment(this.data.job_end_time, 'h:mma')
    let entered_time = moment(this.state.end_time, 'h:mma')
    let isBefore = entered_time.isBefore(job_time);
    let isAfter = entered_time.isAfter(job_time);
    if((isBefore || isAfter) && !this.state.comments) {
      alert('Please fill comment field first!')
    } else if(!this.state.end_time) {
      alert('Date or time is not valid!')
    } else {
      let data = {
        job_id: this.data.job_id,
        grade_id: this.data.grade_id,
        detail_id: this.data.detail_id,
        time_to: this.state.end_time,
        time_from: this.data.job_start_time,
        rate: this.data.rate,
        job_start_time: this.data.job_start_time,
        job_end_time: this.data.job_end_time,
        date_to: this.state.to_date,
        date_from: this.state.from_date,
        comments: this.state.comments,
      }
      console.log('on next data', data)
      this.props.navigation.navigate('CalculateShiftSalary', {data: data})
    }

  }
  render() {
    const { start_time, end_time } = this.state;
    return (
        <Block center flex style={{color: '#fff'}}>

        <ImageBackground source={require('../assets/images/header_img.png')} style={{width: width, aspectRatio: 3}}>
          <View style={{width: width, flexDirection: 'row', paddingTop: 10}}>
            <View style={{flex:0.29, padding: 10, paddingLeft: 0, paddingVertical: 15}}>
              <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                <Image source={require('../assets/images/back_ic.png')} />
              </TouchableOpacity>
            </View>
            <View style={{flex:0.65, padding: 10, marginTop:40}}>
              <Text center style={{color: '#fff', textAlign: 'left', fontWeight: '600',fontSize:p25}}>Working Hours</Text>
            </View>
          </View>
        </ImageBackground>
          <ScrollView keyboardShouldPersistTaps={'always'} style={{width: width}}>
          <View style={{width: width, borderRadius: 5, backgroundColor:'#f7f7f7',}}>
            <View center style={{flexDirection: 'row',justifyContent:'center'}}>
              <Text style={{fontSize: 32, fontWeight: '500',color:'#33ab9f', paddingRight:8}}>
                    .
              </Text>
              <Text style={{fontSize: 32, fontWeight: '500',color:'#cde7e3'}}>
                    .
              </Text>
              <Text style={{fontSize: 32, fontWeight: '500',color:'#cde7e3', paddingLeft:8}}>
                    .
              </Text>
            </View>
            <View style={{width: width, padding: 5,justifyContent:'center'}}>
              <Text center style={{fontSize: p15,justifyContent:'center', color:'#b8bcbb'}}>
                To help speed up the proccess we have auto filled shift information as much as we can
              </Text>
            </View>
          </View>
          <View center style={{backgroundColor: '#fff', width: width, padding: 10}}>
            <Text center style={{color: '#000000', fontSize: p20, fontWeight: '600', justifyContent:'center'}}>
              Foundation Year 2
            </Text>
            <Text center style={{color: '#bfc4c4', fontSize: p15,justifyContent:'center'}}>
              Amount per hour
            </Text>
            <Text center style={{color: '000000', fontSize: p20, borderWidth:1, borderRadius:40, borderColor: '#acd9d6', width:width/4, marginTop: 5, paddingVertical:5, height:width/10, alignItems:'center', alignSelf:'center' ,justifyContent:'center'}}>
              £{this.data.rate}
            </Text>
          </View>
          <KeyboardAwareScrollView
            ref={ref => this.scrollView = ref} keyboardShouldPersistTaps={'handled'}
            style={{ flex: 1 }}
          >
            <View style={ pickerSelectStyles.container }>
              <View style={{marginBottom: 10}}>
                <View style={{flexDirection:"row", flex:1, backgroundColor: '#fff', width: width, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10}}>
                  <Text style={{flex:0.35,color: '#cbcecf', fontSize: p15, marginRight: 0, alignItems:'flex-start', marginTop:3}}>
                    <Image source={require('../assets/images/clock_green.png')} style={{paddingRight: 5}} />
                    {"  "}
                    Start Time
                  </Text>
                  <TouchableOpacity style={{flex:0.2, color: '#9ea6a5', fontSize: p15, marginLeft: 0, alignItems:'center', backgroundColor:'#f7f7f7', borderRadius:40, borderWidth:1, borderColor: '#cbcecf', paddingLeft:0, width:78,alignSelf:'center', height:40}} >
                    <Text center style={{color: '#9ea6a5', paddingTop:10,justifyContent:'center'}}>{this.data.job_start_time}</Text>
                  </TouchableOpacity>
                  <DateTimePicker
                  style={{color: '#9ea6a5', fontSize: p15, marginLeft: 0, backgroundColor:'#f7f7f7', borderRadius:40, borderWidth:1, borderColor: '#cbcecf', paddingLeft:0, width:78,alignSelf:'center', height:40}}
                    isVisible={this.state.startTimeVisible}
                    onConfirm={this.startTimePicker}
                    onCancel={this.hideStartTimePicker}
                    mode={'time'}
                  />
                  <View style={{flex:0.1}}>
                  </View>
                  <DatePicker
                    style={{flex:0.3, color: '#9ea6a5', fontSize: p15, marginLeft: 0, alignItems:'flex-end', alignSelf:'center', backgroundColor:'#f7f7f7',borderRadius:40, borderWidth:1,borderColor: '#cbcecf', alignSelf:'center', height:40}}
                    date={this.state.from_date}
                    mode="date"
                    format="DD/MM/YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                      position: 'absolute',
                      right: 10,
                      top: 4,
                      marginLeft: 0,
                      width:0,
                      height:0
                    },
                      dateInput: {
                        borderRadius: 20,
                        height: 40,
                        width: 350,
                        paddingRight:0,
                        borderWidth:0
                      }
                    }}
                    onDateChange={(date) => {this.setState({from_date: date})}}
                  />
                </View>
                <View style={{flexDirection:"row", flex:1, backgroundColor: '#fff', width: width, paddingHorizontal: 10, paddingVertical: 5, marginTop: 5}}>
                  <Text style={{flex:0.35, alignItems:'flex-start', color: '#cbcecf', fontSize: p15, marginRight: 0, marginTop:3}}>
                    <Image source={require('../assets/images/clock_green.png')} style={{paddingRight: 5}} />
                    {"  "}
                    End Time
                  </Text>
                  <TouchableOpacity style={{flex:0.2, alignItems:'center', color: '#62b9b0', fontSize: p15, marginLeft: 0, backgroundColor:'#d6eeec', borderColor: '#acd9d6', borderWidth:1, borderRadius:40,paddingLeft:0, height:40}} onPress={this.showEndTimePicker}>
                    <Text center style={{color: '#62b9b0',paddingTop:10,justifyContent:'center'}}>{end_time}</Text>
                  </TouchableOpacity>
                  <DateTimePicker
                  style={{color: '#62b9b0', fontSize: p15, marginLeft: 0, backgroundColor:'#d6eeec', borderColor: '#acd9d6', borderWidth:1, borderRadius:40,paddingLeft:0, width:78,height:40}}
                    isVisible={this.state.endTimeVisible}
                    onConfirm={this.endTimePicker}
                    onCancel={this.hideEndTimePicker}
                    mode={'time'}
                  />
                  <View style={{flex:0.1}}>
                  </View>
                  <DatePicker
                    style={{color: '#62b9b0',flex:0.3, alignItems:'flex-end', fontSize: p15, marginLeft: 0, alignSelf:'center', backgroundColor:'#d6eeec',borderRadius:40, borderColor: '#acd9d6', borderWidth:1, height:40}}
                    date={this.state.to_date}
                    mode="date"
                    format="DD/MM/YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                      position: 'absolute',
                      right: 10,
                      top: 4,
                      marginLeft: 0,
                      width:0,
                      height:0
                    },
                    placeholderText: {
                      color: '#62b9b0',
                    },
                    dateText:{
                      color: '#62b9b0',
                    },
                      dateInput: {
                        borderRadius: 20,
                        height: 40,
                        width: 350,
                        paddingRight:0,
                        borderWidth:0,
                        color:'#62b9b0'
                      }
                    }}
                    onDateChange={(date) => {this.setState({to_date: date})}}
                  />
                </View>
                <View style={{backgroundColor: '#fff',position:'relative', width: width, paddingHorizontal: 10, paddingVertical: 5, marginTop:5,borderTopWidth:1, borderColor:'#cbcecf'}}>
                  <View style={{paddingLeft:5}}>
                    <Text style={{color: '#b9bebe', fontSize: p14,marginTop:0, justifyContent:'center' }}>
                      If time exceeds or decreases from end time
                    </Text>
                    <TextInput
                      value={this.state.comments}
                      onChangeText={val => this.onChangeText('comments', val)}
                      placeholder={'Comments'}
                      style={{borderRadius: 50, borderColor: '#cbcecf', borderWidth: 1, height:44, padding:10,marginTop:5}}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row',backgroundColor:'#fff',marginTop:5, flex:1}}>
                  <View style={{flex:0.05}}>
                  </View>
                  <Button
                    style={{height: 40, borderRadius: 30, flex:0.4, marginBottom:'5%',justifyContent:'center'}}
                    color={argonTheme.COLORS.CANCEL}
                    onPress={() => this.props.navigation.navigate('TimeSheet')}
                    textStyle={{ color: argonTheme.COLORS.WHITE, fontWeight: '500',marginBottom:'0%',paddingBottom:15, justifyContent:'center', fontSize:p15, alignSelf:'center',textAlign:'center' }}
                  >
                    Back
                  </Button>
                  <View style={{flex:0.1}}>
                  </View>
                  <Button
                    style={{height: 40, borderRadius: 30, flex:0.4, marginBottom:'5%'}}
                    color={argonTheme.COLORS.DEFAULTCOLOR}
                    onPress={this.onNavigation}

                    textStyle={{ color: argonTheme.COLORS.WHITE, fontWeight: '500',marginBottom:'10%', fontSize:p15, }}
                  >
                    Next
                  </Button>
                  <View style={{flex:0.05}}>
                  </View>
                </View>
              </View>
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
    width: width*0.8,
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
    height: 44,
    borderRadius: 30,
    marginBottom:'5%',
  },
  button2:{
    height: 44,
    borderRadius: 30,
    marginBottom:'5%',
  },
});

const mapStateToProps = state => ({
  // devices: state.device.devices,
  // marker: state.device.deviceInfo.position
});

const mapDispatchToProps = dispatch => ({
  // getUserToken: token => dispatch(getUserToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(HoursWorked);
