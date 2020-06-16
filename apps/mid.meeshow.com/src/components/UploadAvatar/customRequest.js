import axios from 'axios'

const instance = axios.create()

export default (params) => {
  const { headers = {}, action, withCredentials = false, file, filename, data, onSuccess, onError, onProgress } = params
  console.log(params)
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
    console.log(res.data)
    onSuccess && onSuccess(res.data, file, res)
  }).catch(err => {
    console.log(err)
    onError && onError(err)
  })
}
