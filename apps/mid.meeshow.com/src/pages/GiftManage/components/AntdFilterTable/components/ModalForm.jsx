import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Modal, Upload, Icon, Switch, InputNumber } from 'antd'
import { numCommaReplace, filterOption } from 'ik-utils'

import UploadRes from 'components/UploadRes'
import { VIEW } from './../../../constants/modalTypes'
import { selectList } from '../../../constants/selectLists'
import moment from 'moment';
import S from './../apis'

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

export default
@Form.create()
class ModalForm extends Component {
  static propTypes = {
    formData: PropTypes.object,
    modalConfig: PropTypes.object,
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    getNextResource: PropTypes.func,
  }

  static defaultProps = {
    formData: {},
    modalConfig: {},
    hideDialog: () => {},
    handleSubmit: () => {},
  }

  constructor (props) {
    super(props)
    this.state = {
      resourceList: [],
      giftSetting: props.giftSetting,
      iconList: [],
    }
    this.getResource()
    this.getIcon()
  }

  componentWillMount () {

  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.giftSetting !== nextProps.giftSetting) {
      this.setState({ giftSetting: nextProps.giftSetting })
    }

    let { formData } = nextProps
    let { resourceList, iconList } = this.state
    if (this.formData !== formData) {
      resourceList = this.insertResource(resourceList, formData.resource);
      iconList = this.insertIcon(iconList, formData.icons && formData.icons[0]);
      this.setState({ resourceList, iconList })
    }
  }

  componentWillUpdate (nextProps, nextState) {

  }

  componentDidUpdate (prevProps, prevState) {

  }

  componentWillUnmount () {

  }
  // 关闭弹窗后重置控件值
  resetFields () {
    this.props.form.resetFields()
  }

  get formData () {
    const filterParams = this.props.form.getFieldsValue()
    const formDataAll = Object.assign({}, this.props.formData, filterParams, {
      enable: filterParams.enableSwitch ? 1 : 2
    })
    return formDataAll
  }

  hideDialog = () => {
    this.resetFields();
    this.props.hideDialog();
  }

  handleSubmit = () => {
    // console.log(this.formData)
    const data = this.formData;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return false
      }
      this.props.handleSubmit(data)
    })
  }
  // 资源列表请求参数
  resParams = {
    enable: 1,
    page: 1,
    size: 40,
    hasMore: true
  }
  // 角标列表请求参数
  iconParams = {
    enable: 1,
    page: 1,
    size: 40,
    hasMore: true
  }

  // 编辑的礼物 插入的资源id
  newResArr = []

  // 编辑礼物 插入的角标id
  newIconArr = []

  // 获取资源列表
  getResource = () => {
    S.getResourceList(this.resParams)
      .then(({ data }) => {
        this.isLoading = false
        let resourceList = this.state.resourceList;
        let newData = data.data.filter(item => this.newResArr.indexOf(item.id) === -1);
        resourceList = resourceList.concat(newData || [])
        this.setState({
          resourceList
        })
        this.resParams.hasMore = data.page.has_more
      })
  }

  getMoreResouce = () => {
    if (!this.resParams.hasMore) {
      return;
    }
    this.resParams.page++
    this.isLoading = true;
    this.getResource()
  }

  isLoading = false

  // 资源select滚动
  onScrollResource = (e) => {
    const { target } = e;
    const { scrollTop, scrollHeight, clientHeight } = target
    // console.log('onScrollResource', scrollHeight, scrollTop, clientHeight);
    if (scrollHeight - clientHeight - scrollTop > 20) {
      return;
    }
    console.log('getNext')
    if (this.isLoading) {
      return;
    }
    this.getMoreResouce()
  }
  // 把当前礼物的资源插入到总资源列表
  insertResource(list, res) {
    if (!res) {
      return list;
    }
    let cur = list.find(item => {
      return item.id === res.id
    })
    if (!cur) {
      // 存储编辑过的礼物资源id，防止资源列表里面重复
      if (this.newResArr.indexOf(res.id) === -1) {
        this.newResArr.push(res.id)
      }
      // 当前礼物的资源插入资源列表
      list.unshift(res);
    }
    return list;
  }

  // 获取图标列表
  getIcon = () => {
    S.getIconList(this.iconParams)
      .then(({ data }) => {
        this.isLoading = false
        let iconList = this.state.iconList;
        let newData = data.data.filter(item => this.newIconArr.indexOf(item.id) === -1);
        iconList = iconList.concat(newData || [])
        this.setState({
          iconList
        })
        this.iconParams.hasMore = data.page.has_more
      })
  }

  getMoreIcon = () => {
    if (!this.iconParams.hasMore) {
      return;
    }
    this.iconParams.page++
    this.isLoading = true;
    this.getIcon()
  }

  // 角标 select popUp 滚动
  onScrollIcon = (e) => {
    const { target } = e;
    const { scrollTop, scrollHeight, clientHeight } = target
    // console.log('onScrollResource', scrollHeight, scrollTop, clientHeight);
    if (scrollHeight - clientHeight - scrollTop > 20) {
      return;
    }
    console.log('getNext')
    if (this.isLoading) {
      return;
    }
    this.getMoreIcon()
  }
  // 把当前礼物的资源插入到总资源列表
  insertIcon(list, res) {
    if (!res) {
      return list;
    }
    let cur = list.find(item => {
      return item.id === res.id
    })
    if (!cur) {
      // 存储编辑过的礼物角标id，防止角标列表里面重复
      if (this.newIconArr.indexOf(res.id) === -1) {
        this.newIconArr.push(res.id)
      }
      // 当前礼物的资源插入资源列表
      list.unshift(res);
    }
    return list;
  }

  render () {
    const {
      form: {
        getFieldDecorator
      },
      formData: {
        id,
        name,
        enable,
        gift_type: giftType,
        currency_type: currencyType,
        currency_num: currencyNum,
        exp,
        income,
        gift_resource_id: giftResourceId,
        start_time: startTime,
        end_time: endTime,
        icons,
        extra
      },
      modalConfig: {
        visible,
        title,
        type
      }
    } = this.props
    const {
      giftSetting,
      iconList,
      resourceList
    } = this.state
    const {
      hideDialog,
      handleSubmit
    } = this
    let timeRange = null
    if (startTime && endTime) {
      timeRange = [moment(this.props.formData.start_time), moment(this.props.formData.end_time)]
    } else {
      timeRange = null
    }
    let iconId = icons && icons[0] && icons[0].id
    let iconPos = icons && icons[0] && icons[0].position
    console.log('resourceList', resourceList)
    return <Modal
      title={title}
      visible={visible}
      onOk={handleSubmit}
      onCancel={hideDialog}
      width={520}
      maskClosable
    >
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="礼物名称">
          {
            getFieldDecorator('name', {
              initialValue: name,
              rules: [
                { required: true, message: '请输入礼物名称' }
              ]
            })(
              <Input
                placeholder="请输入礼物名称"
                style={{ width: '240px' }}
                disabled={type === VIEW}
                maxLength={10}
              />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="礼物类型">
          {
            getFieldDecorator('gift_type', {
              initialValue: giftType,
              rules: [
                { required: true, message: '请选择礼物类型' }
              ]
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '240px' }}
                placeholder="请选择礼物类型"
                filterOption={filterOption}
                disabled={type === VIEW}
              >
                {
                  giftSetting && giftSetting.gift_type_enum && giftSetting.gift_type_enum.map((item, index) =>
                    <Select.Option
                      key={index}
                      value={item.value}
                    >
                      { item.name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="货币类型">
          {
            getFieldDecorator('currency_type', {
              initialValue: currencyType,
              rules: [
                { required: true, message: '请选择货币类型' }
              ]
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '240px' }}
                placeholder="请选择货币类型"
                filterOption={filterOption}
                disabled={type === VIEW}
              >
                {
                  giftSetting && giftSetting.currency_settings && giftSetting.currency_settings.map((item, index) =>
                    <Select.Option
                      key={index}
                      value={item.currency_key}
                    >
                      { item.currency_name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item {...formItemLayout} label="礼物价格">
          {
            getFieldDecorator('currency_num', {
              initialValue: currencyNum,
              rules: [
                { required: true, message: '请输入礼物价格' }
              ]
            })(
              <InputNumber
                min={1}
                disabled={type === VIEW}
              />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="送礼人获得">
          {
            getFieldDecorator('exp', {
              initialValue: exp,
            })(
              <InputNumber
                min={1}
                disabled={type === VIEW}
              />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="收礼人获得">
          {
            getFieldDecorator('income', {
              initialValue: income,
            })(
              <InputNumber
                min={1}
                disabled={type === VIEW}
              />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="角标">
          {
            getFieldDecorator('iconId', {
              initialValue: iconId,
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '240px' }}
                placeholder="请选择角标"
                filterOption={filterOption}
                disabled={type === VIEW}
              >
                {
                  iconList && iconList.map((item, index) =>
                    <Select.Option
                      key={index}
                      value={item.id}
                    >
                      { item.name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="角标位置">
          {
            getFieldDecorator('iconPos', {
              initialValue: iconPos,
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '240px' }}
                placeholder="请选择角标"
                filterOption={filterOption}
                disabled={type === VIEW}
                onPopupScroll={this.onScrollIcon}
              >
                {
                  giftSetting && giftSetting.icon_position_enum && giftSetting.icon_position_enum.map((item, index) =>
                    <Select.Option
                      key={index}
                      value={item.value}
                    >
                      { item.name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="资源名称">
          {
            getFieldDecorator('gift_resource_id', {
              initialValue: giftResourceId,
              rules: [
                { required: true, message: '请选择资源' }
              ]
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '240px' }}
                placeholder="请选择资源"
                filterOption={filterOption}
                disabled={type === VIEW}
                onPopupScroll={this.onScrollResource}
              >
                {
                  resourceList && resourceList.map((item, index) => {
                    return <Select.Option
                      key={(index)}
                      value={item.id}
                    >
                      { item.name }
                    </Select.Option>
                  })
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="生效日期">
          {
            getFieldDecorator('time', {
              initialValue: timeRange,
              rules: [
                { type: 'array' }
              ],
            })(
              <RangePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                disabled={type === VIEW}
              />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="额外信息">
          {
            getFieldDecorator('extra', {
              initialValue: extra,
            })(
              <Input.TextArea
                autosize={{ minRows: 3, maxRows: 5 }}
                placeholder="额外信息 注意JSON格式"
                style={{ width: '300px' }}
                disabled={type === VIEW}
              />
            )
          }
        </Form.Item>

        <Form.Item label="启用礼物" {...formItemLayout}>
          {getFieldDecorator('enableSwitch', { valuePropName: 'checked', initialValue: this.props.formData.enable === 1 })(
            <Switch
              disabled={type === VIEW}
            />)
          }
        </Form.Item>

      </Form>
    </Modal>
  }
}
