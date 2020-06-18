import axios from 'axios'

const instance = axios.create()

export default (params) => {
  const { headers = {}, action, withCredentials = false, file, filename, data, onSuccess, onError, onProgress } = params
  // instance.post(action, {
  instance({
    url: action,
    method: 'post',
    data: file,
    onUploadProgress (e) {
      onProgress && onProgress(e, file)
    },
    withCredentials
  }).then(res => {
    onSuccess && onSuccess(res.data, file, res)
  }).catch(err => {
    onError && onError(err)
  })
}
