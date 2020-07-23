import { put, call, select } from 'redux-saga/effects'
import ForgPasswordActions from '../Redux/ForgotPasswordRedux'
import {NavigationActions} from 'react-navigation'

export function * forgPassword (api, data) {
    let forg_pass_data = data.data;
    console.log('singup request', forg_pass_data)
    const response = yield call(api.forgotPass, forg_pass_data)
    console.log(response)
    if(response.data == null) {
     yield put(ForgPasswordActions.forgPasswordFailure('Check your internet connection'))
   } else if(response.data.success){
      console.log('reaponse on success signup', response.data)
      yield put(ForgPasswordActions.forgPasswordSuccess(true))
  }
     else {
    yield put(ForgPasswordActions.forgPasswordFailure(response.data.error))
  }

}

export function * updPassword (api, data) {
    let upd_pass_data = data.data;
    console.log('singup request', upd_pass_data, data)
    const response = yield call(api.updatePass, upd_pass_data)
    console.log(response)
    if(response.data == null) {
     yield put(ForgPasswordActions.updatePassFailure('Check your internet connection'))
   } else if(response.data.success){
      console.log('reaponse on success update pass', response.data)
      yield put(ForgPasswordActions.updatePassSuccess())
      yield put(NavigationActions.navigate({ routeName: 'Login'}))
  }
     else {
    yield put(ForgPasswordActions.updatePassFailure(response.data.error))
  }

}
