/*
 * @Author: your name
 * @Date: 2021-02-19 16:07:34
 * @LastEditTime: 2021-05-09 01:36:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\api\http.js
 */
// 这是工具类：

import axios from "axios";
import { Message,Loading } from "element-ui";
import { makeArray } from "jquery";
import router from "../router/index"
// 动画与消息提示
// 开始加载动画
var loading;
function startLoading(){
    loading=Loading.service({
        lock:true,
        text:'拼命加载中...',
        background:'rgba(0,0,0,0,7)'
    });
}
//结束加载动画
function endLoading(){
    loading.close()
}


axios.default.timeout = 5000; //超时时间
axios.defaults.withCreadentials = true; //允许跨域
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //响应头
// 基础地址
axios.defaults.baseURL = "/api";

// 请求拦截：
axios.interceptors.request.use(config=>{
    // 加载动画
    startLoading();
    /* 写完“路由守卫”写 */
    if(localStorage.wqToken){
        /* 设置统一的请求头 */
        config.headers.Authorization=localStorage.wqToken
    }
    return config;
},error=>{
    return Promise.reject(error)
});


// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果response里面的接口status是200，说明访问到接口了，否则错误
        if (response.status == 200) {
            endLoading()
            // return Promise.resolve(response);
            console.log("response",response)
            return response;
        } 
        else {
            endLoading()
            return Promise.reject(response);
        }
    },
    // 请求错误的类型
    error => {
        endLoading();
        // 打印的error的信息有msg,message---msg是后台res.json({msg:''})带的
        console.log("当前的错误",error.response.status)
        if (error && error.response) {
            console.log("当前的错误",error)
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求';
                    Message.error(error.message)
                    console.log("错误请求")
                    router.replace({
                        path:'/login',
                        // 存一下当前的路由地址
                        query:{
                            redirect: router.currentRoute.fullPath
                        }
                    })
                    break
                case 401:
                    // 未授权，或者说权限过期
                    error.message = '未授权，请重新登录或权限过期';
                    Message.error(error.message)
                    // ★★★清除过期的token
                    localStorage.removeItem('wqToken')
                    console.log("未授权，请重新登录",error.response.status)
                    // 1秒后进行跳转
                    setTimeout(()=>{
                        router.replace({
                            path:'/login',
                            // 存一下当前的路由地址
                            query:{
                                redirect: router.currentRoute.fullPath
                            }
                        })    
                    },1000)
                    break
                case 403:
                    error.message = '拒绝访问';
                    Message.error(error.message)
                    console.log("权限过期，拒绝访问")
                    break
                case 404:
                    error.message = '请求错误，未找到';
                    Message.error(error.message)
                    console.log("请求错误,未找到该资源")
                    break
                case 405:
                    error.message = '请求方法未允许';
                    Message.error(error.message)
                    console.log('请求方法未允许')
                    break
                case 408:
                    error.message = '请求超时';
                    Message.error(error.message)
                    console.log("请求超时")
                    break
                case 500:
                    error.message = '服务器端出错';
                    Message.error(error.message)
                     // 1秒后进行跳转
                    setTimeout(()=>{
                        router.replace({
                            path:'/login',
                            // 存一下当前的路由地址
                            query:{
                                redirect: router.currentRoute.fullPath
                            }
                        })    
                    },1000)
                    console.log("服务器端出错")
                    break
                case 501:
                    error.message = '网络未实现';
                    Message.error(error.message)
                    console.log("网络未实现")
                    break
                case 502:
                    error.message = '网络错误';
                    Message.error(error.message)
                    console.log("网络错误")
                    break
                case 503:
                    error.message = '服务不可用';
                    Message.error(error.message)
                    console.log("服务不可用")
                    break
                case 504:
                    error.message = '网络超时';
                    Message.error(error.message)
                    console.log("网络超时")
                    break
                case 505:
                    error.message = 'http版本不支持该请求';
                    Message.error(error.message)
                    console.log("http版本不支持该请求")
                    break
                default:
                    error.message = `连接错误${error.response.status}`;
                    Message.error(error.message)
                    console.log(`连接错误${error.response.status}`)

            }

        } else {
            error.message = "连接到服务器失败";
            Message.error(error.message)
            console.log("连接服务器错误")
        }
        return Promise.reject(error)
    })
//封装get方法---如何封装
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        // 封装的方法的上面的形参--用在这里了
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
// 封装post方法
// data数据类型是对象形式的
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        // 封装的方法的上面的形参--用在这里了
        axios.post(url, data)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
