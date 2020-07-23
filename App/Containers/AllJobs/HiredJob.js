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
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';

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
    id: 2,
    type: '2',
    title: 'Orthopedic Surgery',
    hospital_name: 'London Bridge Hospital',
    rate: '£60/h',
    date: 'Fri, 25 Nov 2019',
    start_time: '10:00',
    end_time: '21:00',
  }
];

class HiredJob extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
        fetching: PropTypes.bool,
        attemptToGetHiredJob: PropTypes.func,
    };

  state = {
    isVisible: false,
    hiredJobsList: [],
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

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
  _onRefresh() {
    if(!this.props.fetching){
      this.props.attemptToGetHiredJob(null);
    }
  }
  render() {
      const { hiredJobsList, fetching } = this.props;
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
        <Block center flex style={{height: height, backgroundColor: '#f7f7f7'}}>
          <ImageBackground source={require('../assets/images/header_img.png')} style={{width: width,aspectRatio: 3}}>
            <View style={{width: width, flexDirection: 'row',  }}>
              <View style={{flex: 0.3, padding: 10, paddingLeft: 0, paddingVertical: 15, marginTop:3}}>
                <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                  <Image source={require('../assets/images/back_ic.png')} />
                </TouchableOpacity>
              </View>
              <View style={{flex: 0.65, padding: 10, paddingTop: 0, textAlign: 'left',marginTop:40}}>
                <Text center style={{color: '#fff', textAlign: 'left', fontWeight: '600',fontSize:p25}}>Hired Shifts</Text>
              </View>
            </View>
            <View style={{width: width, marginTop:-20, height: 100}}>
            </View>
          </ImageBackground>
          
          <ScrollView keyboardShouldPersistTaps={'always'} style={{width: width}} refreshControl={
            <RefreshControl
              refreshing={fetching}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>

            
            <View style={ pickerSelectStyles.container, { backgroundColor: '#f7f7f7'}}>
              {hiredJobsList && hiredJobsList.length > 0 ? hiredJobsList.map((item, key) => {

                    return (
                    <View key={item.id} style={{marginBottom: 10}}>
                      <View style={{flexDirection:"row", flex:1,justifyContent:'space-between', backgroundColor: '#cceae8', width: width, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10}}>
                        <View>
                        <Text style={{color: '#000',flex:0.5, alignSelf:'flex-start', fontSize: p15, fontWeight:'600',}}>
                           <Image source={require('../assets/images/calendar_green.png')} style={{paddingRight: 5}} />
                           {"  "}
                           {item.date}
                        </Text>
                        </View>
                        <View>
                        <Text style={{color: '#000',flex:0.5, alignSelf:'flex-end', fontSize: p15, fontWeight:'600'}}>
                           <Image source={require('../assets/images/clock_green.png')} style={{paddingRight: 5}} />
                           {"  "}
                           {item.time_from} - {item.time_to}
                        </Text>
                        </View>
                      </View>
                      <View style={{flexDirection:"row", backgroundColor: '#ebf7f7', width: width, paddingHorizontal: 10, paddingVertical: 5}}>
                        <View style={{flex: 0.8}}>
                          <Text style={{color: '#03998d', fontSize: p15, fontWeight: '600'}}>
                            {item.title.toUpperCase()}
                          </Text>
                          <Text style={{fontSize:p15,color:'#000'}}>
                            {item.hospital_name}
                          </Text>
                        </View>
                        <View style={{flex: 0.2}}>
                          <Text center style={{backgroundColor: '#009e87', borderRadius: 15, padding: 5, color: '#fff', fontWeight: '600', fontSize:p15}}>
                            Hired
                          </Text>
                        </View>
                      </View>
                      <View center style={{flexDirection:'row',flex:1,backgroundColor:'#33ab9f',alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HiredDetail', {job_id : item.id})}>
                            <Text center style={{alignSelf:'center',justifyContent:'center', color:'#fff', fontWeight:'600', backgroundColor:'#33ab9f', fontSize: p15,  paddingVertical: 5, paddingHorizontal: 10}}>
                              View Detail
                            </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    );
                   
              }): <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Image
            center
            source={Images.noDataTransparent}
            
          />
          </View>}
              
            </View>
            
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
 }
});

const mapStateToProps = state => ({
    hiredJobsList: state.hiredJobs.hiredJobs,
    fetching: state.hiredJobs.fetching
    // hiredJobsList:[],
});

const mapDispatchToProps = dispatch => ({
    attemptToGetHiredJob: () => dispatch(HiredjobActions.hiredJobsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(HiredJob);
