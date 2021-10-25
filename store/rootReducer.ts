
import { combineReducers } from 'redux'
import loadingReducer from './loading'
import userReducer from './user'
import forgotPwdReducer from './forgotPwd'

const rootReducer = combineReducers({
  loading: loadingReducer,
  user: userReducer,
  forgotPwd: forgotPwdReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
