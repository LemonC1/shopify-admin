import React from 'react';
import { PageHeader } from 'antd';

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/products/allProducts',
    breadcrumbName: '商品展示',
  },
  {
    path: '/',
    breadcrumbName: '所有商品',
  },
  {
    path: '/new',
    breadcrumbName: '创建商品',
  },
];
export default () => (
  <div style={{ margin: '-24px -24px 0px', backgroundColor: '#fff' }}>
    <div id="components-page-header-demo-breadcrumb">
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        title="商品修改"
        breadcrumb={{
          routes,
        }}
        subTitle=""
      />
    </div>
  </div>
);
