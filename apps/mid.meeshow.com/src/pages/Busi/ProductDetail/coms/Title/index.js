import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
import {
  saveCreate,
  saveCreateParams,
  saveCreatePro,
  saveCreateProParams,
  del,
  getTableList,
} from './../../model/action';
import { saveCreate as saveCreateService } from '../../../../Access/Service/model/action'
import { saveCreate as saveCreateDispather } from '../../../../Access/Dispatcher/model/action'
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
const DEFAULT_URL = 'http://img.ikstatic.cn/MTU4NzcxNzc5NTU1MiMzODkjanBn.jpg';

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
      dataIndex: 'name',
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
        const { name, state } = record;
        return (
          <Button size="small" onClick={() => this.handlePush(name, state)}>
            {state === ON_ACCESS ? '查看详情' : '一键接入'}
          </Button>
        );
      },
    },
  ];

  handlePush = (name, state) => {
    const { dispatch } = this.props;
    const routerObj = {
      [SERVICE]: () => {
        dispatch(push(ROUTER[name]));
        if (state !== ON_ACCESS) {
          setTimeout(() => {
            dispatch(saveCreateService({ show: true, title: '新增', type: ADD }))
          }, 500);
        }
      },
      [DISPATCHER]: () => {
        dispatch(push(ROUTER[name]));
        if (state !== ON_ACCESS) {
          setTimeout(() => {
            dispatch(saveCreateDispather({ show: true, title: '新增', type: ADD }))
          }, 500);
        }
      },
      [CONFIG]: () => {
        dispatch(push(ROUTER[name]));
        if (state === ON_ACCESS) {
          dispatch(push(ROUTER[name]));
        } else {
          dispatch(push(`/access/config?show=1`));
        }
      },
    }
    routerObj[name]()
  }

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

  handelBack = () => {
    const { dispatch } = this.props;
    dispatch(push('/product'));
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
        <div className="mb20">
          <Button type="primary" icon="left" onClick={this.handelBack}>
            返回
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
        <Row gutter={[16, 16]}>
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
              rowKey={(record) => record.platform}
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
