import axios from '@/libs/api.request.js'

export const testExport = () => {
  return axios.request({
    url:`excel/export`,
    data:null,
	responseType: 'blob',
    method:'get',
  });
};