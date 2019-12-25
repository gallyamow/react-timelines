import React from 'react'
import PropTypes from 'prop-types'

import Tracks from './Tracks'
import Grid from './Grid'

const Body = ({ time, grid, tracks, clickElement, renderCustomElementContent, renderCustomElementTooltipContent }) => (
  <div className="rt-timeline__body">
    {grid && <Grid time={time} grid={grid} />}
    <Tracks
      time={time}
      tracks={tracks}
      clickElement={clickElement}
      renderCustomElementContent={renderCustomElementContent}
      renderCustomElementTooltipContent={renderCustomElementTooltipContent}
    />
  </div>
)

Body.propTypes = {
  time: PropTypes.shape({}).isRequired,
  grid: PropTypes.arrayOf(PropTypes.shape({})),
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
  clickElement: PropTypes.func,
  renderCustomElementContent: PropTypes.func,
  renderCustomElementTooltipContent: PropTypes.func,
}

export default Body
