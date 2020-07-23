import { put, call, select } from 'redux-saga/effects'
import SignupActions from '../../Redux/SignupRedux/SignupRedux'
import AccountActions from '../../Redux/AccountRedux'
import {NavigationActions} from 'react-navigation'
import ProfileActions from '../../Redux/ProfileRedux/ProfileRedux'

export function * signup (api, data) {
    let signup_data = data.data;
    console.log('singup request', signup_data)
    const response = yield call(api.signup, signup_data)
    console.log(response)
    if(response.data == null) {
     yield put(SignupActions.signupFailure('Check your internet connection'))
   } else if(response.data.success){
      console.log('reaponse on success signup', response.data)
      yield call(api.setAuthToken, response.data.success.token)
      yield put(AccountActions.login(response.data.success.user, response.data.success.token, signup_data.device_token, response.data.success.user.image_path))
      yield put(SignupActions.signupSuccess(response.data.success.user))
      yield put(ProfileActions.hospitalsRequest())
      yield put(NavigationActions.navigate({ routeName: 'Dashboard'}))
  }
     else {
    yield put(SignupActions.signupFailure(response.data.error))
  }

  }
