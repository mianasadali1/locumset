import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  jobHistoryRequest: [],
  jobHistorySuccess: ['jobHistory'],
  jobHistoryFailure: ['error'],
})

export const  JobhistoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  jobHistory: null,
  error: null,
  token:null,
  fetching: false,
  loading:false,
  loaded:false
})

/* ------------- Reducers ------------- */

// we're attempting to get all jobs
export const request = (state) => state.merge({ fetching: true })

// we've successfully get jobs
export const success = (state, { jobHistory }) =>
  state.merge({ fetching: false, jobHistory:jobHistory})

// we've had a problem geting all jobs in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.JOB_HISTORY_REQUEST]: request,
  [Types.JOB_HISTORY_SUCCESS]: success,
  [Types.JOB_HISTORY_FAILURE]: failure,
})
