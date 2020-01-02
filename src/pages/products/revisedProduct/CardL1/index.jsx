import React from 'react';
import { Card, Input } from 'antd';
import styles from './index.less';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'dva';
@connect(({ revised, loading }) => ({
  product: revised.product
}))
class CardL1 extends React.Component {
  state = {
    content: '',
    title: ''
  };

  render() {
    const { product } = this.props
    const { title } = this.state
    const inputChange = (name, title) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'revised/addProperty',
        payload: { name, title },
      });

    }
    if (product.title != title) {
      this.setState({ title: product.title })
    }
    return (
      <div className={styles.container}>
        <div id="components-card-demo-simple">
          <Card
            style={{
              width: '800px ',
            }}
          >
            <p style={{ fontSize: '30px' }}>名称</p>
            <Input style={{ width: '750px ', }}
              id='titleRevisedProduct'
              onBlur={() => inputChange('title', document.getElementById('titleRevisedProduct').value)}
              defaultValue={product.title}
              key={product.title !== title ? 'notLoadedYet' : 'loaded'}
            ></Input>
          </Card>
        </div>
      </div>

    )
  }
}
export default (CardL1);
