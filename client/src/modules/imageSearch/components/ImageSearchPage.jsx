/*
 * A container component for the image search results. The view consists of a search
 * bar and a search results view that will fetch and display data from the Flickr API.
 */

import React, { PureComponent } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FlickrSearchForm from '../containers/FlickrSearchForm'
import FlickrSearchResults from '../containers/FlickrSearchResults'
import '../stylesheets/ImageSearchPage.scss'

class ImageSearchPage extends PureComponent {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <FlickrSearchForm />
              <FlickrSearchResults />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default ImageSearchPage
