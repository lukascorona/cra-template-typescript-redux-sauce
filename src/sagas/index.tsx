import { takeEvery, all, takeLatest } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { AuthTypes } from '../redux/authRedux'

/* ------------- Sagas ------------- */
import {
  login,
  signup,
  logout,
  resetPassword,
  uploadUserChanges
} from './authSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // Auth
    takeLatest(AuthTypes.LOGIN, login),
    takeLatest(AuthTypes.SIGNUP, signup),
    takeEvery(AuthTypes.LOGOUT, logout),
    takeLatest(AuthTypes.RESET_PASSWORD, resetPassword),
    takeEvery(AuthTypes.UPLOAD_USER_CHANGES, uploadUserChanges),
  ])
}
