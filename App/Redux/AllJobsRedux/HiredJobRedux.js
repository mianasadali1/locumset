import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  hiredJobsRequest: [],
  hiredJobsSuccess: ['hiredJobs'],
  hiredJobsFailure: ['error'],
  cancelHiredJobsRequest: [],
  cancelHiredJobsSuccess: ['cancelJob'],
  cancelHiredJobsFailure: ['error'],
})

export const HiredJobsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  hiredJobs: [],
  error: null,
  token:null,
  fetching: false,
  loading:false,
  loaded:false,
  cancelJob: null
})

/* ------------- Reducers ------------- */

// we're attempting to get all jobs
export const request = (state) => state.merge({ fetching: true })

// we've successfully get jobs
export const success = (state, { hiredJobs }) =>
  state.merge({ fetching: false, hiredJobs: hiredJobs})

// we've had a problem geting all jobs in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

// we're attempting to get all jobs
export const chj_request = (state) => state.merge({ chj_fetching: true })

// we've successfully get jobs
export const chj_success = (state, { cancelJob }) =>
  state.merge({ chj_fetching: false, cancelJob: cancelJob})

// we've had a problem geting all jobs in
export const chj_failure = (state, { chj_error }) =>
  state.merge({ chj_fetching: false, chj_error })



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HIRED_JOBS_REQUEST]: request,
  [Types.HIRED_JOBS_SUCCESS]: success,
  [Types.HIRED_JOBS_FAILURE]: failure,

  [Types.CANCEL_HIRED_JOBS_REQUEST]: chj_request,
  [Types.CANCEL_HIRED_JOBS_SUCCESS]: chj_success,
  [Types.CANCEL_HIRED_JOBS_FAILURE]: chj_failure,
})
