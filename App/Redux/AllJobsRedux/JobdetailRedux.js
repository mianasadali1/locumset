import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  jobsDetailRequest: ['jobId'],
  jobsDetailSuccess: ['jobsDetail'],
  jobsDetailFailure: ['error'],

  jobCancelRequest: ['data'],
  jobCancelSuccess: [],
  jobCancelFailure: ['jc_error'],

  // jobApplyRequest: ['data'],
  // jobApplySuccess: [],
  // jobApplyFailure: ['jc_error'],

  applyJobRequest: ['data'],
  applyJobSuccess: ['isSave'],
  applyJobFailure: ['error']

})

export const JobsDetailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  jobsDetail: null,
  error: null,
  token: null,
  fetching: false,

  jc_error: null,
  jc_fetching: false,
  ja_fetching: false,
  ja_error: null,

  loading: false,
  loaded: false,
  applyMessage: null,
  isSave: false

})

/* ------------- Reducers ------------- */

// we're attempting to get all jobs
export const request = (state) => state.merge({ fetching: true })

// we've successfully get jobs
export const success = (state, { jobsDetail }) =>
  state.merge({ fetching: false, jobsDetail: jobsDetail})

// we've had a problem geting all jobs in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

  // we're attempting to cancel job
export const jc_request = (state) => state.merge({ jc_fetching: true })

// we've successfully cancelled jobs
export const jc_success = (state, ) =>
  state.merge({ jc_fetching: false})

// we've had a problem in cancel jobs
export const jc_failure = (state, { jc_error }) =>
  state.merge({ jc_fetching: false, jc_error })

  // we're attempting to cancel job
export const ja_request = (state) => state.merge({ ja_fetching: true })

// we've successfully cancelled jobs
export const ja_success = (state, ) =>
  state.merge({ ja_fetching: false})

// we've had a problem in cancel jobs
export const ja_failure = (state, { ja_error }) =>
  state.merge({ ja_fetching: false, ja_error })



export const applyRequest = (state) => state.merge({ fetching: true })

// we've successfully get jobs
export const applySuccess = (state, { applyMessage }) =>
    state.merge({ fetching: false, applyMessage: applyMessage, isSave: true})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.JOBS_DETAIL_REQUEST]: request,
  [Types.JOBS_DETAIL_SUCCESS]: success,
  [Types.JOBS_DETAIL_FAILURE]: failure,


  [Types.JOB_CANCEL_REQUEST]: jc_request,
  [Types.JOB_CANCEL_SUCCESS]: jc_success,
  [Types.JOB_CANCEL_FAILURE]: jc_failure,

  // [Types.JOB_APPLY_REQUEST]: ja_request,
  // [Types.JOB_APPLY_SUCCESS]: ja_success,
  // [Types.JOB_APPLY_FAILURE]: ja_failure,

  [Types.APPLY_JOB_REQUEST]: applyRequest,
  [Types.APPLY_JOB_SUCCESS]: applySuccess,


})
