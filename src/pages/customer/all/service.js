import axios from '@/utils/request';

export async function queryRule(params) {
  return request('/api/rule', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
export async function getCustomers(params) {
  return axios('https://mirror.viralbox.org/chenbj/admin/api/2019-10/customers.json',{
      params  
  });
}  
export async function getCustomersCount() {
  return axios('https://mirror.viralbox.org/chenbj/admin/api/2019-10/customers/count.json?status=any'
  );
}
export async function removeCustomers(params) {
  return axios(`https://mirror.viralbox.org/chenbj/admin/api/2019-10/customers/${params}.json?status=any`, {
    method: 'DELETE',
  });
}
