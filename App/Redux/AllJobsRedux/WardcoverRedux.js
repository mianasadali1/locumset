import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  allJobsRequest: ['data'],
  allJobsSuccess: ['allJobs'],
  allJobsFailure: ['error'],
})

export const AlljobsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  allJobs: null,
  error: null,
  token:null,
  fetching: false,
  loading:false,
  loaded:false
})

/* ------------- Reducers ------------- */

// we're attempting to get all jobs
export const request = (state) => state.merge({ fetching: true, allJobs: null })

// we've successfully get jobs
export const success = (state, { allJobs }) =>
  state.merge({ fetching: false, allJobs:allJobs})

// we've had a problem geting all jobs in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALL_JOBS_REQUEST]: request,
  [Types.ALL_JOBS_SUCCESS]: success,
  [Types.ALL_JOBS_FAILURE]: failure,
})
