/*
 * A container component that wraps the search bar and supplies the dispatcher for submitting
 * the Flickr search.
 * This can be swapped out for a container that is specific to another image service
 * should we want to use the search form to fetch results from a different source.
 */

import { connect } from 'react-redux'
import Component from '../components/SearchBar'
import { fetchSearchResults } from '../actions/imageSearchActions'
import { SERVICES } from '../../../core/lib/constants'

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: options => dispatch(fetchSearchResults(SERVICES.FLICKR, options)),
  }
}

const FlickrSearchForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component)

export default FlickrSearchForm
