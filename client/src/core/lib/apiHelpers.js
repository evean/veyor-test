import QueryString from 'query-string'

/**
 * A method that calls an API endpoint with the specified method and params
 * @param  {String} endpoint       The URL to call
 * @params {Object}                Additional options
 */
const callApi = (
  endpoint,
  {
    method = 'get',
    params = {},
  } = {}
) => {
  let reqBody = params
  let queryString = ''

  if (method === 'get') {
    // We can't have a body on a get request as it will silently fail
    reqBody = null
    if (params && Object.keys(params).length) queryString = `?${QueryString.stringify(params)}`
  }

  return fetch(`${endpoint}${queryString}`, { method, body: reqBody })
  .then(response => {
    return response.ok
      ? response.json()
      : response.json().then(json => Promise.reject({ ...response, ...json }))
  })
}

/**
 * This is a dispatch specific version of the callApi method that can be used with actions
 * It returns a function that matches the expected shape for a thunk action
 *
 * @method callApiWithDispatch
 * @param {Function} callback Should be a function of the form (dispatch, state, promise)
 *                            and return a promise
 */
const callApiWithDispatch = (endpoint, options = {}, callbackPromiseFunction) => {

  return (dispatch, getState) => {
    const state = getState()
    options.params = options.params || {}

    const apiPromise = callApi(endpoint, options, dispatch)
    .then(result => result)
    .catch(error => {
      throw error
    })

    const callbackPromise = callbackPromiseFunction
      ? callbackPromiseFunction(dispatch, state, apiPromise)
      : apiPromise

    if (!callbackPromise.then) throw Error('Callback function did not return a promise')

    return callbackPromise
  }
}

export { callApi, callApiWithDispatch }
