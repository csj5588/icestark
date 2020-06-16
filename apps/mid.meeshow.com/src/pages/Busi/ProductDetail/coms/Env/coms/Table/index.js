import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Modal, Tooltip } from 'antd';
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
        title: '环境',
        dataIndex: 'env',
      },
      {
        title: '用途',
        dataIndex: 'desc',
        width: 150,
        render: (val) => {
          return <Tooltip title={val} overlayStyle={{ maxWidth: '40%' }}>
            <div style={style.ellipsisLine}>{val}</div>
          </Tooltip>
        }
      },
      {
        title: '机房',
        dataIndex: 'item.server_room',
      },
      {
        title: '内网域名',
        dataIndex: 'item.internal_domain',
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
              {/*
                <Button
                className="ml10"
                type="danger"
                onClick={() => this.handelDelete(record)}
              >
                下线
              </Button> */}
            </div>
          )
        }
      },
    ]
  }

  handelUpdate = rows => {
    const { dispatch } = this.props;
    const { env, server_room: serverRoom, desc } = rows;
    const params = {
      env,
      server_room: serverRoom,
      desc,
    };
    dispatch(saveCreateParams(params));
    dispatch(saveCreate({ show: true, title: '环境编辑', type: UPDATE }));
  }

  // handelDelete = rows => {
  //   confirm({
  //     title: '确认下线？',
  //     onOk: () => {
  //       const { dispatch, appKey } = this.props;
  //       const param = {
  //         env: rows.env,
  //         app_key: appKey,
  //       };
  //       dispatch(del(param));
  //     },
  //     onCancel: () => {
  //       console.log('取消');
  //     },
  //   });
  // }

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
      },
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
  store: stores.busiEnv,
}))(Tables);
