import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updatePaymentRequest: ['data'],
  updatePaymentSuccess: ['hospitalsData'],
  updatePaymentFailure: ['up_error'],
})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  hospitalsData: null,
  error: null,
  up_fetching: false,
  up_error: null
})

/* ------------- Reducers ------------- */
// we're attempting to get hospitals data
export const update_request = (state) => state.merge({ up_fetching: true })

// Get hospitals successfully
export const update_success = (state, { user }) =>
  state.merge({ up_fetching: false, user:user})

// we've had a problem in geting hospitals data
export const update_failure = (state, { up_error }) =>
  state.merge({ up_fetching: false, up_error })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_PAYMENT_REQUEST]: update_request,
  [Types.UPDATE_PAYMENT_SUCCESS]: update_success,
  [Types.UPDATE_PAYMENT_FAILURE]: update_failure,
})