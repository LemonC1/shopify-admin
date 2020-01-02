import React from 'react';
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ products, loading }) => ({
  products,
}))
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    expandForm: false,
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { dispatch, products } = this.props;
      dispatch({
        type: 'products/change',
        payload: {
          current: products.current,
          order: products.order,
          values,
          columnKey: products.columnKey,
        },
      });
      dispatch({
        type: 'products/fetch',
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'order/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };
  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="商品名称">
              {getFieldDecorator('query')(<Input placeholder="输入查询商品名称" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <div
              style={{
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  float: 'right',
                  marginBottom: 24,
                  width:'100%',
                }}
              >
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={this.handleFormReset}
                >
                  重置
                </Button>
                <a
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={this.toggleForm}
                >
                  展开 <Icon type="down" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="商品名称">
              {getFieldDecorator('query')(<Input placeholder="输入查询商品名称" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="所属标签">
              {getFieldDecorator('tag')(<Input placeholder="输入Tag" />)}
            </FormItem>
          </Col>
        </Row>
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="商品供应商">
              {getFieldDecorator('vendor')(
                <Select
                  placeholder="选择一个值"
                  style={{
                    width: '200px',
                  }}
                >
                  <Option value="">Select a value</Option>
                  <Option value="xuzyy">xuzyy</Option>
                  <Option value="zyl">zyl</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="商品类型">
              {getFieldDecorator('product_type')(
                <Select
                  placeholder="选择一个值"
                  style={{
                    width: '200px',
                  }}
                >
                  <Option value="">Select a value</Option>
                  <Option value="tttt">tttt</Option>
                  <Option value="ttttt">ttttt</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <div
              style={{
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  float: 'right',
                  marginBottom: 24,
                }}
              >
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={this.handleFormReset}
                >
                  重置
                </Button>
                <a
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={this.toggleForm}
                >
                  收起 <Icon type="up" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }
  render() {
    return <div className={styles.tableListForm}>{this.renderForm()}</div>;
  }
}

const WrappedAdvancedSearchForm = Form.create({
  name: 'advanced_search',
})(AdvancedSearchForm);
export default () => (
  <div className={styles.container}>
    <div id="components-form-demo-advanced-search">
      <div style={{ backgroundColor: '#fff', marginTop: '24px', padding: '24px' }}>
        <WrappedAdvancedSearchForm />
      </div>
    </div>
  </div>
);
