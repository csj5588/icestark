import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Table,
  Avatar,
  Form,
  Menu,
  Dropdown,
  Row,
  Col,
  Modal,
} from 'antd';
import $common from 'utils/common';
import $user from 'user';
import { saveCreate as saveCreateService } from '@/pages/Access/Service/model/action'
import { saveCreate as saveCreateDispather } from '@/pages/Access/Dispatcher/model/action'
import {
  saveCreate,
  saveCreateParams,
  saveCreatePro,
  saveCreateProParams,
  del,
  getTableList,
} from './../../model/action';
import {
  ADD,
  UPDATE,
  LOG,
  OFFLINE,
  BACK,
  TEXT_MAP,
  ACCESS_STATUS,
  ON_ACCESS,
  ROUTER,
  SERVICE,
  DISPATCHER,
  CONFIG
} from './../../constants/modalTypes';
import Create from './Create';
import TabCreate from './TabCreate';
import ProductCreate from './ProductCreate';
import styles from './index.less';

const ButtonGroup = Button.Group;
const cx = $common.classnames('product-detail-title', styles);
const DEFAULT_URL = 'https://img.ikstatic.cn/MTU5NDEwNzc4NzM0NSM1MzQjcG5n.png';

const { confirm } = Modal;
const PAGE = 1;
class Action extends React.Component {
  menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => this.handleMenu(LOG)}>日志</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => this.handleMenu(OFFLINE)}>下线</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => this.handleMenu(BACK)}>归档</div>
      </Menu.Item>
    </Menu>
  );

  columns = [
    {
      title: '平台',
      dataIndex: 'platform',
    },
    {
      title: '已发布',
      dataIndex: 'version',
    },
    {
      title: '提示',
      dataIndex: 'status',
      render: (...args) => {
        const [text, record, index] = args;
        const { status_class: statusClass } = record;
        return <span className={statusClass}>{text}</span>;
      },
    },
  ];

  columnsServer = [
    {
      title: '服务对接',
      dataIndex: 'function_name',
    },
    {
      title: '接入状态',
      dataIndex: 'state',
      render: (text) => ACCESS_STATUS[text],
    },
    {
      title: '操作',
      dataIndex: 'oprate',
      render: (...args) => {
        const [text, record, index] = args;
        const { name, state, function_key: functionKey } = record;
        const toPath = ROUTER[functionKey]
        return (
          <Link
            className="btn"
            key={functionKey}
            to={toPath}
            type="primary"
          >
            {state === ON_ACCESS ? '查看详情' : '一键接入'}
          </Link>
        );
      },
    },
  ];


  handleMenu = (key) => {
    const { store, dispatch, curApp } = this.props;
    const {
      infoData: {
        info: { app_key: appKey },
      },
    } = store;
    const param = {
      app_key: appKey,
      del_level: key,
    };
    const paramLog = {
      ...param,
      page: PAGE,
    };
    switch (key) {
      case LOG:
        dispatch(getTableList(paramLog));
        break;
      case OFFLINE:
        confirm({
          title: `确认${TEXT_MAP[key]}？`,
          onOk: () => {
            dispatch(del(param));
          },
          onCancel: () => {
            console.log('取消');
          },
        });
        break;
      case BACK:
        confirm({
          title: `确认${TEXT_MAP[key]}？`,
          onOk: () => {
            dispatch(del(param));
            dispatch(push('/product'));
          },
          onCancel: () => {
            console.log('取消');
          },
        });
        break;
      default:
        break;
    }
  };

  handelUpdata = () => {
    const { store, dispatch } = this.props;
    const {
      infoData: { info = {} },
    } = store;
    dispatch(saveCreateProParams({ ...info }));
    dispatch(saveCreatePro({ show: true, title: '产品编辑', type: UPDATE }));
  };

  handelCreate = () => {
    const { dispatch } = this.props;
    const { department } = $user.get();
    dispatch(saveCreateParams({ department }));
    dispatch(saveCreate({ show: true, title: '加入申请', type: ADD }));
  };

  handelAdd = () => {
    const { dispatch } = this.props;
    dispatch(saveCreatePro({ show: true, title: '产品新增', type: ADD }));
  };

  render() {
    const { store } = this.props;
    const {
      infoData: {
        info: {
          app_key: appKey,
          app_name: appName,
          website,
          launch_date: launchDate,
          contact_person: contactPerson,
          desc,
          icon,
        },
        app_status: appStatus,
      },
      accessList,
    } = store;
    return (
      <div className={cx('root')}>
        <div className="mb20 addBtn">
          <Button type="primary" icon="plus" onClick={this.handelAdd}>
            新增产品
          </Button>
        </div>
        <div className="top">
          <Avatar size="large" src={icon || DEFAULT_URL} />
          <div className="text">{appName}</div>
          <div>
            <ButtonGroup>
              <Button onClick={this.handelUpdata}>编辑</Button>
              <Button onClick={this.handelCreate}>申请加入</Button>
              <Dropdown overlay={this.menu} trigger={['click']}>
                <Button icon="ellipsis"></Button>
              </Dropdown>
            </ButtonGroup>
          </div>
        </div>
        <Row>
          <Col span={7}>
            <Row>
              <Col className="mt20">对接人：{contactPerson}</Col>
              <Col className="mt20">app_key: {appKey}</Col>
            </Row>
          </Col>
          <Col span={11}>
            <Row>
              <Col className="ellipsis mt20">产品说明：{desc}</Col>
              <Col className="mt20">
                官网： 
                <a href={website} target="_blank">
                  {website}
                </a>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Col className="mt20">上线日期：{launchDate}</Col>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Table
              className="mt20"
              dataSource={appStatus}
              columns={this.columns}
              rowKey={(record) => record.platform}
              pagination={false}
            />
          </Col>
          <Col span={12}>
            <Table
              className="mt20"
              dataSource={accessList}
              columns={this.columnsServer}
              rowKey={(record) => record.function_name}
              pagination={false}
            />
          </Col>
        </Row>
        <Create appKey={appKey} />
        <TabCreate />
        <ProductCreate />
      </div>
    );
  }
}

export default compose(
  connect((stores) => ({
    store: stores.productDetail,
  })),
  Form.create()
)(Action);
