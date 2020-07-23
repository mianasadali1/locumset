import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  preferenceRequest: [],
  preferenceSuccess: ['preferenceData'],
  preferenceFailure: ['error'],


  savePreferenceRequest: ['data'],
  savePreferenceSuccess: ['preferenceData','save_success_message'],
  savePreferenceFailure: ['error'],

})

export const PreferenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    preferenceData: null,
    error: null,
    fetching: false,
    save_success_message: 'test',
    saveFetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to GET preference data
export const request = (state) => state.merge({ fetching: true })

// GET preference successfully
export const success = (state, { preferenceData }) =>
  state.merge({ fetching: false, preferenceData: preferenceData})

// we've had a problem in GET preference data
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })




// we're attempting to save preference data
export const save_request = (state) => state.merge({ saveFetching: true })

// saved preference successfully
export const save_success = (state, {preferenceData,  save_success_message }) =>
    state.merge({ saveFetching: false, save_success_message: save_success_message, preferenceData : preferenceData})

// we've had a problem in saving preference data
export const save_failure = (state, { error }) =>
    state.merge({ saveFetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PREFERENCE_REQUEST]: request,
  [Types.PREFERENCE_SUCCESS]: success,
  [Types.PREFERENCE_FAILURE]: failure,
  [Types.SAVE_PREFERENCE_REQUEST]: save_request,
  [Types.SAVE_PREFERENCE_SUCCESS]: save_success,
  [Types.SAVE_PREFERENCE_FAILURE]: save_failure
})
