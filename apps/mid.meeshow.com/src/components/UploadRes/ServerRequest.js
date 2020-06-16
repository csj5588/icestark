/**
 * 请求上传接口
 */

import axios from 'axios'

const instance = axios.create()

export default (opt) => {
  const { headers = {}, action, withCredentials = false, file, filename, data, onSuccess, onError, onProgress } = opt
  // console.log(opt)
  // instance.post(action, {
  return instance({
    url: action,
    method: 'post',
    headers,
    data,
    onUploadProgress (e) {
      onProgress && onProgress(e, file)
    },
    withCredentials
  }).then(res => {
    // console.log(res.data)
    onSuccess && onSuccess(res.data, file, res)
  }).catch(err => {
    console.log(err)
    onError && onError(err)
  })
}
