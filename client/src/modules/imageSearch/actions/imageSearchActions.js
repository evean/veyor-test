/*
 * Redux actions for fetching data from the API. Each method takes a service parameter so
 * that we can specify which photo service to fetch results from. This is in case we decide to add other
 * services besides Flickr later on.
 */

import { callApiWithDispatch } from '../../../core/lib/apiHelpers'
import { API_URL } from '../../../core/lib/constants'

export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS'
export const SET_ERROR = 'SET_ERROR'
export const SET_LOADING = 'SET_LOADING'


export const setLoading = state => {
  return {
    type: SET_LOADING,
    payload: state
  }
}

export const fetchPublicFeed = (service, params = {}) => {
  return callApiWithDispatch(
    `${API_URL}/${service}/feed`,
    { params },
    (dispatch, state, promise) => {
      dispatch(setLoading(true))

      return promise
      .then(results => {
        dispatch({
          type: RECEIVE_SEARCH_RESULTS,
          payload: { ...results, searchTerm: null }
        })
      })
      .catch(e => handleError(e, dispatch))
      .finally(() => dispatch(setLoading(false)))
    }
  )
}

export const fetchSearchResults = (service, searchTerm) => {
  return callApiWithDispatch(
    `${API_URL}/${service}/search`,
    { params: { search: searchTerm }},
    (dispatch, state, promise) => {
      dispatch(setLoading(true))

      return promise
      .then(results => {
        dispatch({
          type: RECEIVE_SEARCH_RESULTS,
          payload: { ...results, searchTerm }
        })
      })
      .catch(e => handleError(e, dispatch))
      .finally(() => dispatch(setLoading(false)))
    }
  )
}

const handleError = (e, dispatch) => {
  console.error('Error loading results:', e)
  dispatch({
    type: SET_ERROR,
    payload: e
  })
}
