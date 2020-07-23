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
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  BackHandler
} from "react-native";
import { connect } from 'react-redux';
import { Input, Block, Text, theme, Button } from "galio-framework";
import Popover from 'react-native-popover-view';
import DatePicker from 'react-native-datepicker';
import { argonTheme } from '../../Themes/constants';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import Signature from 'react-native-signature-canvas';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import TimesheetActions from '../../Redux/TimeSheetRedux/TimeSheetRedux'
import HiredjobActions from '../../Redux/AllJobsRedux/HiredJobRedux'

const { width, height } = Dimensions.get("screen");

const p40 = 40/480*width;
const p30 = 30/480*width;
const p55 = 55/480*width;
const p50 = 50/480*width;
const p65 = 65/480*width;
const p10 = 10/480*width;
const p5 = 5/480*width;
const p14 = 14/480*width;
const p12 = 12/480*width;
const p18 = 16/480*width;
const p20 = 20/480*width;
const p23 = 23/480*width;
const p25 = 25/480*width;
const p17 = 17/480*width;
const p16 = 16/480*width;
const p15 = 15/480*width;
const p75 = 75/480*width;
const p80 = 80/480*width;
const p85 = 85/480*width;
const p90 = 90/480*width;
const p100 = 100/480*width;
const p150 = 150/480*width;
const p200 = 200/480*width;

const hospitals = [
  {
    label: 'Services Hospital',
    value: 'service',
  },
  {
    label: 'Agha Khan Hospital',
    value: 'agha',
  },
  {
    label: 'Jinnah Hospital',
    value: 'jinnah',
  },
];
const jobs = [
  {
    id: 1,
    type: '1',
    title: 'Test Surgery',
    hospital_name: 'London Bridge Hospital',
    rate: '£60/h',
    date: 'Wed, 30 Nov 2019',
    start_time: '08:00',
    end_time: '23:00',
  },
];

class SubmitTimeSheet extends React.Component {
  static propTypes = {
      dispatch: PropTypes.func,
      fetching: PropTypes.bool,
      timefetching: PropTypes.bool,
      chj_fetching: PropTypes.bool,
      attemptToSubmitTimeSheet: PropTypes.func,
      attemptToGetHiredJob: PropTypes.func,
  };
  state = {
    isVisible: false,
    language: '',
    hospital: '',
    department: '',
    grade: '',
    from_time: '',
    to_time: '',
    time: '10:00',
    signature: null,
    jobId: '',
    gradeId: '',
    detailId: '',
  }
  handleSignature = signature => {
    this.setState({ signature });
  };

