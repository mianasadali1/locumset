import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getExperienceRequest: [],
  getExperienceSuccess: ['expData'],
  getExperienceFailure: ['error'],

  saveExperienceRequest: ['data'],
  saveExperienceSuccess: ['isSave'],
  saveExperienceFailure: ['error'],
})

export const ExperienceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  expData: null,
  error: null,
  fetching: false,
  expSaveMessage: null,
  isSave: false,
  saveFetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to get Experience data
export const request = (state, {isSave}) => state.merge({ fetching: true, isSave: isSave })

// Get Experience successfully
export const success = (state, { expData }) =>
  state.merge({ fetching: false, expData:expData})

// we've had a problem in geting Experience data
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

// we're attempting to save Experience data
export const saveRequest = (state) => state.merge({ saveFetching: true })

// save Experience successfully
export const saveSuccess = (state, { expData, isSave }) =>
  state.merge({ saveFetching: false, isSave: isSave})

// we've had a problem in saving Experience data
export const saveFailure = (state, { error }) =>
  state.merge({ saveFetching: false, error, isSave: false })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_EXPERIENCE_REQUEST]: request,
  [Types.GET_EXPERIENCE_SUCCESS]: success,
  [Types.GET_EXPERIENCE_FAILURE]: failure,
  [Types.SAVE_EXPERIENCE_REQUEST]: saveRequest,
  [Types.SAVE_EXPERIENCE_SUCCESS]: saveSuccess,
  [Types.SAVE_EXPERIENCE_FAILURE]: saveFailure,
})
