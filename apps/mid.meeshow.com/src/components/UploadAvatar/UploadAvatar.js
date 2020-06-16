/**
 * 图片上传组件
 * @author libaoxu
 * @example
 * ```javascript
 * <Form.Item {...formItemLayout} label="公会logo">
 *  {
 *    getFieldDecorator('guild_logo', {
 *       rules: [{ required: true, message: '请上传公会logo' }]
 *    })(
 *      <UplodAvatar/>
 *    )
 *  }
 *  </Form.Item>
 * ```
 * 可以直接放到 `Form.Item` 中使用
 *
 * @update
 * 20190507 更新添加 `dimensionValidator`,一个例子
 * ```javascript
 *  <UplodAvatar
 *    dimensionValidator={({width, height}) => {
 *      return new Promise((resolve, reject) => {
 *        if (width !== height) {
 *          reject(new Error('请上传正方形图片'))
 *        } else {
 *          resolve()
 *        }
 *      })
 *    }}
 * />
 * ```
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, message, Modal, Button } from 'antd'
import mime from 'mime'
import _uniq from 'lodash/uniq'
import customRequest from './customRequest'
import srcConfig from 'src/config'

import { checkFileAcceptType, checkFileSize, checkFileDimension } from './utils'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const bite2Mega = n => parseInt(n / 1024 / 1024)

const createDefaultExtArr = () => ['png', 'jpg', 'gif', 'jpeg']

export default class UploadAvatar extends React.Component {
  static propTypes = {
    extArr: PropTypes.array,
    limitSize: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    dimensionValidator: PropTypes.func,
    style: PropTypes.object,
    imgStyle: PropTypes.object
  }

  static defaultProps = {
    extArr: createDefaultExtArr(),
    // disabledtrue的时候, 只能暴露点击事件, 不能上传动作
    disabled: false,
    // 5m
    limitSize: 1024 * 1024 * 5,
    onChange: url => {
      console.log(`图片地址为：${url}`)
    },
    style: {},
    imgStyle: {}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.imageUrl) {
      return {
        imageUrl: props.value
      }
    }
    return null
  }

  state = {
    imageUrl: '',
    modalVisible: false,
    loading: false,
  }

  get accept () {
    let acceptArr = _uniq(this.props.extArr.map(item => mime.getType(item)))
    return acceptArr.join()
  }

  beforeUpload = (file) => {
    // const lowerFileType = file.type.toLowerCase()
    // const isAcceptType = this.props.extArr.find(ext => lowerFileType.indexOf(ext) > -1)
    // if (!isAcceptType) {
    //   message.error(`请上传正确格式文件: [${this.props.extArr.toString()}]`)
    // }

    // const isLtSize = (file.size / this.props.limitSize) < 1
    // if (!isLtSize) {
    //   message.error(`文件大小不能超过: ${bite2Mega(this.props.limitSize)} M`)
    // }

    // // 有一个不满足就返回false
    // return !!(isAcceptType && isLtSize)
    this.setState({ imageUrl: '', loading: true })
    this.state.imageUrl && this.props.onChange('')

    return Promise.resolve(file)
      .then(checkFileAcceptType(this.props.extArr))
      .then(checkFileSize(this.props.limitSize))
      .then(checkFileDimension(this.props.dimensionValidator))
      .catch(error => {
        // console.error(error)
        message.error(error.message)
        return Promise.reject(error)
      })
  }

  handleChange = (info) => {
    const { file } = info
    let isError = file.status === 'error'

    if (file.status === 'uploading') {
      this.setState({ imageUrl: '', loading: true })
      return
    }

    if (file.status === 'done') {
      const response = file.response || { data: {} }
      if (response.error_code === 0 || response.dm_error === 0) {
        const imageUrl = response.url || (response.data.image && response.data.image.url)
        this.setState({ imageUrl, loading: false })
        this.props.onChange(imageUrl)
      } else {
        isError = true
      }
    }

    if (isError) {
      message.error('文件上传失败, 请重试!')

      this.setState({ imageUrl: '', loading: false })
    }
  }

  _showModal = (e) => {
    // 只有上传是禁止状态, 才不显示弹窗
    if (!this.props.disabled) return

    this.setState({ modalVisible: true })
  }

  _closeModal = () => {
    this.setState({ modalVisible: false })
  }

  render() {
    const { state, props } = this
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">选择文件</div>
      </div>
    )
    // const imageUrl = this.state.imageUrl || this.props.value
    const imageUrl = this.state.imageUrl
    // action="//jsonplaceholder.typicode.com/posts/"
    return (
      <>
        <div onClick={this._showModal}>
          <Upload
            {...this.props}
            accept={this.accept}
            className="avatar-uploader"
            listType="picture-card"
            beforeUpload={this.beforeUpload}
            showUploadList={false}
            name="image"
            // action="//openact.busi.inke.cn/upload/image_test"
            action={`${srcConfig.APIS.uploadRoot}upload/media`}
            onChange={this.handleChange}
            style={{ height: 160, width: 160, minWidth: 160, ...props.style }}
            customRequest={customRequest}
          >
            {imageUrl ? <img style={{ height: '120px', width: 'auto', ...props.imgStyle }} src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
        </div>
        <Modal
          visible={state.modalVisible}
          onCancel={this._closeModal}
          width={800}
          style={{ width: 800 }}
          footer={<Button type="primary" onClick={this._closeModal}>关闭</Button>}
        >
          <div style={{ padding: 20, textAlign: 'center' }}>
            <img src={props.value} style={{ width: 'auto', maxWidth: '100%', height: 'auto' }} alt=""/>
          </div>
        </Modal>
      </>
    )
  }
}
