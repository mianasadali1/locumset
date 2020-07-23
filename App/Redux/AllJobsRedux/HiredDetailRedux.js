import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  hiredDetailRequest: ['jobId'],
  hiredDetailSuccess: ['hiredDetail'],
  hiredDetailFailure: ['error'],

  rejectJobRequest: ['data'],
  rejectJobSuccess: ['isSave'],
  rejectJobFailure: ['error']
})

export const HiredDetailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  hiredDetail: null,
  error: null,
  token: null,
  fetching: false,
  loading: false,
  loaded: false,
  rejectMessage: null,
  isSave: false
})

/* ------------- Reducers ------------- */

// we're attempting to get all jobs
export const request = (state) => state.merge({ fetching: true })

// we've successfully get jobs
export const success = (state, { hiredDetail }) =>
  state.merge({ fetching: false, hiredDetail: hiredDetail})

// we've had a problem geting all jobs in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })



export const rejectRequest = (state) => state.merge({ rj_fetching: true })

// we've successfully get jobs
export const rejectSuccess = (state, { rejectMessage }) =>
    state.merge({ rj_fetching: false, rejectMessage: rejectMessage, isSave: true})

// we've had a problem geting all jobs in
export const rejectfailure = (state, { rj_error }) =>
  state.merge({ rj_fetching: false, rj_error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HIRED_DETAIL_REQUEST]: request,
  [Types.HIRED_DETAIL_SUCCESS]: success,
  [Types.HIRED_DETAIL_FAILURE]: failure,

  [Types.REJECT_JOB_REQUEST]: rejectRequest,
  [Types.REJECT_JOB_SUCCESS]: rejectSuccess,
  [Types.REJECT_JOB_FAILURE]: rejectfailure

})
