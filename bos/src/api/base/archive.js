import axios from '@/libs/api.request.js'

export const getArchiveList = data => {
  return axios.request({
    url:`archive/listArchive`,
    data:data,
    method:'post'
  });
};

export const insertArchive = data =>{
  return axios.request({
    url:`archive/insertArchive`,
    data:data,
    method:'post'
  });
};

export const updateArchive = data =>{
  return axios.request({
    url:`archive/updateArchive`,
    data:data,
    method:'put'
  });
};

export const deleteArchive = data =>{
  return axios.request({
    url:`archive/deleteArchive`,
    data:data,
    method:'delete'
  });
};


export const saveOrUpdate = data => {
  return data.id ? updateArchive(data) : insertArchive(data);
};

// --------------------------------------------------------------------------------------------


export const getSubArchiveList = data => {
  return axios.request({
    url:`archive/listSubArchive`,
    data:data,
    method:'post'
  });
};

export const insertSubArchive = data =>{
  return axios.request({
    url:`archive/insertSubArchive`,
    data:data,
    method:'post'
  });
};

export const updateSubArchive = data =>{
  return axios.request({
    url:`archive/updateSubArchive`,
    data:data,
    method:'put'
  });
};

export const subSaveOrUpdate = data => {
  return data.id ? updateSubArchive(data) : insertSubArchive(data);
};
export const deleteSubArchive = data =>{
  return axios.request({
    url:`archive/deleteSubArchive`,
    data:data,
    method:'delete'
  });
};