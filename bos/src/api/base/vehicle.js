import axios from '@/libs/api.request.js'

export const getVehicleList = data => {
  return axios.request({
    url:`vehicle/listVehicle`,
    data:data,
    method:'post'
  });
};

export const insertVehicle = data =>{
  return axios.request({
    url:`vehicle/insertVehicle`,
    data:data,
    method:'post'
  });
};

export const updateVehicle = data =>{
  return axios.request({
    url:`vehicle/updateVehicle`,
    data:data,
    method:'put'
  });
};

export const deleteVehicle = data =>{
  return axios.request({
    url:`vehicle/deleteVehicle`,
    data:data,
    method:'delete'
  });
};


export const saveOrUpdate = data => {
  return data.id ? updateVehicle(data) : insertVehicle(data);
};

