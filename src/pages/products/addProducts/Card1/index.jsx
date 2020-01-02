import React from 'react';
import { Card, Input, Select, InputNumber, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
const { Option } = Select;
@connect(({ addProduct, loading }) => ({
}))
class Card1 extends React.Component {
  state = {
    Type: '',
    Vendor: ''
  };

  render() {
    const constChange = (name, title) => {

      const { dispatch } = this.props;
      dispatch({
        type: 'addProduct/addProperty',
        payload: { name, title },
      });

    }
    const addType = (Type) => {
      this.setState({ Type: Type })

    }
    const addVendor = (Vendor) => {
      this.setState({ Vendor: Vendor })

    }
    const pushType = () => {
      children.push(<Option value={this.state.Type} key={this.state.Type}>{this.state.Type}</Option>)
    }
    const pushVendor = () => {
      childrens.push(<Option value={this.state.Vendor} key={this.state.Vendor}>{this.state.Vendor}</Option>)
    }
    const children = [<Option value="test" key="test">test</Option>,];
    const childrens = [<Option value="chenbj" key="chenbj">chenbj</Option>];
    return (
      <div className={styles.container}>
        <div id="components-card-demo-simple">
          <Card
            style={{
              width: '300px ',
            }}
          >
            <p style={{ fontSize: '30px' }}>分类</p>

            <div ><div >
              <p>商品类型</p>
              <Select style={{ width: '100%' }} onChange={(e) => constChange('product_type', e)} >
                {children}
              </Select>
            </div>
              <p>添加商品类型</p>
              <div>
                <Input
                  style={{ width: '120px' }}
                  onBlur={(e) => addType(e.target.value)}
                />
                <Button style={{ marginLeft: '65px' }} onClick={pushType}>
                  添加
              </Button>
              </div></div>


            <div ><div >
              <p>供货商</p>
              <Select style={{ width: '100%' }} onChange={(e) => constChange('vendor', e)} >
                {childrens}
              </Select>
            </div>
              <p>添加供货商</p>
              <div>
                <Input
                  style={{ width: '120px' }}
                  onBlur={(e) => addVendor(e.target.value)}
                />
                <Button style={{ marginLeft: '65px' }} onClick={pushVendor}>
                  添加
              </Button>
              </div></div>
          </Card>
        </div>
      </div>
    )
  }
}
export default (Card1);
