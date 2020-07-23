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
  BackHandler
} from "react-native";
import { Images } from '../../Themes';
import { argonTheme } from '../../Themes/constants';
import { connect } from 'react-redux';
import { Block, Text, theme, Button } from "galio-framework";
import DatePicker from 'react-native-datepicker';
import Popover from 'react-native-popover-view';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment'


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

class CalculateShiftSalary extends React.Component {
  state = {
    minutes: null,
    diffTime: null,
    totalCalculatedAmount: null
  }
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
  constructor(props){
    super(props)
    this.data = props.navigation.state.params.data;
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentDidMount = () => {
    var duration = moment.duration(moment(this.data.time_to, "HH:mm").diff(moment(this.data.job_start_time, "HH:mm")));
    this.hours = duration.asHours();
    this.diffTime = this.hours*60;
    var totalCalculatedAmount = this.hours * this.data.rate;
    this.setState({ diffTime: this.diffTime, totalCalculatedAmount: totalCalculatedAmount})

    // let job_end_time = parseFloat(this.data.job_end_time);
    // let job_start_time = parseFloat(this.data.job_start_time);
    var job_duration = moment.duration(moment(this.data.job_end_time, "HH:mm").diff(moment(this.data.job_start_time, "HH:mm")));
    var hours = job_duration.asHours();
    this.totalAmount = hours * this.data.rate
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

  handleChange = (name, value) => {
  let remTime = this.diffTime - value;
  let amount = remTime/60 * this.data.rate;
    this.setState({ [name]: value, totalCalculatedAmount: amount });
  }

  onNavigation = () => {
    this.data.job_amount = this.totalAmount;
    this.data.calculated_amount = this.state.totalCalculatedAmount;
    this.data.break_time = this.state.minutes;
    this.data.job_hours = this.hours;
    this.props.navigation.navigate('Signatures', { data: this.data})
  }
  render() {
    const { minutes, totalCalculatedAmount } = this.state;
    return (
        <Block center flex style={{color: '#fff'}}>
          <ImageBackground source={require('../assets/images/header_img.png')} style={{width: width,aspectRatio: 3}}>
            <View style={{width: width, flexDirection: 'row'}}>
              <View style={{flex: 0.2, padding: 10, paddingLeft: 0, paddingVertical: 15, marginTop:3}}>
                <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                  <Image source={require('../assets/images/back_ic.png')} />
                </TouchableOpacity>
              </View>
              <View style={{flex: 0.65, padding: 10, paddingTop: 0, textAlign: 'left',marginTop:40}}>
                <Text center style={{color: '#fff', textAlign: 'left', fontWeight: '600',fontSize:p25}}>Calculate Shift Salary</Text>
              </View>
            </View>
            <View style={{width: width, marginTop:-20, height: 100}}>
            </View>
          </ImageBackground>
          <View center style={{width: width, height:38, borderRadius: 5, paddingBottom:0, backgroundColor:'#f7f7f7', flexDirection: 'row',justifyContent:'center'}}>
            <Text style={{fontSize: 32, paddingBottom:3,marginTop:-9, fontWeight: '500',color:'#cde7e3', justifyContent:'center', paddingRight:8}}>
                  .
            </Text>
            <Text style={{fontSize: 32, paddingBottom:3,marginTop:-9, fontWeight: '500',color:'#33ab9f'}}>
                  .
            </Text>
            <Text style={{fontSize: 32, paddingBottom:3,marginTop:-9, fontWeight: '500',color:'#cde7e3', paddingLeft:8}}>
                  .
            </Text>
          </View>
          <ScrollView keyboardShouldPersistTaps={'always'} style={{width: width}}>

          <View center style={{backgroundColor: '#fff', width: width, padding: 10}}>
            <Text center style={{color: '#62b9b0', fontSize: p20, fontWeight: '500'}}>
              Payable Amount After Shift
            </Text>
            <Text center style={{color: '#bfc4c4', fontSize: p17,marginTop: 5}}>
              (including break time)
            </Text>
            <View style={{flex:1, flexDirection:'row', marginTop:8,}}>
              <View style={{padding:10, flex:0.49,alignItems:'flex-start', backgroundColor:'#d6eeec', height:105, width:0, marginLeft: 10,borderRadius:12}}>
                <Text center style={{color: '#62b9b0', fontSize: p15, paddingTop:8, alignSelf:'center', borderRadius:40, borderColor: '#acd9d6', width:120, marginTop: 2, height:40, alignItems:'center', justifyContent:'center'}}>
                  Amount
                </Text>
                <Text center style={{color: '#62b9b0',  backgroundColor:'#d6eeec', fontWeight:'600',fontSize: p22, alignSelf:'center', paddingTop:2, borderRadius:40, borderColor: '#acd9d6', width:120, marginTop: 2, height:40, alignItems:'center', justifyContent:'center'}}>
                  £{this.totalAmount}
                </Text>
              </View>
              <View style={{padding:10, flex:0.49, alignItems:'flex-end', backgroundColor:'#f7f7f7', height:105, width:0, marginLeft: 10,borderRadius:12}}>
                <Text center style={{color: '000000', fontSize: p15, paddingTop:8, alignSelf:'center', borderRadius:40, borderColor: '#acd9d6', width:180, marginTop: 2, height:40, alignItems:'center', justifyContent:'center'}}>
                  Our Calculated Total
                </Text>
                <Text center style={{color: '#000000', fontWeight:'600', fontSize: p22, alignSelf:'center', paddingTop:2, borderRadius:40, borderColor: '#acd9d6', width:120, marginTop: 2, height:40, alignItems:'center', justifyContent:'center'}}>
                  £{totalCalculatedAmount ? totalCalculatedAmount.toFixed(2) : null}
                </Text>
              </View>
            </View>
          </View>
          <View center style={{backgroundColor: '#fff', width: width, padding: 10}}>
            <Text center style={{color: '#000000', fontSize: p20, fontWeight: '500'}}>
              Enter Total Break Time
            </Text>
            <Text center style={{color: '#bfc4c4', fontSize: p15,marginTop: 5}}>
              Minutes
            </Text>
            <TextInput
              ref={ref => this.minutes = ref}
              // style={{borderRadius: 20, borderColor: '#069987', borderWidth: 2}}
              style={pickerSelectStyles.input}
              borderless
              placeholder=""
              keyboardType="numeric"
              value={minutes}
              onChangeText={text => this.handleChange('minutes', text)}
            />
            <Text style={{color: '#bfc4c4', fontSize: p15,marginTop: 5}}>
              Employees may apply break time deductions following submission of this timesheet
            </Text>
          </View>
          <KeyboardAwareScrollView
            ref={ref => this.scrollView = ref} keyboardShouldPersistTaps={'handled'}
            style={{ flex: 1 }}
          >
            <View style={ pickerSelectStyles.container }>

                    <View style={{flexDirection: 'row',backgroundColor:'#fff',marginTop:5, flex:1}}>
                      <View style={{flex:0.05}}>
                      </View>
                      <Button
                        style={{height: 40, borderRadius: 30, flex:0.4, marginBottom:'5%',justifyContent:'center'}}
                        color={argonTheme.COLORS.CANCEL}
                        onPress={() => this.props.navigation.navigate('HoursWorked')}
                        textStyle={{ color: argonTheme.COLORS.WHITE, fontWeight: '500',marginBottom:'10%',fontSize:p15 }}
                      >
                        Back
                      </Button>
                      <View style={{flex:0.1}}>
                      </View>
                      <Button
                        style={{height: 40, borderRadius: 30, flex:0.4, marginBottom:'5%',justifyContent:'center'}}
                        color={argonTheme.COLORS.DEFAULTCOLOR}
                        onPress={this.onNavigation}
                        textStyle={{ color: argonTheme.COLORS.WHITE, fontWeight: '500',marginBottom:'10%', fontSize:p15, }}
                      >
                        Next
                      </Button>

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
  input: {
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
    borderWidth: 2,
    fontSize: p20,
    alignSelf: 'center',
    borderRadius:40,
    borderColor: '#acd9d6',
    width:120,
    marginTop: 5,
    height:44,
    textAlign: 'center'
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
    marginLeft:'5%',
    borderRadius: 30,
    marginBottom:'7%',
  },
});

const mapStateToProps = state => ({
  // devices: state.device.devices,
  // marker: state.device.deviceInfo.position
});

const mapDispatchToProps = dispatch => ({
  // getUserToken: token => dispatch(getUserToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalculateShiftSalary);
