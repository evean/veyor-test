/*
 * Export store with middleware applied
 */

import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers'

const enhancers = [applyMiddleware(thunk)]
const reducer = combineReducers({ ...reducers })
const store = createStore(reducer, {}, compose(...enhancers))

export default store
