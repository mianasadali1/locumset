import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  BackHandler,
  Actions,
  ToastAndroid,
  Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';
import { connect } from 'react-redux';
import {Calendar} from 'react-native-calendars';
import argonTheme from "../../Themes/constants/Theme";
import PreferenceActions from '../../Redux/PreferencesRedux';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import SplashScreen from 'react-native-splash-screen'

import changeNavigationBarColor, {
  HideNavigationBar,
  ShowNavigationBar,
} from 'react-native-navigation-bar-color';
import moment from 'moment';

import DashboardActions from '../../Redux/Dashboard/DashboardRedux'

const { width, height } = Dimensions.get("screen");
const rem = width / 380;
const p40 = 40/480*width;
const p30 = 30/480*width;
const p55 = 55/480*width;
const p50 = 50/480*width;
const p65 = 65/480*width;
const p10 = 10/480*width;
const p14 = 14/480*width;
const p16 = 16/480*width;
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


const enabled = firebase.messaging().hasPermission();
if (enabled) {
    // user has permissions
    console.log('enable', enabled)
} else {
    // user doesn't have permission
    console.log('not enabled', enabled)
}

class CalendarsScreen extends React.Component {static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptToGetPreference: PropTypes.func,
    attemptToGetCalendar: PropTypes.func
};
    constructor(props) {
      super(props);

        this.token = props.token;
      this.state = {
        date: '',
        calData: [],
        isVisible: 0,
        fetching: true,
        Date: moment().format('YYYY-MM-DD'),
      };
      this.onDayPress = this.onDayPress.bind(this);
      this.props.attemptToGetPreference();
      firebase.messaging().getToken()
        .then(fcmToken => {
          console.log('user.isAnonymous', fcmToken);
        });
      this.handleBackPress = this.handleBackPress.bind(this);
      // Toast.show('This is a long toast.',Toast.LONG);
      ShowNavigationBar();
      this.props.attemptToGetCalendar();
    }
    componentWillReceiveProps (props) {
      this.setState({isVisible: 1})
      this.state.calData = props.calendarData;
      this.setState({fetching: false})
    }

    componentWillMount () {
      console.log('on will mount')
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    CalendarMonth = (month) => {
      this.setState({isVisible: false, fetching: true, Date: month.dateString});
      this.state.calData = this.state.calData;
      console.log('calendar month');
      console.log(month.dateString);
      this.forceUpdate();
      this.setState({isVisible: true, fetching: false});
    }


    componentDidMount () {
      console.log(' date ', this.state.Date)
      if(Platform.OS == 'android'){
              setTimeout(() => {
                SplashScreen.hide();
              }, 1500);
            }
        this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
            console.log('onMessage', message)
            // Process your message as required
        });
        this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            console.log('onNotificationDisplayed', notification)
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.removeNotificationListener = firebase.notifications().onNotification((notification: Notification) => {
          console.log('onNotification', notification)
            // Process your notification as required
        });
        this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            console.error('onNotificationOpened', notificationOpen)
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
        });
        firebase.notifications().getInitialNotification()
            .then((notificationOpen: NotificationOpen) => {
                console.log('getInitialNotification', notificationOpen)
                console.log('getInitialNotification', notificationOpen.notification)
                if (notificationOpen) {
                    if(notificationOpen.notification.data.page == 'timesheet') {
                        console.log('navigate on time sheet')
                        this.props.navigation.navigate('Completed')
                    } else if(notificationOpen.notification.data.page == 'profile') {
                        console.log('navigate on time sheet')
                        this.props.navigation.navigate('Profile')
                    } else if(notificationOpen.notification.data.page == 'hire') {
                        console.log('navigate on time sheet')
                        this.props.navigation.navigate('HiredJob')
                    }
                    // App was opened by a notification
                    // Get the action triggered by the notification being opened
                    const action = notificationOpen.action;
                    // Get information about the notification that was opened
                    const notification: Notification = notificationOpen.notification;
                }
            });
    }

    navigateOnHiredJobDetail () {

    }

    componentWillUnmount () {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      this.removeNotificationDisplayedListener();
      this.removeNotificationListener();
      this.removeNotificationOpenedListener();
    }

    handleBackPress = () => {
      BackHandler.exitApp(); // works best when the goBack is async
      return true;
    }

    _FindJob = () => {
      console.log('find a job');
      this.props.navigation.navigate('FindJob');
    }
    _Wardcover = () => {
      console.log('Wardcover');
      this.props.navigation.navigate('Wardcover');
    }
    //To Check this screen that is why navigation created
    _SubmitTimeSheet = () => {
      console.log('SubmitTimeSheet');
      this.props.navigation.navigate('Completed');
    }
    _Profile = () => {
      this.props.navigation.navigate('Profile');
    }
    _HiredJObs = () => {
      this.props.navigation.navigate('HiredJob');

      // if(this.props.hospitalsData) {
      //   this.props.navigation.navigate('Preferences',{
      //     data: this.props.hospitalsData
      //   })
      // }

    }

    navigateJobDetailUrgent = () => {
      console.log('navigation data')
      this.props.navigation.navigate('Wardcover', {urgent: 'urgent'});
    }
    _TimeSheet = () => {
      this.props.navigation.navigate('TimeSheet');
    }

    render() {
      const { token, hospitalsData, calendarData } = this.props;
      console.log('calendar data', calendarData)
      return (
        <View style={{flex: 1, backgroundColor: '#f7f7f7'}}>
          <Block>
            <View style={{width: width, height: 90, alignItems: 'center', backgroundColor: '#009B80', flexDirection: 'row'}}>
              <View style={{flex: 1, padding: 10, paddingRight:10, textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>
                <Image source={require('../assets/imgs/logo-scroll.png')} style={{marginTop: 5}} />
              </View>
            </View>
          </Block>
          <View style={{flex: 1,  flexDirection:'column', justifyContent:'space-between'}}>
            <View center style={{width: width, backgroundColor: '#fff',}}>
              <Block center style={styles.container}>
                  <Button
                        style={styles.button2}
                            color='#ec1c24'
                            textStyle={{ color: argonTheme.COLORS.WHITE, fontWeight: '500', marginTop: -7 }}
                            onPress={this.navigateJobDetailUrgent}
                        >
                            Go to Urgent Jobs
                  </Button>
              </Block>
              <Block>
                {this.state.isVisible ? (
                    <Calendar
                        style={styles.calendar}
                        current={this.state.Date.toString()}
                        displayLoadingIndicator
                        markingType={'period'}
                        onMonthChange={(month) => this.CalendarMonth(month)}
                        theme={{
                          calendarBackground: '#FFFFFF',
                          textSectionTitleColor: '#89cec7',
                          dayTextColor: 'black',
                          todayTextColor: '#555',
                          selectedDayTextColor: '#8acec7',
                          monthTextColor: '#595d5e',
                          indicatorColor: '#eff8f7',
                          selectedDayBackgroundColor: '#333248',
                          arrowColor: '#b0bbba',
                          //textDisabledColor: 'red',
                          'innerStyle': {
                            fontSize: 12,
                            padding: 0,
                            margin: 0,
                          },
                          'stylesheet.calendar.header': {
                            header: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginTop: p10,
                            alignItems: 'center',
                            backgroundColor:'#eff8f7',
                            height:20
                        },

                            week: {
                              marginTop: 0,
                              flexDirection: 'row',
                              justifyContent: 'space-between'
                              }
                          },
                        }}
                        markedDates={this.state.calData}
                        hideArrows={false}
                    />
                    ):(
                    <View />
                  )}
              </Block>
            </View>
            <View  style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={this._FindJob}  style={{flex: 0.33, padding: p10, borderColor: '#dcdcdc', borderWidth: 1, borderBottomWidth: 0}}>
                    <Text center style={{height: 60, fontSize: p30}}>
                      <Image center style={{height: 42, width: 42}} source={require('../assets/images/preferred_jobs_ic.png') } />
                    </Text>
                    <Text center style={{fontSize: p14}}>
                      My Preferred Shifts
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._Wardcover}  style={{flex: 0.33, padding: p10, borderColor: '#dcdcdc', borderTopWidth: 1,}}>
                    <Text center style={{height: 60, fontSize: p30}}>
                      <Image center style={{height: 42, width: 42}} source={require('../assets/images/all_jobs_ic.png')} />
                    </Text>
                    <Text center style={{fontSize: p14}}>
                      All Shifts
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._SubmitTimeSheet}  style={{flex: 0.34, padding: p10, borderColor: '#dcdcdc', borderWidth: 1, borderBottomWidth: 0}}>
                    <Text center style={{height: 60, fontSize: p30}}>
                      <Image center  style={{height: 42, width: 42}} source={require('../assets/images/completed_jobs_ic.png')} />
                    </Text>
                    <Text center style={{fontSize: p14}}>
                      Completed Shifts
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row',}}>
                  <TouchableOpacity onPress={this._TimeSheet}  style={{flex: 0.33, padding: p10, borderColor: '#dcdcdc', borderWidth: 1,}}>
                    <Text center style={{height: 60, fontSize: p30}}>
                      <Image center style={{height: 42, width: 42}} source={require('../assets/images/timsheet_ic.png')}  />
                    </Text>
                    <Text center style={{fontSize: p14}}>
                      Timesheet
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._Profile}  style={{flex: 0.33, padding: p10, borderColor: '#dcdcdc', borderWidth: 1, borderRightWidth: 0, borderLeftWidth: 0}}>
                    <Text center style={{height: 60, fontSize: p30}}>
                      <Image center style={{height: 42, width: 42}} source={require('../assets/images/profile_ic.png')}  />
                    </Text>
                    <Text center style={{fontSize: p14}}>
                      Profile
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._HiredJObs}  style={{flex: 0.34, padding: p10, borderColor: '#dcdcdc', borderWidth: 1,}}>
                    <Text center style={{height: 60, fontSize: p30}}>
                      <Image center style={{height: 42, width: 42}} source={require('../assets/images/preferences_ic.png')} />
                    </Text>
                    <Text center style={{fontSize: p14}}>
                      Hired Shifts
                    </Text>
                  </TouchableOpacity>
                </View>
            </View>
          </View>
        </View>
      );
  }

    onDayPress(day) {
      this.setState({
          selected: day.dateString
      });
    }
}

