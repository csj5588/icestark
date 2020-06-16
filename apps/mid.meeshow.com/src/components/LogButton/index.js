/**
 * 上报埋点用button
 * @author lizihan
 * @since 20190416
 */
import React from 'react'
import srcConfig from 'src/config'
import { Button } from 'antd'
import log from 'utils/log'
import _omit from 'lodash/omit'

export default function LogButton (props) {
  const { onClick = () => {}, btnId, btnName, requestParams } = props

  if (+srcConfig.AUTH_SYSTEM_ID !== -1 && !btnId) {
    throw new Error('缺少 btnId')
  }

  if (+srcConfig.AUTH_SYSTEM_ID !== -1 && !btnName) {
    throw new Error('缺少 btnName')
  }

  const click = (...args) => {
    if (+srcConfig.AUTH_SYSTEM_ID !== -1) {
      log.reportBtn({
        btnId,
        btnName,
        ...(requestParams ? { request_params: requestParams } : {})
      })
    }
    onClick(...args)
  }

  const btnProps = _omit(props, ['btnId', 'btnName', 'onClick', 'requestParams'])

  return <>
    <Button {...btnProps} onClick={click} />
  </>
}
