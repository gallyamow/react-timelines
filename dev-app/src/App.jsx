/* eslint-disable import/no-unresolved */
import React, { Component } from 'react'
import Timeline from 'react-timelines'

import 'react-timelines/lib/css/style.css'

import { NUM_OF_TRACKS, SELECTED_MONTH, SELECTED_NUM_OF_DAYS, SELECTED_YEAR } from './constants'

import { buildTimebar, buildTrack } from './builders'

import { fill, padNumber } from './utils'

const now = new Date('2021-01-01')

const timebar = buildTimebar()

// eslint-disable-next-line no-alert
const clickElement = element => alert(`Clicked element\n${JSON.stringify(element, null, 2)}`)

const MIN_ZOOM = 2
const MAX_ZOOM = 20

class App extends Component {
  constructor (props) {
    super(props)

    const tracksById = fill(NUM_OF_TRACKS).reduce((acc, i) => {
      const track = buildTrack(i + 1)
      acc[track.id] = track
      return acc
    }, {})

    this.state = {
      open: false,
      zoom: 2,
      // eslint-disable-next-line react/no-unused-state
      tracksById,
      tracks: Object.values(tracksById),
    }
  }

  handleToggleOpen = () => {
    this.setState(({ open }) => ({ open: !open }))
  }

  handleZoomIn = () => {
    this.setState(({ zoom }) => ({ zoom: Math.min(zoom + 1, MAX_ZOOM) }))
  }

  handleZoomOut = () => {
    this.setState(({ zoom }) => ({ zoom: Math.max(zoom - 1, MIN_ZOOM) }))
  }

  handleToggleTrackOpen = track => {
    this.setState(state => {
      const tracksById = {
        ...state.tracksById,
        [track.id]: {
          ...track,
          isOpen: !track.isOpen,
        },
      }

      return {
        tracksById,
        tracks: Object.values(tracksById),
      }
    })
  }

  renderCustomElementContent = ({ title, start }) => (
    <div>
      <div>
        <div>{padNumber(start.getHours())}:{padNumber(start.getMinutes())}</div>
        <div>status</div>
      </div>
      <div>{title}</div>
    </div>
  )

  renderCustomMarkerContent = ({ date }) => (
    <div>
      <div>
        <strong>{padNumber(date.getHours())}:{padNumber(date.getMinutes())}</strong>
      </div>
    </div>
  )

  render () {
    const { open, zoom, tracks } = this.state
    const start = new Date(`${SELECTED_YEAR}-${SELECTED_MONTH}-01 00:00:00`)
    const end = new Date(`${SELECTED_YEAR}-${SELECTED_MONTH}-${SELECTED_NUM_OF_DAYS} 00:00:00`)

    return (
      <div className="app">
        <h1 className="title">React Timelines</h1>
        <Timeline
          scale={{
            start,
            end,
            zoom,
            zoomMin: MIN_ZOOM,
            zoomMax: MAX_ZOOM,
          }}
          isOpen={open}
          toggleOpen={this.handleToggleOpen}
          zoomIn={this.handleZoomIn}
          zoomOut={this.handleZoomOut}
          clickElement={clickElement}
          clickTrackButton={track => {
            // eslint-disable-next-line no-alert
            alert(JSON.stringify(track))
          }}
          timebar={timebar}
          tracks={tracks}
          now={now}
          toggleTrackOpen={this.handleToggleTrackOpen}
          enableSticky
          scrollToNow
          renderCustomElementContent={this.renderCustomElementContent}
          renderCustomMarkerContent={this.renderCustomMarkerContent}
        />
      </div>
    )
  }
}

export default App
