import srcConfig from 'src/config'
import { getRequestRoots } from 'service/utils'

const {getRoot, postRoot, postRootXForm} = getRequestRoots(srcConfig.APIS.root)

export const Demo = getRoot('api/oper/feedback/get', {}, {
  autoLoading: true
})
