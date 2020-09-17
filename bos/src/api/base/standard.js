import axios from '@/libs/api.request.js'

export const getStandardList = data => {
  return axios.request({
    url:`standard/listStandard`,
    data:data,
    method:'post'
  });
};

export const insertStandard = data =>{
  return axios.request({
    url:`standard/insertStandard`,
    data:data,
    method:'post'
  });
};

export const updateStandard = data =>{
  return axios.request({
    url:`standard/updateStandard`,
    data:data,
    method:'put'
  });
};

export const deleteStandard = data =>{
  return axios.request({
    url:`standard/deleteStandard`,
    data:data,
    method:'delete'
  });
};

export const getList=()=>{
	return axios.request({
		url:'standard/getList',
		data:null,
		method:'get'
	})
}

export const saveOrUpdate = data => {
  return data.id ? updateStandard(data) : insertStandard(data);
};

