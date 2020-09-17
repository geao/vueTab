import axios from '@/libs/api.request.js'

export const getSubAreaList = data => {
  return axios.request({
    url:`subArea/listSubArea`,
    data:data,
    method:'post'
  });
};

export const insertSubArea = data =>{
  return axios.request({
    url:`subArea/insertSubArea`,
    data:data,
    method:'post'
  });
};

export const updateSubArea = data =>{
  return axios.request({
    url:`subArea/updateSubArea`,
    data:data,
    method:'put'
  });
};

export const deleteSubArea = data =>{
  return axios.request({
    url:`subArea/deleteSubArea/${data}`,
    data:null,
    method:'delete'
  });
};


export const saveOrUpdate = data => {
  return data.id ? updateSubArea(data) : insertSubArea(data);
};

// 导出


export const exportSubArea = data =>{
  return axios.request({
    url:`subArea/exportSubArea`,
    data:data,
	responseType: 'blob',
    method:'post'
  });
};



export const getNoSubAreaList = data =>{
  return axios.request({
    url:`subArea/getNoSubAreaList/${data}`,
    data:null,
    method:'get',
	
  });
};

export const updateFixedAreaId = data =>{
  return axios.request({
    url:`subArea/updateFixedAreaId`,
    data:data,
    method:'put'
  });
};













