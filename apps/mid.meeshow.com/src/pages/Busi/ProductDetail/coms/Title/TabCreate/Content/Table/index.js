import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Modal, Pagination, Tooltip } from 'antd';
import $common from 'utils/common';
import { saveCreate, del, saveCreateParams, getTableList } from '../../../../../model/action';
import styles from './index.less';

const cx = $common.classnames('table', styles);
const { confirm } = Modal;
const pageSizeList = ['10', '20', '30', '40', '50', '100']
const DEFAULT_PAGE = 1;

class Tables extends React.PureComponent {
  state = {
    columns: [
      {
        title: '操作类型',
        dataIndex: 'op_type',
      },
      {
        title: '原始数据',
        dataIndex: 'org_data',
        width: 150,
        render: (val) => {
          return <Tooltip title={val} overlayStyle={{ maxWidth: '40%' }}>
            <div style={style.ellipsisLine}>{val}</div>
          </Tooltip>
        }
      },
      {
        title: '修改后的数据',
        dataIndex: 'dst_data',
        width: 150,
        render: (val) => {
          return <Tooltip title={val} overlayStyle={{ maxWidth: '40%' }}>
            <div style={style.ellipsisLine}>{val}</div>
          </Tooltip>
        }
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
      },
    ]
  }

  handlePageChange = (page, limit) => {
    const { dispatch } = this.props;
    const params = {
      page,
      limit,
    };
    dispatch(getTableList(params));
  }

  handleSizeChange = (page, limit) => {
    const { dispatch } = this.props;
    const params = {
      page: DEFAULT_PAGE,
      limit,
    };
    dispatch(getTableList(params));
  }

  render () {
    const { columns } = this.state;
    const { store } = this.props;
    const {
      table: {
        data,
        total
      },
      searchParams: {
        page,
        limit,
      }
    } = store;
    return (
      <div className={cx('root')}>
        <Table
          className="table"
          dataSource={data}
          columns={columns}
          rowKey={record => record.op_type}
          pagination={false}
        />

        <Pagination
          className={cx('pagination')}
          total={total}
          showTotal={num => `共 ${num} 条`}
          current={page}
          defaultCurrent={page}
          pageSize={limit}
          pageSizeOptions={pageSizeList}
          showSizeChanger
          onChange={this.handlePageChange}
          onShowSizeChange={this.handleSizeChange}
          showQuickJumper
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
  store: stores.productDetail,
  curApp: stores.authApp.curApp
}))(Tables);
