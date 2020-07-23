import { put, call, select } from 'redux-saga/effects'
import NotificationActions from '../../Redux/ProfileRedux/NotificationRedux'
import {NavigationActions} from 'react-navigation'
import AccountActions from '../../Redux/AccountRedux'


export function * saveNotification (api, {data}) {
  console.log('in save notifcations ', data)
    const response = yield call(api.saveNotification, data)
    console.log('in save notification response', response)
    if(response.data == null) {
       yield put(NotificationActions.saveNotificationSuccess('Check your internet connection'))
     } else if(response.ok){
      yield put(AccountActions.updateProfile(response.data.success))
      yield put(NotificationActions.saveNotificationSuccess(true, response.data.success))
    } else {
      yield put(NotificationActions.saveNotificationFailure("Save Notification Error"))
    }
  }
