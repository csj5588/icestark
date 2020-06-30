import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Table, Modal, Pagination, Tooltip } from 'antd';
import $common from 'utils/common';
import { formatTime } from '../../constants/timeFormat';
import { getAllTableList } from '../../model/action';
import styles from './index.less';

const cx = $common.classnames('overview-all-table', styles);
const pageSizeList = ['10', '20', '30', '40', '50', '100']
const DEFAULT_PAGE = 1;

class Tables extends React.PureComponent {
  state = {
    columns: [
      {
        title: '产品线名称',
        dataIndex: 'app_key',
      },
      {
        title: '接入服务',
        dataIndex: 'function_name',
      },
      {
        title: '接入时间',
        dataIndex: 'create_time',
        render: text => formatTime(text)
      }
    ]
  }

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
    const { columns } = this.state;
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
          columns={columns}
          scroll={{ y: 500 }}
          rowKey={record => record.cv}
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
