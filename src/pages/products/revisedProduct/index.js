import React, { Component } from 'react';
import PageHeaderBreadcrumb from './PageHeaderBreadcrumb';
import CardL1 from './CardL1';
import CardR1 from './CardR1';
import CardR2 from './CardR2';
import Button from './Button'
import { connect } from 'dva';
@connect(({ reviseds, loading }) => ({

}))
class RevisedProduct extends Component {
  componentDidMount() {

    const { dispatch } = this.props;
    const id = this.props.location.pathname.substring(18)
    console.log(id);

    dispatch({
      type: 'revised/fetch',
      payload: { id },
    });
  }
  render() {

    return (
      <div>
        <PageHeaderBreadcrumb />
        <div style={{ marginLeft: '20%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ margin: '24px 48px' }}><CardL1 /></div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ margin: '24px 48px', }}><CardR1 /><CardR2 /><Button /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RevisedProduct;
