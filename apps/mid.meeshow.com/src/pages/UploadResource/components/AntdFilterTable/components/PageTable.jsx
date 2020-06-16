
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Pagination, Popconfirm, Switch, Select, message } from 'antd'
import CustomTable from '@inkefe/components-custom-table'
import UploadRes from 'components/UploadRes'
import moment from 'moment';
import './index.less'

const { Option } = Select;

const imgApi = '//upload.meelove.cn/api/v1/base/resource/image/upload'
const mediaApi = '//upload.meelove.cn/api/v1/base/resource/media/upload'
const typeList = [
  {
    key: 'img',
    value: '图片',
    action: `${imgApi}?opt=sys_image`,
    fileType: [],
    accept: 'image/png, image/jpeg'
  },
  {
    key: 'zip',
    value: 'zip包',
    action: `${mediaApi}?opt=sys_m4a`,
    fileExt: ['zip'],
    accept: ''
  },
  {
    key: 'svga',
    value: 'svga',
    action: `${mediaApi}?opt=sys_m4a&sufix=svga`,
    fileExt: ['svga'],
    accept: ''
  },
  {
    key: 'm4a',
    value: '视频',
    action: `${mediaApi}?opt=sys_m4a`,
    fileExt: ['m4a', 'mp4', 'flv', 'rmvb'],
    accept: ''
  },
]

export default
class PageTable extends Component {
  static propTypes = {
    tableData: PropTypes.array,
    tableTotal: PropTypes.number,
    searchParams: PropTypes.object,
    handlePageChange: PropTypes.func,
    handleSizeChange: PropTypes.func,
    handleView: PropTypes.func,
    handleEdit: PropTypes.func,
    handleDel: PropTypes.func,
  }

  static defaultProps = {
    tableData: [],
    tableTotal: 0,
    searchParams: {},
    handlePageChange: () => {},
    handleSizeChange: () => {},
    handleView: () => {},
    handleEdit: () => {},
    handleDel: () => {},
  }

  constructor (props) {
    super(props)
    this.state = {
      fileType: 'img', // 当前文件类型
      resLink: '', // 资源地址
      action: `${imgApi}?opt=sys_image`, // 上传接口
      accept: 'image/png, image/jpeg',
      fileExt: [], // 文件后缀 扩展名
    }
  }
  handleClick = () => {
  }
  handleStateChange =(item, val) => {
  }

  tableColumns = [

  ]

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {

  }

  componentWillUpdate (nextProps, nextState) {

  }

  componentDidUpdate (prevProps, prevState) {

  }

  componentWillUnmount () {

  }

  handleButtonDisabled = key => this.props.routeAuthority.indexOf(this.props.buttonCtrl[key].id) < 0

  handlePageChange = (page, size) => {
    this.props.handlePageChange(page, size)
  }

  handleSizeChange = (page, size) => {
    this.props.handleSizeChange(page, size)
  }

  handleFormData = params => {
    return {
      ...params
    }
  }

  handleView = params => {
    this.props.handleView(this.handleFormData(params))
  }

  // 点击编辑
  handleEdit = params => {
    this.props.handleEdit(this.handleFormData(params))
  }

  handleDel = params => {
    this.props.handleDel(params.id)
  }
  typeChange = (val) => {
    console.log('typeChange', val)
    const fileType = val;
    const one = typeList.filter(i => i.key === val)[0];
    if (!one) {
      console.error('没有数据')
      return;
    }
    const { accept, action, fileExt } = one
    this.setState({
      fileType,
      accept,
      action,
      fileExt
    })
  }
  copyHandle = () => {
    document.getElementById('link-ipt').select();
    document.execCommand('copy');
    message.success('复制成功')
  }
  uploadHandle = (data) => {
    console.log('dat', data[0])
    this.setState({
      resLink: data[0] || '空链接'
    })
  }

  render () {
    const { resLink, action, accept, fileExt, fileType } = this.state;
    console.log(action, accept, fileExt)

    return <div style={{ margin: '20px auto', width: '400px' }}>
      <div className='ipt-item'>
        <div className='label'>文件类型</div>
        <Select style={{ width: '140px' }} onChange={this.typeChange} value={fileType}>
          {
            typeList.map((item, index) => {
              return <Option value={item.key} key={index}>{item.value}</Option>
            })
          }
        </Select>
      </div>
      <UploadRes
        // accept={'image/png, image/jpeg'}
        // action={'//upload.meelove.cn/api/v1/base/resource/media/upload?sufix=svga'}
        accept={accept}
        action={action}
        fileExt={fileExt}
        maxCount = {1}
        limitSize = {10}
        previewStyle = {{ width: '100px', height: '90px' }}
        onChange = {this.uploadHandle}
      />
      <div className='ipt-item'>
        <input value={resLink} id='link-ipt' style={{ width: '300px' }} readOnly={true}></input>
        <Button className='copy-btn' type='primary' onClick={this.copyHandle}> 复制 </Button>
      </div>

    </div>
  }
}

const styles = {
  table: {
    margin: '20px 0',
    wordBreak: 'break-all',
  },
  btn: {
    margin: '0 4px',
    padding: '0 10px',
    height: '28px',
  },
  pagination: {
    textAlign: 'center',
  },
  smallImg: {
    maxWidth: '100%',
    height: '60px'
  }
}
