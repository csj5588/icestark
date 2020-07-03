import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import $common from 'utils/common';
import { formatTime } from '../../constants/timeFormat';
import { ROUTER } from '../../constants/modalTypes'
import styles from './index.less';

const cx = $common.classnames('overview-table', styles);
const BASE_IMG = 'https://img.ikstatic.cn/MTU5MzQ5NjYzODUyOCM4NzcjcG5n.png'
class Tables extends React.PureComponent {
    columns = [
      {
        title: '产品线名称',
        dataIndex: 'app_name',
        render: (text, record) => {
          const { icon } = record;
          return (
            <div className={cx('app')}>
              <img src={icon || BASE_IMG} alt=""/>
              <div className="text">{text}</div>
            </div>
          )
        }
      },
      {
        title: '接入服务',
        dataIndex: 'function_name',
      },
      {
        title: '对接人',
        dataIndex: 'email',
      },
      {
        title: '当前版本（官网）',
        dataIndex: 'web_site',
        render: text => (
          <span className={cx('website')} onClick={() => this.openWebsite(text)}>{text}</span>
        )
      },
      {
        title: '环境',
        dataIndex: 'env',
        render: (text, record) => {
          const { envs = {} } = record;
          return (
            <div className={cx('check-group')}>
              {
                envs && envs.map(items => {
                  return (
                    <div
                      key={items.key}
                      className={`check ${items.enabled ? 'act' : ''}`}
                    >
                      {items.key}
                    </div>
                  )
                })
              }
            </div>
          )
        }
      },
      {
        title: '接入时间',
        dataIndex: 'create_time',
        render: text => formatTime(text)
      },
      {
        title: '操作',
        dataIndex: 'button_type',
        width: 180,
        render: (...args) => {
          const [text, record, index] = args
          const { function_key: functionKey } = record
          const pathRouter = ROUTER[functionKey]
          return (<div className={cx('operate')}>
            <Link
              className="btn"
              key={functionKey}
              to={pathRouter}
            >
              查看
            </Link>
          </div>)
        }
      },
    ]

  openWebsite = (web) => {
    window.open(web)
  }

  handelDetail= rows => {
    const { dispatch } = this.props
    const { function_name: functionName } = rows
    dispatch(push(ROUTER[functionName]));
  }

  render () {
    const { store } = this.props;
    const {
      table: {
        data,
      },
    } = store;
    return (
      <div className={cx('root')}>
        <div className='title'>我的接入概览</div>
        <Table
          className="table"
          dataSource={data || []}
          columns={this.columns}
          rowKey={record => record.function}
          pagination={false}
        />
      </div>
    )
  }
}

const style = {
  ellipsisLine: {
    maxWidth: 150,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'pointer'
  }
}

export default connect(stores => ({
  store: stores.overView,
}))(Tables);
