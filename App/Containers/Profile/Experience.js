import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  View,
  TextInput,
  Picker,
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
  BackHandler
} from "react-native";
import { connect } from 'react-redux';
import { Block, Text, theme, Button, Input } from "galio-framework";
// import { getUserToken } from '../Redux/actions/auth';
import DatePicker from 'react-native-datepicker';
import { argonTheme } from '../../Themes/constants';
// import Application from '../Services/Application';
import Popover from 'react-native-popover-view';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import { Images } from '../../Themes';
import Modal from "react-native-modal";

// Import ExperienceActions from ExperienceRedux from Redux folder
import ExperienceActions from '../../Redux/ProfileRedux/ExperienceRedux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


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
// const AppClient = new Application();

class Experience extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
  static propTypes = {
		dispatch: PropTypes.func,
		fetching: PropTypes.bool,
    attemptToGetExperience: PropTypes.func,
    attemptToSaveExperience: PropTypes.func,
	};
  state = {
    isVisible: false,
    language: '',
    hospital_id: '',
    dept_id: '',
    grade: '',
    from_date: '',
    to_date: '',
    doctor_id: 0,
    token: this.token,
    hospitals: [],
    grades: [],
    departments: [],
    Error: '',
  }
  constructor(props){
    super(props)
    // this.token = props.token;
    this.state.hospitals = this.props.navigation.state.params.data.hospitals;
    this.state.grades = this.props.navigation.state.params.data.grades;
    this.state.departments = this.props.navigation.state.params.data.departments;
    ErrorStatus: 0;
    this.handleBackPress = this.handleBackPress.bind(this);
  }
  async componentWillMount() {
    await this.loadData();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  async componentDidMount() {
    await this.loadExprience();
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress () {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }

  componentWillReceiveProps = (props) => {
    if(props.isSave) {
      this.closePopover();
    }
  }

  loadExprience = () =>{
    this.props.attemptToGetExperience();
  }


  loadData = () =>{
    let headers = {
      Authorization: "Bearer " + this.props.token
    }
    AppClient.getHospitals(headers).then((res) =>{
      this.state.hospitals = res.data.hospitals;
      this.state.departments = res.data.departments;
      this.state.grades = res.data.grades;
      console.log(this.state.departments);
      //this.state.grades = res.data.grades;*/
    });
  }
  showPopover(){
    this.setState({isVisible: true});
    console.log('showPopover: '+ this.state.isVisible);
  }
  closePopover(){
    this.setState({isVisible: false});
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  _JobHistory(){
    this.setState({isVisible: false});
    this.props.navigation.navigate('JobHistory');
  }
  AddExperience(){
    console.log('hello:',this.state.hospital_id,this.state.dept_id,this.state.grade);
    let params_data = {
      hospital_id: this.state.hospital_id,
      dept_id: this.state.dept_id,
      job_title:this.state.grade,
      from_date: this.state.from_date,
      to_date: this.state.to_date,
      id_card: 2,
    };
    if(this.state.hospital_id == ''){
      this.setState({Error: "Hospital field is required"});
      this.changeState(this.state.ErrorStatus);
    }else if(this.state.dept_id == ''){
     this.setState({Error: "Department field is required"});
     this.changeState(this.state.ErrorStatus);
    }else if(this.state.job_title == ''){
     this.setState({Error: "Grade field is required"});
     this.changeState(this.state.ErrorStatus);
    }else if(this.state.from_date == ''){
     this.setState({Error: "From date field is required"});
     this.changeState(this.state.ErrorStatus);
    }else if(this.state.to_date == ''){
     this.setState({Error: "To date field is required"});
     this.changeState(this.state.ErrorStatus);
    }

    if(this.state.ErrorStatus == 1){
      alert('Error');
    }else{
      // alert('pass');
    this.setState({isVisible: false});
    }
    this.props.attemptToSaveExperience(params_data)
  }

  changeState = (ErrorStatus) =>{
    this.setState({ErrorStatus: 1});
  }

  _onRefresh() {
    if(!this.props.fetching){
      this.props.attemptToGetExperience(null);
    }
  }

  render() {
    console.log('Images', Images)
    const { exp_data, fetching, saveFetching } = this.props;
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
      <Block style={{height: height}}>
        <Block>
          <View style={{width: width, height: 70, backgroundColor: '#009D8B', flexDirection: 'row'}}>
            <View style={{flex: 0.25, padding: 10, paddingLeft: 0, paddingVertical: 15}}>
              <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
                <Image source={require('../assets/images/back_ic.png')} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5, padding: 10, paddingVertical:18}}>
              <Text center style={{color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 19}}>Experience</Text>
            </View>
          </View>
        </Block>
        <Block center flex>
          <Text style={{backgroundColor: '#FBE7E8', color: '#000', padding: 10, fontSize: p12, width: width*0.9, borderRadius: 10, marginTop: 10}}>
            Experiences are not editable. Please add carefully.
          </Text>

          <Spinner
            visible={saveFetching}
          />
          <ScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false} style={{width: width*0.8, marginBottom: 50}} refreshControl={
            <RefreshControl
              refreshing={fetching}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
            {exp_data && exp_data.map((item, key) => {
            return(
              <View style={ pickerSelectStyles.container } key={key}>
                <View style = {pickerSelectStyles.text, {width: width*0.2, borderRightWidth: 4, borderColor: '#6db0a9'}}>
                  <Text style={{fontWeight: '600'}}>
                      {item.from_month}
                  </Text>
                  <Text style={{marginBottom: 10}}>
                      {item.from_year}
                  </Text>
                  <Text style={{fontWeight: '600'}}>
                      {item.to_month}
                  </Text>
                  <Text>
                      {item.to_year}
                  </Text>
                </View>
                <View style={ pickerSelectStyles.text , {width: width*0.7, paddingLeft: 10} }>
                  <Text style={{color: '#009b8b', fontSize: p17}}>
                      {item.dept}
                  </Text>
                  <Text style={{fontSize: p17, color: '#112525'}}>
                      {item.hosp_name}
                  </Text>
                  <Text style={{fontSize: p17, color: '#112525'}}>
                      {item.job_title}
                  </Text>
                </View>
              </View>);
              })}
          </ScrollView>
          <View style={{position: 'absolute', marginBottom:15, bottom: 80, right: 15, width: 48, height: 48, borderRadius: 24}}>
            <TouchableOpacity onPress={() => this.showPopover()}>
              <Image source={Images.addExperience} />
            </TouchableOpacity>
          </View>
          <Modal deviceWidth={width} isVisible={this.state.isVisible} style={{bottom: 0, position: 'absolute', backgroundColor: '#fff', left: 0, right: 0, margin: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <View>
              <KeyboardAwareScrollView
                // ref={ref => this.scrollView = ref} keyboardShouldPersistTaps={'handled'}
                // style={{ flex: 1 }}
              >
              <Text style={{color: '#fff', fontSize: p17, marginBottom: 10, backgroundColor: '#059A87', padding: 10}}>ADD NEW EXPERIENCE</Text>
              <Text style={{color: 'red', marginBottom: 10, padding: p10}}>{this.state.Error}</Text>
              <View style={{padding: p10, marginTop: -p50}}>
                <TextInput
                  ref={ref => this.hospital_id = ref}
                  placeholder={'Enter Hospital'}
                  value={this.state.hospital_id}
                  // onValueChange={value => {
                  //   this.setState({
                  //     hospital_id: value,
                  //   });
                  // }}
                  onChangeText={value => this.onChangeText('hospital_id', value)}
                  style={pickerSelectStyles.input}
                  returnKeyType="next"
                  onSubmitEditing={() => this.dept_id.focus()}
                  // value={this.state.hospital_id}
                  // useNativeAndroidPickerStyle={false}
                  // Icon={() => {
                  //   return <Image source={ Images.ArrowDown } style={{marginTop: 20, marginRight: 15,}} />;
                  // }}
                />

                <TextInput
                  ref={ref => this.dept_id = ref}
                  placeholder={'Enter Department'}
                  value={this.state.dept_id}
                  // onValueChange={value => {
                  //   this.setState({
                  //     dept_id: value,
                  //   });
                  // }}
                  onChangeText={value => this.onChangeText('dept_id', value)}
                  style={pickerSelectStyles.input}
                  returnKeyType="next"
                  onSubmitEditing={() => this.grade.focus()}
                  // value={this.state.dept_id}
                  // useNativeAndroidPickerStyle={false}
                  // Icon={() => {
                  //   return <Image source={ Images.ArrowDown } style={{marginTop: 20, marginRight: 15,}} />;
                  // }}
                />
                <TextInput
                  ref={ref => this.grade = ref}
                  placeholder={'Enter Grade'}
                  value={this.state.grade}
                  // onValueChange={value => {
                  //   this.setState({
                  //     grade: value,
                  //   });
                  // }}
                  onChangeText={value => this.onChangeText('grade', value)}
                  style={pickerSelectStyles.input}
                  returnKeyType="next"
                  // value={this.state.grade}
                  // useNativeAndroidPickerStyle={false}
                  // Icon={() => {
                  //   return <Image source={ Images.ArrowDown } style={{marginTop: 20, marginRight: 15,}} />;
                  // }}
                />
                <DatePicker
                  style={pickerSelectStyles.input, {width: '100%', marginBottom: p10,}}
                  date={this.state.from_date}
                  mode="date"
                  placeholder="From"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      right: 10,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      borderRadius: 5,
                      height: 40,
                    }
                  }}
                  onDateChange={(date) => {this.setState({from_date: date})}}
                />
                <DatePicker
                  style={{width: '100%'}}
                  date={this.state.to_date}
                  mode="date"
                  placeholder="To"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      right: 10,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      borderRadius: 5,
                      height: 40,
                    }
                  }}
                  onDateChange={(date) => {this.setState({to_date: date})}}
                />
              </View>

              <View style={{flex: 1, flexDirection: 'row', marginBottom: p20, padding: p10, justifyContent: 'space-between'}}>
                  <Button style={{backgroundColor: '#FFFFFF',height: p50, borderRadius: 5, flex: 0.45, borderColor: '#059A87', borderWidth: 2, fontWeight: '600'}}>
                    <Text onPress={() => this.closePopover()} size={p20} color={'#059A87'}>
                      CANCEL
                    </Text>
                  </Button>
                  <Button onPress={() => this.AddExperience()} style={{backgroundColor: '#059A87',height: p50, borderRadius: 5, color: '#fff',flex: 0.45, fontWeight: '600'}}>
                    <Text size={p20} color={argonTheme.COLORS.WHITE}>
                      SAVE
                    </Text>
                  </Button>
              </View>
              </KeyboardAwareScrollView>
            </View>
          </Modal>
        </Block>

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
    width: '100%',
    padding:p10
  },
  buttonContainer: {
    flex: 1,
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
  input: {
    height: p55,
    backgroundColor: 'white',
    marginBottom: p10,
    paddingLeft: p20,
    paddingRight: p20,
    color: 'black',
    borderRadius: 5,
    borderWidth: 2,
    fontSize: p20,
    borderColor: '#dedede',
  },
  container: {
    marginTop: 18,
    paddingBottom: 20,
    flexDirection:"row",
    borderBottomWidth: 1,
    borderColor: '#dedede',
    marginBottom: 10,
 },
 text: {
    color: '#4f603c',
    padding: 10,
    width: width*0.33,
    flex: 1,
 }
});

const mapStateToProps = state => ({
  exp_data: state.experience.expData,
  fetching: state.experience.fetching,
  isSave: state.experience.isSave,
  saveFetching: state.experience.saveFetching
});

const mapDispatchToProps = dispatch => ({
  attemptToGetExperience: () => dispatch(ExperienceActions.getExperienceRequest()),
  attemptToSaveExperience: (data) => dispatch(ExperienceActions.saveExperienceRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Experience);
