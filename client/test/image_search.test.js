import ImageSearchPage from '../src/modules/imageSearch/components/ImageSearchPage'
import FlickrSearchForm from '../src/modules/imageSearch/containers/FlickrSearchForm'
import FlickrSearchResults from '../src/modules/imageSearch/containers/FlickrSearchResults'

let wrapper

beforeEach(() => {
  wrapper = shallow(<ImageSearchPage /> )
})


describe('<FlickrSearchForm /> rendering', () => {
  it('should render an input form', () => {
    expect(wrapper.find(FlickrSearchForm)).toHaveLength(1)
  })
})


describe('<FlickrImageResults /> rendering', () => {
  it('should render a results container', () => {
    expect(wrapper.find(FlickrSearchResults)).toHaveLength(1)
  })
})
