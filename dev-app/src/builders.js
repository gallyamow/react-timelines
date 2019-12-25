import {
  SELECTED_YEAR,
  SELECTED_MONTH,
  SELECTED_NUM_OF_DAYS,
  HOURS_PER_DAY,
  NUM_OF_HOURS,
  MIN_HOUR_SPAN,
  MAX_HOUR_SPAN,
  MAX_TRACK_START_GAP,
  MAX_ELEMENT_GAP,
  MAX_NUM_OF_SUBTRACKS,
  START_DAY
} from './constants'

import { fill, hexToRgb, colourIsLight, padNumber, addHoursToDayAsDate, nextColor, randomTitle } from './utils'

export const buildDayCells = () => {
  const v = []
  const monthStr = padNumber(SELECTED_MONTH)

  for (let d = 1; d <= SELECTED_NUM_OF_DAYS; d += 1) {
    const dayStr = padNumber(d)
    v.push({
      id: `m${SELECTED_MONTH}-d${d}`,
      title: `${dayStr}.${monthStr}.${SELECTED_YEAR}`,
      start: new Date(`${SELECTED_YEAR}-${SELECTED_MONTH}-${d}`),
      end: new Date(`${SELECTED_YEAR}-${SELECTED_MONTH}-${d + 1}`),
    })
  }

  return v
}

export const buildHourCells = () => {
  const v = []

  for (let d = 1; d <= SELECTED_NUM_OF_DAYS; d += 1) {
    for (let h = 0; h < HOURS_PER_DAY; h += 1) {
      const hourStr = padNumber(h)
      v.push({
        id: `m${SELECTED_MONTH}-d${d}-h${h}`,
        title: `${hourStr}:00`,
        start: new Date(`${SELECTED_YEAR}-${SELECTED_MONTH}-${d} ${h}:00:00`),
        end: new Date(`${SELECTED_YEAR}-${SELECTED_MONTH}-${d} ${h + 1}:00:00`),
      })
    }
  }

  return v
}

export const buildTimebar = () => [
  {
    id: 'days',
    title: 'Days',
    cells: buildDayCells(),
    style: {},
  },
  {
    id: 'hours',
    title: 'Hours',
    cells: buildHourCells(),
    useAsGrid: true,
    style: {},
  },
]

export const buildElement = ({ trackId, start, end, i }) => {
  const bgColor = nextColor()
  const color = colourIsLight(...hexToRgb(bgColor)) ? '#000000' : '#ffffff'
  return {
    id: `t-${trackId}-el-${i}`,
    title: randomTitle(),
    start,
    end,
    style: {
      backgroundColor: `#${bgColor}`,
      color,
      borderRadius: '4px',
      boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
      textTransform: 'capitalize',
    },
  }
}

export const buildTrackStartGap = () => Math.floor(Math.random() * MAX_TRACK_START_GAP)
export const buildElementGap = () => Math.floor(Math.random() * MAX_ELEMENT_GAP)

export const buildElements = trackId => {
  const v = []
  let i = 1
  let hour = buildTrackStartGap()

  while (hour < NUM_OF_HOURS) {
    let hourSpan = Math.floor(Math.random() * (MAX_HOUR_SPAN - (MIN_HOUR_SPAN - 1))) + MIN_HOUR_SPAN

    if (hour + hourSpan > NUM_OF_HOURS) {
      hourSpan = NUM_OF_HOURS - hour
    }

    const start = addHoursToDayAsDate(START_DAY, hour)
    const end = addHoursToDayAsDate(START_DAY, hour + hourSpan)
    v.push(
      buildElement({
        trackId,
        start,
        end,
        i,
      })
    )
    const gap = buildElementGap()
    hour += hourSpan + gap
    i += 1
  }

  return v
}

export const buildSubtrack = (trackId, subtrackId) => ({
  id: `track-${trackId}-${subtrackId}`,
  title: `Subtrack ${subtrackId}`,
  elements: buildElements(subtrackId),
})

export const buildTrack = trackId => {
  const tracks = fill(Math.floor(Math.random() * MAX_NUM_OF_SUBTRACKS) + 1).map(i => buildSubtrack(trackId, i + 1))
  return {
    id: `track-${trackId}`,
    title: `Track ${trackId}`,
    elements: buildElements(trackId),
    tracks,
    // hasButton: true,
    // link: 'www.google.com',
    isOpen: false,
  }
}
