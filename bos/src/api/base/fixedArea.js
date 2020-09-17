import axios from '@/libs/api.request.js'

export const getFixedAreaList = data => {
  return axios.request({
    url:`fixedArea/listFixedArea`,
    data:data,
    method:'post'
  });
};


export const getFixedList = () => {
  return axios.request({
    url:`fixedArea/list`,
    data:null,
    method:'get'
  });
};


export const insertFixedArea = data =>{
  return axios.request({
    url:`fixedArea/insertFixedArea`,
    data:data,
    method:'post'
  });
};

export const updateFixedArea = data =>{
  return axios.request({
    url:`fixedArea/updateFixedArea`,
    data:data,
    method:'put'
  });
};

export const deleteFixedArea = data =>{
  return axios.request({
    url:`fixedArea/deleteFixedArea/${data}`,
    data:null,
    method:'delete'
  });
};


export const saveOrUpdate = data => {
  return data.id ? updateFixedArea(data) : insertFixedArea(data);
};

