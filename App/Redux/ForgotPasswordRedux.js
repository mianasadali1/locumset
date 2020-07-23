import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  forgPasswordRequest: ['data'],
  forgPasswordSuccess: ['isForgot'],
  forgPasswordFailure: ['error'],

  updatePassRequest: ['data'],
  updatePassSuccess: [''],
  updatePassFailure: ['error'],

  isForgotRemove: [],
})

export const ForgPasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isForgot: false,
  error: null,
  fetching: false,
  upd_fetching: false,
  upd_error: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, {isForgot}) =>
  state.merge({ fetching: false, isForgot: isForgot})

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

// we're attempting to login
export const updaterequest = (state) => state.merge({ upd_fetching: true })

// we've successfully logged in
export const updatesuccess = (state) =>
  state.merge({ upd_fetching: false})

// we've had a problem logging in
export const updatefailure = (state, { upd_error }) =>
  state.merge({ upd_fetching: false, upd_error })

// we've successfully logged in
export const removeforgot = (state) =>
  state.merge({ isForgot: false})



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FORG_PASSWORD_REQUEST]: request,
  [Types.FORG_PASSWORD_SUCCESS]: success,
  [Types.FORG_PASSWORD_FAILURE]: failure,
  [Types.UPDATE_PASS_REQUEST]: updaterequest,
  [Types.UPDATE_PASS_SUCCESS]: updatesuccess,
  [Types.UPDATE_PASS_FAILURE]: updatefailure,
  [Types.IS_FORGOT_REMOVE]: removeforgot
})
