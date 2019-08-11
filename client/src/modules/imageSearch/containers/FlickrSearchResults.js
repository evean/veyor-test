/*
 * A container component that wraps the ImageSearchResults component, supplies the Flickr specific
 * dispatchers and parses the results into the format expected by the component.
 * If we wanted to fetch images from a different service, this container can easily be swapped out for
 * another one with a different parser and service.
 */

import { connect } from 'react-redux'
import Component from '../components/ImageSearchResults'
import { fetchPublicFeed, fetchSearchResults } from '../actions/imageSearchActions'
import { SERVICES } from '../../../core/lib/constants'
import { parseFlickrImageData } from '../../../core/lib/flickrHelpers'

const mapStateToProps = (state, ownProps) => {
  const { error, items: rawItems, loading, searchTerm } = state.imageSearch.results
  // Parse the raw data from Flickr into the correct format and filter out any items without urls
  const items = (rawItems || [])
    .map(item => parseFlickrImageData(item))
    .filter(item => item.url)

  return {
    ...ownProps,
    error,
    items,
    loading,
    searchTerm
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // Fetch the initial feed to display (optional)
    autoFetch: () => dispatch(fetchPublicFeed(SERVICES.FLICKR)),
    fetchSearchResults: options => dispatch(fetchSearchResults(SERVICES.FLICKR, options)),
  }
}

const FlickrSearchResults = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component)

export default FlickrSearchResults