  handleEmpty = () => {
    console.log('Empty');
  }
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }

  componentWillReceiveProps (props) {
    this.closePopover();
  }

  constructor(props){
    super(props)
    this.props.attemptToGetHiredJob();
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

  showPopover(jobId, gradeId, detailId){
    this.setState({isVisible: true, jobId: jobId, gradeId: gradeId,detailId: detailId});
  }
  closePopover(){
    this.setState({isVisible: false});
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  _onRefresh() {
    if(!this.props.fetching){
      this.props.attemptToGetHiredJob();
    }
  }

  onNavigation = (job) => {
    let data = {
      job_id: job.id,
      grade_id: job.grade_id,
      detail_id: job.detail_id,
      rate: job.rate,
      job_start_time: job.time_from,
      job_end_time: job.time_to
    }
    this.props.navigation.navigate('HoursWorked', { data: data })
  }

  onSubmit = (jobId, gradeId, detailId) => {
    console.log('jobid and gradeid', jobId, gradeId)
    let data = {
      job_id: jobId,
      grade_id: gradeId,
      time_from: this.state.from_time,
      time_to: this.state.to_time,
      detail_id: detailId,

    }
    this.props.attemptToSubmitTimeSheet(data)
  }
  render() {
    const { from_time, to_time } = this.state;
    const { hiredJobsList, fetching, chj_fetching, timefetching } = this.props;
    console.log('hiredJobsList', hiredJobsList)
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
        <Block center flex style={{ backgroundColor: '#F7F7F7'}}>

            <Spinner
              visible={chj_fetching}
            />
            <ImageBackground source={require('../assets/images/header_img.png')} style={{width: width, aspectRatio: 3}}>
              <View style={{width: width, flexDirection: 'row', paddingTop: 10}}>
                <View style={{flex:0.35, padding: 10, paddingLeft: 0, paddingVertical: 15}}>
                  <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                    <Image source={require('../assets/images/back_ic.png')} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:0.65, padding: 10, marginTop: 40}}>
                  <Text center style={{color: '#fff', textAlign: 'left', fontWeight: '600', fontSize:19}}>Time Sheet</Text>
                </View>
              </View>
            </ImageBackground>
          <ScrollView keyboardShouldPersistTaps={'always'} refreshControl={
            <RefreshControl
              refreshing={fetching}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          {hiredJobsList && hiredJobsList.length > 0 ? hiredJobsList.map((item, key) => {
            return (
                <View center style={{flex: 1, borderRadius: 15, paddingVertical: 0, marginTop:15}}>
                  <View style={{flexDirection:"row",  backgroundColor:'#E3F5F3', width: width, paddingHorizontal: 10, paddingVertical: 5}}>
                    <View style={{flex: 0.6}}>
                        <Text style={{color:'#009e87', fontSize: p15, fontWeight: '600'}}>
                          {item.title.toUpperCase()}
                        </Text>
                        <Text style={{color: '#000', fontSize: p15,paddingTop:3}}>
                          {item.hospital_name}
                        </Text>
                    </View>
                    <View style={{ flex: 0.4, textAlign: 'right'}}>
                      <View style={{textAlign: 'right'}}>
                      <Text center style={{alignSelf: 'flex-end', width: 80, backgroundColor:'#009e87', borderRadius: 15, padding: 5, color: '#fff',fontSize:p15, fontWeight: '600'}}>
                          £{item.rate}/hr
                      </Text>
                      </View>
                      <Text style={{color: '#000', fontSize: p15, textAlign: 'right', paddingBottom:1, paddingTop:3}}>
                         <Image source= {require('../assets/images/clock_green.png')} style={{paddingRight: 5}} />
                         {"  "}
                         {item.time_from} - {item.time_to}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection:'row',flex:1,width:'100%'}}>
                    <View style={{backgroundColor:'#a4e0d8',flex:1,  paddingHorizontal: 5, paddingVertical: 5, marginBottom: 10}}>
                      <Text style={{flex: 0.50, color: '#000',fontSize:p18, fontWeight:'600',}}>
                        <Image source={require('../assets/images/calendar_green.png')} style={{paddingRight: 5}} />
                         {"  "}
                         {item.date}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.onNavigation(item)}>
                      <Text center style={{alignSelf:'flex-start', flex: 0.14, color:'#fff', fontWeight:'500', backgroundColor:'#33ab9f', fontSize: p15, textAlign: 'right', paddingVertical: 5, paddingHorizontal: 5, }}>
                        + Add Timesheet
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
            )
          }) : <View style={{padding: 20}}>
            <Text style={{color: '#000', fontSize: 16}}>Not any timesheet to submit!</Text>
          </View>}
          </ScrollView>

          <Popover
            isVisible={this.state.isVisible}
            fromView={this.touchable}
            placement={this.bottom}
            onRequestClose={() => this.closePopover()}
            popoverStyle={{width: width, borderTopLeftRadius: 20, borderTopRightRadius: 20, width: width, margin: 0, padding: 0}}>
            <View style={{padding: 10, width: width*0.9,}}>
              <Text style={{color: '#949d9d', fontSize: p15, marginBottom: 10}}>Submit Time Sheet</Text>

              <Block style={{padding: 10, flex: 0, flexDirection: 'row'}}>
                <View style={{flex: 0.5, paddingRight: 5}}>
                  <Text style={{color: '#7a8584', fontSize: p15, paddingLeft: 1, fontWeight: '600'}}>
                    Start Time
                  </Text>
                  <Input
                    style={{borderRadius: 50, borderColor: '#7a8584', borderWidth: 1}}
                    borderless
                    placeholder = '8:00'
                    value={from_time}
                    onChangeText={text => this.handleChange('from_time', text)}
                  />
                </View>
                <View style={{flex: 0.5, paddingLeft: 5}}>
                  <Text style={{color: '#7a8584', fontSize: p15, paddingLeft: 1, fontWeight: '600'}}>
                    End Time
                  </Text>
                  <Input
                    style={{borderRadius: 50, borderColor: '#7a8584', borderWidth: 1}}
                    borderless
                    placeholder = '15:00'
                    value={to_time}
                    onChangeText={text => this.handleChange('to_time', text)}
                  />
                </View>
              </Block>
              <Block style={{padding: 10, paddingTop: 0}}>
                <Text style={{color: '#7a8584', fontSize: p15, paddingLeft: 1, fontWeight: '600'}}>
                  Notes
                </Text>
                <Input
                  style={{borderRadius: 50, borderColor: '#7a8584', borderWidth: 1}}
                  borderless
                />
              </Block>
              <Block style={{padding: 10, paddingTop: 0}}>
                <Text style={{color: '#7a8584', fontSize: p15, paddingLeft: 1, fontWeight: '600'}}>
                  Signature
                </Text>
                <View style={{ flex: 1, height: 200 }}>
                  <Signature
                    onOK={this.handleSignature}
                    onEmpty={() => console.log("empty")}
                    descriptionText="Sign"
                    // clear button text
                    clearText="Clear"
                    confirmText="Save"
                    webStyle={`.m-signature-pad--footer
                      .button {
                        background-color: red;
                        color: #FFF;
                      }`}
                  />
                </View>
              </Block>

              <View style={pickerSelectStyles.viewContainer}>
                <View style={pickerSelectStyles.buttonContainer}>
                  <Button style={{backgroundColor: '#E5E5E5', borderRadius: 20, width: width*0.4, marginRight: 10,}}>
                    <Text onPress={() => this.closePopover()} size={18} color={'#000'}>
                      CANCEL
                    </Text>
                  </Button>
                </View>
                <View style={pickerSelectStyles.buttonContainer, {textAlign: 'right'}}>
                  <Button onPress={() => this.onSubmit(this.state.jobId, this.state.gradeId, this.state.detailId)} style={{backgroundColor: '#059A87', borderRadius: 20, width: width*0.4}}>
                    <Text size={18} color={argonTheme.COLORS.WHITE}>
                      APPLY
                    </Text>
                  </Button>
                </View>
              </View>

            </View>
          </Popover>
        </Block>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
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
  viewContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width*0.8,
  },
  buttonContainer: {
    flex: 0.4,
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
    paddingBottom: 0,
    backgroundColor: '#fff',
    height:38,
    marginLeft:-10,
    marginRight:10

 },
 text: {
    color: '#4f603c',
    padding: 10,
    width: width*0.33,
    flex: 1,
 },
 preview: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  previewText: {
    color: "#FFF",
    fontSize: p15,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10
  }
});

const mapStateToProps = state => ({
  hiredJobsList: state.hiredJobs.hiredJobs,
  timeSheet: state.timeSheet.timeSheet,
  fetching: state.hiredJobs.fetching,
  chj_fetching: state.hiredJobs.chj_fetching,
  timefetching: state.timeSheet.timefetching,

});

const mapDispatchToProps = dispatch => ({
  attemptToSubmitTimeSheet: data => dispatch(TimesheetActions.timeSheetRequest(data)),
  attemptToGetHiredJob: () => dispatch(HiredjobActions.hiredJobsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitTimeSheet);
