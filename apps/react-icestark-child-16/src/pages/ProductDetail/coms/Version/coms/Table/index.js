import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Modal, Pagination, Tooltip } from 'antd';
import $common from 'utils/common';
import { DETAIL, UPDATE, PUBLISH, DISABLE, ROLLBACK, PUBLISH_MAP } from './../../constants/modalTypes';
import { formatDate } from './../../constants/timeFormat';
import { saveCreate, saveCreateParams, getTableList, publish } from './../../model/action';
import styles from './index.less';

const cx = $common.classnames('version-table', styles);
const { confirm } = Modal;
const pageSizeList = ['10', '20', '30', '40', '50', '100']
const DEFAULT_PAGE = 1;

class Tables extends React.PureComponent {
  state = {
    columns: [
      {
        title: '平台',
        dataIndex: 'app_platform',
      },
      {
        title: '版本',
        dataIndex: 'app_version',
      },
      {
        title: '描述',
        dataIndex: 'desc',
        width: 150,
        render: (val) => {
          return <Tooltip title={val} overlayStyle={{ maxWidth: '30%' }}>
            <div style={style.ellipsisLine}>{val}</div>
          </Tooltip>
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (...args) => {
          const [text, record, index] = args
          const { status_class: statusClass } = record
          return <span className={statusClass}>{text}</span>
        }
      },
      {
        title: '下载地址',
        dataIndex: 'download_url',
        render: text => (<a href={text}>下载链接</a>)
      },
      {
        title: '上传时间',
        dataIndex: 'create_time',
        render: text => formatDate(text)
      },
      {
        title: '发布时间',
        dataIndex: 'publish_time',
        render: text => formatDate(text)
      },
      {
        title: '操作人',
        dataIndex: 'operator',
      },
      {
        title: '操作',
        dataIndex: 'button_type',
        width: 180,
        render: (...args) => {
          const [text, record, index] = args
          return this.renderButton(text, record)
        }
      },
    ]
  }

  renderButton = (type, record) => {
    const btnObj = {
      [PUBLISH]: <div className={cx('operate')}>
        <Button
          type="primary"
          onClick={() => this.handelUpdate(record)}
        >
          编辑
        </Button>
        <Button
          className="ml10"
          type="primary"
          onClick={() => this.handelPublish(type, record)}
        >
        发布
        </Button>
      </div>,
      [DISABLE]: <div className={cx('operate')}>
        <Button
          type="primary"
          disabled
        >
        编辑
        </Button>
      </div>,
      [ROLLBACK]: <div className={cx('operate')}>
        <Button
          type="primary"
          onClick={() => this.handelUpdate(record)}
        >
        编辑
        </Button>
        <Button
          className="ml10"
          type="primary"
          onClick={() => this.handelPublish(type, record)}
        >
        回滚
        </Button>
      </div>,
    }
    return btnObj[type]
  }

  handelUpdate = rows => {
    const { dispatch } = this.props;
    const { cv, desc, download_url: downloadUrl, qrcode_url: qrcodeUrl } = rows;
    const params = {
      cv,
      desc,
      download_url: downloadUrl,
      qrcode_url: qrcodeUrl,
    };
    dispatch(saveCreateParams(params));
    dispatch(saveCreate({ show: true, title: '版本修改', type: UPDATE }));
  }

  handelPublish= (action, rows) => {
    confirm({
      title: `确认${PUBLISH_MAP[action]}？`,
      onOk: () => {
        const { dispatch, appKey } = this.props;
        const { cv } = rows;
        const param = {
          cv,
          app_key: appKey,
          action,
        };
        dispatch(publish(param));
      },
      onCancel: () => {
        console.log('取消');
      },
    });
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
          rowKey={record => record.id}
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
  store: stores.busiVersion,
}))(Tables);
