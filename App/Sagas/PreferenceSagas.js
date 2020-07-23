import { put, call, select } from 'redux-saga/effects'
import PreferenceActions from '../Redux/PreferencesRedux'
//import SplashScreen from 'react-native-splash-screen'
import {NavigationActions} from 'react-navigation'


//export const selectAuthToken = (state) => state.account.token
//export const selectloaded = (state) => state.account.loaded
// attempts to login
export function * getPreference (api) {

    const response = yield call(api.getPreference)
    console.log(response)
    if(response.data == null) {
     yield put(PreferenceActions.preferenceFailure())
   } else if(response.ok){
      yield put(PreferenceActions.preferenceSuccess(response.data.success))
      // yield put(NavigationActions.navigate({ routeName: 'Preferences'}))
    } else {
      yield put(PreferenceActions.preferenceFailure(response.data.error))
    }
}

export function * savePreference (api, data ) {

let passing_data = data.data;
    console.log('Data passed to sagas  : ', passing_data, 'Origininal :',data);
    const response = yield call(api.savePreference, passing_data)
    console.log('Save saga response pref :',response)
    if(response.data == null) {
     yield put(PreferenceActions.savePreferenceFailure('Check your internet connection'))
   } else if(response.ok){
        yield put(PreferenceActions.savePreferenceSuccess(response.data.success, response.data.message))
        yield put(NavigationActions.back())
    } else {
        yield put(PreferenceActions.savePreferenceFailure('Saving Preferences failed'))
    }
}
