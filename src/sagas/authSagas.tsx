import { call, put, delay } from 'redux-saga/effects'
import AuthActions from '../redux/authRedux'
import MessageActions from '../redux/messageRedux'
import { persistor } from '../redux/store'


export function* login(action: any) {
  try {
    yield put(AuthActions.updateFetching(true))
    yield put(AuthActions.updateError(false))
    
    // Here you should call your endpoint
    const user = yield delay(1000, {name: "John", surname: "Doe", mail: "johndoe@mail.com"})

    if (user) {
      yield put(AuthActions.updateUser(user))
      yield put(AuthActions.updateFetching(false))
    } else {
      yield call(onError)
    }
  } catch(e) {
    console.error("Error on login", e)
    yield call(onError)
  }
}

export function* signup(action: any) {
  try {
    yield put(AuthActions.updateFetching(true))
    yield put(AuthActions.updateError(false))
    
    // Here you should call your endpoint
    const user = yield delay(1000, {name: "John", surname: "Doe", mail: "johndoe@mail.com"})

    if (user) {
      yield put(AuthActions.updateUser(user))
      yield put(AuthActions.updateFetching(false))
    } else {
      yield call(onError)
    }
  } catch(e) {
    console.error("Error on signup", e)
    yield call(onError)
  }
}

function* onError(message = "Oops.. Something went wrong!") {
  yield put(MessageActions.openSnackbarWithColor(message, "error"))
  yield put(AuthActions.updateFetching(false))
  yield put(AuthActions.updateError(true))
}

export function* uploadUserChanges(action: any) {
  try {
    const { user } = action
    yield put(AuthActions.updateFetching(true))
    yield put(AuthActions.updateError(false))
    
    // Here you should call your endpoint
    const result = yield delay(1000, user)

    if (result) {
      yield put(AuthActions.updateUser(result))
      yield put(AuthActions.updateFetching(false))
      yield put(MessageActions.openSnackbarWithColor("Your profile was updated successfully", "success"))
    } else {
      yield call(onError)
    }
  } catch (e) {
    console.error("error on uploadUserChanges", e)
  }
}

export function* resetPassword(action: any) {
  try {
    const { mail } = action;
    // Here you should call your endpoint
    yield delay(1000, { mail })
    yield put(MessageActions.openSnackbarWithColor("You will recieve a password reset email in a few minutes", "default"))
  } catch(e) {
    console.error("Error on resetPassword", e)
  }
}

export function* logout() {
    try {
      yield put(AuthActions.resetAuthState())
      yield call(persistor.purge)
    } catch (e) {
      console.error('Error at logging out', e)
    }
  }