import { put, call, select } from 'redux-saga/effects'
import ExperienceActions from '../../Redux/ProfileRedux/ExperienceRedux'
import {NavigationActions} from 'react-navigation'


//export const selectAuthToken = (state) => state.account.token
//export const selectloaded = (state) => state.account.loaded
// attempts to get experience
export function * getExperience (api) {
    const response = yield call(api.getExperience)
    if(response.data == null) {
     yield put(ExperienceActions.getExperienceFailure('Check your internet connection'))
   } else
    if(response.data){
      yield put(ExperienceActions.getExperienceSuccess(response.data.success))
    } else {
      yield put(ExperienceActions.getExperienceFailure("Get Experience Error"))
    }
  }

export function * saveExperience (api, {data}) {
  console.log('in save experience ', data)
    const response = yield call(api.saveExperience, data)
      console.log('in save experience response', response)
      if(response.data == null) {
       yield put(ExperienceActions.saveExperienceFailure('Check your internet connection'))
     } else if(response.ok){
      yield put(ExperienceActions.getExperienceRequest(true));
      yield put(ExperienceActions.saveExperienceSuccess(true))
    } else {
      yield put(ExperienceActions.saveExperienceFailure("Save Experience Error"))
    }
  }
