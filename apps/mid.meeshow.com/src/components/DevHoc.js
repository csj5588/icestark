import React from 'react'
import srcConfig from 'src/config'

export default function DevHoc (Component) {
  return srcConfig.IS_DEV ? Component : null
}
