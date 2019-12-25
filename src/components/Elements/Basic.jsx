import React from 'react'
import PropTypes from 'prop-types'
import { getDayMonth } from '../../utils/formatDate'
import createClasses from '../../utils/classes'

const buildDataAttributes = (attributes = {}) => {
  const value = {}
  Object.keys(attributes).forEach(name => {
    value[`data-${name}`] = attributes[name]
  })
  return value
}

const Basic = ({ title, start, end, style, classes, dataSet, tooltip, renderCustomElementContent, renderCustomElementTooltipContent }) => (
  <div className={createClasses('rt-element', classes)} style={style} {...buildDataAttributes(dataSet)}>
    <div className="rt-element__content" aria-hidden="true">
      {renderCustomElementContent === undefined
        ? <span className="rt-element__title">{title}</span>
        : renderCustomElementContent({ title, start, end })
      }
    </div>

    <div className="rt-element__tooltip">
      {tooltip ? (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: tooltip.split('\n').join('<br>') }}/>
      ) : (
        renderCustomElementTooltipContent === undefined
          ? (
            <div>
              <div>{title}</div>
              <div>
                <strong>Start</strong> {getDayMonth(start)}
              </div>
              <div>
                <strong>End</strong> {getDayMonth(end)}
              </div>
            </div>
          )
          : renderCustomElementTooltipContent({ title, start, end })
      )}
    </div>
  </div>
)

Basic.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  style: PropTypes.shape({}),
  classes: PropTypes.arrayOf(PropTypes.string.isRequired),
  dataSet: PropTypes.shape({}),
  tooltip: PropTypes.string,
  renderCustomElementContent: PropTypes.func,
  renderCustomElementTooltipContent: PropTypes.func,
}

export default Basic
