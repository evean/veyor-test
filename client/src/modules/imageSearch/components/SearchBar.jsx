/*
 * A search input form that calls the supplied onSubmit function with a search
 * string once submitted.
 */

import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'

class SearchBar extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    searchField: PropTypes.string,
  }

  static defaultProps = {
    placeholder: 'Search for anything...',
    searchField: 'search_term',
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    // Extract the search string from the form data
    const data = new FormData(e.target)
    this.props.onSubmit(data.get(this.props.searchField))
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder={this.props.placeholder}
              aria-label="Search"
              aria-describedby="search"
              name={this.props.searchField}
              required
            />
            <InputGroup.Append>
              <Button type="submit" variant="outline-primary">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    )
  }
}

export default SearchBar
