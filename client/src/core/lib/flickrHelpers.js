/**
 * Parses the image data returned by Flickr into the format expected by the
 * ImageThumbnail component.
 * @param  {Object} data A Flickr image object
 * @return {Object}      An object that matches the props expected by the ImageThumbnail component
 */
const parseFlickrImageData = data => {
  return {
    link: data.url_o,
    id: data.id,
    title: data.title,
    url: data.url_s,
  }
}

export {
  parseFlickrImageData
}
