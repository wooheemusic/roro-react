import { createAction, handleActions } from 'redux-actions'

const LOGIN = 'auth/LOGIN'
const LOGOUT = 'auth/LOGOUT'
// ActionsType 정의.

export const login = createAction(LOGIN)
export const logout = createAction(LOGOUT)
// Action Func 정의.

const initState = {
  me: {
    name: 'noName'
  },
  isLogin: false
}

export default handleActions({
  [LOGIN]: (state, action) => {
    // console.log(action)
    return {
      me: action.payload,
      isLogin: true
    }
  },
  [LOGOUT]: (state, action) => {
    return {
      me: {
        name: 'noName'
      },
      isLogin: false
    }
  }
}, initState)
