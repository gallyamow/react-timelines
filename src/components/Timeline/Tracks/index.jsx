import React from 'react'
import PropTypes from 'prop-types'

import Track from './Track'

const Tracks = ({ time, tracks, clickElement, renderCustomElement }) => (
  <div className="rt-tracks">
    {tracks.map(({ id, elements, isOpen, tracks: children }) => (
      <Track
        key={id}
        time={time}
        elements={elements}
        isOpen={isOpen}
        tracks={children}
        clickElement={clickElement}
        renderCustomElement={renderCustomElement}
      />
    ))}
  </div>
)

Tracks.propTypes = {
  time: PropTypes.shape({}).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
  clickElement: PropTypes.func,
  renderCustomElement: PropTypes.func,
}

export default Tracks
