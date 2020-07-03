import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Table, Modal, Pagination, Tooltip } from 'antd';
import $common from 'utils/common';
import { formatTime } from '../../constants/timeFormat';
import { getAllTableList } from '../../model/action';
import styles from './index.less';

const cx = $common.classnames('overview-all-table', styles);
const DEFAULT_PAGE = 1;
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
      }
    ]

  handlePageChange = (pageToken, count) => {
    const { dispatch } = this.props;
    const params = {
      page_token: pageToken,
      count,
    };
    dispatch(getAllTableList(params));
  }

  handleSizeChange = (pageToken, count) => {
    const { dispatch } = this.props;
    const params = {
      page_token: DEFAULT_PAGE,
      count,
    };
    dispatch(getAllTableList(params));
  }

  render () {
    const { store } = this.props;
    const {
      allTable: {
        data,
      }
    } = store;
    return (
      <div className={cx('root')}>
        <div className='title'>全部接入概览</div>
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
