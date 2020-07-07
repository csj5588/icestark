import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import common from 'utils/common';
import _cloneDeep from 'lodash/cloneDeep'
import { DETAIL } from './../../constants/modalTypes';
import { update } from '../../model/action'
import { Form, Row, Col, Button } from 'antd';
import Content from './Content';
import styles from './index.less';

const cx = common.classnames('access-dispatcher-detail-content', styles);

class index extends React.Component {
  handleSubmit = (e) => {
    const { form, store } = this.props;
    const { data } = store;
    // 提交时将表单数据与自定义校验进行组合
    const { detail = [] } = data || {}
    if (!detail || !detail.length) return
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const { detail: detailFrom = [] } = values
        // 保存时候去掉的表格id
        const newDetail = _cloneDeep(detail)
        const params = newDetail.map((item, index) => ({
          ...item,
          ...detailFrom[index],
          after_fe: detailFrom[index].after_fe || {},
          before_custom_verify: newDetail[index] && this.formatDeleteId(newDetail[index].before_custom_verify)
        }))
        dispatch(update(params));
      }
    });
  };

  formatDeleteId = verifyArr => {
    if (!verifyArr) return []
    const newVerifyArr = verifyArr.map(item => {
      const {
        service_name: serviceName,
        uri,
        method,
        read_timeout: readTimeout,
        desc,
      } = item
      return {
        service_name: serviceName,
        uri,
        method,
        read_timeout: readTimeout,
        desc,
      }
    })
    return newVerifyArr
  }

  handelBlack = () => {
    const { dispatch } = this.props;
    dispatch(push('/access-dispatcher'));
  };

  render() {
    const {
      store: { data },
      form,
    } = this.props;
    const { detail = [] } = data || {};
    return (
      <Form onSubmit={this.handleSubmit} className={cx('root')}>
        <div className="row">
          <Row gutter={[20, 20]}>
            {detail && detail.map((item, index) => (
              <Col sm={24} lg={24} xl={24} xxl={24} key={item.id}>
                <Content
                  form={form}
                  index={index}
                  data={item}
                  title={`${item.env}环境配置`}
                />
              </Col>
            ))}
          </Row>
        </div>
        <div className='btns'>
          <Button type="primary" onClick={this.handleSubmit}>
            确定
          </Button>
          <Link
            className='ml20 btn'
            to="/access-dispatcher">取消</Link>
        </div>
      </Form>
    );
  }
}

export default compose(
  Form.create(),
  connect((stores) => ({
    store: stores.dispatcherDetail,
  }))
)(index);
