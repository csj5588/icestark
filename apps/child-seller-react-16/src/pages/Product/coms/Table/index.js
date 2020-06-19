import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Table, Pagination } from 'antd';
import $common from 'utils/common';
import defaultLogo from 'assets/images/default-avatar.png';
import { DETAIL, UPDATE } from './../../constants/modalTypes';
import { ENV } from './../../constants/selectLists';
import { saveCreate, getTableList, getDetail } from './../../model/action';
import styles from './index.less';

const cx = $common.classnames('busi-product-table', styles);
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
          const { item = {} } = record;
          return (
            <div className={cx('title')}>
              <div className="logo">
                <img src={item.icon || defaultLogo} alt=""/>
              </div>
              <div className="info">
                <span>{item.title}</span>
                <nobr>{item.desc}</nobr>
              </div>
            </div>
          );
        }
      },
      {
        title: '对接人',
        dataIndex: 'operator',
        key: 'operator',
        render: (text, record) => {
          const { item = {} } = record;
          return <p className={cx('word')}>{item.label || ''}</p>;
        }
      },
      {
        title: '版本',
        dataIndex: 'version',
        key: 'version',
        render: (text, record) => {
          const { item = {} } = record;
          return [
            <p key="website" className={cx('noMargin')}>当前版本({<span className={cx('website')} onClick={() => this.openWebsite(item.website)}>官网</span>})</p>,
            <p key="tips" className={cx('noMargin')}>{item.version}{item.tips}</p>
          ];
        }
      },
      {
        title: 'env',
        dataIndex: 'env',
        key: 'env',
        render: (text, record) => {
          const { item = {} } = record;
          return (
            <div className={cx('check-group')}>
              {
                ENV.map(items => {
                  const isAct = item.env && item.env.some(x => x.key === items.value);
                  return (
                    <div
                      key={items.value}
                      className={`check ${isAct ? 'act' : ''}`}
                    >
                      {items.label}
                    </div>
                  )
                })
              }
            </div>
          )
        }
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
                详情
              </Button>
              <Button
                className="ml10"
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

  openWebsite = (web) => {
    window.open(web)
  }

  handelUpdate = rows => {
    const { dispatch } = this.props;
    // 请求详情
    dispatch(getDetail({ app_key: rows.key }));
    dispatch(saveCreate({ show: true, title: '修改', type: UPDATE }));
  }

  handelDetail = rows => {
    const { dispatch } = this.props;
    const { key } = rows
    // 跳转详情页
    dispatch(push(`/productDetail?app_key=${key}`));
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
    console.log('data', data);
    return (
      <div className={cx('root')}>
        <Table
          className="table"
          dataSource={data}
          columns={columns}
          rowKey={record => record.key}
          pagination={false}
          showHeader={false}
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

export default connect(stores => ({
  store: stores.product,
}))(Tables);
