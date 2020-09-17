import axios from '@/libs/api.request.js'

export const getSoldNoteList = () => {
  return axios.request({
    url:`order/list`,
    data:null,
    method:'get'
  });
};

export const saveSoldNote = data =>{
  return axios.request({
    url:`order/save`,
    data:data,
    method:'post'
  });
};

export const updateSoldNote = data =>{
  return axios.request({
    url:`order/update`,
    data:data,
    method:'put'
  });
};

export const deleteSoldNote = data =>{
  return axios.request({
    url:`order/delete`,
    data:data,
    method:'delete'
  });
};


export const saveOrUpdate = data => {
  return data.id ? updateSoldNote(data) : saveSoldNote(data);
};


export const getUserName = () => {
  return axios.request({
    url:`order/getUserName`,
    data:null,
    method:'get'
  });
};
export const getProductName = () => {
  return axios.request({
    url:`order/getProductName`,
    data:null,
    method:'get'
  });
};

