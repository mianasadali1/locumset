import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  Image,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  Linking
} from 'react-native';
// import { setMapSetting , setSettings, setRefresh} from '../Redux/actions/settings';
import { Block, Text, theme, Button } from "galio-framework";
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { connect } from 'react-redux';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import { Images } from '../../Themes';
import moment from 'moment'

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
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
// Import JobdetailActions from JobDetailRedux
import JobsDetailActions from '../../Redux/AllJobsRedux/JobdetailRedux'

class JobDetail extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptToGetJobDetail: PropTypes.func,
    attemptToJobCancel: PropTypes.func,
    attemptToJobApply: PropTypes.func,

    attemptToApplyJob: PropTypes.func

	};
  constructor(props){
    super(props)
    this.state = {
     jd : [],
    applied_status:true
    }
    this.data = props.navigation.state.params;
    this.handleBackPress = this.handleBackPress.bind(this);
  }
  async componentDidMount() {
    var jobId = {
      job_id: this.props.navigation.state.params.job_id,
    }
  this.props.attemptToGetJobDetail(jobId)
  }

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    // this.props.saveSettings(this.props.settings);
  }

  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }

  toggleSwitchValume = (value) => {
    this.setState({switchValume: value})
 }

  toggleSwitchSound = (value) => {
    this.setState({switchSound: value})
  }
  openPopup = () =>{
    this.setState({ visible: true })
  }

  openMapPopup = () =>{
    this.setState({ mapVisible: true })
  }
  openRefreshPopup = () =>{
    this.setState({ refreshVisible: true })
  }
  onMapSelect = () =>{
    console.log(this.state.mapValue);
    this.props.setMapType(this.state.mapValue);
    this.setState({ mapVisible: false });
  }
  onRefreshSelect = () =>{
    console.log(this.state.refrehValue);
    this.props.setRefresh(this.state.refreshValue);
    this.setState({ refreshVisible: false });
  }

    // ApplyJob = (job_id, job_detail_id) => {
    //     console.log('ApplyJob', job_id, job_detail_id);
    //     let data = {
    //       job_id,
    //       job_detail_id
    //     }
    //     this.props.attemptToJobApply(data);

    ApplyJob = (job_id, detail_id) => {
        console.log('ApplyJob', job_id, detail_id);
        var pass_data = {
            job_id: job_id,
            job_detail_id: detail_id
        }
        this.props.attemptToApplyJob(pass_data)

    }

    cancelJob = (job_id, job_detail_id) => {
        let data = {
          job_id,
          job_detail_id,
        }
        this.props.attemptToJobCancel(data);

    }

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }

  openEmail = (address) => {
    Linking.openURL('mailto:' + address)
  }

  openPhoneCall = (phoneNo) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + phoneNo + '}';
    }
    else {
      phoneNumber = 'telprompt:${' + phoneNo + '}';
    }
    Linking.openURL(phoneNumber);
  }

  render() {

      const { jobDetail, appliedJobsData, fetching } = this.props;
      var monthName = jobDetail ? moment(moment(jobDetail.data.date, 'DD/MM/YYYY').format('MMM')) : '';
      var date = jobDetail ? moment(moment(jobDetail.data.date, 'DD/MM/YYYY').format('DD')) : '';
      var showDate = jobDetail ? moment(moment(jobDetail.data.date, 'DD/MM/YYYY').format('DD MMM YYYY')) : '';
      console.log('job detail', jobDetail)
    return (
        <Block style={{width: width, flex: 1, backgroundColor: '#fff'}}>
          <Spinner
            visible={fetching}
          />
            <ImageBackground source={require('../assets/images/header_img.png')} style={{width: width, aspectRatio: 2.5}}>
              <View style={{width: width, flexDirection: 'row'}}>
                <View style={{width: width*0.15, padding: 10, paddingLeft: 0, paddingVertical: 15}}>
                  <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                    <Image source={require('../assets/images/back_ic.png')} />
                  </TouchableOpacity>
                </View>
                <View style={{padding: 10, width: width*0.7,paddingVertical: 17}}>
                  <Text center style={{color: '#fff', textAlign: 'center', fontWeight: '600', fontSize:19}}>Shift Detail</Text>
                </View>
              </View>
            </ImageBackground>
            <View style={{backgroundColor: '#EBF1EF', width: width, height: 100}}>
            </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View center style={{ flexDirection: 'row', backgroundColor: '#fff',  marginTop: 10, width: width*0.85, borderRadius: 10, padding: 20, marginTop: -150,
              shadowOffset: {
              width: 0,
              height: 0,
              },
              shadowRadius: 10,
              elevation: 1}}>
              <View style={{backgroundColor: '#029B89', width: 80, borderRadius: 10, overflow: 'hidden'}}>
                <View style={{ backgroundColor: '#26AB9A', width: 80, height: 35, alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={Images.calendarWhite} style={{width: 18, height: 22}} />
                </View>
                <View style={{ height: 55}}>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#fff', fontSize: p20, fontWeight: '600'}}>{jobDetail ? date._i : ''}</Text>
                  </View>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#fff', fontSize: p17}}>{jobDetail ? monthName._i : ''}</Text>
                  </View>
                </View>
              </View>
                <View style={{paddingLeft: 15, width: '75%'}}>
                  <View>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: '#5eb7ae', fontWeight: '600', fontSize: p15, paddingRight: 5 }}>{jobDetail ? jobDetail.data.title.toUpperCase() : ''}</Text>
                  </View>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: '#555', paddingTop: 10, fontSize: p15}}>
                    {jobDetail ? jobDetail.data.department_name : ''}
                  </Text>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: '#555', fontSize: p15}}>
                    {jobDetail ? jobDetail.data.hospital_name : ''}
                  </Text>
                </View>
              </View>
              <View center style={{backgroundColor: '#fff', flex: 1, marginTop: 10, width: width, paddingVertical: 5}}>
                  <View style={{marginTop: 5}}>
                  <ScrollView showsVerticalScrollIndicator={false} style={{ width: width }} keyboardShouldPersistTaps={'always'}>
                  <View style={{paddingHorizontal: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 15}}>
                      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={Images.calendarGreen} />
                        <Text style={{color: 'red', marginLeft: 5,fontSize:p15,fontWeight:'600'}}>{jobDetail ? showDate._i : ''}</Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={Images.clockGreen} />
                        <Text style={{color: 'red', marginLeft: 5,fontSize:p15, fontWeight:'600'}}>{jobDetail ? jobDetail.data.time_from : ''} - {jobDetail ? jobDetail.data.time_to : ''}</Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    {jobDetail && jobDetail.data_detail.map((item, key) => {
                      var duration = moment.duration(moment(item.time_to).diff(moment(item.time_from)));
                      this.hours = duration.asHours();
                      this.diffTime = this.hours*60;
                      var totalCalculatedAmount = this.hours * item.rate;
                        return(
                          <View>
                            <View key={item.id}  style={{ width: '82%', borderRadius: 6, marginBottom: 10, marginTop: 3, paddingTop: 15, paddingVertical: 10, paddingRight: 0,  borderBottomWidth: 1, borderColor: '#e6e6e6', backgroundColor: '#DEF2F0', alignSelf: 'center'}}>
                              <View style={{width: '100%'}}>
                                <View style={{flexDirection: 'row'}}>
                                  <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', paddingHorizontal: 10 }}>
                                    <View style={{padding: 5, width: '100%'}}>
                                      <Text center style={{fontSize: p15, color:'#5eb7ae', marginTop:-7}}>
                                        {item.grade_name}
                                      </Text>
                                    </View>
                                    <View style={{padding: 5, paddingTop: 2, paddingLeft: 18}}>
                                      <View>
                                        <Text center style={{color: '#555', fontSize: p15, paddingLeft: 2}}>
                                            £{item.rate} per hour from {item.time_from} to {item.time_to}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                                <View style={{ marginTop:5, alignItems: 'center', justifyContent: 'center',}}>
                                  {item.is_appllied ? <Button
                                      style={{width:'70%', backgroundColor:'#EC9092',height:35,borderRadius: 30,}}
                                      styleDisabled={{color: 'red'}}
                                      title="Cancel"
                                      onPress={() => this.cancelJob(jobDetail? jobDetail.data.id : null, jobDetail ? jobDetail.data.job_detail_id : null)}
                                  >
                                      Cancel
                                  </Button> : jobDetail && !jobDetail.applied_status ? <Button
                                      style={{width:'70%', backgroundColor:'#009b8b',height:35,borderRadius: 30, fontSize:p15}}
                                      styleDisabled={{color: 'red'}}
                                      onPress={() => this.ApplyJob(item.job_id, item.id)}
                                      title="Apply"
                                  >
                                      Apply
                                  </Button> : <View />}
                                </View>
                              </View>
                            </View>
                            </View>

                        );
                    })}

                    <View style={{ width: '88%', borderRadius: 6, marginBottom: 10, marginTop: 10, paddingTop: 10, paddingVertical: 10, paddingRight: 0,  borderBottomWidth: 1, borderColor: '#e6e6e6', backgroundColor: '#55E2B7', alignSelf: 'center'}}>
                      <View style={{width: '100%'}}>
                          <View style={{ width: '100%', paddingHorizontal: 10 }}>
                            {jobDetail && jobDetail.data.description && <View style={{padding: 5, width: '100%'}}>
                              <Text style={{fontSize: p15,fontWeight: '500', color: '#06A78B', paddingBottom: 5}}>Notes:</Text>
                              <Text style={{fontSize: p15, color:'#fff', marginTop:-7}}>
                                {jobDetail.data.description}
                              </Text>
                            </View>}
                          </View>
                      </View>
                      <Text style={{ color: '#06A78B', fontSize: p15, fontWeight: '500', paddingHorizontal: 15}}>Contact Info</Text>
                      <TouchableOpacity onPress={() => this.openEmail(jobDetail.data.admin_email)}>
                        <View style={{padding: 3, justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{fontSize: p15, textDecorationLine: 'underline', color: '#fff'}}>{jobDetail ? jobDetail.data.admin_email : ''}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.openPhoneCall(item.admin_phone)}>
                        <View style={{padding: 3, justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{fontSize: p15, textDecorationLine: 'underline', color: '#fff'}}>{jobDetail? jobDetail.data.admin_phone : ''}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                {false && jobDetail.applied_status ? <View style={{flexDirection:"row", width: '100%', paddingHorizontal: 10, paddingVertical: 5, paddingBottom: 15}}>
                    <TouchableOpacity onPress={() => this.cancelJob(jobDetail.data.id, jobDetail.data.job_detail_id)} center style={{ borderRadius: 15, borderWidth: 1, borderColor: '#FDE3E4', backgroundColor:  '#D5EDFC' , paddingVertical: 5}}>
                        <Text center style={{color: '#4b5b5a', fontWeight: 'bold'}}>
                            Cancel
                        </Text>
                        <Text style={{position:'absolute', left: 0, backgroundColor: '#fcd5d6', width: '100%', top: 0, bottom: 0, zIndex: -1, borderBottomLeftRadius: 15, borderRadius: 15,}}></Text>
                    </TouchableOpacity>
                </View> : <View/> }
                </View>
                </ScrollView>
                </View>
                </View>
          </View>
        </Block>
    );
  }
}

const mapStateToProps = state => ({
  appliedJobsData: state.account.appliedJobs,
  jobDetail: state.jobDetail.jobsDetail,
  fetching: state.jobDetail.fetching,
});

const mapDispatchToProps = dispatch => ({
  attemptToGetJobDetail: jobId => dispatch(JobsDetailActions.jobsDetailRequest(jobId)),
  attemptToJobCancel: data => dispatch(JobsDetailActions.jobCancelRequest(data)),
  // attemptToJobApply: data => dispatch(JobsDetailActions.jobApplyRequest(data)),

  attemptToApplyJob: data => dispatch(JobsDetailActions.applyJobRequest(data))

});

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
  },
  // Top Header
  header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 40,
    marginBottom: 20,
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
  container: {
    paddingBottom: 0,
    backgroundColor: '#fff',
    height:38,
    marginLeft:-10,
    marginRight:10
 },
});

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);
