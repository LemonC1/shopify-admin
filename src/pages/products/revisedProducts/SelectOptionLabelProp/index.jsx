import React from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

const { Option } = Select;

@connect(({ reviseds, loading }) => ({
  revised:reviseds,
}))
class SelectOptionLabelProp extends React.Component {
  state = {
    value: ['Title'],
  };
  handleChange = (_, select) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'reviseds/selects',
      payload: {
        select,
        value: _,
      },
    });
  };
  render() {
    const { revised } = this.props;
    return (
      <div className={styles.container} style={{marginTop:'36px',backgroundColor:'#fff',padding:'24px 24px'}}>
        <div id="components-select-demo-option-label-prop">
          <Select
            mode="multiple"
            style={{
              width: '100%',
            }}
            placeholder="选择一个属性"
            defaultValue={revised.value}
            onChange={this.handleChange}
            optionLabelProp="label"
          >
            <Option value="title" label="名称">
              名称
            </Option>
            <Option value="tags" label="标签">
              标签
            </Option>
            <Option value="vendor" label="供应商">
              供应商
            </Option>
          </Select>
        </div>
      </div>
    );
  }
}
export default SelectOptionLabelProp;
