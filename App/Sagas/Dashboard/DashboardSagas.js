import { put, call, select } from 'redux-saga/effects'
import DashboardTypes from '../../Redux/Dashboard/DashboardRedux'
import {NavigationActions} from 'react-navigation'

// attempts to get all jobs
export function * getCalendarJobs (api) {
  console.log('in sagas calendar Jobs')
    const response = yield call(api.getCalendar)
    console.log('completed Jobs resp', response)
  if(response.data == null) {
     yield put(DashboardTypes.calendarJobsFailure())
   } else if(response.ok){
      yield put(DashboardTypes.calendarJobsSuccess(response.data.success))
    } else {
      yield put(DashboardTypes.calendarJobsFailure("Get Jobs Error"))
    }
}
