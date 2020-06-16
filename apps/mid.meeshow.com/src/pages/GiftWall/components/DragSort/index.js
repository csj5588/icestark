/**
 * 礼物拖拽排序
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Icon, Modal, message, Card, Select } from 'antd'
// import ListData, { GiftData, Tablist } from './listData'

import DragSort from './DragSort.jsx'

import S from './apis'

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
    this.state = {
      settings: {},
      selectTab: 0, // 选中的tab
      selectBz: 0, // 选中的业务类型 直播间 | 私信详情
      tabList: [],
      giftData: [], // 所有礼物源数据
      wallData: {}, // 礼物墙数据 { id, name, biz_type, tab_id, gifts: [] }
    }
  }

  giftParams = {
    enable: 1,
    page: 1,
    size: 30,
    hasMore: true
  }

  componentWillMount () {

  }

  componentDidMount () {
    Promise.all([this.getTabList(), this.getSettings(), this.getGiftList()]).then(res => {
      // console.log('promise all result', res);
      this.setState({
        ...res[0],
        ...res[1],
        giftData: res[2]
      }, this.getSortList.bind(this))
    })
  }

  componentWillReceiveProps (nextProps) {

  }

  componentDidUpdate (prevProps, prevState) {

  }

  componentWillUnmount () {

  }
  // 获取配置
  getSettings() {
    return S.getSettings({ wall_settings: 1, gift_settings: 1 }).then(({ data }) => {
      const settings = data;
      const selectBz = data.wall_settings.buz_type_enum[0].value;
      return {
        settings,
        selectBz
      }
    })
  }
  getTabList() {
    return S.getTabList({ size: 100, enable: 1 }).then(res => {
      const tabList = res.data.data;
      const selectTab = tabList[0].id;
      return {
        tabList,
        selectTab
      }
    })
  }
  // 获取礼物源列表
  getGiftList() {
    return S.getAllGift({ ...this.giftParams }).then(res => {
      const { data } = res;
      let giftData = this.state.giftData;
      giftData = giftData.concat(data.data || []);
      this.giftParams.hasMore = data.page.has_more
      return giftData
    })
  }
  // 获取排序的一面礼物墙
  getSortList() {
    const { selectBz, selectTab } = this.state;
    const params = {
      bz_type: selectBz,
      tab_id: selectTab
    }
    return S.getDataList({ ...params }).then(res => {
      let wallData = {
        ...res.data.data,
        ...params
      };
      console.log('wallData', wallData)
      this.setState({
        wallData
      })
    });
  }

  changeType(selectBz, selectTab) {
    this.setState({
      selectBz,
      selectTab
    }, this.getSortList.bind(this))
  }
  // 提交数据
  submitData(data) {
    // 添加或者修改数据
    S[data.id ? 'postDataModify' : 'postDataAdd'](data).then(res => {
      message.success('success');
    })
  }
  getMoreResource() {
    if (!this.giftParams.hasMore) {
      return;
    }
    this.giftParams.page++
    this.getGiftList().then(data => {
      this.setState({
        giftData: data
      })
    })
  }

  render () {
    const { tabList, giftData, settings, selectBz, selectTab, wallData } = this.state;
    return <>
      <DragSort
        tabList={tabList}
        giftResource={giftData}
        wallData={wallData}
        settings={settings}
        // selectBz={selectBz}
        // selectTab={selectTab}
        handleChangeType={this.changeType.bind(this)}
        handleSubmit={this.submitData.bind(this)}
        getMoreResource={this.getMoreResource.bind(this)}
      />
    </>
  }
}
