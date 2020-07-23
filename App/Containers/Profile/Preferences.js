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
  BackHandler
} from "react-native";
// import { Images } from '@common';
import { connect } from 'react-redux';
import { Block, Text, theme, Button } from "galio-framework";
import { argonTheme } from '../../Themes/constants';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { withNavigation } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import PreferenceActions from '../../Redux/PreferencesRedux';
import PreferencesDropdown from '../PreferencesDropdown';
import PropTypes from 'prop-types';

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

class Preferences extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }
    static propTypes = {
        dispatch: PropTypes.func,
        fetching: PropTypes.bool,
        token:PropTypes.string,
        attemptToGetPreference: PropTypes.func,
        attemptToSavePreference: PropTypes.func,
    };
  state = {
    language: '',
    hospital_id: '',
    dept_id: '',
    grade: '',
    from_date: '',
    to_date: '',
    hospitals: [],
    grades: [],
    departments: [],
    hospital: {id: 0, name: ''},
    department: {id: 0, name: ''},
    grade: {id: 0, name: ''}
  }
  constructor(props){
    super(props);
    this.state.hospitals = this.props.navigation.state.params.data.new_hospitals;
    this.state.grades = this.props.navigation.state.params.data.new_grades;
    this.state.departments = this.props.navigation.state.params.data.new_departments;
    this.props.attemptToGetPreference();
    this.handleBackPress = this.handleBackPress.bind(this);
    this.state.grade = this.props.preferenceData ? this.props.preferenceData.grade_id : '';
    this.state.hospital_id = this.props.preferenceData ? this.props.preferenceData.hospital_id : '';
    this.state.dept_id = this.props.preferenceData ? this.props.preferenceData.department_id : '';
  }
    componentWillReceiveProps(props){
    console.log('ComponentWillReceiveProps : ', props);

    }

    async componentDidMount() {
        await this.loadExprience();
    }

    componentWillMount() {
      if(this.props.preferenceData) {
        const hospital = this.state.hospitals.find(obj => obj.id == this.props.preferenceData.hospital_id)
        const department = this.state.departments.find(obj => obj.id == this.props.preferenceData.department_id)
        const grade = this.state.grades.find(obj => obj.id == this.props.preferenceData.grade_id)
        console.log(' ===== hospitals ===== ', hospital, department)
        if(hospital) {
          this.setState({ hospital: hospital})
        }
        if(department) {
          this.setState({ department: department})
        }
        if(grade) {
          this.setState({ grade: grade })
        }
      }
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount () {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress () {
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    }

    getPreferences = () =>{
        // let headers = {
        //   Authorization: "Bearer " + this.props.token
        // }
        // AppClient.getHospitals(headers).then((res) =>{
        if(this.props.hospitalsData) {
            this.props.navigation.navigate('Preferences',{
                data: this.props.hospitalsData
            })
        }
        // });
    }

  _preferenceAsync = () =>{
      console.log('clicked', this.state.hospital_id, this.state.dept_id, this.state.grade);

      let params_data = {
          hospital_id: this.state.hospital_id,
          department_id: this.state.dept_id,
          grade_id:this.state.grade
      };
      this.props.attemptToSavePreference(params_data);
  }
  render() {
    const {preferenceData, save_message, fetching, saveFetching, hospitalsData} = this.props;
    const placeholder = {
      label: 'Enter Hospital',
      value: null,
      color: '#ddd',
    };
      console.log('this.state', this.state)

    const dept = {
      label: 'Enter Department',
      value: null,
      color: '#ddd',
    };
    const grade = {
      label: 'Enter Grade',
      value: null,
      color: '#ddd',
    };
    const message = '';
    if (saveFetching == true) {
      message : {save_message};
      console.log('if yes',message);
    } else {
      message : '';
    }
    console.log( '{{ save_message }} befr : ',this.state.hospitals , 'messages',message)
    return (
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <Block center flex>
          <View style={{width: width, height: 70, backgroundColor: '#009D8B', flexDirection: 'row'}}>
          <View style={{flex: 0.25, padding: 10, paddingLeft: 0, paddingVertical: 15}}>
            <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
              <Image source={require('../assets/images/back_ic.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.5, padding: 10, paddingVertical:18}}>
            <Text center style={{color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 19}}>Preferences</Text>
          </View>
        </View>
          <Text style={{backgroundColor: '#FBE7E8', color: '#000', padding: 10, fontSize: p14, width: width*0.9, borderRadius: 10, marginTop: 10, marginBottom: 10}}>
            Select your preferences for My Preferred Shifts. {message}
          </Text>
          <Spinner
            visible={fetching}
          />
          <Spinner
            visible={saveFetching}
          />
          <View style={{ width: width*0.9, }}>
            <PreferencesDropdown
                multi={false}
                onItemSelect={(item) => {
                  console.log(' item id ', item.id, this.state.hospital_id)
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
                items={this.state.hospitals}
                defaultIndex={this.state.hospital_id}
                chip={true}
                resetValue={false}
                defaultId={this.state.hospital}
                textInputProps={
                  {
                    placeholder: "Choose Hospital",
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
              <PreferencesDropdown
                multi={false}
                onItemSelect={(item) => {
                  this.setState({ dept_id: item.id });
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
                items={this.state.departments}
                defaultIndex={this.state.department}
                chip={true}
                defaultId={this.state.department}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Choose Department",
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
              <PreferencesDropdown
                multi={false}
                onItemSelect={(item) => {
                  this.setState({ grade: item.id });
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
                items={this.state.grades}
                defaultIndex={this.state.grade}
                chip={true}
                defaultId={this.state.grade}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Choose Grade",
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

            <View center style={pickerSelectStyles.buttonContainer, {justifyContent: 'center', alignSelf: 'center',marginTop:10}}>
              <Button center onPress={this._preferenceAsync} style={{backgroundColor: '#059A87', borderRadius: 5, width: width*0.4}}>
                <Text size={17} color={argonTheme.COLORS.WHITE}>
                  SAVE
                </Text>
              </Button>
            </View>
          </View>
        </Block>
      </ScrollView>
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
    preferenceData: state.preference.preferenceData,
    save_message : state.preference.save_success_message,
    fetching: state.preference.fetching,
    saveFetching: state.preference.saveFetching
});

const mapDispatchToProps = dispatch => ({
  // getUserToken: token => dispatch(getUserToken(token))
    attemptToGetPreference: () => dispatch(PreferenceActions.preferenceRequest()),
    attemptToSavePreference: (data) => dispatch(PreferenceActions.savePreferenceRequest(data))

});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
