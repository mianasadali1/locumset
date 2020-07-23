import { put, call, select } from 'redux-saga/effects'
import JobhistoryActions from '../../Redux/AllJobsRedux/JobHistoryRedux'
import {NavigationActions} from 'react-navigation'


// attempts to get job history
export function * getJobHistory (api) {
  	console.log('in sagas jobHistory')
  	const response = yield call(api.getJobHistory)
  	console.log('job history response', response)
  if(response.data == null) {
     yield put(JobhistoryActions.jobHistoryFailure('Check your internet connection'))
   } else if(response.ok){
	  yield put(JobhistoryActions.jobHistorySuccess(response.data.success))
	} else {
	  yield put(JobhistoryActions.jobHistoryFailure("Get Jobs Error"))
	}
}
