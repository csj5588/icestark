import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Checkbox } from 'antd';
import { filterOption } from 'ik-utils';
import { multipleSelectList } from '../../../constants/selectLists';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class Content extends React.Component {
  render() {
    const { form, store } = this.props;
    const {
      createEnvParams: { checkList },
      envList,
    } = store;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('checkList', {
            initialValue: checkList,
            rules: [
              {
                required: true,
                message: '请选择环境',
              },
            ],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              {envList.map((item, idx) => (
                <div key={idx} style={styles.box}>
                  <Checkbox value={item.env}>{item.name}</Checkbox>
                </div>
              ))}
            </Checkbox.Group>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const styles = {
  box: {
    margin: '15px 0 0 30px',
  },
};

export default connect((stores) => ({
  store: stores.dispatcherDetail,
}))(Content);
