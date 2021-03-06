import React from 'react';
import { Card, Input, Select,InputNumber, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
const { Option } = Select;
@connect(({ revised, loading }) => ({
   product:revised.product
}))
class CardR2 extends React.Component {
  state = {
   
  };

  render() {
    const { product } =this.props
    const tagsChange=(name,title)=>{
      var tags="";
      for (let index = 0; index < title.length; index++) {
        tags=tags+title[index]+","
      };
      
      
      const { dispatch } = this.props;
        dispatch({
            type: 'revised/addProperty',
            payload: { name, title:tags},
        });
    }
    const childrens=[];
   
    const tags = (product.tags || "").split(",");
    for(var i=0 ;i<tags.length;i++){
      childrens.push(<Option value={tags[i]} key={tags[i]}>{tags[i]}</Option>)
    }
    
    return (
      <div className={ styles.container }>
      <div id="components-card-demo-simple">
        <Card
          style={ {
            width: '300px ',marginTop:'0px'
          } }
        >
          <p style={ { fontSize: '30px' } }>标签</p>
          
          <Select mode="tags" style={{ width: '100%' }}  onChange={(e)=>tagsChange('tags',e)}  defaultValue={tags}>
          {childrens}
          </Select>
        </Card>
      </div>
    </div>
    )
  }
}
export default (CardR2);
