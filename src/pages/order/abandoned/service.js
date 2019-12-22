import axios from '@/utils/request';

export async function queryRule(params) {
  return axios('/api/rule', {
    params,
  });
}
export async function removeRule(params) {
  return axios('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return axios('/api/rule', {
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

export async function getCheckouts() {
  return axios('https://mirror.viralbox.org/chenbj/admin/api/2019-10/checkouts.json');
}
