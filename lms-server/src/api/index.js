/*
 * @Author: your name
 * @Date: 2021-02-19 16:17:54
 * @LastEditTime: 2021-05-09 01:30:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\api\index.js
 */

import {get,post} from './http.js'

/* 用户相关########## */
// 注册
export const addUser=(params={})=>post(`admin/register`,params)
// 登陆
export const loginUser=(params={})=>post(`admin/login`,params)
// 获取用户信息---根据名字----【因为vuex已经存储了token的信息---利用vuex】--为了响应拦截
export const oneUser=(data)=>get(`admin/oneAdmin/${data}`)
// 更新用户的信息
export const modifyUser=(params={},id)=>post(`admin/modify/${id}`,params)
// 获取所有的人---包括管理员--待会过滤
export const allUser=()=>get(`admin/allAdmin`)
// 根据id删除
export const deleteUser=(id)=>get(`admin/delete/${id}`)


/* 订单相关########## */
// 添加订单
export const addPackage=(params={})=>post(`package/add`,params)
// 查询所有的订单
export const allPackage=()=>get(`package/all`)
// 根据订单号(id)查询
export const byCode=(code)=>get(`package/bycode/${code}`)
// 根据用户名查询
export const byName=(name)=>get(`package/byname/${name}`)
// 根据id修改数据
export const Modify=(id,params={})=>post(`package/modify/${id}`,params)
// 根据id删除数据
export const Delete=(id)=>get(`package/delete/${id}`)


/* 车辆相关########### */
// 查询所有的车辆
export const allCar=()=>get(`car/allcar`)
// 添加车辆
export const addCar=(params={})=>post(`car/addcar`,params)
// 修改车辆---根据id
export const modifyCar=(id,params={})=>post(`car/modifycar/${id}`,params)
// 删除车辆---根据id
export const deleteCar=(id)=>get(`car/deletecar/${id}`)


/*轮播相关########### */
// 查询全部的图
export const getcarousel=()=>get(`webinfo/all`)
// 更换多个图片
export const ManyPic=(params)=>post(`webinfo/upmany`,params)
// 更换单个图片
export const OnePic=(params={})=>post(`webinfo/upone`,params)


/* 物流介绍相关############## */
// 查询全部的
export const allLog=()=>get(`log/all`)
// 查询某条介绍信息---根据类别+标题
export const findLog=(params={})=>post(`/log/find`,params)
// 更新某条介绍信息---根据类别+标题
export const updateLog=(params={})=>post(`/log/update`,params)
// 删除某条介绍信息---根据类别+标题
export const deleteLog=(params={})=>post(`/log/delete`,params)


/* 新闻相关####### */
// 查询全部的新闻
export const allNew=()=>get(`new/all`)
// 添加新闻
export const addNew=(params)=>post(`new/add`,params)
// 根据title查询
export const oneNew=(title)=>get(`new/one/${title}`)
// 根据title更新
export const updateNew=(title,params={})=>post(`new/update/${title}`,params)
// 根据title删除
export const deleteNew=(title)=>get(`new/delete/${title}`)
