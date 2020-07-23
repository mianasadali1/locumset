import { put, call, select } from 'redux-saga/effects'
import HiredJobsTypes from '../../Redux/AllJobsRedux/HiredJobRedux'
import {NavigationActions} from 'react-navigation'

// attempts to get all jobs
export function * getHiredJob (api) {
  console.log('in sagas Hired Jobs')
    const response = yield call(api.getHiredJob)
    console.log('Hired Jobs resp', response)
    if(response.data == null) {
     yield put(HiredJobsTypes.hiredJobsFailure('Check your internet connection'))
   } else if(response.data){
      yield put(HiredJobsTypes.hiredJobsSuccess(response.data.success))
    } else {
      yield put(HiredJobsTypes.hiredJobsFailure("Get Jobs Error"))
    }
}

// attempts to get all jobs
export function * cancelHiredJob (api) {
  console.log('in sagas Hired Jobs')
    const response = yield call(api.rejectJob)
    console.log('Hired Jobs resp', response)
    if(response.data == null) {
     yield put(ProfileActions.updateProfileFailure('Check your internet connection'))
   } else if(response.data){
      yield put(HiredJobsTypes.cancelHiredJobsSuccess(response.data.success))
    } else {
      yield put(HiredJobsTypes.cancelHiredJobsFailure("Get Jobs Error"))
    }
}
