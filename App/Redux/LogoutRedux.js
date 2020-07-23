import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dlogout: ['mobileId'],
  logoutSuccess: [],
  logoutFailure: [],
})

export const LogoutTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
})

/* ------------- Reducers ------------- */

// we're attempting to logout
export const logout = (state) => state.merge({ fetching: true })

// we've successfully logout
export const success = (state, { username}) =>
  state.merge({ fetching: false})

export const failure = (state) => state.merge({ fetching: false})




/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DLOGOUT]: logout,
  [Types.LOGOUT_SUCCESS]: success,
  [Types.LOGOUT_FAILURE]: failure,
})
