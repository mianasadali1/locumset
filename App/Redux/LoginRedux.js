import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password', 'token'],
  loginSuccess: ['user'],
  loginFailure: ['error'],
  loginLoad: [],
  loginLoadSuccess:[],
  //checkSplash:[],
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  error: null,
  token:null,
  fetching: false,
  loading:false,
  loaded:false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, { user }) =>
  state.merge({ fetching: false, user:user})

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })


// we're attempting to load token from startup sagas
export const load = (state) => state.merge({ loading: true })

export const loadSuccess = (state) => state.merge({ loading: false, loaded:true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGIN_LOAD]: load,
  [Types.LOGIN_LOAD_SUCCESS]: loadSuccess,
  //[Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.username !== null
//Get token of the user
export const getToken = (loginState) => loginState.token !== null
