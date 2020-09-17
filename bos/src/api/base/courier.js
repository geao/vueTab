import axios from '@/libs/api.request.js'

export const getCourierList = data => {
  return axios.request({
    url:`courier/listCourier`,
    data:data,
    method:'post'
  });
};

export const insertCourier = data =>{
  return axios.request({
    url:`courier/insertCourier`,
    data:data,
    method:'post'
  });
};

export const updateCourier = data =>{
  return axios.request({
    url:`courier/updateCourier`,
    data:data,
    method:'put'
  });
};

export const toVoidCourier = data =>{
  return axios.request({
    url:`courier/toVoidCourier`,
    data:data,
    method:'put'
  });
};


export const saveOrUpdate = data => {
  return data.id ? updateCourier(data) : insertCourier(data);
};

