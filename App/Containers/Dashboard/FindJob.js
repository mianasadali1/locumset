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
import moment from 'moment'
import PropTypes from 'prop-types';
import AlljobsActions from '../../Redux/AllJobsRedux/WardcoverRedux'
import changeNavigationBarColor, {
  HideNavigationBar,
  ShowNavigationBar,
} from 'react-native-navigation-bar-color';

// Import ProfileActions from ProfileRedux file
import ProfileActions from '../../Redux/ProfileRedux/ProfileRedux';

import PreferenceActions from '../../Redux/PreferencesRedux';
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

class FindJob extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func,
        fetching: PropTypes.bool,
        attemptToGetAllJobs: PropTypes.func,
        attemptToGetPreference: PropTypes.func,
    };

  state = {
    isVisible: false,
    newJobs: [],
    hospital_name: '',
    department_name: '',
    grade_name: '',
    hospital_id: '',
  }
  constructor(props){
    super(props)
      this.pas_data = {
          pref: 'pref'
      }
      this.props.attemptToGetAllJobs(this.pas_data);
      this.props.attemptToGetHospitals();
      this.props.attemptToGetPreference();
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

  showPopover(){
    this.setState({isVisible: true});
    console.log('showPopover: '+ this.state.isVisible);
  }
  componentWillReceiveProps(props){
    if(this.props.hospitalsData && this.props.preferenceData) {
      if(this.props.hospitalsData.hospitals){
        this.props.hospitalsData.hospitals.map((hosp) => {
          if(hosp.value == this.props.preferenceData.hospital_id){
            this.state.hospital_name = hosp.label;
          }
        });
      }
      if(this.props.hospitalsData.departments){
        this.props.hospitalsData.departments.map((hosp) => {
          if(hosp.value == this.props.preferenceData.department_id){
            this.state.department_name = hosp.label;
          }
        });
      }
      if(this.props.hospitalsData.grades){
        this.props.hospitalsData.grades.map((hosp) => {
          if(hosp.value == this.props.preferenceData.grade_id){
            this.state.grade_name = hosp.label;
          }
        });
      }
    }
  }
  closePopover(){
    this.setState({isVisible: false});
  }
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
   _Wardcover = () => {
      console.log('Wardcover');
      this.props.navigation.navigate('Wardcover');
    }

    _onRefresh() {
      if(!this.props.fetching){
        this.props.attemptToGetAllJobs(this.pas_data);
      }
    }

  render() {
      const { newJobs, preferenceData, fetching } = this.props;
      console.log('My preferred jobs : ', newJobs, fetching);
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
        <Block center style={{flex: 1}}>
          <ImageBackground  source={Images.background} style={{flex: 1, width: width, height:height}}>
            <View style={{width: width, height: 157, marginBottom: p20}}>
              <View style={{width: width, height: 60}}>
                <View style={{  padding: 10, paddingLeft: 0, paddingVertical: 15}}>
                  <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                    <Image source={require('../assets/images/back_ic.png')} />
                  </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                  <View center style={{backgroundColor: '#2D3C6A9E', width: width*0.96, borderRadius: 10, paddingHorizontal:10, paddingVertical: 5, marginTop: 30}}>
                      <Text center style={{color: '#fff', textAlign: 'center', fontWeight: '600', paddingBottom: 10, fontSize:19}}>MY PREFERRED SHIFTS</Text>
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
            <Block center style={pickerSelectStyles.container}>
              <Button
                    style={pickerSelectStyles.button2}
                        color='#009D8B'
                        textStyle={{fontWeight: '500',marginBottom:'6%', color: '#fff' }}
                        onPress={this._Wardcover}
                    >
                        Go To All Shifts
              </Button>
            </Block>
            <View center style={{
                      flex: 1,
                      alignItems:'center',
                      justifyContent:'center'}}>
              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} style={{marginTop: p20}} refreshControl={
                <RefreshControl
                  refreshing={fetching}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }>


                  {newJobs && newJobs.length > 0 ? newJobs.map((item, key) => {
                    console.log('preferred job id:'+item.id);
                      var showBlue = false;
                      if(preferenceData && (preferenceData.hospital_id == item.hospital_id || preferenceData.department_id == item.departments_id)) {
                        showBlue = true;
                      }
                      let currentDate = moment(new Date());
                      let itemDate = moment(moment(item.date, 'DD/MM/YYYY').format('YYYY-MM-DD'));

                      var showJOb = false;
                        let dateDiff = itemDate.diff(currentDate, 'days') + 1;
                      if(dateDiff > 0) {
                         showJOb = true;
                      }
                      console.log('date difference', dateDiff)
                      return (
                          <View center style={{flex: 1, width: width*0.98,}}>
                              {showJOb ? <View key={item.id} style={{marginBottom: 5}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('JobDetail', {job_id : item.id})} center style={{flex: 1, borderRadius: 15, paddingVertical: 0}}>
                                  <View style={{flexDirection:"row",  backgroundColor: dateDiff <= 1 ? '#FDE3E4' : showBlue ? '#d2e9f7' : '#E3F5F3', width: '100%', paddingHorizontal: 10, paddingVertical: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                                    <View style={{flex: 0.6}}>
                                        <Text style={{color: dateDiff <= 1 ? '#DD2226' : showBlue ? '#0977B9' : '#009e87', fontSize: p15, fontWeight: '600'}}>
                                          {item.title.toUpperCase()}
                                        </Text>
                                        <Text style={{color: '#000', fontSize: p15,paddingTop:3}}>
                                          {item.hospital_name}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.4, textAlign: 'right'}}>
                                      <View style={{textAlign: 'right'}}>
                                      <Text center style={{alignSelf: 'flex-end', width: 80, backgroundColor: dateDiff <= 1 ? '#DD2226' : showBlue ? '#0977B9' : '#009e87', borderRadius: 15, padding: 5, color: '#fff',fontSize: p15, fontWeight: '600'}}>
                                          £{item.rate}/hr
                                      </Text>
                                      </View>
                                      <Text style={{color: '#000', fontSize: p15, textAlign: 'right', paddingBottom:1, paddingTop:3}}>
                                         <Image source= {dateDiff <= 1 ? require('../assets/images/clock_red.png') : showBlue ? require('../assets/images/clock_blue.png') : require('../assets/images/clock_green.png')} style={{paddingRight: 5}} />
                                         {"  "}
                                         {item.time_from} - {item.time_to}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={{flexDirection:"row", backgroundColor: dateDiff <= 1 ? '#fcbbbd' : showBlue ? '#c3e5fa' : '#a4e0d8', width: '100%', paddingHorizontal: 10, paddingVertical: 5, marginBottom: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                                    <Text style={{flex: 0.6, color: '#000',fontSize: p15, fontWeight:'600' }}>
                                      {item.department_name}
                                    </Text>
                                    <Text style={{flex: 0.4, color: '#000', fontSize: p15, fontWeight:'600', textAlign: 'right'}}>
                                       <Image source={dateDiff <= 1 ? require('../assets/images/calendar_red.png') : showBlue ? require('../assets/images/calendar_blue.png') : require('../assets/images/calendar_green.png')} style={{paddingRight: 5}} />
                                       {"  "}
                                       {moment(itemDate).format('DD MMM YYYY')}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View> : <View />}
                          </View>
                      );
                  }) : <View style={{padding: 20}}>
                    <Image center source={Images.noData}/>
                  </View>}
              </ScrollView>
            </View>
          </ImageBackground>
        </Block>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  container: {
    height: 50,
    width:width,
    marginTop:20
  },
  button2:{
    width: 180,
    height: 30,
    borderRadius: 30,
    marginBottom:'3%',
    marginTop:25
  },
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
 },
 text: {
    color: '#4f603c',
    padding: 10,
    width: width*0.33,
    flex: 1,
 }
});

const mapStateToProps = state => ({
    token: state.account.token,
    newJobs: state.allJobs.allJobs,
    fetching: state.allJobs.fetching,
    preferenceData: state.preference.preferenceData,
    hospitalsData: state.profile.hospitalsData,
});

const mapDispatchToProps = dispatch => ({
    attemptToGetAllJobs: data => dispatch(AlljobsActions.allJobsRequest(data)),
    attemptToGetPreference: () => dispatch(PreferenceActions.preferenceRequest()),
    attemptToGetHospitals: token => dispatch(ProfileActions.hospitalsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FindJob);
