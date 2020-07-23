import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { SignupTypes } from '../Redux/SignupRedux/SignupRedux'
import { PreferenceTypes } from '../Redux/PreferencesRedux'
import { ProfileTypes } from '../Redux/ProfileRedux/ProfileRedux'
import { ExperienceTypes } from '../Redux/ProfileRedux/ExperienceRedux'
import { AlljobsTypes } from '../Redux/AllJobsRedux/WardcoverRedux'
import { JobhistoryTypes } from '../Redux/AllJobsRedux/JobHistoryRedux'
import { NotificationTypes } from '../Redux/ProfileRedux/NotificationRedux'
import { SettingsTypes } from '../Redux/ProfileRedux/SettingsRedux'
import { JobsDetailTypes } from '../Redux/AllJobsRedux/JobdetailRedux'

import { TimesheetTypes } from '../Redux/TimeSheetRedux/TimeSheetRedux'


import { HiredJobsTypes } from '../Redux/AllJobsRedux/HiredJobRedux'
import { HiredDetailTypes } from '../Redux/AllJobsRedux/HiredDetailRedux'
import { LogoutTypes } from '../Redux/LogoutRedux'
import { CompletedJobsTypes } from '../Redux/Dashboard/CompletedJobsRedux'
import { PaymentTypes } from '../Redux/PaymentRedux'
import { DashboardTypes } from '../Redux/Dashboard/DashboardRedux'
import { ForgPasswordTypes } from '../Redux/ForgotPasswordRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { login, loginLoad } from './LoginSagas'
import { signup } from './SignupSagas/SignupSagas'
import { getPreference, savePreference} from './PreferenceSagas'
import { getHospitals, updateProfile } from './ProfileSagas/ProfileSagas'
import { getExperience, saveExperience } from './ProfileSagas/ExperienceSagas'
import { getAllJobs } from './AllJobsSagas/WardcoverSagas'
import { getJobHistory } from './AllJobsSagas/JobhistorySagas'
import { saveNotification } from './ProfileSagas/NotificationSagas'
import { saveSettings } from './ProfileSagas/SettingsSagas'
import { getJobsDetail, jobCancel, applyJob } from './AllJobsSagas/JobdetailSagas'
import { timeSheet } from './TimeSheetSagas/TimeSheetSagas'

