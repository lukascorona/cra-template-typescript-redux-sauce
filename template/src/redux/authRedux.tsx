import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateUser: ['user'],
  updateFetching: ['fetching'],
  updateError: ['error'],
  login: ['mail', 'password'],
  signup: ['mail', 'password'],
  resetPassword: ['mail'],
  logout: null,
  resetAuthState: null,
  uploadUserChanges: ['user'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

type AuthState = {
  user: any,
  fetching: boolean,
  error: boolean,
}

export const INITIAL_STATE = Immutable({
    user: null,
    fetching: false,
    error: false,
  })

/* ------------- Reducers ------------- */


export const updateUser = (state : any, { user } : any) =>
  state.merge({ user })

export const updateFetching = (state : any, { fetching } : AuthState) =>
  state.merge({ fetching })

export const updateError = (state : any, { error } : AuthState) =>
  state.merge({ error })

export const resetAuthState = () =>
  INITIAL_STATE


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_AUTH_STATE]: resetAuthState,
  [Types.UPDATE_USER]: updateUser,
  [Types.UPDATE_ERROR]: updateError,
  [Types.UPDATE_FETCHING]: updateFetching,
})
