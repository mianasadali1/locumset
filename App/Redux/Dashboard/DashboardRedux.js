import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  calendarJobsRequest: [],
  calendarJobsSuccess: ['calendarJobs'],
  calendarJobsFailure: ['error'],
})

export const DashboardTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  calendarJobs: [],
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
export const success = (state, { calendarJobs }) =>
  state.merge({ fetching: false, calendarJobs: calendarJobs})

// we've had a problem geting all jobs in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CALENDAR_JOBS_REQUEST]: request,
  [Types.CALENDAR_JOBS_SUCCESS]: success,
  [Types.CALENDAR_JOBS_FAILURE]: failure

})
