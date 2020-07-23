import { put, call, select } from 'redux-saga/effects'
import SettingsActions from '../../Redux/ProfileRedux/SettingsRedux'
import {NavigationActions} from 'react-navigation'


export function * saveSettings (api, data) {
  console.log('in save reset password ', data)
    let passing_data = data.data;
    const response = yield call(api.saveSettings, passing_data)
    console.log('in save reset password response', response)
    if(response.data == null) {
      yield put(SettingsActions.saveSettingsFailure('Check your internet connection'))
    } else if(response.ok){
      yield put(SettingsActions.saveSettingsSuccess(true))
    } else {
      yield put(SettingsActions.saveSettingsFailure("Save Settings Error"))
    }
  }
