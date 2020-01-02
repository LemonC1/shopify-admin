import React from 'react';
import {  Button,notification } from 'antd';
import { connect } from 'dva';
@connect(({  revised, loading }) => ({
  addProduct:revised,
  
}))
class App extends React.Component {
  state = {};
  save = async() => { 
    const { dispatch,addProduct } = this.props;
   if(addProduct.addContent.title==''){
    const args = {
      message: 'There is 1 error with this product:',
      description:
        'Title can’t be blank',
    };
    notification['error'](args);
   } else if (addProduct.addVariants.fulfillment_service!=="manual"&&addProduct.addVariants.sku===''){
    const args = {
      message: 'There is 1 error with this product:',
      description:
        'Sku can\'t be blank',
    };
    notification['error'](args);
   }
    else {await dispatch({
       type: 'revised/save',
     });}
  location.hash = '/products/allProducts';
  };
  discard = async()=>{
    const { dispatch } = this.props;

    await dispatch({
      type: 'revised/empty',
    });
    location.hash = '/products/allProducts';
  }
  render() {
    return (
      <div>
        <Button onClick={this.save} disabled={false} style={{ float: 'right' ,margin:'24px 24px' }}>
        保存
        </Button>
      </div>
    );
  }
}

export default () => (
  <div >
    <div id="components-modal-demo-button-props" style={{ float: 'right' }}>
      <App />
    </div>
  </div>
);
