import { createAction, handleActions } from 'redux-actions'

const CHANGE_LANG = 'auth/CHANGE_LANG'
// ActionsType 정의.

export const changeLang = createAction(CHANGE_LANG)
// Action Func 정의.

const initState = {
  lang: navigator.language
  // lang: 'en'
}

export default handleActions({
  [CHANGE_LANG]: (state, action) => {
    console.log(action)
    return {
      lang: action.payload.lang
    }
  }
}, initState)
