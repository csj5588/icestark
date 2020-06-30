import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Table, Modal, Pagination, Tooltip } from 'antd';
import $common from 'utils/common';
import { formatTime } from '../../constants/timeFormat';
import { ROUTER } from '../../constants/modalTypes'
import { getTableList } from '../../model/action';
import styles from './index.less';

const cx = $common.classnames('overview-table', styles);
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
      },
      {
        title: '操作',
        dataIndex: 'button_type',
        width: 180,
        render: (...args) => {
          const [text, record, index] = args
          return <div className={cx('operate')}>
            <Button
              type="primary"
              onClick={() => this.handelDetail(record)}
            >
              查看
            </Button>
          </div>
        }
      },
    ]
  }

  handelDetail= rows => {
    const { dispatch } = this.props
    const { function_name: functionName } = rows
    dispatch(push(ROUTER[functionName]));
  }

  render () {
    const { columns } = this.state;
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
          columns={columns}
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
