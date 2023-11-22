export const axios = require('axios'); // 生成一个axios实例
// axios.defaults.baseURL = '/apis'; // 设置请求后端的URL地址
axios.defaults.timeout = 5000; // axios请求超时时间
// axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json'; // axios发送数据时使用json格式
axios.defaults.transformRequest = data => JSON.stringify(data); // 发送数据前进行json格式化

// 请求拦截器
axios.interceptors.request.use(config => {
    //在请求头带上token
    if (localStorage.getItem("token")) {
        config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
    // 响应码 2xx
    return response;
}, error => {
    let rsp;
    // 重置error内容
    if (error.response) {
        // 有回包，但响应码不是2XX
        rsp = error.response;
    } else if (error.request) {
        // 没有回包
        rsp = {
            request: error.request,
            data: {
                code: 500,
                msg:  "服务器无响应"
            }
        }
    } else {
        // 设置Request时出错
        rsp = {
            data: {
                code: 501,
                msg:  "请求失败"
            }
        }
    }
    return Promise.reject(rsp);
});