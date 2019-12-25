import React from 'react'
import PropTypes from 'prop-types'

import Track from './Track'

const Tracks = ({ time, tracks, clickElement, renderCustomElementContent, renderCustomElementTooltipContent }) => (
  <div className="rt-tracks">
    {tracks.map(({ id, elements, isOpen, tracks: children }) => (
      <Track
        key={id}
        time={time}
        elements={elements}
        isOpen={isOpen}
        tracks={children}
        clickElement={clickElement}
        renderCustomElementContent={renderCustomElementContent}
        renderCustomElementTooltipContent={renderCustomElementTooltipContent}
      />
    ))}
  </div>
)

Tracks.propTypes = {
  time: PropTypes.shape({}).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
  clickElement: PropTypes.func,
  renderCustomElementContent: PropTypes.func,
  renderCustomElementTooltipContent: PropTypes.func,
}

export default Tracks
