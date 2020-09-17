import axios from 'axios'

import store from  '@/store'

import config from '@/config';

import { getToken } from '@/utils/tools';

import { Loading } from 'element-ui';



const baseURL = process.env.NODE_ENV !== 'production' ? config.baseUrl.dev : config.baseUrl.pro;
class HttpRequest {
  constructor(baseUrl = baseURL){
    this.baseUrl = baseUrl;
    this.queue = {};
  }


  //配置config
    getInSideConfig(){
        const config = {
            baseURL:this.baseUrl,
            timeout:200000,
             headers:{
              "Authorization":getToken()
            }
        };
        return config;
    }

//配置拦截
  interceptors(instance,url){ //instance是axios的实例, url是请求的地址
    
    const loading = null;

    //请求拦截
    instance.interceptors.request.use(config=>{
          if(!Object.keys(this.queue).length){
            //添加全局的loading
          }
          this.queue[url] = true; // 标记: 确认
          return config;
        },
        error=>{
          return Promise.reject("请求前出现错误,错误是:"+error);
        });

    //响应拦截
    instance.interceptors.response.use(res=>{
        
		if(res.status == 500){
        this.$Message.info("您的网络不稳定, 请稍后再试...");
    }



      delete this.queue[url];
      
      return res;
    },
    error=>{
      delete this.queue[url];
      return Promise.reject("请求后出现错误,错误是:"+error);
    });
  }

  //实例化axios
  request(options){
    const instance = axios.create();
    options = Object.assign(this.getInSideConfig(),options);//合并配置
    
	this.interceptors(instance,options.url);
	return instance(options);
  }
}

export default HttpRequest;
