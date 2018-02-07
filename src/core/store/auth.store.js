import { createStore } from 'redux'
import auth from './../reducers/auth.reducer'

const store = createStore(auth)

export default store