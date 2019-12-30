import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.models.customer,
}))
class Add extends Component {
  handleSubmit = e => {
    const { dispatch, form, customer: {item, status} } = this.props;
    const customer = this.props.form.getFieldsValue();
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'addCustomer/add',
          payload: {
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            phone: customer.phone,
            addresses: [
              {
                country: customer.country,
                province: customer.province
                // city: customer.city,
              },
            ],
          },
        });
        dispatch({
          type: 'addCustomer/fetch',
        });
        alert('添加成功');
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
        md: {
          span: 10,
        },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 7,
        },
      },
    };
    return (
      <PageHeaderWrapper >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.name.first" />}
            >
              {getFieldDecorator('first_name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.name-first.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'formandbasic-form.name-first.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.name.last" />}
            >
              {getFieldDecorator('last_name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.name-last.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'formandbasic-form.name-last.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.email" />}
            >
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.email.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'formandbasic-form.email.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.phone" />}
            >
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.phone.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'formandbasic-form.phone.placeholder',
                  })}
                />,
              )}
            </FormItem>
            {/* <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.first_name" />}
            >
              {getFieldDecorator('default_address.first_name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.first_name.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'formandbasic-form.first_name.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.last_name" />}
            >
              {getFieldDecorator('default_address.last_name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.last_name.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'formandbasic-form.last_name.placeholder',
                  })}
                />,
              )}
            </FormItem> */}
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.country" />}
            >
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.country.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'formandbasic-form.country.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.province" />}
            >
              {getFieldDecorator('province', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.province.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'formandbasic-form.province.placeholder',
                  })}
                />,
              )}
            </FormItem>
            {/* <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.city" />}
            >
              {getFieldDecorator('city', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.city.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'formandbasic-form.city.placeholder',
                  })}
                />,
              )}
            </FormItem> */}
            {/* <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.date.label" />}
            >
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.date.required',
                    }),
                  },
                ],
              })(
                <RangePicker
                  style={{
                    width: '100%',
                  }}
                  placeholder={[
                    formatMessage({
                      id: 'formandbasic-form.placeholder.start',
                    }),
                    formatMessage({
                      id: 'formandbasic-form.placeholder.end',
                    }),
                  ]}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.goal.label" />}
            >
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.goal.required',
                    }),
                  },
                ],
              })(
                <TextArea
                  style={{
                    minHeight: 32,
                  }}
                  placeholder={formatMessage({
                    id: 'formandbasic-form.goal.placeholder',
                  })}
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.standard.label" />}
            >
              {getFieldDecorator('standard', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'formandbasic-form.standard.required',
                    }),
                  },
                ],
              })(
                <TextArea
                  style={{
                    minHeight: 32,
                  }}
                  placeholder={formatMessage({
                    id: 'formandbasic-form.standard.placeholder',
                  })}
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="formandbasic-form.client.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="formandbasic-form.form.optional" />
                    <Tooltip title={<FormattedMessage id="formandbasic-form.label.tooltip" />}>
                      <Icon
                        type="info-circle-o"
                        style={{
                          marginRight: 4,
                        }}
                      />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input
                  placeholder={formatMessage({
                    id: 'formandbasic-form.client.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="formandbasic-form.invites.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="formandbasic-form.form.optional" />
                  </em>
                </span>
              }
            >
              {getFieldDecorator('invites')(
                <Input
                  placeholder={formatMessage({
                    id: 'formandbasic-form.invites.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="formandbasic-form.weight.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="formandbasic-form.form.optional" />
                  </em>
                </span>
              }
            >
              {getFieldDecorator('weight')(
                <InputNumber
                  placeholder={formatMessage({
                    id: 'formandbasic-form.weight.placeholder',
                  })}
                  min={0}
                  max={100}
                />,
              )}
              <span className="ant-form-text">%</span>
            </FormItem> */}
            {/* <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.public.label" />}
              help={<FormattedMessage id="formandbasic-form.label.help" />}
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">
                      <FormattedMessage id="formandbasic-form.radio.public" />
                    </Radio>
                    <Radio value="2">
                      <FormattedMessage id="formandbasic-form.radio.partially-public" />
                    </Radio>
                    <Radio value="3">
                      <FormattedMessage id="formandbasic-form.radio.private" />
                    </Radio>
                  </Radio.Group>,
                )}
                <FormItem
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder={formatMessage({
                        id: 'formandbasic-form.publicUsers.placeholder',
                      })}
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">
                        <FormattedMessage id="formandbasic-form.option.A" />
                      </Option>
                      <Option value="2">
                        <FormattedMessage id="formandbasic-form.option.B" />
                      </Option>
                      <Option value="3">
                        <FormattedMessage id="formandbasic-form.option.C" />
                      </Option>
                    </Select>,
                  )}
                </FormItem>
              </div>
            </FormItem> */}
            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting} onClick={this.handleSubmit}>
                <FormattedMessage id="formandbasic-form.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="formandbasic-form.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Add);
