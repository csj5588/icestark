import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Modal } from 'antd';
import $common from 'utils/common';
import _isEmpty from 'lodash/isEmpty';
import Ellipsis from 'components/Ellipsis';
import { getTableList } from './../../model/action';
import styles from './index.less';

const cx = $common.classnames('buried-table', styles);
const { confirm } = Modal;
const pageSizeList = ['10', '20', '30', '40', '50', '100'];
const DEFAULT_PAGE = 1;

class Tables extends React.PureComponent {
  state = {
    columns: [
      {
        title: '埋点域名',
        dataIndex: 'host',
      },
      {
        title: '用途',
        dataIndex: 'comment',
      },
      {
        title: '公钥证书',
        dataIndex: 'cert_public_key_url',
        render: (text) => (<Ellipsis key="title" className="wide" width={200}>
          {text}
        </Ellipsis>)
      },
      {
        title: '私钥证书',
        dataIndex: 'cert_private_key_url',
        render: (text) => (<Ellipsis key="title" className="wide" width={200}>
          {text}
        </Ellipsis>)
      },
    ],
  };

  handlePageChange = (page, limit) => {
    const { dispatch } = this.props;
    const params = {
      page,
      limit,
    };
    dispatch(getTableList(params));
  };

  handleSizeChange = (page, limit) => {
    const { dispatch } = this.props;
    const params = {
      page: DEFAULT_PAGE,
      limit,
    };
    dispatch(getTableList(params));
  };

  render() {
    const { columns } = this.state;
    const { store } = this.props;
    const {
      table: { data },
      createParams: { service_config: serviceConfig },
      usage,
    } = store;
    const {
      app_name: appName,
      comment,
      cv_prefix: cvPrefix,
      is_replication: isReplication,
      replicate_from: replicateFrom,
    } = serviceConfig || {};
    return (
      <div className={cx('root')}>
        {!_isEmpty(usage) ? (
          <div>
            <div className="box">
              <Row>
                <div className="title-text">客户端埋点配置</div>
                {Object.keys(usage).map((key) => (
                  <Col className="col-text" span={12}>
                    {`${key}: ${usage[key]}`}
                  </Col>
                ))}
              </Row>
            </div>
            <div className="box">
              <Row title="service_confignfig">
                <div className="title-text">产品配置</div>
                <Col span={8} className="col-text">
                  {`app_name: ${appName}`}
                </Col>
                <Col span={8} className="col-text">
                  {`应用名称: ${comment}`}
                </Col>
                <Col span={8} className="col-text">{`CV前缀: ${cvPrefix}`}</Col>
                <Col span={8} className="col-text">
                  {`是否是马甲包: ${isReplication ? '是' : '否'}`}
                </Col>
                {isReplication && (
                  <Col span={8} className="col-text">
                    {`马甲包app_name: ${replicateFrom}`}
                  </Col>
                )}
              </Row>
            </div>
            <div className="box">
              <div className="title-text">域名配置</div>
              <Table
                className="table"
                dataSource={data}
                columns={columns}
                rowKey={(record) => record.id}
                pagination={false}
              />
            </div>
          </div>
        ) : (<div className="title-text">暂无数据，请发起工单</div>)}
      </div>
    );
  }
}

const style = {
  ellipsisLine: {
    maxWidth: 150,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
  },
};

export default connect((stores) => ({
  store: stores.buried,
}))(Tables);
