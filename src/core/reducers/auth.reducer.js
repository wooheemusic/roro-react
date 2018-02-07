import {
  LOGIN,
  LOGOUT
} from './../actions/auth.action'

const initState = {
  me: {
    name: 'noName'
  }
}

const auth = (state = initState, action) => {
  // console.log(action)
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        isLogin: true,
        me: action.me
      })
    case LOGOUT:
      return Object.assign({}, state, {
        isLogin: false,
      })
    default:
      return state
  }
}

export default auth