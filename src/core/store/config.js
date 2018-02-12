import { createStore } from 'redux'
import modules from './modules'

const config = () => {
  const store = createStore(modules)
  return store
}

export default config