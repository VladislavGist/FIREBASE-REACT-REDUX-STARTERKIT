import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// middlewares
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducer'
import history from '../history'

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk, logger))(createStore)
const store = createStoreWithMiddleware(reducer)

export default store