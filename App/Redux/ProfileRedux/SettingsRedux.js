import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveSettingsRequest: ['data'],
  saveSettingsSuccess: ['isSave'],
  saveSettingsFailure: ['error'],
})

export const SettingsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({

  settingsSaveMessage: null,
  isSave: false,
  saveFetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to save Settings data
export const saveRequest = (state) => state.merge({ saveFetching: true })

// save Settings successfully
export const saveSuccess = (state, { settingsData, isSave }) =>
  state.merge({ saveFetching: false, isSave: isSave})

// we've had a problem in saving Settings data
export const saveFailure = (state, { error }) =>
  state.merge({ saveFetching: false, error, isSave: false })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  
  [Types.SAVE_SETTINGS_REQUEST]: saveRequest,
  [Types.SAVE_SETTINGS_SUCCESS]: saveSuccess,
  [Types.SAVE_SETTINGS_FAILURE]: saveFailure,
})
