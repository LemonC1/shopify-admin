import axios from '@/utils/request';

export  function postAdd(e) {
  const res = axios.post(
    `https://mirror.viralbox.org/chenbj/admin/api/2019-10/products.json`,{"product":e}
  );
  
  return res;
}