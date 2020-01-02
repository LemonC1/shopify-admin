import React, { Component } from 'react';
import PageHeaderBreadcrumb from './PageHeaderBreadcrumb';
import { Card, Input } from 'antd';
import styles from './index.less';
import Card1 from './Card1';
import Card2 from './Card2';
import Button from './Button'
import { connect } from 'dva';
@connect(({ addProduct, loading }) => ({
  addContent: addProduct.addContent
}))
class AddProduct extends Component {
  state = {
    content: ''
  };
  render() {
    const { addContent } = this.props
    const inputChange = (name, title) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'addProduct/addProperty',
        payload: { name, title },
      });

    }
    return (
      <div>
        <PageHeaderBreadcrumb />
        <div style={{ marginLeft: '20%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ margin: '24px 48px' }}><div className={styles.container}>
              <div id="components-card-demo-simple">
                <Card
                  style={{
                    width: '800px',
                  }}
                >
                  <p style={{ fontSize: '30px' }}>名称</p>
                  <Input style={{ width: '750px ', }}
                    id='title'
                    onBlur={() => inputChange('title', document.getElementById('title').value)}
                    defaultValue={addContent.title}></Input>
                </Card>
              </div>
            </div></div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ margin: '24px 48px', }}><Card1 /><Card2 /><Button /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProduct;
