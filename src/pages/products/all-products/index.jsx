import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
} from 'antd';
import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { connect } from 'dva';
import moment from 'moment';
import CreateForm from './components/CreateForm';
import StandardTable from './components/StandardTable';
import UpdateForm from './components/UpdateForm';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

function BuildvendorArray(Arr) {
  var temp = []; //一个新的临时数组
  if (Arr instanceof Array) {
    const list = Arr.map(item => {
      return item.vendor;
    });
    var temp = []; //一个新的临时数组
    for (var i = 0; i < list.length; i++) {
      if (temp.indexOf(list[i]) == -1) {
        temp.push(list[i]);
      }
    }
    return temp;
  }
  return temp;
}
function BuildtypeArray(Arr) {
  var temp = []; //一个新的临时数组
  if (Arr instanceof Array) {
    const list = Arr.map(item => {
      return item.product_type;
    });
    var temp = []; //一个新的临时数组
    for (var i = 0; i < list.length; i++) {
      if (temp.indexOf(list[i]) == -1) {
        temp.push(list[i]);
      }
    }
    return temp;
  }
  return temp;
}

/* eslint react/no-multi-comp:0 */
@connect(({ product, loading }) => ({
  product,
  loading: loading.models.product,
}))
class Product extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: ' ',
      dataIndex: 'image.src',
      render: (_, record) => {
        const srcs =
          record.image == null
            ? 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576564146465&di=0eea2d0226ac52395002f6aaf264008c&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb90e7bec54e736d13303db2498504fc2d562698d.jpg'
            : record.image.src;
        return <img src={srcs} style={{ width: '50px' }} />;
      },
    },
    {
      title: '产品',
      dataIndex: 'title',
      render: val => <a>{val}</a>,
    },
    {
      title: '库存',
      dataIndex: 'variants[0].inventory_quantity',
      key: 'inventory',
      sorter: (a, b) => a.variants[0].inventory_quantity - b.variants[0].inventory_quantity,
      render: (val, rec) => {
        let sum = 0;
        for (let j = 0; j < rec.variants.length; j++) {
          sum += rec.variants[j].inventory_quantity;
        }
        return (sum + ' ' + rec.variants.length + '个多属性的库存');
      },
    },
    {
      title: '价格',
      dataIndex: 'variants[0].price',
      key: 'price',
      sorter: (a, b) => a.variants[0].price - b.variants[0].price,
      render: (val, rec) => {
        let sum = 0;
        sum = `$${rec.variants[0].price}`;
        return sum;
      },
    },
    {
      title: '类型',
      dataIndex: 'product_type',
      render:(val)=>val,
    },
    {
      title: '供应商',
      dataIndex: 'vendor',
      render:(val)=>val,
    },
    // {
    //   title: '服务调用次数',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   align: 'right',
    //   render: val => `${val} 万`,
    //   // mark to display a total number
    //   needTotal: true,
    // },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   filters: [
    //     {
    //       text: status[0],
    //       value: '0',
    //     },
    //     {
    //       text: status[1],
    //       value: '1',
    //     },
    //     {
    //       text: status[2],
    //       value: '2',
    //     },
    //     {
    //       text: status[3],
    //       value: '3',
    //     },
    //   ],

    //   render(val) {
    //     return <Badge status={statusMap[val]} text={status[val]} />;
    //   },
    // },
    // {
    //   title: '上次调度时间',
    //   dataIndex: 'updatedAt',
    //   sorter: true,
    //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    // },
    // {
    //   title: '操作',
    //   render: (text, record) => (
    //     <Fragment>
    //       <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
    //       <Divider type="vertical" />
    //       <a href="">订阅警报</a>
    //     </Fragment>
    //   ),
    // },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'product/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'product/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    console.log(selectedRows);
    
    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'product/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;

      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'product/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/add',
      payload: {
        desc: fields.desc,
      },
    });
    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });
    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  // renderSimpleForm() {
  //   const { form } = this.props;
  //   const { getFieldDecorator } = form;
  //   return (
  //     <Form onSubmit={this.handleSearch} layout="inline">
  //       <Row
  //         gutter={{
  //           md: 8,
  //           lg: 24,
  //           xl: 48,
  //         }}
  //       >
  //         <Col md={8} sm={24}>
  //           <FormItem label="规则名称">
  //             {getFieldDecorator('name')(<Input placeholder="请输入" />)}
  //           </FormItem>
  //         </Col>
  //         <Col md={8} sm={24}>
  //           <FormItem label="使用状态">
  //             {getFieldDecorator('status')(
  //               <Select
  //                 placeholder="请选择"
  //                 style={{
  //                   width: '100%',
  //                 }}
  //               >
  //                 <Option value="0">关闭</Option>
  //                 <Option value="1">运行中</Option>
  //               </Select>,
  //             )}
  //           </FormItem>
  //         </Col>
  //         <Col md={8} sm={24}>
  //           <span className={styles.submitButtons}>
  //             <Button type="primary" htmlType="submit">
  //               查询
  //             </Button>
  //             <Button
  //               style={{
  //                 marginLeft: 8,
  //               }}
  //               onClick={this.handleFormReset}
  //             >
  //               重置
  //             </Button>
  //             <a
  //               style={{
  //                 marginLeft: 8,
  //               }}
  //               onClick={this.toggleForm}
  //             >
  //               展开 <Icon type="down" />
  //             </a>
  //           </span>
  //         </Col>
  //       </Row>
  //     </Form>
  //   );
  // }

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const vendorlist = BuildvendorArray(this.state.res).map(item => {
      return (
        <Option value={item} key={item}>
          {item}
        </Option>
      );
    });
    const typelist = BuildtypeArray(this.state.res).map(item => {
      return (
        <Option value={item} key={item}>
          {item}
        </Option>
      );
    });
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={10}>
            <Form.Item label="商品名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={10}>
            <Form.Item label="商品类型">
              {getFieldDecorator('type')(
                <Select placeholder="请选择" style={{ width: '120px' }}>
                  {typelist}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={10}>
            <Form.Item label="供应商">
              {getFieldDecorator('vendor')(
                <Select placeholder="请选择" style={{ width: '120px' }}>
                  {vendorlist}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={4} sm={8}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
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
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        ><ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker
                  style={{
                    width: '100%',
                  }}
                  placeholder="请输入更新日期"
                />,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
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
      </Form>
    );
  }



  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      product: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Product);
