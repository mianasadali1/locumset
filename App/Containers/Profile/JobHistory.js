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
  ActivityIndicator,
  BackHandler
} from "react-native";
import { Block, Text, theme, Button } from "galio-framework";
import { Images } from '../../Themes';
// import { getUserToken } from '../Redux/actions/auth';
import DatePicker from 'react-native-datepicker';
import { argonTheme } from '../../Themes/constants';
// import Application from '../Services/Application';
import Popover from 'react-native-popover-view';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JobhistoryActions from '../../Redux/AllJobsRedux/JobHistoryRedux'
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("screen");

// const AppClient = new Application();
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
const rem = width / 380;
const p40 = 40/480*width;
const p45 = 45/480*width;
const p30 = 30/480*width;
const p55 = 55/480*width;
const p50 = 50/480*width;
const p65 = 65/480*width;
const p10 = 10/480*width;
const p14 = 14/480*width;
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

class JobHistory extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptToGetJobHistory: PropTypes.func,
  };
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
  state = {
    isVisible: false,
    language: '',
    hospital_name: '',
    department: '',
    grade: '',
    from_date: '',
    to_date: '',
    history: [],
    rate:'',
    day:'',
    month_year:'',
  }
  constructor(props){
    super(props)
    this.props.attemptToGetJobHistory();
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

  showPopover(){
    this.setState({isVisible: true});
    console.log('showPopover: '+ this.state.isVisible);
  }
  closePopover(){
    this.setState({isVisible: false});
  }
  render() {
    const { history, fetching } = this.props;
    console.log('history.jobs_data');
    console.log(history);
    const showHistory = (history && history.jobs_data[0]) ? true : false;
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
        <Block center flex>
        <Spinner
            visible={fetching}
          />
          <View style={{width: width, height: 70, backgroundColor: '#009D8B', flexDirection: 'row'}}>
          <View style={{flex: 0.23, padding: 10, paddingLeft: 0, paddingVertical: 15}}>
            <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
              <Image source={require('../assets/images/back_ic.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.5, padding: 10, paddingVertical:18}}>
            <Text center style={{color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 19}}>Shift History</Text>
          </View>
        </View>
          <View center style={{backgroundColor: '#059A87', width: width*0.8, borderRadius: 10,  marginTop: 10, marginBottom: 10, padding: 10}}>
            <Text center style={{ color: '#fff', paddingBottom: 10, fontSize: p20, fontWeight: '600'}}>
              £ { history ? history.total : 0 }
            </Text>
            <Text center style={{ color: '#fff', fontSize: p14,}}>
              Total amount earned
            </Text>
          </View>
          {
            (() => {
                if(showHistory){
                  return(
                  <ScrollView keyboardShouldPersistTaps={'always'} style={{width: width*0.99}}>
                      {history.jobs_data.map((item, key) => {
                          return(
                            <View key={item.id}  style={{borderRadius: 6, marginBottom: 10, marginTop: 3, paddingBottom: 80, padding: 10,  borderBottomWidth: 1, borderColor: '#e6e6e6', backgroundColor: '#fff', height: 115, width:width}}>
                            <View style={{flexDirection: 'row',flex:0.99,paddingHorizontal:5}}>
                              <View style={{backgroundColor: '#029B89', height:85, flex: 0.19, borderRadius: 10, alignItems:'center',justifyContent:'center' }}>
                                <View style={{ backgroundColor: '#26AB9A',  alignItems: 'center', justifyContent: 'center'}}>
                                  <Image source={Images.calendarWhite} style={{width: 18, height: 22}} />
                                </View>
                                <View style={{ height: 50}}>
                                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: '#fff', fontSize: p17, fontWeight: '600'}}>{item.day}</Text>
                                  </View>
                                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: '#fff', fontSize: p14}}>{item.month_year}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{padding: 5,flex:0.66}}>
                                <Text style={{color: '#5eb7ae', fontSize: p17, paddingLeft: 2, fontWeight: '600',}}>
                                  {item.title.toUpperCase()}
                                </Text>
                                <Text style={{color: '#7a8584', fontSize: p14, paddingLeft: 2,padding:5,marginTop:3,}}>
                                  {item.hospital_name}
                                </Text>
                              </View>
                              <View style={{flex:0.14}}>
                                <Text center style={{backgroundColor: '#ebf7f7', color:'#009e87' ,fontSize: p20,marginTop:15, borderRadius: 5, padding: 0, fontWeight: '600',width: width*0.15}}>
                                  £{item.rate}
                                </Text>
                              </View>
                            </View>
                          </View>
                          )
                      })}
                    </ScrollView>
                    )
                  }else{
                    return <Block center style={{
                      flex:1,
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'center'}}>
                      <View>
                        <View center style={{backgroundColor: '#DEF2F0', padding: p20, marginBottom: p20, width: width*0.8, borderRadius: p10}}>
                          <Text center style={{color: '#000', fontSize: p30, fontWeight: '600'}}>Locumset Says!</Text>
                          <Text center style={{color: '#7a8584', fontSize: p20}}>No record found</Text>
                        </View>
                        <View center style={{padding: p20, marginBottom: p20, width: width*0.8, borderRadius: p10}}>
                          <Image source={require('../assets/images/norecordfound_logo.png')} style={{width: '100%'}} />
                        </View>
                      </View>
                    </Block>
                  }
                })()
              }
            
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
    fontSize: p20,
    fontWeight: "600",
    paddingTop: 16,
    textAlign: 'center'
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width*0.8,
  },
  buttonContainer: {
    flex: 0.5,
    marginRight: 10,
  },
  inputIOS: {
    fontSize: p17,
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
    fontSize: p17,
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
    marginTop: 18,
    paddingBottom: 20,
    flexDirection:"row",
    borderBottomWidth: 1,
    borderColor: '#dedede',
 },
 text: {
    color: '#4f603c',
    padding: 10,
    width: width*0.33,
    flex: 1,
 }
});

const mapStateToProps = state => ({
  history: state.jobHistory.jobHistory,
  fetching: state.jobHistory.fetching,
});

const mapDispatchToProps = dispatch => ({
  attemptToGetJobHistory: () => dispatch(JobhistoryActions.jobHistoryRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(JobHistory);
