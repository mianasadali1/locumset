import { put, call, select } from 'redux-saga/effects'
import AccountActions from "../Redux/AccountRedux"
import LogoutActions from "../Redux/LogoutRedux"
import {NavigationActions, StackActions} from 'react-navigation'


export function * logout(api, mobileId){
  console.log('mobile id', mobileId)
  let deviceId = mobileId.mobileId
  const response = yield call(api.logout, deviceId)
  console.log('on logout', response)
  if(response.ok){
    yield put(AccountActions.logout())
    yield put(LogoutActions.logoutSuccess())
    yield call(api.removeAuthToken)

    yield put(StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Login'})
    ]
  })
  )
} else {
    yield put(LogoutActions.logoutFailure(response.data.error.message))
}
}
