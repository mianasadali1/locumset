import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  Image,
  BackHandler,
  ImageBackground,
} from 'react-native';
// import { setMapSetting , setSettings, setRefresh} from '../Redux/actions/settings';
import { Block, Text, theme, Button } from "galio-framework";
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { connect } from 'react-redux';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Images } from '../../Themes';
// Import JobdetailActions from HiredDetailRedux
import HiredDetailActions from '../../Redux/AllJobsRedux/HiredDetailRedux'
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

class HiredDetail extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptToGetHiredDetail: PropTypes.func,
    attemptToRejectJob: PropTypes.func
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
      console.log('job id', this.props.navigation.state.params.job_id);
      var jobId = {
        job_id: this.props.navigation.state.params.job_id,
      }
    this.props.attemptToGetHiredDetail(jobId)
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
    RejectJob = (jobId, jobDetailId) => {
        console.log('RejectJob', this.props.navigation.state.params.job_id);
        var pass_data = {
            job_id: jobId,
            job_detail_id: jobDetailId
        }

        this.props.attemptToRejectJob(pass_data)
    }

  render() {

      const { hiredDetail, jobData, applied_status, fetching, rejectFetching } = this.props;
      var monthName = hiredDetail ? moment(moment(hiredDetail.data.date, 'DD/MM/YYYY').format('MMM')) : '';
      var date = hiredDetail ? moment(moment(hiredDetail.data.date, 'DD/MM/YYYY').format('DD')) : '';
      var showDate = hiredDetail ? moment(moment(hiredDetail.data.date, 'DD/MM/YYYY').format('DD MMM YYYY')) : '';
      console.log('hired datail', hiredDetail)
    return (
        <Block style={{width: width, height: height, backgroundColor: '#EBF1EF'}}>
          <Spinner
            visible={fetching}
          />
          <Spinner
            visible={rejectFetching}
          />
          <ImageBackground source={require('../assets/images/header_img.png')} style={{width: width, aspectRatio: 2.5}}>
            <View style={{width: width, flexDirection: 'row'}}>
              <View style={{width: width*0.15, padding: 10, paddingLeft: 0, paddingVertical: 15}}>
                <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                  <Image source={require('../assets/images/back_ic.png')} />
                </TouchableOpacity>
              </View>
              <View style={{padding: 10, width: width*0.7,paddingVertical: 17}}>
                <Text center style={{color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize:19}}>Hired Shift Detail</Text>
              </View>
            </View>
          </ImageBackground>
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <View center style={{ flexDirection: 'row', backgroundColor: '#fff',  marginTop: 10, width: width*0.85, borderRadius: 10, padding: 20, marginTop: -50,
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
                    <Text style={{color: '#fff', fontSize: p20, fontWeight: '600'}}>{hiredDetail ? date._i : ''}</Text>
                  </View>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#fff', fontSize: p17}}>{hiredDetail ? monthName._i : ''}</Text>
                  </View>
                </View>
              </View>
              <View style={{paddingLeft: 15, width: '75%'}}>
                <View>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: '#5eb7ae', fontWeight: '600', fontSize: p15, paddingRight: 5 }}>{hiredDetail ? hiredDetail.data.title.toUpperCase() : ''}</Text>
                </View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: '#555', paddingTop: 10, fontSize: p15}}>
                  {hiredDetail ? hiredDetail.data.department_name : ''}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: '#555', fontSize: p15}}>
                  {hiredDetail ? hiredDetail.data.hospital_name : ''}
                </Text>
              </View>
            </View>
            <View center style={{backgroundColor: '#fff',  marginTop: 10, width: width, height:height, paddingVertical: 5, paddingBottom: 30}}>
              <View style={{paddingHorizontal: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 15}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={Images.calendarGreen} />
                    <Text style={{color: 'red', marginLeft: 5,fontSize:p15,fontWeight:'600'}}>{hiredDetail ? showDate._i : ''}</Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={Images.clockGreen} />
                    <Text style={{color: 'red', marginLeft: 5,fontSize:p15, fontWeight:'600'}}>{hiredDetail ? hiredDetail.data.time_from : ''} - {hiredDetail ? hiredDetail.data.time_to : ''}</Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 5}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: width, aspectRatio: 1.2}} keyboardShouldPersistTaps={'always'}>
                  <View>
                    {hiredDetail && hiredDetail.data_detail.map((item, key) => {
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
                              <View style={{ marginTop:3, alignItems: 'center', justifyContent: 'center',}}>
                                {item.is_hired ? <Button
                                    style={{width:'70%', backgroundColor:'#EC9092',height:35,borderRadius: 30,}}
                                    styleDisabled={{color: 'red'}}
                                    title="Cancel"
                                    onPress={() => this.RejectJob(hiredDetail.data.id, hiredDetail.data.job_detail_id)}
                                >
                                    Cancel
                                </Button>
                                  :  <View />}
                              </View>
                            </View>
                          </View>
                        </View>
                        );
                    })}
                    <View style={{flexDirection:"row", backgroundColor: '#fff', width: width, paddingHorizontal: 10, paddingVertical: 5, paddingBottom: 15}}>

                    </View>
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
   hiredDetail: state.hiredDetail.hiredDetail,
   fetching: state.hiredDetail.fetching,
   rejectFetching: state.hiredJobs.rj_fetching
})

const mapDispatchToProps = dispatch => ({
    attemptToGetHiredDetail: jobId => dispatch(HiredDetailActions.hiredDetailRequest(jobId)),
    attemptToRejectJob: data => dispatch(HiredDetailActions.rejectJobRequest(data))
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HiredDetail);
