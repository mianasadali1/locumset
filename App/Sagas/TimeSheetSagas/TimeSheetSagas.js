import { put, call, select } from 'redux-saga/effects'
import TimesheetActions from '../../Redux/TimeSheetRedux/TimeSheetRedux'
import AccountActions from '../../Redux/AccountRedux'
import {NavigationActions} from 'react-navigation'
import HiredjobActions from '../../Redux/AllJobsRedux/HiredJobRedux'

export function * timeSheet (api, data) {
    let timeSheetData = data.data;
    const response = yield call(api.submitTimeSheet, timeSheetData)
    console.log(response)
    if(response.data == null) {
     yield put(TimesheetActions.timeSheetFailure('Check your internet connection'))
   } else if(response.ok){
      yield put(TimesheetActions.timeSheetSuccess(response.data))
      yield put(HiredjobActions.hiredJobsRequest())
      yield put(NavigationActions.navigate({ routeName: 'TimeSheet'}))
  }
     else {
    yield put(TimesheetActions.timeSheetFailure(response.data.error))
  }

}
