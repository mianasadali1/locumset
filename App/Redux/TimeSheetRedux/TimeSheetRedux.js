import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  timeSheetRequest: ['data'],
  timeSheetSuccess: ['timeSheet'],
  timeSheetFailure: ['error'],
})

export const TimesheetTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  timeSheet: null,
  error: null,
  token:null,
  timefetching: false,
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ timefetching: true })

// we've successfully logged in
export const success = (state, { timeSheet }) =>
  state.merge({ timefetching: false, timeSheet:timeSheet})

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ timefetching: false, error })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TIME_SHEET_REQUEST]: request,
  [Types.TIME_SHEET_SUCCESS]: success,
  [Types.TIME_SHEET_FAILURE]: failure,
})
