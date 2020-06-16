import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Icon, Modal, message, Card, Select } from 'antd'
import ListData, { GiftData, Tablist } from './listData'
import './DragSort.scss'

const { Option } = Select;
const classPrefix = 'component-drag-sort'
// 礼物墙最多礼物数量
const wallMaxLength = 80;
export default
class App extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props)
    ListData.length = wallMaxLength;
    // 补全 后面的
    for (let i = 0; i < ListData.length; i++) {
      if (!ListData[i]) {
        ListData[i] = {}
      }
    }
    this.state = {
      selectTab: 0,
      tabList: Tablist,
      startIndex: 0,
      listData: ListData, // 原有礼物顺序
      giftData: GiftData, // 所有礼物源数据
      insertGift: null, // 当前拖动要插入的一个礼物，区别 调整顺序or新添加
    }
  }

  componentWillMount () {

  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {

  }

  componentDidUpdate (prevProps, prevState) {

  }

  componentWillUnmount () {

  }
  // 礼物源 开始拖动
  dragStartGift = (index, e) => {
    console.log('dragStartGift', index)
    e.dataTransfer.setData('text/plain', null);
    e.stopPropagation()
    const { giftData } = this.state;
    this.setState({
      insertGift: giftData[index]
    })
  }
  // 礼物源 结束拖动
  dragEndGift = (index, e) => {
    console.log('dragEndGift', index)
  }

  /* 可拖动的目标元素会触发事件 */
  dragHandle = (index, e) => {
    // console.log('dragHandle', index)
    // e.stopPropagation()
    // e.preventDefault();
  }

  // 排序拖动开始
  dragStart = (index, e) => {
    e.dataTransfer.setData('text/plain', null);
    e.stopPropagation()
    const { listData } = this.state;
    for (let i = 0; i < listData.length; i++) {
      const item = listData[i];
      item.isDrag = (index === i);
    }
    this.setState({
      insertGift: null, // 区别 调整顺序还是新添加
      startIndex: index,
      listData
    })
  }
  // 排序拖动结束
  dragEnd = (index, e) => {
    console.log('dragEnd', index);
    const { listData } = this.state;
    for (let i = 0; i < listData.length; i++) {
      const item = listData[i];
      delete item.isDrag
    }
    this.setState({
      listData
    })
    e.preventDefault();
    e.stopPropagation();
  }

  dragOver = (index, e) => {
    // console.log('dragOver', index);
    e.preventDefault();
    e.stopPropagation()
  }

  dragEnter = (index, e) => {
    console.log('dragEnter', index)
  }

  dragLeave = (index, e) => {
    console.log('dragLeave', index)
  }
  // 拖动松开放下 节点触发事件
  // 1: 旧礼物调整顺序 2:新礼物插入
  dropHandle = (index, e) => {
    console.log('dropHandle', index, e.currentTarget);
    const { listData, startIndex, insertGift } = this.state;
    const item = { ...listData[index] };
    if (item.lock === 1) {
      message.warning('当前位置锁定,请先解锁')
      return;
    }
    // 插入新的
    if (insertGift) {
      // 礼物已经存在礼物墙中
      if (listData.find(one => one.id === insertGift.id)) {
        message.warning('礼物已经存在礼物墙，不能重复插入!')
        return;
      }
      // 目标位置为空 直接替换空
      if (!listData[index].id) {
        this.replaceOld(index);
        return;
      }
      Modal.confirm({
        width: 500,
        title: '选择添加方式',
        content: '',
        onOk: this.insertNew.bind(this, index),
        onCancel: this.replaceOld.bind(this, index),
        okText: '目标位置礼物及后面礼物整体后移',
        cancelText: '覆盖当前礼物',
      });
      return;
    }

    if (startIndex === index) {
      console.log('位置没变 不用交换')
      return;
    }
    Modal.confirm({
      width: 500,
      title: '选择移动方式',
      content: '',
      onOk: this.insertStartIndex.bind(this, index),
      onCancel: this.exchangePosition.bind(this, index),
      okText: '目标位置礼物及后面位置礼物整体后移',
      cancelText: '调换两个礼物位置',
    });
  }
  // 新礼物 当前位置插入，后面礼物整体后移
  insertNew(index) {
    const { listData, insertGift } = this.state;
    listData.splice(index, 0, insertGift);
    this.setState({
      listData
    })
  }
  // 新礼物 替换当前位置
  replaceOld(index) {
    const { listData, insertGift } = this.state;
    listData.splice(index, 1, insertGift);
    this.setState({
      listData
    })
  }

  // 两个旧礼物交换位置
  exchangePosition(index) {
    const { listData, startIndex } = this.state;
    const item = { ...listData[index] };
    if (item.lock === 1) {
      console.log('is locked', index);
      return;
    }
    const startItem = { ...listData[startIndex] };
    listData.splice(index, 1, startItem);
    listData.splice(startIndex, 1, item);
    this.setState({
      listData
    })
  }
  // 拖动元素插入到移动的当前位置，然后当前位置后面所有元素都后移
  insertStartIndex(index) {
    const { listData, startIndex } = this.state;
    const startItem = listData.splice(startIndex, 1, {})[0];
    listData.splice(index, 0, startItem);
    this.setState({
      listData
    })
  }

  // 删除
  delHandle = (index, e) => {
    console.log('delHandle', index);
    const { listData } = this.state;
    // listData.splice(index, 1);
    listData[index] = {}
    this.setState(
      listData
    )
  }
  // 锁定||解锁
  lockHandle = (index, e) => {
    console.log('lockHandle', index);
    const { listData } = this.state;
    let status = listData[index].lock;
    listData[index].lock = 1 ^ status;
    this.setState(
      listData
    )
  }

  handleChangeTab = (val) => {
    console.log('handleChangeTab', val)
  }

  // tab 渲染
  renderTab = () => {
    const { tabList, selectTab } = this.state;
    return <Select defaultValue={112} style={{ width: 120 }} onChange={this.handleChangeTab}>
      {
        tabList.map(one => {
          return <Option value={one.id}>{one.name}</Option>
        })
      }
    </Select>;
  }

  // 顺序列表 单项渲染
  renderItem(one, index) {
    const { listData } = this.state;
    return <div className={'item ' + (one.isDrag ? 'is-drag ' : '')}
      onDrag={this.dragHandle.bind(this, index)}
      onDragStart={this.dragStart.bind(this, index)}
      onDragEnd={this.dragEnd.bind(this, index)}
      onDragOver={this.dragOver.bind(this, index)}
      onDragEnter={this.dragEnter.bind(this, index)}
      onDragLeave={this.dragLeave.bind(this, index)}
      onDrop={this.dropHandle.bind(this, index)}
      draggable={!one.lock} key={index + '_' + one.id}>
      {
        one.id ? <> <div className='image' style={{ backgroundImage: 'url(' + one.gift_url_2x + ')' }}></div>
        <div className='name'>{one.name}</div>
        <div className='price'>{one.gold}钻石</div>
        <div className='gift-id'>ID: {one.id}</div>
        <Icon type='delete' className='del-btn' title='点击删除' onClick={this.delHandle.bind(this, index)} />
        <Icon type={one.lock === 0 ? 'unlock' : 'lock'} className={'lock-btn ' + (one.lock === 1 && 'is-locked')}
          title={one.lock === 0 ? '点击锁定' : '点击解锁'} onClick={this.lockHandle.bind(this, index)}/>
      </> : null
      }

    </div>
  }

  // 礼物源列表 单项渲染
  renderGiftItem(one, index) {
    return <div className={'item '}
      onDragStart={this.dragStartGift.bind(this, index)}
      onDragEnd={this.dragEndGift.bind(this, index)}
      draggable={true} key={index + '_' + one.id}>
      <div className='image' style={{ backgroundImage: 'url(' + one.gift_url_2x + ')' }}></div>
      <div className='name'>{one.name}</div>
      <div className='price'>{one.gold}钻石</div>
      <div className='gift-id'>ID: {one.id}</div>
    </div>
  }

  render () {
    const { listData, giftData } = this.state;
    return <div className={classPrefix}>
      <Row gutter={16} className='choose-sort-wrap'>
        <Col span={8}>
          <Card title="礼物源列表">
            <div className='gift-list'>
              {
                giftData.map((one, index) => {
                  return this.renderGiftItem(one, index)
                })
              }
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="当前礼物墙" extra={this.renderTab()}>
            <div className='sort-list'>
              {
                listData.map((one, index) => {
                  return this.renderItem(one, index)
                })
              }
            </div>

          </Card>
        </Col>
      </Row>

    </div>
  }
}
