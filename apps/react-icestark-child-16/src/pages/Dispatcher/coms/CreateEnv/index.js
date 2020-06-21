import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal, Message } from 'antd';
import { DETAIL } from './../../constants/modalTypes';
import { saveCreateEnv, postStartAll } from './../../model/action';
import Content from './Content';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
    };
  }

  handleSubmit = () => {
    const { checkedList } = this.state;
    const { dispatch } = this.props;
    if (!checkedList.length) {
      Message.error('请至少选择一个环境');
    }
    dispatch(postStartAll({ envs: checkedList }));
  };

  handleCheckChange = (val) => {
    this.setState({
      checkedList: val,
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    this.setState({
      checkedList: [],
    });
    dispatch(saveCreateEnv({ show: false }));
  };

  render() {
    const { store } = this.props;
    const { checkedList } = this.state;
    const { createEnv, envList } = store;
    return (
      <Modal
        width={500}
        title={createEnv.title}
        visible={createEnv.show}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Content
          envList={envList}
          checkedList={checkedList}
          handleCheckChange={this.handleCheckChange}
        />
      </Modal>
    );
  }
}

export default compose(
  connect((stores) => ({
    store: stores.dispatcher,
  }))
)(Create);
