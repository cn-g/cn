import axios from 'axios';
import { inject } from 'vue';
import router from '../router';

const service = axios.create({
    //process.env.NODE_ENV === 'development', //来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: 'http://127.0.0.1:7089',
    //baseURL: '127.0.0.1:8089',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        config.headers['token'] = localStorage.getItem("wtoken")==null?null:localStorage.getItem("wtoken");
        config.headers['role_id'] = localStorage.getItem("wrole_id")==null?null:localStorage.getItem("wrole_id");
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.data.errorCode === 200) {
            return response.data;
        }else if(response.data.errorCode === 401){
            localStorage.removeItem("wtoken");
            localStorage.removeItem("wrole_id");
            localStorage.removeItem("wuser_id");
            router.go(0);
        } else {
            Promise.reject();
            return response.data;
        }
    },error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
