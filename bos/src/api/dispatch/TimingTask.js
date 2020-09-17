import axios from '@/libs/api.request.js'

export const getTimingList = data => {
  return axios.request({
    url:`quartz/list`,
    data:data,
    method:'post'
  });
};
export const isExistJobName = data => {
  return axios.request({
    url:`quartz/isExist`,
    data:data,
    method:'post'
  });
};
export const getJobClassName =()=>{
	return axios.request({
		url:'classes/load',
		data:null,
		method:'get'
	});
}
export const getTimingAdd = data => {
  return axios.request({
    url:`quartz/add`,
    data:data,
    method:'post'
  });
};
export const getTimingUpdate = data => {
  return axios.request({
    url:`quartz/update`,
    data:data,
    method:'put'
  });
};
export const saveOrUpdate = data => {
  return data.id ? getTimingUpdate(data) : getTimingAdd(data);
};
export const TimingPause = data => {
  return axios.request({
    url:`quartz/pause`,
    data:data,
    method:'post'
  });
};
export const TimingResume = data => {
  return axios.request({
    url:`quartz/resume`,
    data:data,
    method:'post'
  });
};
export const TimingRemove = data => {
  return axios.request({
    url:`quartz/remove`,
    data:data,
    method:'post'
  });
};
export const TimingTrigger = data => {
  return axios.request({
    url:`quartz/trigger`,
    data:data,
    method:'post'
  });
};
// export const saveSoldNote = data =>{
//   return axios.request({
//     url:`order/save`,
//     data:data,
//     method:'post'
//   });
// };

// export const updateSoldNote = data =>{
//   return axios.request({
//     url:`order/update`,
//     data:data,
//     method:'put'
//   });
// };

// export const deleteSoldNote = data =>{
//   return axios.request({
//     url:`order/delete`,
//     data:data,
//     method:'delete'
//   });
// };





// export const getUserName = () => {
//   return axios.request({
//     url:`order/getUserName`,
//     data:null,
//     method:'get'
//   });
// };
// export const getProductName = () => {
//   return axios.request({
//     url:`order/getProductName`,
//     data:null,
//     method:'get'
//   });
// };

