import axios from '@/libs/api.request.js'

export const getAreaList = data => {
  return axios.request({
    url:`area/listArea`,
    data:data,
    method:'post'
  });
};
export const getList = () => {
  return axios.request({
    url:`area/list`,
    data:null,
    method:'get'
  });
};
export const insertArea = data =>{
  return axios.request({
    url:`area/insertArea`,
    data:data,
    method:'post'
  });
};

export const updateArea = data =>{
  return axios.request({
    url:`area/updateArea`,
    data:data,
    method:'put'
  });
};

export const deleteArea = data =>{
  return axios.request({
    url:`area/deleteArea/${data}`,
    data:null,
    method:'delete'
  });
};


export const saveOrUpdate = data => {
  return data.id ? updateArea(data) : insertArea(data);
};



export const checkSomeName = data =>{
  return axios.request({
    url:`area/checkSomeName`,
    data:data,
    method:'post'
  });
};
