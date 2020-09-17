import axios from '@/libs/api.request.js'

export const login = data => {
  return axios.request({
    url:`user/login`,
    data:data,
    method:'post'
  });
};

export const getUserInfo  = () =>{
  return axios.request({
    url:`user/profile`,
    data:null,
    method:'get'
  });
};

export const logout = () =>{
  return axios.request({
    url:`user/logout`,
    data:null,
    method:'get'
  });
};
