/*
 * An image component meant to be displayed in the search results gallery.
 * It will be rendered as a link if a link URL is supplied.
 */

import React from 'react'

const ImageThumbnail = props => {
  /*
   * If supplied, this method will get called once the image has finished loading. For instance,
   * we may want to wait until all images have finished loading before rendering them.
   */
  const handleLoaded = () => {
    if (props.onLoad) props.onLoad(props.id)
  }

  const image = (<img src={props.url} alt={props.title} onLoad={handleLoaded} />)

  const content = !props.link
    ? image
    : (<a href={props.link} rel="noopener noreferrer" target="_blank">
        {image}
      </a>)

  return (
    <div className={props.className}>
      {content}
    </div>
  )
}

export default ImageThumbnail
