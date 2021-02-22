import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: require('./authRedux').reducer,
    message: require('./messageRedux').reducer,
})

export default rootReducer
