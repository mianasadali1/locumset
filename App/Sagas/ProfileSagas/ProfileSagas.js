import { put, call, select } from 'redux-saga/effects'
import ProfileActions from '../../Redux/ProfileRedux/ProfileRedux'
import {NavigationActions} from 'react-navigation'
import AccountActions from '../../Redux/AccountRedux'


//export const selectAuthToken = (state) => state.account.token
//export const selectloaded = (state) => state.account.loaded
// attempts to get hospitals detail
export function * getHospitals (api) {

    const response = yield call(api.getHospitals)
    console.log('hospital detail', response)
    if(response.data == null) {
     yield put(ProfileActions.hospitalsFailure())
   } else if(response.ok){
      yield put(ProfileActions.hospitalsSuccess(response.data))
    } else {
      yield put(ProfileActions.hospitalsFailure("Detail not found"))
    }
  }


  export function * updateProfile (api, data) {
    let profile_data = data.data
      const response = yield call(api.updateProfile, profile_data)
      console.log('update_profile', response)
      if(response.data == null) {
       yield put(ProfileActions.updateProfileFailure('Check your internet connection'))
     } else if(response.ok){
        yield put(ProfileActions.updateProfileSuccess(response.data))
        yield put(AccountActions.updateProfile(response.data.success))
        yield put(NavigationActions.back())
      } else {
        yield put(ProfileActions.updateProfileFailure("Profile Update Error"))
      }
    }
