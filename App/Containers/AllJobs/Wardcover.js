import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  View,
  Picker,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  BackHandler
} from "react-native";
import { Images } from '../../Themes';
import { connect } from 'react-redux';
import { Block, Text, theme, Button } from "galio-framework";
// import { getUserToken } from '../Redux/actions/auth';
import DatePicker from 'react-native-datepicker';
import { argonTheme } from '../../Themes/constants';
// import Application from '../Services/Application';
import Popover from 'react-native-popover-view';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment'
import Select2 from "react-native-select-two"
import Modal from "react-native-modal";
import AlljobsActions from '../../Redux/AllJobsRedux/WardcoverRedux';
import SearchableDropdown from '../SearchableDropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import changeNavigationBarColor, {
  HideNavigationBar,
  ShowNavigationBar,
} from 'react-native-navigation-bar-color';

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



const jobs = [
  {
    id: 1,
    type: '1',
    title: 'Test Surgery 1',
    hospital_name: 'London Bridge Hospital',
    rate: '$60/h',
    date: 'Sun, 22 Dec 2019',
    start_time: '08:00',
    end_time: '23:00',
  },
    {
        id: 2,
        type: '1',
        title: 'Test Surgery 2',
        hospital_name: 'London Bridge Hospital',
        rate: '$60/h',
        date: 'Sun, 29 Dec 2019',
        start_time: '08:00',
        end_time: '23:00',
    },
    {
        id: 3,
        type: '1',
        title: 'Test Surgery 3',
        hospital_name: 'London Bridge Hospital',
        rate: '$60/h',
        date: 'Sun, 29 Dec 2019',
        start_time: '08:00',
        end_time: '23:00',
    },
    {
        id: 4,
        type: '1',
        title: 'Test Surgery 4',
        hospital_name: 'London Bridge Hospital',
        rate: '$60/h',
        date: 'Sun, 29 Dec 2019',
        start_time: '08:00',
        end_time: '23:00',
    },
    {
        id: 5,
        type: '1',
        title: 'Test Surgery 5',
        hospital_name: 'London Bridge Hospital',
        rate: '$60/h',
        date: 'Sun, 29 Dec 2019',
        start_time: '08:00',
        end_time: '23:00',
    },
];
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
var new_hospital = '';

var mockData = '';

