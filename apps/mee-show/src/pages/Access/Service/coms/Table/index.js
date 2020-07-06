import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Modal, Pagination, Switch } from 'antd';
import $common from 'utils/common';
import Ellipsis from 'components/Ellipsis';
import { UPDATE } from './../../constants/modalTypes';
import {
  saveCreate,
  del,
  saveCreateParams,
  getTableList,
  recover,
  serviceEnable,
} from './../../model/action';
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
        title: 'title',
        dataIndex: 'key_info.app_key',
        key: 'key_info.app_key',
        width: 300,
        render: (text, record) => {
          const {
            uri_info: uriInfo
          } = record;
          const [first = {}, ...other] = uriInfo || []
          const { desc } = first
          return [
            <Ellipsis key="title" className="wide" width={200}>
              {desc}
            </Ellipsis>,
            <Ellipsis key="desc" width={200}>
              {text}
            </Ellipsis>,
          ];
        },
      },
      {
        title: 'Key',
        dataIndex: 'key_info.key',
        key: 'key_info.key',
      },
      {
        title: 'Domains',
        dataIndex: 'uri_info',
        key: 'uri_info',
        render: (text, record) => {
          const {
            uri_info: uriInfo = [],
            key_info: { id: key },
          } = record;
          const { store: { table: { config } } } = this.props
          const { domains = [] } = config
          return (
            <div className={cx('domains')}>
              {uriInfo &&
                uriInfo.map((x, i) => {
                  const firstDomain = domains.find(y => y.id === x.domain_id)
                  const { proto, key } = firstDomain || {}
                  return (
                    <div className="line" key={i}>
                      <Switch
                        checked={!!x.switch}
                        onChange={(val) =>
                          this.handleEnable(val, x.key, x.env)
                        }
                      />
                      <span className="label">{x.env}</span>
                      <Ellipsis width={250}>{`${proto}://${key}${x.uri}`}</Ellipsis>
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
                编辑
              </Button>
            </div>
          );
        },
      },
    ],
  };

  handleEnable = (val, key, env) => {
    const { dispatch } = this.props;
    const params = {
      key,
      env,
      enable: val ? 1 : 0,
    };
    dispatch(serviceEnable(params));
  };

  handelUpdate = (rows) => {
    const { dispatch } = this.props;
    const { key_info: { id }, uri_info: uriInfo } = rows;
    const [firstInfo = {}, ...otr] = uriInfo || [];
    const { usages, key, contact_person: contactPerson, desc } = firstInfo;
    const domainUri = uriInfo.map((item) => ({
      domain_id: item.domain_id,
      uri: item.uri,
      is_add: false,
      env: item.env,
      id: item.id,
    }));
    const params = {
      id,
      key,
      domain_uris: domainUri,
      contact_person: contactPerson,
      usages: usages ? JSON.parse(usages) : [],
      desc: desc,
    };
    dispatch(saveCreateParams(params));
    dispatch(saveCreate({ show: true, title: '修改', type: UPDATE }));
  };

  handelDelete = (rows) => {
    confirm({
      title: '确认删除？',
      onOk: () => {
        const { dispatch } = this.props;
        const param = {
          key: rows.key,
        };
        dispatch(del(param));
      },
      onCancel: () => {
        console.log('取消');
      },
    });
  };

  handelRecover = (rows) => {
    confirm({
      title: '确认恢复？',
      onOk: () => {
        const { dispatch } = this.props;
        const param = {
          key: rows.key,
        };
        dispatch(recover(param));
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
          rowKey={(record) => record.idx}
          pagination={false}
          // showHeader={false}
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
  store: stores.service,
}))(Tables);
