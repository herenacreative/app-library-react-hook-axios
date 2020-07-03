import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './reducers'

export default createStore(
    rootReducer,
    applyMiddleware(promiseMiddleware, logger)
)