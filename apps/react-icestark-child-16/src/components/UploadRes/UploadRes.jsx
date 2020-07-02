/**
 * 上传资源组件
 * 图片或者其他
 * ggf
  *
//图片上传demo
<UploadRes
  accept={'image/png, image/jpeg'}
  value = {[]} // 默认已有的值
  maxCount = {7} // 最多传几个
  limitSize = {1} // 内存大小控制
  // previewStyle = {{ width: '200px', height: '300px' }} // 预览框 样式 默认 100 * 100
  onChange = {(data) => {
    console.log('changeData', data);
  }}
/>

// zip包上传demo
<UploadRes
  fileExt = {['zip']}
  value = {[]}
  maxCount = {1}
  limitSize = {0}
  // previewStyle = {{ width: '200px', height: '300px' }}
  action = {'//upload.meelove.cn/api/v1/base/resource/media/upload?opt=sys_m4a'}
  onChange = {(data) => {
    console.log('changeData', data);
  }}
/>

// svga 上传
<UploadRes
  action={'//upload.meelove.cn/api/v1/base/resource/media/upload?sufix=svga&?opt=sys_m4a'}
  fileExt={['svga]}
  maxCount = {1}
  limitSize = {10}
  previewStyle = {{ width: '100px', height: '90px' }}
  onChange = {this.uploadHandle}
/>
  */

import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, message, Modal, Button } from 'antd'
import ServerRequest from './ServerRequest'
// https://github.com/forsigner/browser-md5-file
import Md5File from 'browser-md5-file';

import './UploadRes.scss'

const classPrefix = 'component-upload-res'

/**
 * 获取图片的宽高
 * param String url
 * return Object { width: 0, height: 0 }
 */
const getImgInfo = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = url;
    img.onload = function() {
      resolve({
        width: img.width,
        height: img.height
      });
      img = null;
    };
    img.onerror = function() {
      reject(new Error('图片加载失败'));
      img = null;
    }
  });
}

// 图片扩展名
const imgExtArr = ['png', 'jpg', 'gif', 'jpeg'];

export default class UploadResource extends React.Component {
  static propTypes = {
    fileExt: PropTypes.array,
    // 单个文件字符串 多个文件数组
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    maxCount: PropTypes.number,
    limitSize: PropTypes.number,
    onChange: PropTypes.func,
    accept: PropTypes.string,
    previewStyle: PropTypes.object,
    isDisabled: PropTypes.bool,
    action: PropTypes.string,
    responseDataUrlName: PropTypes.string,
  }

  static defaultProps = {
    fileExt: [], // 限制文件扩展名 默认不限制
    // value: [], // 默认值 这里定义要注释否则 ant 🈶️报错 https://github.com/ant-design/ant-design/issues/3976
    maxCount: 1, // 最多上传几个资源
    limitSize: 4, // 上传资源内存限制 默认 4M
    onChange: () => {},
    accept: '', // 文件类型 ， 默认图片
    previewStyle: { }, // 预览宽样式 宽高等设置
    isDisabled: false, // 只读模式
    responseDataUrlName: 'url', // 接口返回url字段 默认url 可自定义
    // 上传接口
    // action: '//upload.meelove.cn/api/v1/base/resource/image/upload?opt=sys_image',
    // 为了保持老数据 域名不一致问题 临时用这个老的接口
    action: '//api.imilive.cn/api/v1/base/resource/image/upload'
  }

  state = {
    fileList: [
      // {
      //   url: '',
      //   file: {}
      // }
    ],
    curUrl: '',
    isShowModal: false, // 展示预览弹窗
    imgInfo: null // 当前图片的 宽 高 存储
  }

  constructor(props) {
    super(props);
    const { value } = props;
  }

  // 判断是否是图片，如果图片 显示预览
  get isImg() {
    // 根据扩展名
    const ext = this.props.fileExt[0]
    if (ext && imgExtArr.indexOf(ext) >= 0) {
      return true;
    }
    // 根据 input accept='image/*'
    if (this.props.accept.indexOf('image') >= 0) {
      return true;
    }
    return false;
  }

  // 生命周期
  componentDidMount() {
    const { value } = this.props
    // console.log('componentDidMount', value)
    this.setDefaultValue(value);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    // console.log('componentWillReceiveProps', value)
    this.setDefaultValue(value);
  }

  setDefaultValue(value) {
    let fileList = [];
    let list = [];
    if (!value) {
      list = []
    } else if (typeof value === 'string') {
      list.push(value);
    } else {
      list = value;
    }
    fileList = list.map(one => {
      return {
        url: one,
        file: null
      }
    });
    // console.log('setValue', fileList)
    this.setState({
      fileList
    })
  }

  // 生命周期 文档介绍 https://juejin.im/post/5b6f1800f265da282d45a79a#heading-2
  /*
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState)
    const { value } = nextProps;
    const { fileList } = prevState;
    console.log('length is ', value.length, fileList.length);
    if (value.length === fileList.length) {
      value.forEach((one, index) => {
        console.log(index, one, fileList[index].url);
      })
      if (value.every((one, index) => one === fileList[index].url)) {
        return null;
      }
    }
    console.log('变化。。。。')
    const list = value.map(one => {
      return {
        url: one,
        file: null,
      }
    });
    prevState.fileList = list;
    return prevState
  }
  */

