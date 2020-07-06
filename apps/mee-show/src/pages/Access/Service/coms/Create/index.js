import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form, message } from 'antd';
import { DETAIL, ADD } from './../../constants/modalTypes';
import { saveCreate, add, initCreateParams, updata } from './../../model/action';
import Content from './Content';

class Create extends React.Component {
  handleSubmit = (e) => {
    const { form, store } = this.props;
    const {
      create: { type },
    } = store;
    if (type === DETAIL) {
      this.handleCancel();
      return;
    }
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return;
      const { dispatch } = this.props;
      if (type === ADD) {
        const { key_uris: keyUris, domain_ids: domainIds } = values;
        try {
          const newKeyUris = keyUris.split(/[(\r\n)\r\n]+/).map((item) => {
            const arr = item.split(':');
            const [key, uri] = arr;
            return {
              key,
              uri,
            };
          });
          const params = {
            ...values,
            key_uris: newKeyUris,
            domain_ids: domainIds && domainIds.map((item) => +item),
          };
          // console.log(newKeyUris)
          dispatch(add(params));
        } catch (error) {
          console.log(error)
        }
      } else {
        const {
          createParams: { id, domain_uris: oldDomainUris },
        } = store;
        const { domain_uris: domainUris } = values;
        const formatDomainUris = domainUris.map((item, index) => ({
          id: oldDomainUris[index].id,
          env: oldDomainUris[index].env,
          is_add: oldDomainUris[index].is_add,
          domain_id: +item.domain_id,
          uri: item.uri,
        }));
        const params = {
          ...values,
          domain_uris: formatDomainUris,
        };
        dispatch(updata(params));
      }
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: false, type: ADD }));
    dispatch(initCreateParams({ show: false }));
  };

  render() {
    const { form, store } = this.props;
    const { create } = store;
    return (
      <Modal
        width={500}
        title={create.title}
        visible={create.show}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Content form={form} />
      </Modal>
    );
  }
}

export default compose(
  Form.create(),
  connect((stores) => ({
    store: stores.service,
  }))
)(Create);
