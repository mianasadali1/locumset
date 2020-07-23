import { put, call, select } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import AccountActions from '../Redux/AccountRedux'
import ProfileActions from '../Redux/ProfileRedux/ProfileRedux'
import PreferenceActions from '../Redux/PreferencesRedux'
//import SplashScreen from 'react-native-splash-screen'
import {NavigationActions} from 'react-navigation'


export const selectAuthToken = (state) => state.account.token
export const selectloaded = (state) => state.account.loaded
// attempts to login
export function * login (api, {username, password, token}) {
  //console.error(email + " " + password + " " + clientId);
  //if (password === '') {
    // dispatch failure
  //  yield put(LoginActions.loginFailure('WRONG'))
  //} else {
  console.log('call login function')
    const response = yield call(api.login, username, password, token)
    console.log( response)
    if(response.data == null) {
     yield put(LoginActions.loginFailure())
   } else
    if(response.data && response.data.user){
      console.log('reaponse on success login', response.data)
      yield call(api.setAuthToken, response.data.user.token)
      yield put(LoginActions.loginSuccess(response.data.user))
      yield put(AccountActions.login(response.data.user, response.data.user.token, token, response.data.user.image_path))
      yield put(ProfileActions.hospitalsRequest())
      yield put(PreferenceActions.preferenceRequest())
    // //  yield call(api.setAuthToken, response.data.token)
      yield put(NavigationActions.navigate({ routeName: 'Dashboard'}))
    //
    // } else {
    //   yield put(LoginActions.loginFailure("Login Error"))
    // }
  }
     else {
    yield put(LoginActions.loginFailure('You entered wrong email or password'))
  }

  }

// loads the login
export function * loginLoad (api) {
  const authToken = yield select(selectAuthToken)
  // only set the token if we have it

  console.log(authToken)
  if (authToken) {

    yield put(NavigationActions.navigate({ routeName: 'Dashboard'}))
    yield call(api.setAuthToken, authToken)
  }
  yield put(ProfileActions.hospitalsRequest())
  yield put(LoginActions.loginLoadSuccess())
}

//Check Splash Screen
export function * check(){
  const authToken=yield select(selectAuthToken)
    yield put(LoginActions.loginLoadSuccess())

}
