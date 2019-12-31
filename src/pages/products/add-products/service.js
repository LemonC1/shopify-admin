import { stringify } from 'qs';
import request from '@/utils/request';
import axios from '@/utils/request';
const apiBase = 'https://mirror.viralbox.org/chenbj';
export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
export async function getProducts() {
  return axios(
    `${apiBase}/admin/api/2019-10/products.json?query=&limit=10&order=updated_at+desc`
  );
}
export async function searchProducts(params) {
  return request(`${apiBase}/admin/api/2019-10/products.json?query=&${params}`);
}
export async function getProductsbychange(params) {
  return request(
    `${apiBase}/admin/api/2019-10/products.json?&limit=${params.limit}&${params.link}`
  );
}
export async function addProducts(params) {
  return axios(`${apiBase}/admin/api/2019-10/products.json`, {
    method: 'POST',
    data: {
      product: params,
    },
  });
}
export async function removeProducts(params) {
  return request(`${apiBase}/admin/api/2019-10/products/${params}.json`, {
    method: 'DELETE',
  });
}
export async function UpdateProduct(params) {
  return request(`${apiBase}/admin/api/2019-10/products/${params.productskey}.json`, {
    method: 'PUT',
    data: {
      product: params.parpms,
    },
  });
}
export async function UpdateQuantity(params) {
  return request(`${apiBase}/admin/api/2019-10/inventory_item/${params.productskey}.json`, {
    method: 'POST',
    data: {
      inventory_item: params.parpms,
    },
  });
}
export async function allProduct() {
  return request(`${apiBase}/admin/api/2019-10/products.json`);
}
