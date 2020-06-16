import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Modal, Pagination } from 'antd';
import $common from 'utils/common';
import { DETAIL, UPDATE } from './../../constants/modalTypes';
import { timeToMoment } from './../../constants/timeFormat';
import { saveCreate, del, saveCreateParams, getTableList } from './../../model/action';
import styles from './index.less';

const cx = $common.classnames('apply-table', styles);
const { confirm } = Modal;
const pageSizeList = ['10', '20', '30', '40', '50', '100']
const DEFAULT_PAGE = 1;

class Tables extends React.PureComponent {
  state = {
    columns: [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
          return (
            <div className={cx('title')}>
              <div className="info">
                <div>
                  <span className="weight">{record.name}</span>
                  申请加入
                  <span className="weight">{record.app_name}</span>
                </div>
                <nobr>{record.email}</nobr>
              </div>
            </div>
          );
        }
      },
      {
        title: '申请说明',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: 300,
        render: (...args) => {
          const [text, record, index] = args
          return (
            <div className={cx('operate')}>
              <Button
                className="ml10"
                type="primary"
                onClick={() => this.handelUpdate(record)}
              >
                分配权限
              </Button>
              <Button
                className="ml10"
                type="danger"
                onClick={() => this.handelDelete(record)}
              >
                拒绝
              </Button>
            </div>
          )
        }
      },
    ]
  }

  handelUpdate = rows => {
    const { dispatch } = this.props;
    const params = {
      ...rows,
      username: rows.name,
    }
    delete params.status;
    delete params.name;
    dispatch(saveCreateParams(params));
    dispatch(saveCreate({ show: true, title: '新增', type: UPDATE }));
  }

  handelDelete = rows => {
    confirm({
      title: '确认拒绝？',
      onOk: () => {
        const { dispatch } = this.props;
        const param = {
          id: rows.id,
          action: 'refuse',
        };
        dispatch(del(param));
      },
      onCancel: () => {
        console.log('取消');
      },
    });
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
          rowKey={record => record.id}
          pagination={false}
          showHeader={false}
        />

        <Pagination
          className={cx('pagination')}
          total={0}
          current={1}
          defaultCurrent={1}
          pageSize={10}
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
  store: stores.apply,
}))(Tables);
