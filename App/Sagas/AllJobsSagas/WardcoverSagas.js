import { put, call, select } from 'redux-saga/effects'
import AlljobsActions from '../../Redux/AllJobsRedux/WardcoverRedux'
import {NavigationActions} from 'react-navigation'


// attempts to get all jobs
export function * getAllJobs (api, {data}) {
  console.log('in sagas jobs', data)
    const response = yield call(api.getAllJobs, data)
    console.log('jobs resp', response)
    if(response.data == null) {
     yield put(AlljobsActions.allJobsFailure('Check your internet connection'))
   } else if(response.ok){
      yield put(AlljobsActions.allJobsSuccess(response.data.success))
    } else {
      yield put(AlljobsActions.allJobsFailure("Get Jobs Error"))
    }
  }
