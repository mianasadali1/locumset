import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  View,
  Picker,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
  ImageBackground,
  RefreshControl,
  BackHandler
} from "react-native";
import { connect } from 'react-redux';
import { Block, Text, theme, Button } from "galio-framework";
import DatePicker from 'react-native-datepicker';
import { argonTheme } from '../../Themes/constants';
import Popover from 'react-native-popover-view';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Images } from '../../Themes';
import { withNavigation } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import changeNavigationBarColor, {
  HideNavigationBar,
  ShowNavigationBar,
} from 'react-native-navigation-bar-color';

import PropTypes from 'prop-types';

import CompletedJobsActions from '../../Redux/Dashboard/CompletedJobsRedux'
import PaymentActions from '../../Redux/PaymentRedux'

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

class Completed extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptToGetCompletedJobs: PropTypes.func,
  };

  state = {
    "switch-1": true,
    isVisible: false,
    completedJobsList: [],
  }
  constructor(props){
    super(props)
      this.props.attemptToGetCompletedJobs();
      this.handleBackPress = this.handleBackPress.bind(this);
      // HideNavigationBar();
  }

  componentWillMount () {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    // ShowNavigationBar();
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }

  toggleSwitch = (switchId) =>{
    let data = {
      job_id:switchId
    }
    console.log('job  id : ', switchId, this.state['switch-'+switchId]);
      this.setState({ ['switch-'+switchId]: !this.state[switchId] });

      this.props.attemptUpdatePayment(data);
    }
  onChangeText = (key, val) => {
      this.setState({ [key]: val })
  }

  showPopover(){
    this.setState({isVisible: true});
    console.log('showPopover: '+ this.state.isVisible);
  }
  closePopover(){
    this.setState({isVisible: false});
  }
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }

   _onRefresh() {
      //console.error('asdf')
      if(!this.props.fetching){
        this.props.attemptToGetCompletedJobs(null);
      }
    }

  render() {
    const { completedJobsList, fetching, up_fetching } = this.props;
    const placeholder = {
      label: 'Select Hospital',
      value: null,
      color: '#ddd',
    };
    const dept = {
      label: 'Select Department',
      value: null,
      color: '#ddd',
    };
    const grade = {
      label: 'Select Grade',
      value: null,
      color: '#ddd',
    };


    return (

      <ImageBackground  source={Images.background} style={{ flex: 1, width: width, height:height}}>
        <View style={{width: width, height: 157, marginBottom: p10}}>
          <View style={{width: width, height: 60}}>
            <View style={{ padding: 10, paddingLeft: 0, paddingVertical: 15}}>
              <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                <Image source={require('../assets/images/back_ic.png')} />
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <View center style={{backgroundColor: '#2D3C6A9E', width: width*0.96, borderRadius: 10, paddingHorizontal:10, paddingVertical: 5, marginTop: 30}}>
                  <Text center style={{color: '#fff', textAlign: 'center', fontWeight: '600', paddingBottom: 10, fontSize:19}}>COMPLETED SHIFTS</Text>
                  <View style={{ color: '#555', fontWeight: '600', flexDirection: 'row', marginBottom: 5 }}>
                    <Image source={require('../assets/images/clock_green.png')} />
                    {this.state.hospital_name ? <Text style={{fontSize: p15, marginTop: -5, marginLeft: p10, color: '#fff'}}>{this.state.hospital_name}</Text> : <Text style={{borderColor: '#dcdcdc', fontSize: p15, marginLeft: p10, width: width*0.5, color: '#fff', marginTop: -5}}>All Hospitals</Text>}
                  </View>
                  <View style={{ color: '#555', fontWeight: '600', flexDirection: 'row', marginBottom: 5 }}>
                    <Image source={require('../assets/images/clock_green.png')} />
                    {this.state.department_name ? <Text style={{fontSize: p15, marginTop: -5, marginLeft: p10, color: '#fff'}}>{this.state.department_name}</Text> : <Text style={{borderColor: '#dcdcdc',fontSize: p15, marginLeft: p10, width: width*0.5, color: '#fff', marginTop: -5}}>All Departments</Text>}
                  </View>
                  <View style={{ color: '#555', fontWeight: '600', flexDirection: 'row', marginBottom: 5 }}>
                    <Image source={require('../assets/images/clock_green.png')} />
                    {this.state.grade_name ? <Text style={{fontSize: p15, marginTop: -5, marginLeft: p10, color: '#fff'}}>{this.state.grade_name}</Text> : <Text style={{borderColor: '#dcdcdc', fontSize: p15, marginLeft: p10, width: width*0.5, color: '#fff', marginTop: -5}}>All Grades</Text>}
                  </View>
              </View>
            </View>
          </View>
          <View style={{width: width, marginTop:-20, height: 100}}>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps={'always'} style={{flex:1, width: width, marginTop: 25}} refreshControl={
          <RefreshControl
            refreshing={fetching}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <View>
            {completedJobsList && completedJobsList.length > 0 ? completedJobsList.map((item, key) => {
              return (
                <View key={item.id} style={{marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{flexDirection:"row", justifyContent: 'space-between', backgroundColor: '#7bcbc2', width: width*0.96, borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10}}>
                    <Text style={{color: '#000', fontSize: 12, marginRight: 20}}>
                      <Image source={Images.calendarRed} style={{paddingRight: 5}} />
                        {"  "}
                        {item.date}
                    </Text>
                    <Text style={{color: '#000', fontSize: 12}}>
                      <Image source={Images.clockRed} style={{paddingRight: 5}} />
                        {"  "}
                        {item.timesheet_time_from} - {item.timesheet_time_to}
                    </Text>
                  </View>
                  <View style={{flexDirection:"row", backgroundColor: '#ebf7f7', width: width*0.96, paddingHorizontal: 10, paddingVertical: 5}}>
                    <View style={{flex: 0.8}}>
                      <Text style={{color: '#03998d', fontSize: p15, fontWeight:'600'}}>
                          {item.title.toUpperCase()}
                      </Text>
                      <Text>
                          {item.hospital_name}
                      </Text>
                    </View>
                    <View style={{flex: 0.2}}>
                      <Text center style={{backgroundColor: '#009e87', borderRadius: 15, padding: 5, color: '#fff', fontWeight: '600'}}>
                          £{item.rate}
                      </Text>
                    </View>
                  </View>

                  <View style={{flexDirection:"row", backgroundColor: '#ebf7f7', width: width*0.96, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingHorizontal: 10, paddingVertical: 5, paddingBottom: 15}}>
                    { item.overall_status == 'timesheet' ?
                      <View center style={{width:width*0.85, marginHorizontal: width*0.10/2, borderRadius: 15, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', paddingVertical: 5}}>
                        <Text center style={{color: '#4b5b5a',fontSize:p15, fontWeight: '500'}}>
                          Timesheet Issue
                        </Text>
                      <Text style={{position:'absolute', left: 0, backgroundColor: '#FC8D4C', width: width*0.2125, top: 0, bottom: 0, zIndex: -1, borderBottomLeftRadius: 15, borderTopLeftRadius: 15,}}></Text>
                      </View> :
                    item.overall_status == 'notify' ?
                      <View center style={{width:width*0.85, marginHorizontal: width*0.10/2, borderRadius: 15, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', paddingVertical: 5}}>
                        <Text center style={{color: '#4b5b5a',fontSize:p15, fontWeight: '500'}}>
                          Notified By Manager
                        </Text>
                        <Text style={{position:'absolute', left: 0, backgroundColor: '#63B8FF', width: width*0.425, top: 0, bottom: 0, zIndex: -1, borderBottomLeftRadius: 15, borderTopLeftRadius: 15,}}></Text>
                      </View> :
                    item.overall_status == 'approved' ?
                      <View center style={{width:width*0.85, marginHorizontal: width*0.10/2, borderRadius: 15, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', paddingVertical: 5}}>
                        <Text center style={{color: '#4b5b5a',fontSize:p15, fontWeight: '500'}}>
                          Approved By Manager
                        </Text>
                        <Text style={{position:'absolute', left: 0, backgroundColor: '#73E977', width: width*0.6375, top: 0, bottom: 0, zIndex: -1, borderBottomLeftRadius: 15, borderTopLeftRadius: 15,}}></Text>
                      </View> :
                    item.overall_status == 'payroll' ?
                      <View>
                        <View center style={{width:width*0.85, marginHorizontal: width*0.10/2, borderRadius: 15, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', paddingVertical: 5 }}>
                          <View style={{flexDirection: 'row'}}>
                            <Text center style={{color: '#4b5b5a',fontSize:p15, fontWeight: '500' , width: width*0.85}}>
                              Sent To Payroll
                            </Text>
                          </View>
                          <Text style={{position:'absolute', left: 0, backgroundColor: '#5EEEEC', width: width*0.85, top: 0, bottom: 0, zIndex: -1, borderRadius: 15,}}></Text>
                        </View>
                        <View style={{width:width*0.85, marginHorizontal: width*0.10/2, flexDirection: 'row', borderRadius: 15, borderWidth: 0,height:30, backgroundColor: '#CCFFFF'}}>
                          <Text center style={{color: '#4b5b5a',fontSize:p15, position: 'absolute',fontWeight: '500' ,paddingLeft:width*0.2, width: width*0.65,borderRadius: 15, borderTopRightRadius:0,borderBottomRightRadius:0,alignItems:'center',textAlign:'center',alignSelf:'center'}}>
                            Payment Recieved
                          </Text>
                          <Switch
                            value={this.state["switch-"+item.id]}
                            onValueChange={() => this.toggleSwitch(item.id)}
                            style={{flex:0.85,width:width*0.2, height: 15,marginTop:6,marginLeft:width*0.75}}
                          />
                        </View>
                      </View> : null
                    }
                  </View>
                </View>
              );
            }): <View style={{justifyContent: 'center',alignItems: 'center'}}>
            <Image
          center
          source={Images.noData}
          
        />
        </View>}
          </View>
        </ScrollView>
      </ImageBackground>

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
  header: {
    flex: 0,
    backgroundColor: '#009D8B',
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 40,
    marginBottom: 20
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
    paddingBottom: 5,
    height:height,
    flex:1,
 },
 text: {
    color: '#4f603c',
    padding: 10,
    width: width*0.33,
    flex: 1,
 }
});

const mapStateToProps = state => ({
    completedJobsList: state.completedJobs.completedJobs,
    fetching: state.completedJobs.fetching,
    up_fetching: state.profile.up_fetching,
});

const mapDispatchToProps = dispatch => ({
    attemptToGetCompletedJobs: () => dispatch(CompletedJobsActions.completedJobsRequest()),
    attemptUpdatePayment: data => dispatch(PaymentActions.updatePaymentRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Completed);
