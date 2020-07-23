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
  BackHandler
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { Images } from '../../Themes';
import { connect } from 'react-redux';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Block, Text, theme, Button } from "galio-framework";
import { argonTheme } from '../../Themes/constants';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import NotificationActions from '../../Redux/ProfileRedux/NotificationRedux'
const { width, height } = Dimensions.get("screen");

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
const p18 = 18/480*width;
const p75 = 75/480*width;
const p80 = 80/480*width;
const p85 = 85/480*width;
const p90 = 90/480*width;
const p100 = 100/480*width;
const p150 = 150/480*width;
const p200 = 200/480*width;

class Notifications extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (navigation.goBack());
  }

    static propTypes = {
        dispatch: PropTypes.func,
        saveFetching: PropTypes.bool,
        attemptToSaveNotification: PropTypes.func,
    };

  constructor(props){
    super(props)
    this.state = {
      urgentJobs : this.props.user ? this.props.user.urgent_jobs == 1 ? true : false : false,
      approvedJobs : this.props.user ? this.props.user.approved_jobs == 1 ? true : false : false,
      upcommingShift : this.props.user ? this.props.user.upcomming_shift == 1 ? true : false : false,
      sameDayShift : this.props.user ? this.props.user.same_day_shift == 1 ? true : false : false,
      submitTimesheet : this.props.user ? this.props.user.submit_timesheet == 1 ? true : false : false,
      approvedTimesheet : this.props.user ? this.props.user.approved_timesheet == 1 ? true : false : false,
    }
    this.handleBackPress = this.handleBackPress.bind(this);
  }
  componentDidMount(){
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

  toggleUrgentJobs = (value) => {
    this.setState({urgentJobs: value})
  }

  toggleApprovedJobs = (value) => {
    this.setState({approvedJobs: value})
  }

  toggleUpcommingShipt = (value) => {
    this.setState({upcommingShift: value})
  }

  togglesameDayShift = (value) => {
    this.setState({sameDayShift: value})
  }

  togglesubmitTimesheet = (value) => {
    this.setState({submitTimesheet: value})
  }

  toggleapprovedTimesheet = (value) => {
    this.setState({approvedTimesheet: value})
  }

    saveNotif = () => {
        console.log('ApplyJob',this.props.token, this.state.urgentJobs, this.state.approvedJobs, this.state.submitTimesheet);

        let params_data ={

            urgent_jobs : this.state.urgentJobs ? 1 : 0,
            approved_jobs : this.state.approvedJobs ? 1 : 0,
            upcomming_shift : this.state.upcommingShift ? 1 : 0,
            same_day_shift : this.state.sameDayShift ? 1 : 0,
            submit_timesheet : this.state.submitTimesheet ? 1 : 0,
            approved_timesheet : this.state.approvedTimesheet ? 1 : 0,

        }
      //saveSettings
        this.props.attemptToSaveNotification(params_data)

    }

  render() {
    const {saveFetching, notifData, user} = this.props;
    console.log('user data', user)
    return (
      <View style={{ backgroundColor: '#F7F7F7', flex: 1}}>
      <Spinner
            visible={saveFetching}
          />
        <Block>
          <View style={{width: width, height: 70, backgroundColor: '#009D8B', flexDirection: 'row'}}>
          <View style={{flex: 0.25, padding: 10, paddingLeft: 0, paddingVertical: 15}}>
            <TouchableOpacity onPress={this.handleLeftPress} style={{ padding: 10 }}>
              <Image source={require('../assets/images/back_ic.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.5, padding: 10, paddingVertical:18}}>
            <Text center style={{color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 19}}>Notifications</Text>
          </View>
        </View>
        </Block>
        <ScrollView contentContainerStyle={styles.stage}>
          <TableView style={{ backgroundColor: '#F7F7F7'}}>
            <Section size={p20} style={{ backgroundColor: '#F7F7F7',}}>
              <Cell
                cellStyle="Subtitle"
                title="Urgent shifts"
                titleTextStyle={{fontSize: p18}}
                image={
                  <Image
                    style={{ borderRadius: 5, width: p30, height: p30 }}
                    source={ Images.UrgentJobs }
                  />
                }
                titleTextColor="#000"
                subtitleColor='#b6aeae'
                detail="Urgent shifts description"
                cellAccessoryView={<Switch onValueChange = {this.toggleUrgentJobs} value={this.state.urgentJobs} />}
                contentContainerStyle={{ paddingVertical: 4 }}
              />
              <Cell
                cellStyle="Subtitle"
                title="Approved shifts status"
                titleTextStyle={{fontSize: p18}}
                image={
                  <Image
                    style={{ borderRadius: 5, width: p30, height: p30 }}
                    source={ Images.ApprovedJobs }
                  />
                }
                titleTextColor="#000"
                subtitleColor='#b6aeae'
                detail="Approved shift status description"
                cellAccessoryView={<Switch onValueChange = {this.toggleApprovedJobs} value={this.state.approvedJobs} />}
                contentContainerStyle={{ paddingVertical: 4 }}
              />
              <Cell
                cellStyle="Subtitle"
                title="Reminder for upcomming shift"
                titleTextStyle={{fontSize: p18}}
                image={
                  <Image
                    style={{ borderRadius: 5, width: p30, height: p30 }}
                    source={ Images.OneDayShift }
                  />
                }
                titleTextColor="#000"
                subtitleColor='#b6aeae'
                detail="(1 day before)"
                cellAccessoryView={<Switch onValueChange = {this.toggleUpcommingShipt} value={this.state.upcommingShift} />}
                contentContainerStyle={{ paddingVertical: 4 }}
              />
              <Cell
                cellStyle="Subtitle"
                title="Reminder for upcomming shift"
                titleTextStyle={{fontSize: p18}}
                image={
                  <Image
                    style={{ borderRadius: 5, width: p30, height: p30 }}
                    source={ Images.SameDayShipt }
                  />
                }
                titleTextColor="#000"
                subtitleColor='#b6aeae'
                detail="(on same day)"
                cellAccessoryView={<Switch onValueChange = {this.togglesameDayShift} value={this.state.sameDayShift} />}
                contentContainerStyle={{ paddingVertical: 4 }}
              />
              <Cell
                cellStyle="Subtitle"
                title="Reminder for submitting time sheet"
                titleTextStyle={{fontSize: p18}}
                image={
                  <Image
                    style={{ borderRadius: 5, width: p30, height: p30 }}
                    source={ Images.SubmitTimesheet }
                  />
                }
                titleTextColor="#000"
                subtitleColor='#b6aeae'
                detail=""
                cellAccessoryView={<Switch onValueChange = {this.togglesubmitTimesheet} value={this.state.submitTimesheet} />}
                contentContainerStyle={{ paddingVertical: 4 }}
              />
              <Cell
                cellStyle="Subtitle"
                title="Notification for approved time sheet"
                titleTextStyle={{fontSize: p18}}
                image={
                  <Image
                    style={{ borderRadius: 5, width: p30, height: p30 }}
                    source={ Images.ApprovedTimesheet }
                  />
                }
                titleTextColor="#000"
                subtitleColor='#b6aeae'
                detail=""
                cellAccessoryView={<Switch onValueChange = {this.toggleapprovedTimesheet} value={this.state.approvedTimesheet} />}
                contentContainerStyle={{ paddingVertical: 4 }}
              />
            </Section>
          </TableView>
          <View center style={pickerSelectStyles.buttonContainer, {justifyContent: 'center', alignSelf: 'center',}}>
            <Button center onPress={() => this.saveNotif()} style={{backgroundColor: '#059A87', borderRadius: 20, width: width*0.4}}>
              <Text size={18} color={argonTheme.COLORS.WHITE}>
                SAVE
              </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
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
  buttonContainer: {
    flex: 0.5,
    marginRight: 10,
  },
});

const mapStateToProps = state => ({
    isSave: state.notification.isSave,
    saveFetching: state.notification.saveFetching,
    notifSaveMessage : state.notification.notifSaveMessage,
    notifData: state.notification.notifData,
    user: state.account.user
});

const mapDispatchToProps = dispatch => ({
    attemptToSaveNotification: (data) => dispatch(NotificationActions.saveNotificationRequest(data))
});

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#F7F7F7'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
