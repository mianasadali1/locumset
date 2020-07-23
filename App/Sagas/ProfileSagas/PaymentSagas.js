import { put, call, select } from 'redux-saga/effects'
import PaymentActions from '../../Redux/PaymentRedux'
import {NavigationActions} from 'react-navigation'


//export const selectAuthToken = (state) => state.account.token
//export const selectloaded = (state) => state.account.loaded
// attempts to get hospitals detail
  export function * updatePayment (api, data) {
    let payment_data = data.data
      const response = yield call(api.updatePayment, payment_data)
      console.log('update_payment', response)
      if(response.data == null) {
       yield put(PaymentActions.updatePaymentFailure('Check your internet connection'))
     } else if(response.ok){
        yield put(PaymentActions.updatePaymentSuccess(response.data))
      } else {
        yield put(PaymentActions.updatePaymentFailure("Payment Update Error"))
      }
    }
