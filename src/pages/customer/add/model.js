import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getCustomers, AddCustomers } from './service';
import { log } from 'lodash-decorators/utils';

const Model = {
  namespace: 'addCustomer',
  state: {
    data: {
      list: [],
    },
    customer: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const res = yield call(getCustomers);
      yield put({
        type: 'save',
        // payload: response.data.products,
        payload: 0,
      });
      yield put({
        type: 'item',
        payload: {
          list: res.data.customers,
        },
      });
    },
    *add({ payload }, { call }) {
      yield call(AddCustomers, payload);
      message.success('创建成功');
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
    item(state, action) {
      return { ...state, item: action.payload };
    },
  },
};
export default Model;
