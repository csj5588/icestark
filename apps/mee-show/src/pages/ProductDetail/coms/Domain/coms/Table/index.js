import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import $common from 'utils/common';
import { USE, UPDATE } from '../../constants/modalTypes';
import { formatDate } from '../../constants/timeFormat';
import { saveCreate, saveCreateParams, getTableList } from '../../model/action';
import styles from './index.less';

const cx = $common.classnames('table', styles);
const DEFAULT_PAGE = 1;

class Tables extends React.PureComponent {
    columns = [
      {
        title: '域名',
        dataIndex: 'domain',
      },
      {
        title: '域名使用方',
        dataIndex: 'item.label',
      },
      {
        title: '用途',
        dataIndex: 'use',
        render: text => USE[text]
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

  handelUpdate = rows => {
    const { dispatch } = this.props;
    const { domain, proto, env, usage, desc, use } = rows;
    const params = {
      domain,
      proto,
      env,
      usage,
      desc,
      use
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
    const { store } = this.props;
    const {
      table: {
        data
      },
    } = store;
    return (
      <div className={cx('root')}>
        <Table
          className="table"
          dataSource={data}
          columns={this.columns}
          rowKey={record => record.domain}
          pagination={false}
        />
      </div>
    )
  }
}

export default connect(stores => ({
  store: stores.busiDomain,
}))(Tables);