class Wardcover extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptToGetAllJobs: PropTypes.func,
  };
  state = {
    isVisible: false,
    language: '',
    grade: '',
    from_date: '',
    to_date: '',
    newJobs: [],
    dept_id: '',
    hospital_id: '',
    isFilter: false,
    isModalVisible: false,
    selectedItems: '',
    selectedDept: '',
    selectedGrade: ''
  }

  constructor(props){


    super(props)
      this.data = props.navigation.state.params;
      console.log('this.data');
      console.log(this.data);
      console.log('end this.data');
      if(this.data && this.data.urgent) {
        this.props.attemptToGetAllJobs(this.data)
      } else {
        this.props.attemptToGetAllJobs(null);
      }
      this.mockData = [
        { id: 1, name: "React Native Developer" }, // set default checked for render option item
        { id: 2, name: "Android Developer" },
        { id: 3, name: "iOS Developer" }
      ]
    this.handleBackPress = this.handleBackPress.bind(this);
    // HideNavigationBar();
  }

  toggleModal = () => {
    console.log('show grade value');
    console.log(this.state.grade);
    console.log('after grade value');
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  componentWillReceiveProps (props) {
    this.closePopover();
    console.log('componentWillReceiveProps');
    new_hospital =  props.hospitalsData ? props.hospitalsData.new_hospitals : '';

    console.log(new_hospital);
    console.log('new_hospital');
    this.hospitalsArray = props.hospitalsData ? props.hospitalsData.new_hospitals : '';
    console.log(this.hospitalsArray)
  }
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
  showPopover(){
    this.setState({isVisible: true});
  }
  closePopover(){
    this.setState({isVisible: false});
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
  //For Back Button
  handleBackPress = () => {
    this.pas_data = {
        pref: 'pref'
    }
    this.props.attemptToGetAllJobs(this.pas_data)
      // ShowNavigationBar();
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    }

    navigaeOnJobDetail = () => {
    }

    navigateOnJobDetail = (job) => {
      // this.props.navigation.navigate('JobDetail',{job_id : job.id, token: this.props.token});
    }

    filterJob = () => {
      this.setState({ isModalVisible: false });
      let data = {
        hospital_id: this.state.hospital_id ? this.state.hospital_id : null,
        departments_id: this.state.dept_id ? this.state.dept_id : null,
        grade_id: this.state.grade ? this.state.grade : null,
      }
      this.setState({ isFilter: true })
      this.props.attemptToGetAllJobs(data);
    }

    getAllJobs = () => {
      this.setState({ isFilter: false, hospital_id: null, dept_id: null, grade: null })
      this.props.attemptToGetAllJobs(null)
    }

    _onRefresh() {
      if(!this.props.fetching && !this.state.isFilter){
        this.props.attemptToGetAllJobs(null);
      }
    }

  render() {
    const { newJobs, preferenceData, hospitalsData, fetching } = this.props;
    console.log('hospital data before', hospitalsData)
    var new_hospital =[{id: '1', value: 'Select hospital'}];
    var new_department = hospitalsData ? hospitalsData.new_departments : {id: '', value: ''};
    var new_grades = hospitalsData ? hospitalsData.new_grades : {id: '', value: ''};
    console.log('hospitals data', hospitalsData, this.hospitalsArray);
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
    var hospital = hospitalsData ? hospitalsData.hospitals.find(obj => obj.value == this.state.hospital_id) : null;
    var hospitalName = '';
    if(hospital) {
      hospitalName = hospital.label;
    }
    var department = hospitalsData ? hospitalsData.departments.find(obj => obj.value == this.state.dept_id) : null;
    var departmentName = '';
    if(department) {
      departmentName = department.label;
    }
    var gradeN = hospitalsData ? hospitalsData.grades.find(obj => obj.value == this.state.grade) : null;
    var gradeName = '';
    if(gradeN) {
      gradeName = gradeN.label;
    }

    var dropdowndata = [
          { id: 1, name: "React Native Developer" }, // set default checked for render option item
          { id: 2, name: "Android Developer" },
          { id: 3, name: "iOS Developer" }
        ];
    return (
      <ImageBackground source={Images.background} style={{width: width, height: height}}>
      <Block center style={{flex: 0.9}}>
      <View style={{width: width, height: 157}}>
        <View style={{width: width, height: 60}}>
          <View style={{ padding: 10, paddingLeft: 0, paddingVertical: 15 }}>
            <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
              <Image source={require('../assets/images/back_ic.png')} />
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <View center style={{backgroundColor: '#2D3C6A9E', width: width*0.96, borderRadius: 10, paddingHorizontal:10, paddingVertical: 5, marginTop: 10}}>
              <Text center style={{ color: '#fff', paddingBottom: 10, fontSize: 19, fontWeight: '600'}}>
                All Published Shifts
              </Text>

              <View style={{ color: '#555', alignItems: 'center', fontWeight: '600', flexDirection: 'row', marginBottom: 5 }}>
                <Image source={require('../assets/images/clock_green.png')} />

                {this.state.isFilter ? <Text style={{fontSize: p15, marginTop: -5, marginLeft: p10, color: '#fff'}}>{hospitalName}</Text> : <Text style={{borderColor: '#dcdcdc', fontSize: p15, marginLeft: p20, width: width*0.5, color: '#fff'}}>All Hospitals</Text>}
              </View>
              <View style={{ color: '#555', alignItems: 'center', fontWeight: '600', flexDirection: 'row', marginBottom: 5 }}>
                <Image source={require('../assets/images/clock_green.png')} />
                {this.state.isFilter ? <Text style={{fontSize: p15, marginTop: -5, marginLeft: p10, color: '#fff'}}>{departmentName}</Text> : <Text style={{borderColor: '#dcdcdc', fontSize: p15, marginLeft: p20, width: width*0.5, color: '#fff'}}>All Departments</Text>}
              </View>
              <View style={{ color: '#555', alignItems: 'center', fontWeight: '600', flexDirection: 'row', marginBottom: 5 }}>
                <Image source={require('../assets/images/clock_green.png')} />
                {this.state.isFilter ? <Text style={{fontSize: p15, marginTop: -5, marginLeft: p10, color: '#fff'}}>{gradeName}</Text> : <Text style={{borderColor: '#dcdcdc', fontSize: p15, marginLeft: p20, width: width*0.5, color: '#fff'}}>All Grades</Text>}
              </View>

            </View>
          </View>
        </View>
        <View style={{width: width, marginTop:-20, height: 100}}>
        </View>
      </View>

        {this.state.isFilter ? <Block center style={pickerSelectStyles.topButtonContainer}>
          <Button
                style={pickerSelectStyles.button2}
                    color='#009e87'
                    textStyle={{ color: argonTheme.COLORS.WHITE, fontWeight: '600', alignItems: 'center', marginBottom: '7%' }}
                    onPress={() => {
                      this.setState({ isFilter: false, hospital_id: null, dept_id: null, selectedGrade: '', selectedDept: '', selectedItems: '' })
                      this.props.attemptToGetAllJobs(null)
                    }}
                >
                    Show All Shifts
          </Button>
        </Block> : null}
        <ScrollView keyboardShouldPersistTaps={'always'} style={{width: width*0.96, marginTop: this.state.isFilter ? 10 : 40}} refreshControl={
          <RefreshControl
            refreshing={fetching}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          {newJobs && newJobs.length >0 ? newJobs.map((item, key) => {
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
                  <View>
                {showJOb ? <View key={item.id} style={{marginBottom: 10}}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('JobDetail', {job_id : item.id})} center style={{flex: 1, borderRadius: 15, paddingVertical: 0}}>
                    <View style={{flexDirection:"row",  backgroundColor: dateDiff <= 1 ? '#FDE3E4' : showBlue ? '#d2e9f7' : '#E3F5F3', width: width*0.96, paddingHorizontal: 10, paddingVertical: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
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
                    <View style={{flexDirection:"row", backgroundColor: dateDiff <= 1 ? '#fcbbbd' : showBlue ? '#c3e5fa' : '#a4e0d8', width: width*0.96, paddingHorizontal: 10, paddingVertical: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
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
          }) : <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Image
            center
            source={Images.noData}
            
          />
          </View>}

           
          {false && newJobs.map((item, key) => {
                      return(
                        <View />
                          // <View key={item.id}  style={{borderRadius: 6, marginBottom: 10, marginTop: 3, paddingBottom: 80, padding: 10,  borderBottomWidth: 1, borderColor: '#e6e6e6', backgroundColor: '#fff', height: 90}}>
                          //     <View style={{flexDirection: 'row',}}>
                          //         <View style={{ backgroundColor: '#fff', padding: 5,}}>
                          //             <Text center style={{fontSize: 30, fontWeight: '600',color:'#47b3a9', marginTop:-17}}>
                          //                 .
                          //             </Text>
                          //         </View>
                          //         <View style={{padding: 5,}}>
                          //             <Text style={{color: '#7a8584', fontSize: 15, paddingLeft: 2, fontWeight: '600'}}>
                          //                 {item.title}
                          //             </Text>
                          //             <Text style={{color: '#7a8584', fontSize: 14, paddingLeft: 2,padding:5,marginTop:3}}>
                          //                 {item.date}
                          //             </Text>
                          //             <Text style={{color: '#7a8584', fontSize: 14, paddingLeft: 2,padding:5,marginTop:-4}}>
                          //                 {item.time_from} - {item.time_to}
                          //             </Text>
                          //         </View>
                          //         <TouchableOpacity onPress={() => this.props.navigation.navigate('JobDetail', {job_id : item.id})} style={{marginLeft:150, width:110,marginTop:20, backgroundColor:'#009b8b',height:35,borderTopLeftRadius: 30,borderBottomLeftRadius: 30,}}>
                          //           <Text center style={{padding: 5, fontSize: 15, fontWeight: '600', color: '#fff'}}>Apply</Text>
                          //         </TouchableOpacity>
                          //     </View>
                          // </View>
                      );
                  })}

          
          </ScrollView>
          <Button style={{position: 'absolute', bottom: 15, right: 15, width: 48, height: 48, borderRadius: 24, backgroundColor: '#009e87'}}>
            <TouchableOpacity onPress={() => this.toggleModal()}>
              <Image source={require('../assets/images/filter_ic.png')} />
            </TouchableOpacity>
          </Button>
        </Block>
          <Modal deviceWidth={width} isVisible={this.state.isModalVisible} style={{bottom: 0, position: 'absolute', backgroundColor: '#fff', left: 0, right: 0, margin: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>

            <KeyboardAwareScrollView
              ref={ref => this.scrollView = ref} keyboardShouldPersistTaps={'handled'}
            >
              <Text style={{color: '#fff', fontSize: 16, marginBottom: 10, backgroundColor: '#059A87', padding: 10}}>FILTER JOBS</Text>
            <View style={{padding: 10,}}>
              <Text style={{color: 'red', marginBottom: 5}}>{this.state.Error}</Text>
              <SearchableDropdown
                multi={false}
                onItemSelect={(item) => {
                  if(hospitalsData){
                    for (var i = 0; i <= hospitalsData.new_hospitals.length - 1; i++) {
                      if (hospitalsData.new_hospitals[i].id == item.id) {
                        this.setState({ selectedItems: i+1 });
                      }
                    }
                  }
                  this.setState({ hospital_id: item.id });
                }}
                containerStyle={{ padding: 5 }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={hospitalsData ? hospitalsData.new_hospitals : {value: '', id: ''}}
                defaultIndex={this.state.selectedItems}
                chip={true}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Search Hospital",
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                    },
                    //onTextChange: text => alert(text)
                  }
                }
                listProps={
                  {
                    nestedScrollEnabled: true,
                  }
                }
              />
              <SearchableDropdown
                multi={false}
                onItemSelect={(item) => {
                  for (var i = 0; i <= hospitalsData.new_departments.length - 1; i++) {
                    if (hospitalsData.new_departments[i].id == item.id) {
                      this.setState({ selectedDept: i+1 });
                    }
                  }
                  this.setState({dept_id: item.id});
                }}
                containerStyle={{ padding: 5 }}
                itemStyle={{
                  padding: p10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={hospitalsData ? hospitalsData.new_departments : {value: '', id: ''}}
                defaultIndex={this.state.selectedDept}
                chip={true}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Search Department",
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                    },
                    //onTextChange: text => alert(text)
                  }
                }
                listProps={
                  {
                    nestedScrollEnabled: true,
                  }
                }
              />
              <SearchableDropdown
                multi={false}
                onItemSelect={(item) => {
                  this.setState({grade: item.id})
                  for (var i = 0; i <= hospitalsData.new_grades.length - 1; i++) {
                    if (hospitalsData.new_grades[i].id == item.id) {
                      this.setState({ selectedGrade: i+1 });
                    }
                  }
                }}
                containerStyle={{ padding: 5 }}
                itemStyle={{
                  padding: p10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={hospitalsData ? hospitalsData.new_grades : {value: '', id: ''}}
                defaultIndex={this.state.selectedGrade}
                chip={true}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Search Grade",
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                    },
                    //onTextChange: text => alert(text)
                  }
                }
                listProps={
                  {
                    nestedScrollEnabled: true,
                  }
                }
              />

              <View style={{flex: 1, flexDirection: 'row', marginBottom: p10, padding: p10, justifyContent: 'space-between'}}>
                  <Button onPress={() => this.toggleModal()} style={{backgroundColor: '#FFFFFF',height: p50, borderRadius: 0, flex: 0.45, borderColor: '#059A87', borderWidth: 2, fontWeight: 'bold'}}>
                    <Text size={p20} color={'#059A87'}>
                      CANCEL
                    </Text>
                  </Button>
                  <Button onPress={() => this.filterJob()} style={{backgroundColor: '#059A87',height: p50, borderRadius: 0, color: '#fff',flex: 0.45, fontWeight: 'bold'}}>
                    <Text size={p20} color={argonTheme.COLORS.WHITE}>
                      Apply
                    </Text>
                  </Button>
              </View>
            </View>
          </KeyboardAwareScrollView>
          </Modal>
        </ImageBackground>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  filter: {
    marginLeft: 10,
    width: width*0.5,
    height: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: p15
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
    flex: 0.5,
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
 button2:{
   width: 180,
   height: 30,
   borderRadius: 30,
   marginTop:'3%'
 },
 topButtonContainer: {
   height: 50,
   width:width,
   marginTop: 15
 },
});

const mapStateToProps = state => ({
  newJobs: state.allJobs.allJobs,
  preferenceData: state.preference.preferenceData,
  hospitalsData: state.profile.hospitalsData,
  fetching: state.allJobs.fetching,
  // devices: state.device.devices,
  // marker: state.device.deviceInfo.position
});

const mapDispatchToProps = dispatch => ({
  attemptToGetAllJobs: data => dispatch(AlljobsActions.allJobsRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Wardcover);
