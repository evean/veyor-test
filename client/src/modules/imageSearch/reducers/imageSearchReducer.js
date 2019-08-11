/*
 * Reducer for image search related actions
 */

import {
    RECEIVE_SEARCH_RESULTS,
    SET_ERROR,
    SET_LOADING
  } from '../actions/imageSearchActions'

const initialState = {
  results: {}
}

const imageSearchReducer = (state = initialState, action) => {
  switch (action && action.type) {
    case RECEIVE_SEARCH_RESULTS: {
      return {
        ...state,
        results: {
          ...state.results,
          error: null,
          items: action.payload.photos.photo,
          searchTerm: action.payload.searchTerm,
          title: action.payload.title
        }
      }
    }

    case SET_LOADING: {
      return {
        ...state,
        results: {
          ...state.results,
          loading: action.payload
        }
      }
    }

    case SET_ERROR: {
      return {
        ...state,
        results: {
          ...state.results,
          error: action.payload
        }
      }
    }

    default: {
      return state
    }
  }
}

export default imageSearchReducer
