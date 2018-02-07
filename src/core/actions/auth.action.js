// export const REQUEST = 'UESTREQ'
// export const SUCCESS = 'SUCCESS'
// export const FAIL = 'FAIL'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


export function login(me = {}) {
  console.log(me)
  return {
    type: LOGIN,
    me: me
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}