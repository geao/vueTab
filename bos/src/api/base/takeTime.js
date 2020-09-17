import axios from '@/libs/api.request.js'

export const getTakeTimeList = data => {
  return axios.request({
    url:`takeTime/listTakeTime`,
    data:data,
    method:'post'
  });
};

export const insertTakeTime = data =>{
  return axios.request({
    url:`takeTime/insertTakeTime`,
    data:data,
    method:'post'
  });
};

export const updateTakeTime = data =>{
  return axios.request({
    url:`takeTime/updateTakeTime`,
    data:data,
    method:'put'
  });
};

export const disableTakeTime = data =>{
  return axios.request({
    url:`takeTime/disableTakeTime`,
    data:data,
    method:'put'
  });
};


export const saveOrUpdate = data => {
  return data.id ? updateTakeTime(data) : insertTakeTime(data);
};

