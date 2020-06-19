import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Table, Modal, Pagination, Switch, Tooltip } from 'antd';
import $common from 'utils/common';
import Ellipsis from 'components/Ellipsis';
import { UN_USE, USEING } from '../../constants/modalTypes'
import { update, getTableList, del } from './../../model/action';
import styles from './index.less';

const cx = $common.classnames('component-service-table', styles);
const { confirm } = Modal;
const pageSizeList = ['10', '20', '30', '40', '50', '100'];
const DEFAULT_PAGE = 1;
const DELETE_GBK = '已删除';

class Tables extends React.PureComponent {
  state = {
    columns: [
      {
        title: '使用方',
        dataIndex: 'ev_info.app_key',
      },
      {
        title: 'ev_name',
        dataIndex: 'ev_info.ev_name',
      },
      {
        title: '事件说明',
        dataIndex: 'ev_info.ev_desc',
        ellipsis: true,
        render: (text) => (
          <Tooltip placement="top" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '环境',
        dataIndex: 'domains',
        key: 'domains',
        render: (text, record) => {
          const { env_details: envDetails, ev_info: evInfo } = record;
          const { id: evId } = evInfo || {}
          return (
            <div className={cx('domains')}>
              {envDetails &&
                envDetails.map((x, i) => {
                  return (
                    <div className="line" key={i}>
                      <Switch
                        className='mr10'
                        checked={x.status === USEING}
                        onChange={(val) =>
                          this.handleEnable(evId, x.id, val)
                        }
                      />
                      <Ellipsis width={300}>{x.env}</Ellipsis>
                    </div>
                  );
                })}
            </div>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (...args) => {
          const [text, record, index] = args;
          const { item = {} } = record;
          return (
            <div className={cx('operate')}>
              <Button
                className="ml10"
                type="primary"
                onClick={() => this.handelUpdate(record)}
              >
                详情
              </Button>
              <Button
                className="ml10"
                type="danger"
                onClick={() => this.handelDelete(record)}
              >
                删除
              </Button>
            </div>
          );
        },
      },
    ],
  };

  handleEnable = (evId, id, status) => {
    const { dispatch } = this.props;
    const params = {
      ev_id: evId,
      id,
      status: status ? USEING : UN_USE,
    }
    dispatch(update(params));
  }

  handelUpdate = (rows) => {
    const { dispatch } = this.props;
    const { ev_info: { id } } = rows;
    dispatch(push(`/access/dispatcherDetail?id=${id}`));
  };

  handelDelete = (rows) => {
    const { ev_info: { id } } = rows;
    confirm({
      title: '确认删除？',
      onOk: () => {
        const { dispatch } = this.props;
        const param = {
          ev_id: id,
        };
        dispatch(del(param));
      },
      onCancel: () => {
        console.log('取消');
      },
    });
  };

  handlePageChange = (page, count) => {
    const { dispatch } = this.props;
    const params = {
      page,
      count,
    };
    dispatch(getTableList(params));
  };

  handleSizeChange = (page, count) => {
    const { dispatch } = this.props;
    const params = {
      page: DEFAULT_PAGE,
      count,
    };
    dispatch(getTableList(params));
  };

  render() {
    const { columns } = this.state;
    const { store } = this.props;
    const {
      table: { data, total },
      searchParams: { page, count },
    } = store;
    return (
      <div className={cx('root')}>
        <Table
          className="table"
          dataSource={data}
          columns={columns}
          rowKey={(record) => record.ev_info && record.ev_info.id}
          pagination={false}
        />

        <Pagination
          className={cx('pagination')}
          total={total}
          showTotal={(num) => `共 ${num} 条`}
          current={page}
          defaultCurrent={page}
          pageSize={count}
          pageSizeOptions={pageSizeList}
          showSizeChanger
          onChange={this.handlePageChange}
          onShowSizeChange={this.handleSizeChange}
          showQuickJumper
        />
      </div>
    );
  }
}

export default connect((stores) => ({
  store: stores.dispatcher,
}))(Tables);
