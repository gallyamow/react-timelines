import React from 'react'
import { shallow } from 'enzyme'

import ReactTimeline from '../'
import Controls from '../components/Controls'
import Sidebar from '../components/Sidebar'
import Timeline from '../components/Timeline'

const createProps = ({
  now = new Date(),
  scale = {
    zoom: 1
  },
  isOpen = false,
  timebar = {},
  tracks = [],
  toggleOpen = jest.fn(),
  zoomIn = jest.fn(),
  zoomOut = jest.fn()
} = {}) => ({
  now, scale, isOpen, timebar, tracks, toggleOpen, zoomIn, zoomOut
})

describe('<ReactTimeline />', () => {
  it('renders <Controls />, <Sidebar /> and <Timeline />', () => {
    const props = createProps()
    const wrapper = shallow(<ReactTimeline {...props} />)
    expect(wrapper.find(Controls).exists()).toBe(true)
    expect(wrapper.find(Sidebar).exists()).toBe(true)
    expect(wrapper.find(Timeline).exists()).toBe(true)
  })

  it('renders <Sidebar /> in an open state when is open', () => {
    const props = createProps({ isOpen: true })
    const wrapper = shallow(<ReactTimeline {...props} />)
    expect(wrapper.find('.layout').prop('className')).toMatch('is-open')
  })

  it('renders <Sidebar /> in a close state when is closed', () => {
    const props = createProps({ isOpen: false })
    const wrapper = shallow(<ReactTimeline {...props} />)
    expect(wrapper.find('.layout').prop('className')).not.toMatch('is-open')
  })

  it('re-renders when the zoom updates', () => {
    const props = createProps({ scale: { zoom: 1 } })
    const wrapper = shallow(<ReactTimeline {...props} />)
    expect(wrapper.state('time').zoom).toBe(1)

    const nextProps = { scale: { zoom: 2 } }

    wrapper.setProps(nextProps)
    expect(wrapper.state('time').zoom).toBe(2)

    wrapper.setProps(nextProps)
    expect(wrapper.state('time').zoom).toBe(2)
  })
})