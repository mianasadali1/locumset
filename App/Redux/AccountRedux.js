import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
 //login: ['username', 'token', 'user_id','name', 'user_type', 'mobile_no', 'city', 'comission', 'sales_executive_id'],
 login: ['user', 'token', 'mobileId', 'user_image'],
 logout: [],
 loadSuccess:[],
 appliedJobs: ['appliedData'],
 updateProfile: ['user']
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  appliedJobs: [],
  user: null,
  zip_code:null,
  username:null,
  token:null,
  mobileId: null,
  user_image: null
})

/* ------------- Reducers ------------- */

// setting state to login
//export const dologin = (state, { zip_code, username, token, user_id, first_name, last_name, display_name, city, pickup_window, pickup_address, receive_notification, notification_type }) =>
//state.merge({ login_status: true, zip_code: zip_code, username: username, token: token, user_id: user_id, first_name:first_name, last_name: last_name, display_name:display_name, city: city, pickup_window: pickup_window, pickup_address: pickup_address, receive_notification: receive_notification, notification_type: notification_type })
export const dologin = (state, {user, token, mobileId, user_image}) =>
  state.merge({login_status: true, user:user, token: token, mobileId: mobileId, user_image: user_image})

//console.error(data)
// we've logged out
export const dologout = (state) =>
state.merge({ login_status: false, user: null, token: null, mobileId: null, user_image: null})

//data loaded
export const loadSuccess = (state) => state.merge({ loaded:true })

export const saveAppliedJobs = (state, {appliedData}) => {
  console.log('applied data', state, appliedData)
  const newlist= state.appliedJobs.concat(appliedData)
  return state.merge({ fetching: false, appliedJobs:newlist})
  // return state.merge({ appliedData: appliedData})
}

export const updProfile = (state, {user}) =>
  state.merge({user: user})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
 [Types.LOGIN]: dologin,
 [Types.LOGOUT]: dologout,
 [Types.LOAD_SUCCESS]: loadSuccess,
 [Types.APPLIED_JOBS]: saveAppliedJobs,
 [Types.UPDATE_PROFILE]: updProfile
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (accountState) => accountState.login_status !== null
export const getToken = (accountState) => accountState.token !== null
