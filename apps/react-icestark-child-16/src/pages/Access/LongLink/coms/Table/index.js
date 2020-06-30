import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Modal, Pagination } from 'antd';
import $common from 'utils/common';
import { DETAIL, UPDATE } from './../../constants/modalTypes';
import { formatDate } from './../../constants/timeFormat';
import { saveCreate, del, saveCreateParams, getTableList } from './../../model/action';
import styles from './index.less';

const cx = $common.classnames('table', styles);
const { confirm } = Modal;
const pageSizeList = ['10', '20', '30', '40', '50', '100']
const DEFAULT_PAGE = 1;

class Tables extends React.PureComponent {
  state = {
    columns: [
      {
        title: '域名',
        dataIndex: 'domain',
      },
      {
        title: '用途',
        dataIndex: 'item.label',
      },
      {
        title: '机房环境',
        dataIndex: 'item.env',
      },
      {
        title: '操作时间',
        dataIndex: 'item.update_time',
        render: text => formatDate(text)
      },
      {
        title: '操作人',
        dataIndex: 'item.operator',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: 100,
        render: (...args) => {
          const [text, record, index] = args
          return (
            <div className={cx('operate')}>
              <Button
                type="primary"
                onClick={() => this.handelUpdate(record)}
              >
                编辑
              </Button>
            </div>
          )
        }
      },
    ]
  }

  handelUpdate = rows => {
    const { dispatch } = this.props;
    const { domain, proto, env, usage, desc } = rows;
    const params = {
      domain,
      proto,
      env,
      usage,
      desc
    };
    dispatch(saveCreateParams(params));
    dispatch(saveCreate({ show: true, title: '域名编辑', type: UPDATE }));
  }

  handlePageChange = (page, size) => {
    const { dispatch } = this.props;
    const params = {
      page,
      size,
    };
    dispatch(getTableList(params));
  }

  handleSizeChange = (page, size) => {
    const { dispatch } = this.props;
    const params = {
      page: DEFAULT_PAGE,
      size,
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
        size,
      }
    } = store;
    return (
      <div className={cx('root')}>
        <Table
          className="table"
          dataSource={data}
          columns={columns}
          rowKey={record => record.domain}
          pagination={false}
        />
        <Pagination
          className={cx('pagination')}
          total={total}
          showTotal={num => `共 ${num} 条`}
          current={page}
          defaultCurrent={page}
          pageSize={size}
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

export default connect(stores => ({
  store: stores.longLink,
}))(Tables);
