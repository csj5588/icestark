import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import $common from 'utils/common';
import _isEmpty from 'lodash/isEmpty';
import {
  saveCreate,
  saveCreateParams,
} from './../../model/action';
import { UPDATE } from '../../constants/modalTypes'
import styles from './index.less';

const cx = $common.classnames('table', styles);

class Tables extends React.PureComponent {
  state = {
    columns: [
      {
        title: '事件名',
        dataIndex: 'ev',
      },
      {
        title: '转发URI',
        dataIndex: 'uri',
      },
      {
        title: '业务方集群',
        dataIndex: 'dc',
      },
      {
        title: '服务发现名',
        dataIndex: 'service_name',
      },
      {
        title: '超时时长(ms)',
        dataIndex: 'read_timeout',
      },
      {
        title: 'endpoints',
        dataIndex: 'endpoints',
      },
    ],
  };

  handelUpdate = (rows) => {
    const { dispatch } = this.props;
    const { id, buzConfig, usage_cluster: usageCluster } = rows;
    const params = {
      id,
      buz_config: buzConfig,
      usage_cluster: usageCluster,
    };
    dispatch(saveCreateParams(params));
    dispatch(saveCreate({ show: true, title: '编辑配置', type: UPDATE }));
  };

  render() {
    const { columns } = this.state;
    const { store } = this.props;
    const {
      table: { data },
    } = store;
    return (
      <div className={cx('root')}>
        {!_isEmpty(data) ? (
          <div>
            {data.map((item) => (
              <div className="box">
                <div className="long-header">
                  <div className="title-text">
                    长链接集群: <span>{item.usage_cluster}</span>
                  </div>
                  <div className="title-text">
                    {Object.keys(item.usageConfig).map((key) => (
                      <span>
                        {key}: {item.usageConfig[key]}
                      </span>
                    ))}
                  </div>
                  <div className="long-header">
                    <Button
                      type="primary"
                      className="ml10 mr10"
                      onClick={() => this.handelUpdate(item)}
                    >
                      编辑
                    </Button>
                  </div>
                </div>
                <Table
                  className="table"
                  dataSource={item.buzConfig}
                  columns={columns}
                  rowKey="ev"
                  pagination={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="title-text">暂无数据，请发起工单</div>
        )}
      </div>
    );
  }
}

export default connect((stores) => ({
  store: stores.longLink,
}))(Tables);
