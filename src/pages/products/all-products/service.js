import axios from '@/utils/request';

// export async function queryRule(params) {
//   return request('/api/rule', {
//     params,
//   });
// }
// export async function removeRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     data: { ...params, method: 'delete' },
//   });
// }
// export async function addRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     data: { ...params, method: 'post' },
//   });
// }
// export async function updateRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     data: { ...params, method: 'update' },
//   });
// }

export async function removeRule(params) {
  return axios('https://mirror.viralbox.org/chenbj/admin/api/2019-10//products/${params}.json', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return axios('https://mirror.viralbox.org/chenbj/admin/api/2019-10/products.json', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return axios('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

export async function getProducts(params) {
  return axios('https://mirror.viralbox.org/chenbj/admin/api/2019-10/products.json',{
      params  
  });}  
