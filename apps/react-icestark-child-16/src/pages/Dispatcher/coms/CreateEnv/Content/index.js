import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import { filterOption } from 'ik-utils';
import { multipleSelectList } from '../../../constants/selectLists';
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class Content extends React.Component {
  state = {
    indeterminate: false,
    checkAll: false,
  };

  onChange = list => {
    const { envList, handleCheckChange } = this.props
    handleCheckChange(list)
    this.setState({
      indeterminate: !!list.length && list.length < envList.length,
      checkAll: list.length === envList.length,
    });
  };

  onCheckAllChange = e => {
    const { envList, handleCheckChange } = this.props
    const allList = envList.map(item => item.env)
    const checkedList = e.target.checked ? allList : []
    handleCheckChange(checkedList)
    this.setState({
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    const { checkedList, envList } = this.props;
    return (
      <div>
        <div>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            选择全部
          </Checkbox>
        </div>
        <Checkbox.Group
          value={checkedList}
          onChange={this.onChange}
          style={{ width: '100%' }}>
          {envList && envList.map((item, idx) => (
            <div key={idx} style={styles.box}>
              <Checkbox value={item.env}>{item.name}</Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      </div>
    );
  }
}

const styles = {
  box: {
    margin: '15px 0 0 30px',
  },
};

export default connect((stores) => ({
  store: stores.dispatcher,
}))(Content);
