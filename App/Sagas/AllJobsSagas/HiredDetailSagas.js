import { put, call, select } from 'redux-saga/effects'
import HiredDetailActions from '../../Redux/AllJobsRedux/HiredDetailRedux'
import HiredjobActions from '../../Redux/AllJobsRedux/HiredJobRedux'
import {NavigationActions} from 'react-navigation'


//export const selectAuthToken = (state) => state.account.token
//export const selectloaded = (state) => state.account.loaded
// attempts to get all jobs
export function * getHiredJobsDetail (api, jobId) {
  console.log('in sagas jobs detail', jobId)
  let job_id = jobId.jobId
    const response = yield call(api.getHiredJobDetail, job_id)
    console.log('jobs detail resp', response)
    if(response.data == null) {
     yield put(HiredDetailActions.hiredDetailFailure('Check your internet connection'))
   } else if(response.ok){
      yield put(HiredDetailActions.hiredDetailSuccess(response.data.success))
    } else {
      yield put(HiredDetailActions.hiredDetailFailure('Failed to get hired jobs detail'))
    }
}


// attempts to get all jobs
export function * rejectJob (api, data) {
    console.log('in sagas apply job', data)
    let param_data = data.data
    const response = yield call(api.rejectJob, param_data)
    console.log('Apply Job', response)
    if(response.data == null) {
     yield put(HiredDetailActions.rejectJobFailure('Check your internet connection'))
   } else if(response.ok){
        yield put(HiredDetailActions.rejectJobSuccess(response.data.success))
        yield put(HiredjobActions.hiredJobsRequest())
        yield put(NavigationActions.back())
    } else {
        yield put(HiredDetailActions.rejectJobFailure("Failed reject job"))
    }
}
