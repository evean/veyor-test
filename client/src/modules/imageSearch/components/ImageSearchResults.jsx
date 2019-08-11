/*
 * A search results wrapper that displays the items in a Masonry layout.
 * If the autoFetch prop is supplied, this method will be called on mount to fetch initial results
 * (ie. from a public feed).
 *
 * The view will display a loader while results are being loaded, or an error message if there was
 * a problem fetching the results.
 *
 * Future developments: Add pagination and/or infinite scroll
 */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Masonry from 'react-masonry-component'
import ImageThumbnail from './ImageThumbnail'
import LoaderIcon from 'react-loader-icon'
import '../stylesheets/ImageSearchPage.scss'

const MESSAGES = {
  ALL_PHOTOS: 'Photos from everyone',
  ERROR: 'There was an error fetching search results',
  NO_RESULTS: 'Your search returned no results. Please try a different search term.',
  SEARCH_RESULTS_FOR: 'Showing search results for:',
  TRY_AGAIN: 'Please try again later.'
}

const VIEW_MODES = {
  FEED: 'feed',
  SEARCH: 'search'
}

const LABELS = {
  REFRESH: {
    [VIEW_MODES.FEED]: 'Refresh',
    [VIEW_MODES.SEARCH]: 'Show feed'
  }
}

class ImageSearchResults extends Component {
  static propTypes = {
    autoFetch: PropTypes.func,
    error: PropTypes.object,
    items: PropTypes.array,
    loading: PropTypes.bool,
    searchTerm: PropTypes.string,
    title: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      imagesLoaded: [], // used to track loading status of the current set of images
      searchTerm: null,
    }

    this.handleImageLoaded = this.handleImageLoaded.bind(this)
  }

  /**
   * We need to reset the imagesLoaded array if a new search has been submitted.
   * @return {Object}       Updated state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.searchTerm !== state.searchTerm) {
      return {
        ...state,
        imagesLoaded: [],
        searchTerm: props.searchTerm
      }
    }

    return { ...state }
  }

  componentDidMount() {
    // Fetch initial results
    if (this.props.autoFetch) {
      this.props.autoFetch()
    }
  }

  /**
   * Tracks the status of loaded files so that we can delay rendering the image
   * container until all images have loaded. Each ImageThumbnail component calls this
   * method once it has finished loading.
   * @param  {String} id The id of the image that has finished loading
   */
  handleImageLoaded(id) {
    this.setState({ imagesLoaded: [ ...this.state.imagesLoaded, id ]})
  }

  /**
   * Renders the action bar on the top of the results view.
   * For now we only have one action which switches to the public feed view if the user
   * is currently viewing search results, or refreshes the results if the user is viewing
   * the feed. The action bar will not be shown if autoFetch is disabled.
   * @return {Component} A single button or an empty div if the feed view is disabled.
   */
  renderActions() {
    const { autoFetch, items, loading } = this.props
    if (!autoFetch || loading || !items.length) return <div />

    return (
      <Button onClick={autoFetch}>
        {LABELS.REFRESH[this.getViewMode()]}
      </Button>
    )
  }

  /**
   * Displays an error message if one exists
   * @return {Component} The error message from the server
   */
  renderError() {
    return <p className="results__error">
      {MESSAGES.ERROR}: {this.props.error.message}<br/>
      {MESSAGES.TRY_AGAIN}
    </p>
  }

  /**
   * Renders a list of ImageThumbnails
   * @param  {Array} items  An array of formatted image objects
   * @return {Array}        An array of ImageThumbnail components
   */
  renderResults(items) {
    return items.map(item => (
      <ImageThumbnail
        key={item.id}
        className="results__image"
        onLoad={this.handleImageLoaded}
        {...item}
      />
    ))
  }

  /**
   * Returns default title if in view mode, or a title containing the current search term.
   * @return {String} The title to be displayed
   */
  getTitle() {
    return this.getViewMode() === VIEW_MODES.FEED
      ? this.props.autoFetch && MESSAGES.ALL_PHOTOS
      : `${MESSAGES.SEARCH_RESULTS_FOR} ${this.props.searchTerm}`
  }

  /**
   * Returns the current view mode based on props
   * @return {String} Current view mode
   */
  getViewMode() {
    return !this.props.searchTerm && this.props.autoFetch
      ? VIEW_MODES.FEED
      : VIEW_MODES.SEARCH
  }

  render() {
    const { error, items } = this.props
    const loading = this.props.loading || this.state.imagesLoaded.length < items.length

    return (
      <div className="results">
        {error && this.renderError()}
        {loading && !error && <LoaderIcon className="results__loader" />}

        {!loading && !error &&
          <>
            {!items.length && this.props.searchTerm && <p>{MESSAGES.NO_RESULTS}</p>}

            <div className="results__top-bar">
              <h2 className="results__title">
                {this.getTitle()}
              </h2>
              {this.renderActions()}
            </div>
          </>
        }

        {!this.props.loading &&
          <Masonry className={`results__gallery ${!loading ? 'loaded' : ''}`}>
            {this.renderResults(items)}
          </Masonry>
        }
      </div>
    )
  }
}

export default ImageSearchResults
