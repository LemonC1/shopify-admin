import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Button, InputNumber } from 'antd';

const FormItem = Form.Item;
@connect(({ product, loading }) => ({
  product: product.product,
  loading: loading.effects['products/fetch'],
}))
class Addprodct extends Component {
  addproduct = () => {
    const { dispatch } = this.props;
    const {
      form: { validateFields },
    } = this.props;
    const product = this.props.form.getFieldsValue();
    validateFields(['title', 'vendor', 'inventory_quantity', 'price'], (err, values) => {
      if (err) return;
      // 若无error则继续进行表单提交
      dispatch({
        type: 'products/add',
        payload: {
          title: product.title,
          body_html: product.body_html,
          vendor: product.vendor,
          product_type: product.product_type,
          tags: product.tags,
          variants: [
            {
              title: product.title,
              inventory_quantity: product.inventory_quantity,
              price: product.price,
            },
          ],
        },
      });
      alert('添加成功');
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title="添加商品">
        <div style={{ margin: '0 auto', width: '50%' }}>
          <Form>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品名称">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '商品名不能为空！', min: 1 }],
              })(<Input placeholder="请输入商品名称" allowClear />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
              {getFieldDecorator('body_html', {
                rules: [{ required: false }],
              })(<Input placeholder="请输入描述" allowClear />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="供应商">
              {getFieldDecorator('vendor', {
                rules: [{ required: true, message: '供应商不能为空！', min: 1 }],
              })(<Input placeholder="请输入供应商名称" allowClear />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品类型">
              {getFieldDecorator('product_type', {
                rules: [{ required: false }],
              })(<Input placeholder="请输入商品类型" allowClear />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="tags">
              {getFieldDecorator('tags', {
                rules: [{ required: false }],
              })(<Input placeholder="请输入tags(例：Barnes & Noble, John's Fav,)" allowClear />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="库存">
              {getFieldDecorator('inventory_quantity', {
                rules: [{ required: true, message: '库存数不能为空！' }],
              })(
                <InputNumber
                  placeholder="请输入库存数"
                  min="1"
                  style={{ width: '386px' }}
                  allowClear
                />
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="价格(单位:$)">
              {getFieldDecorator('price', {
                rules: [{ required: true, message: '价格不能为空！' }],
              })(
                <InputNumber
                  placeholder="请输入价格"
                  min="0.01"
                  step="0.01"
                  style={{ width: '386px' }}
                  allowClear
                />
              )}
            </FormItem>
            {/* <div style={{margin:"0 auto",width:"80%"}}> */}
            <FormItem>
              <Button type="primary" block onClick={this.addproduct}>
                创建商品
              </Button>
            </FormItem>
            {/*          </div> */}
          </Form>
        </div>
      </Card>
    );
  }
}
export default Form.create()(Addprodct);
