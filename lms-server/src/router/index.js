/*
 * @Author: your name
 * @Date: 2021-02-12 21:23:34
 * @LastEditTime: 2021-04-24 18:16:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
// 个人的管理的路由
import Home from '../views/Home.vue'
import Odd from '../views/odd.vue'
// 管理员--超管管理的路由
import Ahome from '../views/Ahome.vue'
import AinfoShow from '../views/Ainfo.vue'
import Amodify from '../views/AinfoModify.vue'
import Corder from '../views/corder.vue'
import CorderView from '../views/corderView.vue'
import Sorder from '../views/sorder.vue'
import SorderView from '../views/sorderView.vue'
import Dorder from '../views/dorder.vue'
import DorderView from '../views/dorderView.vue'
import Dcar from '../views/dCar.vue'
import User from '../views/usermanage.vue'
import Admin from '../views/adminmanage.vue'
import Vehicle from '../views/vehicleAdd.vue'
import VehicleS from '../views/vehicleSearch.vue'
import Pic from '../views/picmanage.vue'
import Pic1 from '../views/picmanage1.vue'
import Log from '../views/logmanage.vue'
import New from '../views/newmanage.vue'
import Check from '../views/check.vue'


import Not from '../components/404.vue'
import Money from '../views/money.vue'
import Register from '../views/lmsregister.vue'
import Login from '../views/lmslogin.vue'
import Source from '../views/source.vue'
import Order from '../views/sourceOrder.vue'
import Service from '../views/sourceService.vue'
import Linkage from '../components/linkage.vue'
import Location from '../components/getLocation.vue'
import Cost from '../components/sourceServerCost.vue'
import Cover from '../components/sourceServerCover.vue'
import Area from '../components/sourceServerNetwork.vue'
import Stand from '../components/sourceServerStandard.vue'
/* 新闻详情 */
import NewOne from '../views/sourceNewOne.vue'
import NewTwo from '../views/sourceNewTwo.vue'
import NewThree from '../views/sourceNewThree.vue'
import NewFour from '../views/sourceNewFour.vue'
/* 管理员的后台 */
import Super from '../views/super.vue'

import Test from '../components/test.vue'
import Test1 from '../components/test1.vue'


Vue.use(VueRouter)


const routes = [
  {
    path:'/',
    redirect:'/register'
  },
  {
    path:'/test',
    name:'Test',
    component:Test
  },
  {
    path:'/test1',
    name:'Test1',
    component:Test1
  },
  {
    path:'/money',
    name:'Money',
    component:Money
  },
  {
    path:'/location',
    name:'Location',
    component:Location
  },
  {
    path:"/source",
    name:"Source",
    component:Source
  },
  /* 辅助路由 */
  {
    path:"/source1",
    name:"Source",
    component:Source
  },
  {
    path:"/source2",
    name:"Source",
    component:Source
  },
  {
    path:"/source3",
    name:"Source",
    component:Source
  },
  {
    path:"/source4",
    name:"Source",
    component:Source
  },
  {
    path:"/source5",
    name:"Source",
    component:Source
  },
  {
    path:"/source6",
    name:"Source",
    component:Source
  },
  {
    path:"/source7",
    name:"Source",
    component:Source
  },

  
  {
    path:"/new1",
    name:"NewOne",
    component:NewOne
  },
  {
    path:"/new2",
    name:"NewTwo",
    component:NewTwo
  },
  {
    path:"/new3",
    name:"NewThree",
    component:NewThree
  },
  {
    path:"/new4",
    name:"NewFour",
    component:NewFour
  },
  // 订单页面的子路由
  {
    path:'/order',
    component:Order,
    children:[
      {
        path:'cost',
        component:Cost
      },
      {
        path:'cover',
        component:Cover
      },
      {
        path:'area',
        component:Area
      },
      {
        path:'stand',
        component:Stand
      }
    ]
  },
  {
    path:"/service",
    name:"Service",
    component:Service
  },
  {
    path:"/linkage",
    name:"Linkage",
    component:Linkage
  },
  // 管理员后台的多级路由
  {
    path:"/super",
    name:"Super",
    component:Super,
    children:[
      {
        path:"/",
        name:"Ahome",
        component:Ahome
      },
      {
        path:"/ahome",
        name:"Ahome",
        component:Ahome
      },
      /* 个人信息---信息修改---个人订单 */
      {
        path:'/ainfoShow',
        name:"AinfoShow",
        component:AinfoShow
      },
      {
        path:'/amodify',
        name:"Amodify",
        component:Amodify
      },
      {
        path:'/aodd',
        name:"Odd",
        component:Odd
      },
      /* 管人 */
      // 用户管理
      {
        path:'/check',
        name:"Check",
        component:Check
      },
      {
        path:'/user',
        name:"User",
        component:User
      },
      // 管理员管理
      {
        path:'/admin',
        name:"Admin",
        component:Admin
      },
      /* 前台页面信息 */
      {
        path:'/pic',
        name:"Pic1",
        component:Pic1
      },
      /* 车辆管理 */
      {
        path:'/vehicleadd',
        name:"Vehicle",
        component:Vehicle
      },
      {
        path:'/vehiclesearch',
        name:"VehicleS",
        component:VehicleS
      },
      /* 物流介绍 */
      {
        path:'/log',
        name:"Log",
        component:Log
      },
      /* 新闻 */
      {
        path:'/new',
        name:"New",
        component:New
      },
      // 订单管理
      /* 收货 */
      {
        path:'/corder',
        name:"Corder",
        component:Corder
      },
      {
        path:'/corderView',
        name:"CorderView",
        component:CorderView
      },
      /* 发货 */
      {
        path:'/sorder',
        name:"Sorder",
        component:Sorder
      },
      {
        path:'/sorderView',
        name:"SorderView",
        component:SorderView
      },
      /* 配送 */
      {
        path:'/dorder',
        name:"Dorder",
        component:Dorder
      },
      {
        path:'/dorderView',
        name:"DorderView",
        component:DorderView
      },
      // 配车
      {
        path:'/dcar',
        name:"Dcar",
        component:Dcar
      }
    ]
  },
  // 个人后台的多级路由
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children:[
      {
        path:"/",
        name:"Home",
        component:Home
      },
      {
        path:"/home",
        name:"Home",
        component:Home
      },
      {
        path:'/infoShow',
        name:"AinfoShow",
        component:AinfoShow
      },
      {
        path:'/modify',
        name:"Amodify",
        component:Amodify
      },
      {
        path:'/odd',
        name:"Odd",
        component:Odd
      }
    ]
  },
  {
    path:"/register",
    name:"Register",
    component:Register
  },
  {
    path:"/login",
    name:"Login",
    component:Login
  },
  {
    path:'*',
    name:"Not",
    component:Not
  }
]

const router = new VueRouter({
  routes
})

/* 路由守卫---没有登录之前是不能访问主页的 */
router.beforeEach((to, from, next) => {
  var isLogin=localStorage.wqToken ?true:false  //wqToken是本地存储登录时从后台获取的token的键名
  /* 当前的路由状态 */
      if(to.path=='/login' || to.path=='/register'){
          next();
  }else{ 
      //          为真(true)     为假(false)
          isLogin ?  next():next('/login') ;
      }
  })
  

export default router
