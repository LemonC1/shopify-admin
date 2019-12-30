import axios from '@/utils/request';
import request from '@/utils/request';

export async function customerSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
export async function getCustomers(params) {
  return axios('https://mirror.viralbox.org/chenbj/admin/api/2019-10/customers.json',{
      params  
  });
}  
export async function AddCustomers(params) {
  return await axios(`https://mirror.viralbox.org/chenbj/admin/api/2019-10/customers.json`, {
    method: 'POST',
    data: { 
      ...params,
    },
  });
}
