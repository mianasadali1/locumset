import { createStackNavigator, createAppContainer } from 'react-navigation'
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition'
import LaunchScreen from '../Containers/LaunchScreen'
import Login from '../Containers/LogIn/login'
import CalendarsScreen from '../Containers/Dashboard/Dashboard'
import FindJob from '../Containers/Dashboard/FindJob'
import DashHeader from "../Components/DashboardHeader";
import Profile from '../Containers/Profile/Profile';
import BasicInfo from '../Containers/Profile/BasicInfo';
import EditBasicInfo from '../Containers/Profile/EditBasicInfo';
import BasicInfoHeader from '../Components/BasicInfoHeader';
import Experience from '../Containers/Profile/Experience';
import Preferences from '../Containers/Profile/Preferences';
import JobHistory from '../Containers/Profile/JobHistory';
import Notifications from '../Containers/Profile/Notifications';
import HiredJob from '../Containers/AllJobs/HiredJob';
//import Settings from '../Containers/Profile/Settings';
import Settings from '../Containers/Profile/MySettings';
import Wardcover from '../Containers/AllJobs/Wardcover';
import JobDetail from '../Containers/AllJobs/JobDetail';
import SubmitTimeSheet from '../Containers/AllJobs/SubmitTimeSheet';
import HoursWorked from '../../App/Containers/AllJobs/HoursWorked';
import CalculateShiftSalary from '../../App/Containers/AllJobs/CalculateShiftSalary';
import Signatures from '../../App/Containers/AllJobs/Signatures';
// import Selfi from "../Containers/Signup/Selfi";
import CompleteProfile from "../Containers/Signup/CompleteProfile";
import HiredDetail from '../Containers/AllJobs/HiredDetail';
import styles from './Styles/NavigationStyles'
import Register from '../Containers/Signup/Register'
import Completed from '../Containers/Dashboard/Completed'
import ForgotPassword from '../Containers/LogIn/ForgotPassword'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  Account: {
      screen: Register,
      navigationOptions: navOpt => ({
        header: null
      })
    },
    // Selfi: {
    //   screen: Selfi,
    //   navigationOptions: navOpt => ({
    //     header: null
    //   })
    // },
    CompleteProfile: {
      screen: CompleteProfile,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <WithoutBackHeader bgColor="#222222" titleColor="white" title="Complete Profile" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
  Login: {
      screen: Login,
        navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Dashboard: {
          screen: CalendarsScreen,
          navigationOptions: ({ navigation }) => ({
              // header: (
              //     <DashHeader />
              // ),
              headerTransparent: true
          })
      },
      Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <Header back bgColor="#222222" titleColor="white" title="Profile" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    BasicInfo: {
      screen: BasicInfo,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <BasicInfoHeader back bgColor="#222222" titleColor="white" title="Basic Info" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    EditBasicInfo: {
      screen: EditBasicInfo,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <BasicInfoHeader back bgColor="#222222" titleColor="white" title="Basic Info" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    Experience: {
      screen: Experience,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <Header back bgColor="#222222" titleColor="white" title="Experience" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    Preferences: {
      screen: Preferences,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <Header back bgColor="#222222" titleColor="white" title="Preferences" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    HiredJob: {
        screen: HiredJob,
        navigationOptions: ({ navigation }) => ({
            // header: (
            //   <Header back bgColor="#222222" titleColor="white" title="HiredJob" iconColor={'#fff'} navigation={navigation} />
            // ),
            headerTransparent: true
        })
    },
    JobHistory: {
      screen: JobHistory,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <Header back bgColor="#222222" titleColor="white" title="Job History" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <Header back bgColor="#222222" titleColor="white" title="Notifications" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    Settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <Header back bgColor="#222222" titleColor="white" title="Settings" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    Wardcover: {
      screen: Wardcover,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <WardcoverHeader back bgColor="#222222" titleColor="white" title="Wardcover" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    FindJob: {
      screen: FindJob,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <WardcoverHeader back bgColor="#222222" titleColor="white" title="Wardcover" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    JobDetail: {
      screen: JobDetail,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <WardcoverHeader back bgColor="#222222" titleColor="white" title="Wardcover" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    TimeSheet: {
      screen: SubmitTimeSheet,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <WardcoverHeader back bgColor="#222222" titleColor="white" title="Wardcover" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    HoursWorked: {
      screen: HoursWorked,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <WardcoverHeader back bgColor="#222222" titleColor="white" title="Wardcover" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    CalculateShiftSalary: {
      screen: CalculateShiftSalary,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <WardcoverHeader back bgColor="#222222" titleColor="white" title="Wardcover" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    Signatures: {
      screen: Signatures,
      navigationOptions: ({ navigation }) => ({
        // header: (
        //   <WardcoverHeader back bgColor="#222222" titleColor="white" title="Wardcover" iconColor={'#fff'} navigation={navigation} />
        // ),
        headerTransparent: true
      })
    },
    HiredDetail: {
        screen: HiredDetail,
        navigationOptions: ({ navigation }) => ({
            // header: (
            //   <Header back bgColor="#222222" titleColor="white" title="HiredJob" iconColor={'#fff'} navigation={navigation} />
            // ),
            headerTransparent: true
        })
    },
    Completed: {
        screen: Completed,
        navigationOptions: ({ navigation }) => ({
            headerTransparent: true
        })
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: ({ navigation }) => ({
            headerTransparent: true
        })
    },

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Login',
	transitionConfig: getSlideFromRightTransition,
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
