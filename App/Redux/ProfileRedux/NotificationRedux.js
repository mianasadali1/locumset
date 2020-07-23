import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveNotificationRequest: ['data'],
  saveNotificationSuccess: ['isSave', 'notifData'],
  saveNotificationFailure: ['error'],
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  notifData: null,
  notifSaveMessage: null,
  isSave: false,
  saveFetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to save Notification data
export const saveRequest = (state) => state.merge({ saveFetching: true })

// save Notification successfully
export const saveSuccess = (state, { notifData, isSave }) =>
  state.merge({ saveFetching: false, isSave: isSave, notifData: notifData})

// we've had a problem in saving Notification data
export const saveFailure = (state, { error }) =>
  state.merge({ saveFetching: false, error, isSave: false })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_NOTIFICATION_REQUEST]: saveRequest,
  [Types.SAVE_NOTIFICATION_SUCCESS]: saveSuccess,
  [Types.SAVE_NOTIFICATION_FAILURE]: saveFailure
})
