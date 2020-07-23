import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { Table } from 'antd'

import './index.less'

const classPrefix = 'custom-table'

const ROW_DEFAULT = -1

export default class CustomTable extends Component {
  static propTypes = {
    onRow: PropTypes.func,
    rowClassName: PropTypes.func,
    needHighlight: PropTypes.bool,
    needScrollbar: PropTypes.bool,
    highlightColor: PropTypes.string,
  }

  static defaultProps = {
    onRow: () => ({}),
    rowClassName: () => (''),
    needHighlight: true,
    needScrollbar: false,
    highlightColor: '#e6fff9',
  }

  constructor (props) {
    super(props)
    this.state = {
      rowClickIndex: ROW_DEFAULT
    }
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {
    this.resetRowClickIndex()
  }

  componentWillUpdate (nextProps, nextState) {

  }

  componentDidUpdate (prevProps, prevState) {
    this.handleScrollBar()
  }

  componentWillUnmount () {
    if (this.handleScrollBarDisplay) {
      window.removeEventListener('scroll', this.handleScrollBarDisplay)
    }
  }

  onRow = (record, index) => {
    const { onRow, needHighlight } = this.props
    const onRowReturn = onRow(record, index)

    return {
      ...onRowReturn,
      onClick: event => {
        if (needHighlight) {
          this.setState({
            rowClickIndex: index
          })
        }

        if (typeof onRowReturn.onClick === 'function') {
          onRowReturn.onClick(event)
        }
      }
    }
  }

  rowClassName = (record, index) => {
    const { rowClassName } = this.props
    const { rowClickIndex } = this.state
    const rowClassNameReturn = rowClassName(record, index)

    if (index === rowClickIndex) {
      return `${rowClassNameReturn} ${classPrefix}-highlight`
    }

    return `${rowClassNameReturn}`
  }

  resetRowClickIndex = () => {
    const { needHighlight } = this.props

    if (needHighlight) {
      this.setState({
        rowClickIndex: ROW_DEFAULT
      })
    }
  }

  handleScrollBar = () => {
    const { needScrollbar } = this.props
    const { rowClickIndex } = this.state

    if (!needScrollbar || rowClickIndex !== ROW_DEFAULT) {
      return
    }

    const { tableRef, scrollRef, scrollbarRef } = this
    const tableRefDom = findDOMNode(tableRef)
    const scrollRefDom = findDOMNode(scrollRef)
    const scrollbarRefDom = findDOMNode(scrollbarRef)

    if (tableRefDom && scrollRefDom && scrollbarRefDom) {
      const tableBodyDom = tableRefDom.getElementsByClassName('ant-table-body')[0]
      const { offsetWidth, scrollWidth, offsetHeight } = tableBodyDom
      const { style: styleBar } = scrollbarRefDom
      const { style } = scrollRefDom

      if (offsetWidth === scrollWidth) {
        // console.log('不需要滚动条')
        style.display = 'none'
        return
      }

      const tableBodyDomOffsetTop = []

      const getDomOffsetTop = dom => {
        tableBodyDomOffsetTop.push({
          top: dom.offsetTop,
          parent: dom.offsetParent
        })

        if (dom.parentElement) {
          getDomOffsetTop(dom.parentElement)
        }
      }

      getDomOffsetTop(tableBodyDom)

      const uniqTableBodyDomOffsetTop = arr => {
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].parent === arr[j].parent && arr[i].top >= arr[j].top) {
              arr.splice(j, 1)
              j--
            }
          }
        }
        return arr
      }

      let _ = 0
      uniqTableBodyDomOffsetTop(tableBodyDomOffsetTop).forEach(item => {
        _ += item.top
      })

      const tableBodyDomTop = _
      const tableBodyDomBottom = _ + offsetHeight
      // console.log('列表顶部距离页面顶部', tableBodyDomTop)
      // console.log('列表底部距离页面顶部', tableBodyDomBottom)

      if (this.handleScrollBarDisplay) {
        window.removeEventListener('scroll', this.handleScrollBarDisplay)
      }

      this.handleScrollBarDisplay = () => {
        const yOffsetHeight = window.pageYOffset + window.innerHeight

        // tableBodyDomTop < yOffsetHeight < tableBodyDomBottom
        if (tableBodyDomTop < yOffsetHeight && yOffsetHeight < tableBodyDomBottom) {
          style.display = 'block'

          if (scrollRefDom.scrollLeft !== tableBodyDom.scrollLeft) {
            scrollRefDom.scrollLeft = tableBodyDom.scrollLeft
          }
        } else {
          style.display = 'none'
        }
      }

      // console.log('初始化滚动条')
      style.width = `${offsetWidth}px`
      styleBar.width = `${scrollWidth}px`

      this.handleScrollBarDisplay()

      scrollRefDom.onscroll = () => {
        tableBodyDom.scrollLeft = scrollRefDom.scrollLeft
      }

      tableBodyDom.onscroll = () => {
        scrollRefDom.scrollLeft = tableBodyDom.scrollLeft
      }

      window.addEventListener('scroll', this.handleScrollBarDisplay)
    }
  }

  render () {
    return <div>
      <Table
        {...this.props}
        ref={ref => { this.tableRef = ref }}
        onRow={this.onRow}
        rowClassName={this.rowClassName}
      />

      <div
        ref={ref => { this.scrollRef = ref }}
        className={`${classPrefix}-scroll`}
      >
        <div
          ref={ref => { this.scrollbarRef = ref }}
          className={`${classPrefix}-scroll-bar`}
        />
      </div>

      <style>
        {
          `.${classPrefix}-highlight {
            background: ${this.props.highlightColor};
          }`
        }
      </style>
    </div>
  }
}
