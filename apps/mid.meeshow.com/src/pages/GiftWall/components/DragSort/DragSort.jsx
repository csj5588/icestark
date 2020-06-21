import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Icon, Modal, message, Card, Select, Radio } from 'antd'
import ListData, { GiftData, Tablist } from './listData'
import moment from 'moment';
import './DragSort.scss'

const { Option } = Select;
const classPrefix = 'component-drag-sort'
// 礼物墙最多礼物数量
const wallMaxLength = 80;
export default
class App extends Component {
  static propTypes = {
    // tab 列表
    tabList: PropTypes.array,
    // 所有礼物资源
    giftResource: PropTypes.array,
    // 当前礼物墙
    wallData: PropTypes.object, // { id, bz_type, tab_id, gifts: [], name}
    // 配置 业务类型选项
    settings: PropTypes.object,
    // 当前业务
    selectBz: PropTypes.number,
    // 当前tab
    selectTab: PropTypes.number,
    // 业务或者tab 改变回掉函数
    handleChangeType: PropTypes.func,
    // 提交数据
    handleSubmit: PropTypes.func,
    getMoreResource: PropTypes.func,
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props)
    const { tabList = [], giftResource = [], settings = {}, wallData = {} } = props
    const listData = this.initList(wallData.gifts || []);
    this.state = {
      selectTab: wallData.tab_id,
      selectBz: wallData.bz_type,
      tabList,
      settings,
      startIndex: 0,
      wallData, // 当前礼物墙所有 数据
      listData, // 礼物墙排序列表
      giftResource, // 所有礼物源数据
      insertGift: null, // 当前拖动要插入的一个礼物，区别 调整顺序or新添加
    }
  }

  componentWillMount () {

  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    const { wallData } = this.props;
    const wall = nextProps.wallData;
    const { tabList = [], settings = {}, giftResource } = nextProps;
    if (wallData.tab_id !== wall.tab_id || wallData.bz_type !== wall.bz_type) {
      console.log('墙变化 从新复制state')
      const listData = this.initList(wall.gifts || []);
      this.setState({
        selectTab: wall.tab_id,
        selectBz: wall.bz_type,
        wallData: wall,
        listData,
        tabList,
        settings,
        giftResource
      })
    } else {
      this.setState({
        tabList,
        settings,
        giftResource
      })
    }
  }

  componentDidUpdate (prevProps, prevState) {

  }

  componentWillUnmount () {

  }
  initList(listData) {
    if (listData && listData.length > wallMaxLength) {
      return listData;
    }
    listData.length = wallMaxLength;
    for (let i = 0; i < listData.length; i++) {
      let item = listData[i]
      // 礼物源禁用了
      if (item && item.enable === 2) {
        item.isDisabled = true
      }
      // 礼物源过期了
      if (item && new Date(item.end_time).getTime() < Date.now()) {
        item.isDisabled = true;
      }
      if (!listData[i]) {
        listData[i] = {}
      }
    }
    return listData;
  }
  // 礼物源 开始拖动
  dragStartGift = (index, e) => {
    console.log('dragStartGift', index)
    e.dataTransfer.setData('text/plain', null);
    e.stopPropagation()
    const { giftResource } = this.state;
    this.setState({
      insertGift: giftResource[index]
    })
  }
  // 礼物源 结束拖动
  dragEndGift = (index, e) => {
    console.log('dragEndGift', index)
  }

  /* 可拖动的目标元素会触发事件 */
  dragHandle = (index, e) => {
  }

  // 排序拖动开始
  dragStart = (index, e) => {
    e.dataTransfer.setData('text/plain', null);
    e.stopPropagation()
    const { listData } = this.state;
    for (let i = 0; i < listData.length; i++) {
      let item = listData[i];
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
    let lock = listData[index].lock;
    listData[index].lock = 1 ^ lock;
    this.setState(
      listData
    )
  }

  handleChangeTab = (val) => {
    if (val !== this.state.selectTab) {
      this.props.handleChangeType(this.state.selectBz, val);
    }
  }

  handleChangeType = (e) => {
    const { value } = e.target;
    if (value !== this.state.selectBz) {
      this.props.handleChangeType(value, this.state.selectTab)
    }
  }

  // 保存数据
  saveData = () => {
    let giftIds = [];
    const { listData } = this.state;
    let hasEmpty = 0;
    for (let i = 0; i < listData.length; i++) {
      const one = listData[i];
      if (!one.id) {
        hasEmpty = 1;
      } else {
        if (hasEmpty === 1) {
          hasEmpty = 2
          break
        }
      }
    }
    if (hasEmpty === 2) {
      message.error('中间不能为空')
      return;
    }
    this.state.listData.forEach((one, index) => {
      one.id && giftIds.push(one.id)
    })
    if (!giftIds.length) {
      // message.error('不能为空')
      // return;
    }
    let { wallData } = this.state
    let data = {
      ...wallData,
      gift_ids: giftIds
    };
    delete data.gifts;
    this.props.handleSubmit(data);
  }

  renderExtra = () => {
    return <div>
      { this.renderType() }
      { this.renderTab() }
    </div>
  }
  // tab 渲染
  renderTab = () => {
    const { tabList, selectTab } = this.state;
    if (!selectTab) {
      return null;
    }
    return <Select defaultValue={selectTab} style={{ width: 120, height: 20 }} onChange={this.handleChangeTab}>
      {
        tabList.map((one, index) => {
          return <Option value={one.id} key={index}>{one.name}</Option>
        })
      }
    </Select>;
  }

  // type 渲染
  renderType = () => {
    const { settings, selectBz } = this.state;
    if (!selectBz || !settings.wall_settings || !settings.wall_settings.buz_type_enum) {
      return null;
    }
    const options = settings.wall_settings.buz_type_enum
    return <Radio.Group defaultValue={selectBz} style={{ marginRight: '50px' }} onChange={this.handleChangeType}>
      {
        options.map((one, index) => {
          return <Radio value={one.value} key={index}>{one.name}</Radio>
        })
      }
    </Radio.Group>
  }

  // 顺序列表 单项渲染
  renderItem(one, index, currencyText) {
    const { listData } = this.state;
    return <div className={'item ' + (one.isDrag ? 'is-drag ' : '') + (one.isDisabled ? 'is-disabled ' : '')}
      onDrag={this.dragHandle.bind(this, index)}
      onDragStart={this.dragStart.bind(this, index)}
      onDragEnd={this.dragEnd.bind(this, index)}
      onDragOver={this.dragOver.bind(this, index)}
      onDragEnter={this.dragEnter.bind(this, index)}
      onDragLeave={this.dragLeave.bind(this, index)}
      onDrop={this.dropHandle.bind(this, index)}
      draggable={!one.lock} key={index + '_' + one.id}>
      {
        one.id ? <> <div className='image' style={{ backgroundImage: 'url(' + one.resource.gift_url_2x + ')' }}></div>
        <div className='name'>{one.name}</div>
        <div className='price'>{one.currency_num}{currencyText}</div>
        <div className='gift-id'>ID: {one.id}</div>
        <div className={'status ' + (one.isDisabled ? 'is-disabled ' : '')}>{one.isDisabled ? '已失效' : moment(new Date(one.end_time)).format('YYYY-MM-DD HH:mm') + '过期'}</div>
        <Icon type='delete' className='del-btn' title='点击删除' onClick={this.delHandle.bind(this, index)} />
        <Icon type={one.lock === 0 ? 'unlock' : 'lock'} className={'lock-btn ' + (one.lock === 1 && 'is-locked')}
          title={one.lock === 0 ? '点击锁定' : '点击解锁'} onClick={this.lockHandle.bind(this, index)}/>
      </> : null
      }
    </div>
  }

  // 礼物源列表 单项渲染
  renderGiftItem(one, index, currencyText) {
    return <div className={'item '}
      onDragStart={this.dragStartGift.bind(this, index)}
      onDragEnd={this.dragEndGift.bind(this, index)}
      draggable={true} key={index + '_' + one.id}>
      <div className='image' style={{ backgroundImage: 'url(' + one.resource.gift_url_2x + ')' }}></div>
      <div className='name'>{one.name}</div>
      <div className='price'>{one.currency_num}{currencyText}</div>
      <div className='gift-id'>ID: {one.id}</div>
    </div>
  }

  isLoading = false

  // 礼物源 滚动加载
  onScrollList = (e) => {
    const { target } = e;
    const { scrollTop, scrollHeight, clientHeight } = target
    console.log('onScrollList', scrollHeight, scrollTop, clientHeight);
    if (scrollHeight - clientHeight - scrollTop > 40) {
      return;
    }
    console.log('getNext')
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000)
    this.props.getMoreResource()
  }

  render () {
    const { listData, giftResource } = this.state;
    const { gift_settings: giftSettings } = this.state.settings;

    let currencyText = ''
    if (giftSettings && giftResource[0]) {
      const { currency_settings: options } = giftSettings
      let one = options.filter(item => item.currency_key === giftResource[0].currency_type)[0];
      currencyText = one ? one.currency_name : ''
    }

    return <div className={classPrefix}>
      <Row gutter={16} className='choose-sort-wrap'>
        <Col span={12}>
          <Card title="礼物源列表" bodyStyle={{ padding: 0, height: '675px', overflow: 'auto' }} onScroll={this.onScrollList}>
            <div className='gift-list'>
              {
                giftResource.map((one, index) => {
                  return this.renderGiftItem(one, index, currencyText)
                })
              }
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="当前礼物墙" extra={this.renderExtra()} bodyStyle={{ padding: 0 }}>
            <div className='sort-list'>
              {
                listData.map((one, index) => {
                  return this.renderItem(one, index, currencyText)
                })
              }
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}><Button type='primary' onClick={this.saveData.bind(this)}>保存提交</Button></div>
          </Card>
        </Col>
      </Row>

    </div>
  }
}
