/*
 * @Author: your name
 * @Date: 2021-03-26 13:37:57
 * @LastEditTime: 2021-04-16 08:59:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* 存储解析后的token */
var types={
  SET_AUTHENTICATED:'SET_AUTHENTICATED',
  SET_USER:'SET_USER'

}

var state={
  host:'http://localhost:3000',
  collapse:true,  //折叠按钮属性
  code:"",  //source页面查询的运单号
  sourceFlag:false, //source页面用来出发sourceorder页面事件的标识符
  isAuthenticated:false,   //存储是否登录了
  user:{}  //存储登录的信息

}
/* 如果想要得到state中的数据最好---不要从getters中获取 */
var getters={
  collapse:(state)=>{
    return state.collapse
  },
  isAuthenticated:(state)=>{
    return state.isAuthenticated
  },
  user:(state)=>{
      return state.user
  }
}
var mutations={
  isCollapse(state,collapse){
    state.collapse=collapse
  },
  isCode(state,code){
    state.code=code
  },
  isSourceFlag(state,sourceFlag){
    state.sourceFlag=sourceFlag
  },
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    if(isAuthenticated){   //如果登录了，就为true
        state.isAuthenticated=isAuthenticated
    }else{
        state.isAuthenticated=false
    }
  },
  [types.SET_USER](state,user){
      if(user){  //如果有信息就保存
          state.user=user
          console.log("调用了moutions",user)
      }else{
          state.user=''
      }
  }

}
var actions={
  setIsCollapse:(context,collapse)=>{
    context.commit("isCollapse",collapse)
  },
  setCode(context,code){
    context.commit('isCode',code)
  },
  setSourceFlag(context,sourceFlag){
    context.commit('isSourceFlag',sourceFlag)
  },
  setAuthenticated:(context,isAuthenticated)=>{
    context.commit(types.SET_AUTHENTICATED,isAuthenticated)
  },
  setUser:(context,user)=>{
      context.commit(types.SET_USER,user)
  },
  // 点击退出，改变登陆状态以及置空登录信息
  clearCurrentState:(context)=>{
    context.commit(types.SET_AUTHENTICATED,false)
    context.commit(types.SET_USER,"")
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
  }
})
