import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  completedJobsRequest: [],
  completedJobsSuccess: ['completedJobs'],
  completedJobsFailure: ['error'],
})

export const CompletedJobsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  completedJobs: [],
  error: null,
  token:null,
  fetching: false,
  loading:false,
  loaded:false,
})

/* ------------- Reducers ------------- */

// we're attempting to get all jobs
export const request = (state) => state.merge({ fetching: true })

// we've successfully get jobs
export const success = (state, { completedJobs }) =>
  state.merge({ fetching: false, completedJobs: completedJobs})

// we've had a problem geting all jobs in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COMPLETED_JOBS_REQUEST]: request,
  [Types.COMPLETED_JOBS_SUCCESS]: success,
  [Types.COMPLETED_JOBS_FAILURE]: failure

})
