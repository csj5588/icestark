import React from 'react';
import common from 'utils/common';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';
import styles from './index.less';
import { ADD, REQ_METHOD } from '../../constants/modalTypes'
import { saveCreateEnv } from './../../model/action';

const cx = common.classnames('access-dispatcher-detail-title', styles);

class index extends React.Component {
  handelCreate = () => {
    const { dispatch } = this.props;
    dispatch(saveCreateEnv({ show: true, title: '选择新增的环境', type: ADD }));
  };

  render() {
    const { store: { data, envList } } = this.props
    const {
      app_key: appKey,
      ev_name: evName,
      ev_type: evType,
      ev_desc: evDesc,
    } = data || {}
    const isDisabled = envList && envList.length > 0
    return (
      <div className={cx('root')}>
        <div className='flex-space'>
          <div className='flex-space'>
            <span className="title">{evName}配置详情</span>
            <Button
              className="ml10"
              icon="plus"
              disabled={!isDisabled}
              onClick={this.handelCreate}>
              新增环境
            </Button>
          </div>
        </div>
        <Row className='title-body'>
          <Col span={6}>
            使用方：{appKey}
          </Col>
          <Col span={6}>
            请求方式：{REQ_METHOD[evType]}
          </Col>
          <Col span={12}>
            事件说明：{evDesc}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((stores) => ({
  store: stores.dispatcherDetail,
}))(index);
