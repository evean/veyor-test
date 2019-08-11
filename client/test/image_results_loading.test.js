import ImageSearchResults from '../src/modules/imageSearch/components/ImageSearchResults'
import LoaderIcon from 'react-loader-icon'

let wrapper

const props = {
  autoFetch: () => {},
  loading: true,
  items: []
}

beforeEach(() => {
  wrapper = shallow(<ImageSearchResults { ...props } /> )
})


describe('<ImageSearchResults /> auto loading', () => {
  it('should display a loading icon when fetching results', () => {
    expect(wrapper.find(LoaderIcon)).toHaveLength(1)
  })
})
