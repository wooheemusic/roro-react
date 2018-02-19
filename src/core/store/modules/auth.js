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

// 리로드 시 sessioned token data가 서버에서 아직 유효한지 검증하는 것은 여기서 해야하나

export default handleActions({
  [LOGIN]: (state, action) => {
    console.log(typeof login, logout);
    console.log("store auth state :", state);
     console.log("store auth action :",action);
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
