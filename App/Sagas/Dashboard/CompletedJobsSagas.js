import { put, call, select } from 'redux-saga/effects'
import CompletedJobsTypes from '../../Redux/Dashboard/CompletedJobsRedux'
import {NavigationActions} from 'react-navigation'

// attempts to get all jobs
export function * getCompletedJobs (api) {
  console.log('in sagas completed Jobs')
    const response = yield call(api.getCompletedJobs)
    console.log('completed Jobs resp', response)
  if(response.data == null) {
     yield put(CompletedJobsTypes.completedJobsFailure('Check your internet connection'))
   } else if(response.ok){
      yield put(CompletedJobsTypes.completedJobsSuccess(response.data.success))
    } else {
      yield put(CompletedJobsTypes.completedJobsFailure("Get Jobs Error"))
    }
}
