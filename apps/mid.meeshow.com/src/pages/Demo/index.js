import React from 'react'
import UploadAvatar from 'components/UploadAvatar'

export default
function (props) {
  const onChange = e => {
    console.log(e)
  }
  return <>
    <UploadAvatar
      onChange={onChange}
      limitSize={1024 * 1024 * 2}
      // dimensionValidator={({width, height}) => {
      //   return new Promise((resolve, reject) => {
      //     if (width !== height) {
      //       reject(new Error('请上传正方形图片'))
      //     } else {
      //       resolve()
      //     }
      //   })
      // }}
    />
  </>
}