const styles = StyleSheet.create({
    calendar: {

  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 0,
    backgroundColor: '#dcdcdc'
  },
  button: {
      width: 118,
      height: 86,
      shadowRadius: 0,
      shadowOpacity: 0,
      borderColor: '#dcdcdc',
      borderWidth: 1,

  },
  button2:{
    width: 180,
    height: 30,
    borderRadius: 30,
    marginBottom:'1%',
    marginTop:'1%'
  },
  container: {
    backgroundColor: '#FFFFFF',
    width:width
  },
  container1: {
    backgroundColor: '#f7f7f7',
    width:width,
    minHeight: height-123,
  },
  // Top Header
  header: {
    flex: 0,
    backgroundColor: '#009D8B',
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 10,
    marginBottom: 10
  },
  // Top header text
  headText: {
    color: "#FFFFFF",
    fontFamily: 'sans-serif',
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 20,
    textAlign: 'center'
  },
});

const mapStateToProps = state => ({
  // token: state.account.user.token,
  hospitalsData: state.profile.hospitalsData,
  calendarData: state.calendarData.calendarJobs
});


const mapDispatchToProps = dispatch => ({
  attemptToGetPreference: () => dispatch(PreferenceActions.preferenceRequest()),
  attemptToGetCalendar: () => dispatch(DashboardActions.calendarJobsRequest())
});
export default connect(mapStateToProps, mapDispatchToProps)(CalendarsScreen)
