import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Modal, Pagination } from 'antd';
import $common from 'utils/common';
import { DETAIL, UPDATE } from './../../constants/modalTypes';
import { timeToMoment } from './../../constants/timeFormat';
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
        title: 'UID',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
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
                onClick={() => this.handelDetail(record)}
              >
                查看
              </Button>
              <Button
                className="ml10"
                type="primary"
                onClick={() => this.handelUpdate(record)}
              >
                修改
              </Button>
              <Button
                className="ml10"
                type="danger"
                onClick={() => this.handelDelete(record)}
              >
                删除
              </Button>
            </div>
          )
        }
      },
    ]
  }

  handelUpdate = rows => {
    const { dispatch } = this.props;
    const { date, form2 } = rows;
    const params = {
      ...rows,
      date: timeToMoment(date),
      form2: form2.split(','),
    };
    dispatch(saveCreateParams(params));
    dispatch(saveCreate({ show: true, title: '修改', type: UPDATE }));
  }

  handelDelete = rows => {
    confirm({
      title: '确认删除？',
      onOk: () => {
        const { dispatch } = this.props;
        const param = {
          id: rows.id,
        };
        dispatch(del(param));
      },
      onCancel: () => {
        console.log('取消');
      },
    });
  }

  handelDetail = rows => {
    const { dispatch } = this.props;
    const { date, form2 } = rows;
    const params = {
      ...rows,
      date: timeToMoment(date),
      form2: form2.split(','),
    };
    dispatch(saveCreateParams(params));
    dispatch(saveCreate({ show: true, title: '详情', type: DETAIL }));
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
  store: stores.materials,
}))(Tables);