// import { getJobsDetail, applyJob} from './AllJobsSagas/JobdetailSagas'
import { showErrorAlert } from './uiSagas'
import { getHiredJobsDetail, rejectJob } from './AllJobsSagas/HiredDetailSagas'
import { getHiredJob, cancelHiredJob } from './AllJobsSagas/HiredJobSagas'
import { logout } from './LogoutSagas'
import { getCompletedJobs} from './Dashboard/CompletedJobsSagas'
import { updatePayment } from './ProfileSagas/PaymentSagas'
// import { getHiredJob } from './AllJobsSagas/HiredJobSagas'
import { getCalendarJobs } from './Dashboard/DashboardSagas'
import { forgPassword, updPassword } from './ForgotPasswordSagas'


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_FAILURE, showErrorAlert),
    takeLatest(SignupTypes.SIGNUP_REQUEST, signup, api),
    takeLatest(SignupTypes.SIGNUP_FAILURE, showErrorAlert),
    takeLatest(ProfileTypes.HOSPITALS_REQUEST, getHospitals, api),
    takeLatest(ProfileTypes.HOSPITALS_FAILURE, showErrorAlert),
    takeLatest(ProfileTypes.UPDATE_PROFILE_REQUEST, updateProfile, api),
    takeLatest(ProfileTypes.UPDATE_PROFILE_FAILURE, showErrorAlert),
    takeLatest(PreferenceTypes.PREFERENCE_REQUEST, getPreference, api),
    takeLatest(PreferenceTypes.PREFERENCE_FAILURE, showErrorAlert),
    takeLatest(PreferenceTypes.SAVE_PREFERENCE_REQUEST, savePreference, api),
    takeLatest(PreferenceTypes.SAVE_PREFERENCE_FAILURE, showErrorAlert),
    takeLatest(ExperienceTypes.GET_EXPERIENCE_REQUEST, getExperience, api),
    takeLatest(ExperienceTypes.GET_EXPERIENCE_FAILURE, showErrorAlert),
    takeLatest(ExperienceTypes.SAVE_EXPERIENCE_REQUEST, saveExperience, api),
    takeLatest(ExperienceTypes.SAVE_EXPERIENCE_FAILURE, showErrorAlert),
    takeLatest(AlljobsTypes.ALL_JOBS_REQUEST, getAllJobs, api),
    takeLatest(AlljobsTypes.ALL_JOBS_FAILURE, showErrorAlert),
    takeLatest(NotificationTypes.SAVE_NOTIFICATION_REQUEST, saveNotification, api),
    takeLatest(NotificationTypes.SAVE_NOTIFICATION_FAILURE, showErrorAlert),
    takeLatest(SettingsTypes.SAVE_SETTINGS_REQUEST, saveSettings, api),
    takeLatest(SettingsTypes.SAVE_SETTINGS_FAILURE, showErrorAlert),
    takeLatest(JobsDetailTypes.JOBS_DETAIL_REQUEST, getJobsDetail, api),
    takeLatest(JobhistoryTypes.JOB_HISTORY_REQUEST, getJobHistory, api),
    takeLatest(JobhistoryTypes.JOB_HISTORY_FAILURE, showErrorAlert),
    takeLatest(JobsDetailTypes.JOB_CANCEL_REQUEST, jobCancel, api),
    // takeLatest(JobsDetailTypes.JOB_APPLY_REQUEST, jobApply, api),
    takeLatest(TimesheetTypes.TIME_SHEET_REQUEST, timeSheet, api),
    takeLatest(TimesheetTypes.TIME_SHEET_FAILURE, showErrorAlert),

    takeLatest(JobsDetailTypes.APPLY_JOB_REQUEST, applyJob, api),
    takeLatest(JobsDetailTypes.APPLY_JOB_FAILURE, showErrorAlert),
    takeLatest(HiredJobsTypes.HIRED_JOBS_REQUEST, getHiredJob, api),
    takeLatest(HiredJobsTypes.HIRED_JOBS_FAILURE, showErrorAlert),
    takeLatest(HiredDetailTypes.HIRED_DETAIL_REQUEST, getHiredJobsDetail, api),
    takeLatest(HiredDetailTypes.HIRED_DETAIL_FAILURE, showErrorAlert),
    takeLatest(HiredDetailTypes.REJECT_JOB_REQUEST, rejectJob, api),
    takeLatest(HiredDetailTypes.REJECT_JOB_FAILURE, showErrorAlert),
    takeLatest(HiredJobsTypes.CANCEL_HIRED_JOBS_REQUEST, cancelHiredJob, api),
    takeLatest(LogoutTypes.DLOGOUT, logout, api),
    takeLatest(LogoutTypes.LOGOUT_FAILURE, showErrorAlert),
    takeLatest(CompletedJobsTypes.COMPLETED_JOBS_REQUEST, getCompletedJobs, api),
    takeLatest(CompletedJobsTypes.COMPLETED_JOBS_FAILURE, showErrorAlert),
    takeLatest(PaymentTypes.UPDATE_PAYMENT_REQUEST, updatePayment, api),
    takeLatest(DashboardTypes.CALENDAR_JOBS_REQUEST, getCalendarJobs, api),
    takeLatest(DashboardTypes.CALENDAR_JOBS_FAILURE, showErrorAlert),
    takeLatest(ForgPasswordTypes.FORG_PASSWORD_REQUEST, forgPassword, api),
    takeLatest(ForgPasswordTypes.FORG_PASSWORD_FAILURE, showErrorAlert),
    takeLatest(ForgPasswordTypes.UPDATE_PASS_REQUEST, updPassword, api),
    takeLatest(ForgPasswordTypes.UPDATE_PASS_FAILURE, showErrorAlert),
  ])
}
