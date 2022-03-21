import axios from 'axios';

const service = axios.create({
    //process.env.NODE_ENV === 'development', //来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: 'api',
    //baseURL: '127.0.0.1:8089',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        config.headers['token'] = "16451518491977bccb7474b104b5395fae28132617766|1647853035731";
        config.headers['role_id'] = "16461197675823dd75f2233194189adcb468855b5c343";
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
        } else {
            console.log(response.data.message);
            Promise.reject();
            return response.data;
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
