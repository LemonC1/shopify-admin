import React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import styles from './style.less';
import Link from 'umi/link';

@connect(({ products, loading }) => ({
  products: products.products,
  productsCount: products.count,
  loading: loading.models.products,
  productsValues: products.values,
  productsCurrent: products.current,
  productsColumnKey: products.products,
}))
class App extends React.Component {
  state = {
    selectedRowKeys: [],
    loading: false,
    current: '1',
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/fetch',
    });
  }
  start = async () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    await dispatch({
      type: 'products/delete',
      payload: { selectedRowKeys: this.state.selectedRowKeys },
    });
    await dispatch({
      type: 'products/fetch',
    });
    this.setState({
      selectedRowKeys: [],
      loading: false,
    });
  };
  onSelectChange = selectedRowKeys => {
    this.setState({
      selectedRowKeys,
    });
  };
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch, productsValues } = this.props;
    dispatch({
      type: 'products/change',
      payload: {
        current: pagination.current,
        order: sorter.order,
        values: productsValues,
        columnKey: sorter.columnKey,
      },
    });
    dispatch({
      type: 'products/fetch',
    });
  };

  render() {
    const { products, loading, productsCount, productsCurrent } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const paginationProps = {
      showQuickJumper: true,
      total: productsCount,
      hideOnSinglePage: true,
      current: productsCurrent,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = [
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
        sorter: true,
        render(record) {
          return <a>{record}</a>
        },
      },
      {
        title: '库存',
        dataIndex: 'variants[0].inventory_quantity',
        key: 'inventory',
        sorter: (a, b) => a.variants[0].inventory_quantity - b.variants[0].inventory_quantity,
        render: (h, record) => {
          let sum = 0;
          for (let i = 0; i < record.variants.length; i++) {
            sum += record.variants[i].inventory_quantity;
          }
          return (sum + ' ' + record.variants.length + '个多属性的库存');
        },
      },
      {
        title: '类型',
        dataIndex: 'product_type',
      },
      {
        title: '供应商',
        dataIndex: 'vendor',
      },
    ];
    const changeLocation = async (e) => {

      location.hash = `/products/revised/${e.id}`;
    }

    const pathReviseds = {
      pathname: `/products/revisedProducts/${selectedRowKeys}`,

    };
    return (
      <div
        style={{
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            margin: '0px 30px 20px',
          }}
        >
          <Button type="primary" style={{ float: 'left', marginBottom: 24, }}>
            <Link to={{ pathname: '/products/addProducts' }}>增加商品</Link>
          </Button>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
            style={{ float: 'right' }}
          >
            删除
          </Button>
          <Button
            style={{ display: !hasSelected ? 'none' : 'block', float: 'right', marginLeft: '15px' }}
            disabled={!hasSelected}
          >
            <Link
              to={pathReviseds}>
              修改
              </Link>
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={products}
          rowKey={'id'}
          onChange={this.handleTableChange}
          loading={loading}
          pagination={paginationProps}
          onRow={record => {
            return {
              onClick: () => changeLocation(record),
            };
          }}
        />
      </div>
    );
  }
}

export default () => (
  <div>
    <div id="components-table-demo-row-selection-and-operation">
      <App />
    </div>
  </div>
);
