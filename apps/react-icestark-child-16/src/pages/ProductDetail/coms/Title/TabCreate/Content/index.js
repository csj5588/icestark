import React from 'react';
import { Tabs } from 'antd';
import Table from './Table'
import { getTableList } from '../../../../model/action'
const { TabPane } = Tabs;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}
const PAGE = 1
class Content extends React.Component {
  handleTabChange = val => {
    const { dispatch } = this.props
    dispatch(getTableList({ tab_key: val, page: PAGE }))
  }

  render () {
    const { form, store } = this.props;
    const { tabList = [] } = store
    const hasData = tabList && tabList.length > 0
    return (
      <div>
        {hasData ? (<Tabs onChange={this.handleTabChange}>
          {tabList.map(item => (<TabPane tab={item.name} key={item.key}></TabPane>))}
        </Tabs>) : null }
        <Table />
      </div>
    )
  }
}

export default Content;
