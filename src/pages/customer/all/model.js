import { addRule, queryRule, removeRule, updateRule, getCustomersCount } from './service';
import { getCustomers } from './service';

const Model = {
  namespace: 'customer',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    count: 0,
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      let reg =/(?<=page_info=).*?(?=>)/g;
      const response = yield call(getCustomers, payload);
      const res = yield call(getCustomersCount, payload); 
      const {customer} = yield select();
      yield put({
        type: 'save',
        payload: {
          list: response.data.customers,
          pagination: {}
        },
      });
      yield put({
        type: 'count',
        payload: res.data.count
      })
      if(payload){
        yield put({
          type: 'current',
          payload:payload.cur
           });
       }
    },

    *changepage({payload:{cur,p}},{put,call,select}){
      const {customer} = yield select();
      console.log('p',p);
      console.log('cur',cur,p);
      if(customer.current < cur){
      const res = yield call(getCustomers,p);
      yield put({
        type: 'save',
        payload: {
          list: res.data.customers,
          pagination: {},
        },
      });
     }
      
 },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *remove({ payload:{id}, callback }, { call, put }) {
      // const response = yield call(removeRule, payload);
      // console.log(payload);
      for(let i=0;i<id.length;i++)
      {
       let response = yield call(removeCustomers, id[i]);
      yield put({
        type: 'save',
        payload: response,
      });
    }
    const res = yield call(getCustomers);
      yield put({
        type: 'save',
        payload: {
          list: res.data.customers,
          pagination: {}
        },
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
    count(state, action) {
      return { ...state, count: action.payload };
    },
    link(state, action) {
      return { ...state, link: action.payload };
    },
    current(state, action) {
      return { ...state, current: action.payload };
    },
  },
};
export default Model;
