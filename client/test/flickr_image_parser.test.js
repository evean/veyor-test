import { parseFlickrImageData } from '../src/core/lib/flickrHelpers'
import formattedItems from './mockDataFormatted'
import rawItems from './mockDataRaw'


describe('flickrImageParser results', () => {
  it('should parse raw image data correctly', () => {
    const items = rawItems.photos.photo.map(item => parseFlickrImageData(item))
    expect(items).toEqual(formattedItems)
  })
})
