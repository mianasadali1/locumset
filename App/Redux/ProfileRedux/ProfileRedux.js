import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  hospitalsRequest: [],
  hospitalsSuccess: ['hospitalsData'],
  hospitalsFailure: ['error'],

  updateProfileRequest: ['data'],
  updateProfileSuccess: ['hospitalsData'],
  updateProfileFailure: ['up_error'],
})

export const ProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  hospitalsData: null,
  error: null,
  fetching: false,
  up_fetching: false,
  up_error: null
})

/* ------------- Reducers ------------- */

// we're attempting to get hospitals data
export const request = (state) => state.merge({ fetching: true })

// Get hospitals successfully
export const success = (state, { hospitalsData }) =>
  state.merge({ fetching: false, hospitalsData:hospitalsData})

// we've had a problem in geting hospitals data
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

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
  [Types.HOSPITALS_REQUEST]: request,
  [Types.HOSPITALS_SUCCESS]: success,
  [Types.HOSPITALS_FAILURE]: failure,

  [Types.UPDATE_PROFILE_REQUEST]: update_request,
  [Types.UPDATE_PROFILE_SUCCESS]: update_success,
  [Types.UPDATE_PROFILE_FAILURE]: update_failure,
})
