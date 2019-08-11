import ImageSearchResults from '../src/modules/imageSearch/components/ImageSearchResults'
import ImageThumbnail from '../src/modules/imageSearch/components/ImageThumbnail'
import LoaderIcon from 'react-loader-icon'
import items from './mockDataFormatted'

let wrapper

const props = {
  autoFetch: () => {},
  loading: false,
  items,
  searchTerm: 'cat'
}

beforeEach(() => {
  wrapper = shallow(<ImageSearchResults { ...props } /> )
  wrapper.setState({ imagesLoaded: [ 1, 2, 3, 4, 5 ] })
  wrapper.update()
})


describe('<ImageSearchResults /> not auto loading', () => {
  it('should not display a loading icon when not fetching results', () => {
    expect(wrapper.find(LoaderIcon)).toHaveLength(0)
  })
})


describe('<ImageSearchResults /> results', () => {
  it('should display five results', () => {
    expect(wrapper.find(ImageThumbnail)).toHaveLength(5)
  })
})


describe('<ImageSearchResults /> title', () => {
  it('should display the correct title', () => {
    const title = `Showing search results for: cat`
    const renderedTitle = wrapper.instance().getTitle()
    expect(renderedTitle).toEqual(title)
  })
})