  /**
   * 接口上传
   * 接口基础服务袁伟康提供
   * 协议 https://wiki.inkept.cn/pages/viewpage.action?pageId=76128546
   */
  customRequest = (options) => {
    const { responseDataUrlName, headers } = this.props;
    const { file } = options;
    let reader = new FileReader();
    reader.readAsArrayBuffer(file); // 安字节读取文件并存储至二进制缓存区
    reader.onload = (e) => {
      let result = e.target.result;
      options.data = result;
      options.onSuccess = (result, file, res) => {
        if (result.dm_error !== 0) {
          message.error(result.error_msg)
          return;
        }
        let url = result.url || result.data.url
        const { fileList } = this.state;
        fileList.push({
          url: result[responseDataUrlName],
          file
        })
        this.setState({
          fileList
        }, this.handleChange.bind(this))
      }
      options.onError = (err) => {
        message.error(err.message)
      }
      if (headers) {
        options.headers = headers;
      }
      ServerRequest({
        ...options
      })
    }

    /*
    let formData = new FormData();
    formData.append('file', file); // image_0
    options.data = formData;
    options.onSuccess = (result, file, res) => {
      if (result.error_code !== 0 || !result.data) {
        message.error(result.message)
        return;
      }
      const { fileList } = this.state;
      fileList.push({
        url: result.data.image_0.url,
        file
      })
      this.setState({
        fileList
      }, this.handleChange.bind(this))
    }
    options.onError = () => {
      console.log('onError');
    }
    ServerRequest({
      ...options
    })
    */
  }

  handleChange = () => {
    const { value } = this.props;
    const { fileList } = this.state
    // console.log('fileList', fileList)
    const list = fileList.map(one => {
      return one.url
    })
    if (typeof value === 'string') {
      this.props.onChange(list[0] || '', fileList);
    } else {
      this.props.onChange(list, fileList);
    }
  }

  beforeUpload = (file) => {
    const { fileExt, limitSize } = this.props;
    const extName = file.name.split('.').pop();
    return new Promise((resolve, reject) => {
      if (fileExt.length && fileExt.indexOf(extName) === -1) {
        message.error(`文件类型限制 ${fileExt.join(',')}`);
        return reject(file);
      }
      if (limitSize && (file.size > limitSize * 1024 * 1024)) {
        message.error(`文件太大了, 限制 ${limitSize}M`);
        return reject(file);
      }
      // 如果文件是 zip, 计算 md5
      if (extName === 'zip') {
        const bmf = new Md5File();
        bmf.md5(
          file,
          (err, md5) => {
            console.log('md5 err:', err);
            // console.log('md5 string:', md5);
            file.md5_str = md5 || ''
            return resolve(file);
          },
          progress => {
            console.log('Md5File progress number:', progress);
          },
        );
      } else {
        return resolve(file);
      }
    })
  }

  // 删除
  handleDel = (index) => {
    const { fileList } = this.state;
    fileList.splice(index, 1);
    this.setState({
      fileList
    }, this.handleChange);
  }
  // 查看大图
  handleZoom = (index) => {
    const one = this.state.fileList[index];
    this.setState({
      curUrl: one.url,
      isShowModal: true
    });
    getImgInfo(one.url).then(res => {
      let imgInfo = {
        ...res,
        size: one.file && one.file.size
      };
      this.setState({
        imgInfo
      })
    }).catch(e => {
      console.log('catch e', e);
      this.setState({
        imgInfo: null
      })
    })
  }

  handleShow(index) {
    this.setState({
      isShowModal: true,
    });
  }
  handleClose = () => {
    this.setState({
      isShowModal: false
    })
  }

  render() {
    const { fileList, isShowModal, curUrl, imgInfo } = this.state;
    const { accept, limitSize = 4, maxCount, previewStyle, isDisabled, action } = this.props;
    const uploadProps = {
      accept,
      // action: '//openact.busi.inke.cn/upload/image_test',
      action: action, // '//api.imilive.cn/api/v1/base/resource/image/upload',
      beforeUpload: this.beforeUpload,
      showUploadList: false,
      listType: 'text',
      // onChange: this.onChange,
      customRequest: this.customRequest
    }

    const uploadBtn = <Upload { ...uploadProps } className='item upload-btn' >
      <div className='upload-btn-icon' style={{ ...previewStyle }}>
        <div><Icon type="plus" /></div>
        <div className='btn-text'>点击上传</div>
      </div>
    </Upload>
    return <div className={classPrefix}>
      <div className='flie-list'>
        {
          fileList.map((one, index) => {
            return <div className='item pic-main' style={{ ...previewStyle }} key={index}>
              {this.isImg ? <img className='image' src={one.url} alt='img'/> : <Icon type="file"/>}
              <span className='icon-con'>
                {!isDisabled && <Icon type="delete" className='icon-action' onClick={this.handleDel.bind(this, index)} />}
                {this.isImg && <Icon type="zoom-in" className='icon-action' onClick={this.handleZoom.bind(this, index)} />}
                <a href={one.url} target='_blank' className='icon-action'><Icon type="download" /></a>
              </span>
            </div>
          })
        }
        {
          fileList.length < maxCount ? uploadBtn : null
        }
      </div>

      <Modal visible={isShowModal} footer={null} onCancel={this.handleClose}>
        <div style={{ textAlign: 'center' }}>
          <img alt="example" style={{ maxWidth: '100%' }} src={curUrl} />
          {
            imgInfo ? <div style={{ marginTop: '20px' }}> 宽：{imgInfo.width} px， height：{imgInfo.height} px，
            size：{ Math.round(imgInfo.size * 10000 / (1024 * 1024)) / 10000 }M </div> : null
          }
        </div>

      </Modal>

    </div>
  }
}
