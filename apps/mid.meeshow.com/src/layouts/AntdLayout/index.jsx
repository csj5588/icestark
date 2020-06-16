import React from 'react'
import { Layout } from 'antd'
import { withRouter } from 'react-router'
import SwitchPage from 'components/SwitchPage'
import MHeader from './components/Header'
import MSidebar from './components/Sidebar'
import MBreadcrumb from './components/Breadcrumb'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'src/store/action'
import S from './apis'
import MainRouter from './MainRouter'
// import loading from 'components/loading';

// 所有的APP
import allAppList from 'src/config/appList';
import Cookie from 'utils/cookies'
import './index.scss'
import config from 'src/config'
import { getDataAuth } from 'entry/apis'

const saveAppKey = 'cur-auth-app'
const { Content, Footer } = Layout

const mapDispatchToProps = (dispatch, props) => ({
  actions: bindActionCreators(actions, dispatch)
})

const ALL_AUTH = { appid: 'all', name: '全部' }

const ALL = 'all' // 全部app权限

export default
@withRouter
@connect()
@connect(state => ({
  appToken: state.authApp.curApp,
  authApp: state.authApp,
}), mapDispatchToProps)
class AntdLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      dataAuthComplete: false,
      appListOptions: [],
      defaultApp: 'haokan',
      switchPageShow: true,
    }
  }

  componentWillReceiveProps(newProps) {
    const { appToken: newData } = newProps;
    const { appToken: oldData } = this.props;
    if (oldData && newData !== oldData) {
      this.switchPage();
    }
  }

  switchPage = () => {
    this.setState({ switchPageShow: false });
    setTimeout(() => {
      this.setState({ switchPageShow: true });
    }, 200);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  componentWillMount () {
    this.getDataAuth()
  }

  getDataAuth () {
    const { dispatch } = this.props

    getDataAuth({})
      .then(async ({ data }) => {
        // if (!data || !data.data_power_tree || !data.data_power_tree.data_power) return
        // console.log(data.data_power_tree)÷
        const { data: appList } = await S.getAppList()
        const dataAuth = data.data_power_tree.data_power
        const { apps = [] } = dataAuth
        const appListOptions = (apps.includes(ALL)) ? appList : appList.filter(item => (apps.indexOf(item.appid) >= 0))
        const defaultApp = this.getDefaultApp(appList);
        Cookie.setItem(saveAppKey, defaultApp);
        this.setState({
          dataAuthComplete: true,
          defaultApp,
          appListOptions
        })
        const authList = [ALL_AUTH, ...appList]
        dispatch(actions.setAuthAppList({
          curApp: defaultApp,
          appList: appListOptions,
          authList,
        }))
      })
  }

  handleChangeApp = (app) => {
    const { dispatch } = this.props
    Cookie.setItem(saveAppKey, app);
    dispatch(actions.setAuthCurApp({
      curApp: app
    }))
  }
  // 设置select 默认选中的app
  getDefaultApp(list) {
    let app = Cookie.getItem(saveAppKey)
    if (list.findIndex(x => x.appid === app) !== -1) {
      return app
    }
    return list[0] && list[0].appid
  }

  render () {
    const { collapsed, dataAuthComplete, switchPageShow } = this.state
    const { authApp: { curApp, appList } } = this.props
    return (
      <Layout>
        <MSidebar
          style={{ position: 'fixed', zIndex: 999, height: '100vh', overflowY: collapsed ? 'initial' : 'auto', paddingBottom: '24px' }}
          collapsed={collapsed}
        />
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          {
            dataAuthComplete && <MHeader
              collapsed={collapsed}
              toggle={this.toggle}
              appListOptions={appList}
              handleChangeApp={this.handleChangeApp.bind(this)}
              defaultApp={curApp} />
          }
          <Layout>
            <MBreadcrumb />
            { switchPageShow ? <Content
              style={{
                margin: '12px 16px 24px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
                overflow: 'auto'
              }}
            >
              {
                dataAuthComplete ? <MainRouter /> : <h1 style={{ color: '#ccc', textAlign: 'center', marginTop: '100px' }}>无权限查看</h1>
              }
            </Content> : <SwitchPage />
            }
            <Footer style={{
              textAlign: 'center',
              backgroundColor: '#fff',
              fontSize: 12,
              lineHeight: '20px',
              paddingTop: 12,
              paddingBottom: 12
            }}>
              {config.SYSTEM_CHINA_NAME} &copy; 2019 {config.SYSTEM_URL}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
