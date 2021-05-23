<!--
 * @Author: your name
 * @Date: 2021-02-23 10:53:38
 * @LastEditTime: 2021-04-24 01:18:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\components\sourceMenu.vue
-->
<template>
    <div class="Menu">
        <el-row class="navMenu" type="flex" justify="space-around" align="middle">
            <el-col :span="4">
                <div class="img"></div>
            </el-col>
            <!-- 增加了2 -->
            <el-col :span="14">
                <div class="menu">
                    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" router text-color="black" background-color="#ffffff" active-text-color="#f6003c" mode="horizontal" style="border:none;" @select="handleSelect">
                        <!-- 1级 -->
                        <template v-for="item in menuList">
                            <el-submenu v-if="item.children" :index="item.index" v-bind:key="item.index">
                                <template slot="title">
                                    <span slot="title">{{item.title}}</span>
                                </template>
                                <!-- 2级 -->
                                <template v-for="item2 in item.children">
                                    <el-submenu v-if="item2.children" :index="item2.index" v-bind:key="item2.index" id="two">
                                        <template slot="title">
                                            <span slot="title" class="title">{{item2.title}}</span>
                                        </template>
                                        <!-- 3级 -->
                                        <template v-for="(citem,cindex) in item2.children" >
                                            <el-menu-item :index="citem.index" :key="cindex" style="border:0 !important;">
                                                <template slot="title">
                                                    <span slot="title">{{citem.title}}</span>
                                                </template>
                                            </el-menu-item>
                                        </template>
                                    </el-submenu>
                                    <!-- 检查2级的孩子有没有null -->
                                    <template v-else> 
                                        <template>
                                            <el-menu-item :index="item2.index" :key="item2.index" id="twoOne" v-on:click="threeMenu(item2.index,item2.title)"> 
                                                <template slot="title">
                                                    <span slot="title" class="title">{{item2.title}}</span>
                                                </template>
                                            </el-menu-item>
                                        </template>
                                    </template>
                                </template>
                            </el-submenu>
                            <!-- 检查1级的孩子有没有null -->
                            <template v-else> 
                                <template>
                                    <el-menu-item :index="item.index" :key="item.index" id="one"> 
                                        <template slot="title">
                                            <span slot="title">{{item.title}}</span>
                                        </template>
                                    </el-menu-item>
                                </template>
                            </template>
                        </template>
                    </el-menu>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="user">
                    <el-avatar shape="square" size="large" :src="user.avatar" style="width:50px;height:50px;"></el-avatar>
                    <div class="userInfo">
                        <p style="padding-top:10px;font-weight:bold;font-size:12px;">欢迎</p>
                        <p style="font-weight:bold;font-size:14px;color:#263859;">{{user.name}}</p>
                    </div>
                    <div class="select">
                        <el-dropdown trigger="click" @command="setDialogInfo" style="border:none;">
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command="info">个人后台</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            
        </el-row>
    </div>
</template>              

<script>
import {allLog,oneUser} from '../api/index.js'
export default {
    data(){
        return{
            // 获取vuex存储的用户名 
            user:{},
            // 合二为一-----快递服务+快运服务
            Infolists:[],
            menuList:[
                {
                    index:'source',
                    title:"首页",
                    // children:[]
                },
                {
                    index:"11",
                    title:"快递服务",
                    children:[
                        {
                            index:"source1",
                            title:"绝影特快",
                        },
                        {
                            index:"source2",
                            title:"绝影标快",
                        }
                    ]
                },
                {
                    index:"22",
                    title:"快运服务",
                    children:[
                        {
                            index:"source3",
                            title:"重货包裹",
                        },
                        {
                            index:"source4",
                            title:"整车直达",
                        }
                    ]
                },
                {
                    index:"33",
                    title:"服务支持",
                    children:[
                        {
                            index:"source5",
                            title:"寄件",
                        },
                        {
                            index:"source6",
                            title:"查件",
                        },
                        {
                            index:"source7",
                            title:"服务查询",
                        }
                    ]
                },
                {
                    /* 为了拦截检查是否拥有权限，所以导航为空 */
                    index:"",
                    title:"后台",
                    // children:[]
                }
            ]
        }
    },
    created(){
        this.getUser()

        this.getlog()
        console.log('导航的',this.Infolists)
    },
    computed:{
        onRoutes(){
            return this.$route.path.replace("/", "");
        },
    },
    methods:{
        handleSelect(key,keyPath){
            console.log("打开的导航的信息",key,keyPath);
            if(key==''){
                if(this.user.identity=='employee'){
                    this.$message({
                        message: '您不是管理员，没有权限',
                        type: 'error'
                    })
                }
                if(this.user.identity=='employer' && this.user.status=='checking'){
                    this.$message({
                        message: '您还在审核中，请等待',
                        type: 'warning'
                    })
                }
                if(this.user.identity=='employer' && this.user.status=='checked' || this.user.identity=='super'){
                    // 跳转到管理员后台的界面
                    this.$router.push("/super")
                }
            }
        },
        // 判断点击了什么按钮
        setDialogInfo(val){
            console.log("选择不同选择的值",val)
            switch(val){
                case "info":
                    if(this.user.identity!="employee"){
                        this.$router.push("/super")
                    }else if(this.user.identity=="employee"){
                        this.$router.push('/index')
                    }
                    break;
                case "logout":
                    localStorage.removeItem('wqToken')
                    this.$store.dispatch("clearCurrentState")
                    this.$router.push("/login")
            }
        },
        // 获取物流介绍的信息
        getlog(){
            allLog()
            .then((res)=>{
                console.log("获取全部的物流介绍成功",res)
                this.Infolists=res.info
            })
            .catch((err)=>{
                console.log("获取全部的物流介绍失败",err)
            })
        },
        // 三级路由
        threeMenu(index,val){
            console.log("三级路由",val)
            this.Infolists.find((item,index)=>{
                if(item.title==val){
                    this.$router.push({path:'/service',query:{info:JSON.stringify(item)}})
                    this.$emit('update')
                }else if(val=='寄件'){
                    this.$router.push({path:'/order',query:{currentindex:JSON.stringify(0)}})
                    this.$emit('update1')
                }else if(val=='查件'){
                    this.$router.push({path:'/order',query:{currentindex:JSON.stringify(1)}})
                    this.$emit('update1')
                }else if(val=='服务查询'){
                    this.$router.push({path:'/order',query:{currentindex:JSON.stringify(2)}})
                    this.$emit('update1')
                }
            })
        },
        /* 请求用户的信息 */
        getUser(){
            oneUser(this.$store.state.user.name)
            .then((res)=>{
                res.info.avatar=`${this.$store.state.host}/${this.$store.state.user.avatar}`
                console.log("首页头部请求用户成功",res)
                this.user=res.info
            })
            .catch((err)=>{
                console.log("首页头部请求用户失败",err)
            })
        },
    },
}
</script>

<style>
.Menu{
    width:100vw;
    height:auto;
    /* border:1px solid red; */
}

.el-menu-item{
    min-width: 100px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: border-color 0s,background-color 0s,color 0s !important;  /* 修改时间--覆盖掉原来的动画 */
}

.el-menu-vertical-demo .el-menu-item:hover{
    outline: 0 !important;
    color: red !important;
    background-color: white !important;
    font-weight: bold !important;
    border:2px solid red ;
    border-bottom-color: red !important;
    border-right-style:none;
    border-left-style:none;
}

/* el-menu--popup el-menu--popup-bottom-start */
.el-menu--popup{
    min-width:120px !important;
}
#two{
    width:100%;
}
/* 子菜单的背景---快递服务的背景 */
#two .el-submenu__title{
    height:40px !important;
    margin:-3px 10px !important;
    padding:0  10px !important;
    text-align: left;
    display: flex;
    align-items: center;
    /* border:1px solid purple; */
    position: relative;  /* 为了将边框与文字保持一致 */
}
/* 子菜单的字体---快递服务 */
.title{
    width:100%;
    height:30px;
    /* border:1px solid green; */
    border:0;
    display: block;
    padding:0 8px;
    position: absolute;
    top:4px;
    line-height: 30px;
    margin-left:-4px;
    /* border:1px solid orangered; */
}
/* 子菜单的字体---快递服务(鼠标移动时) */
#two .el-submenu__title:hover .title{
    /* width:80%; */
    color:red !important;
    border:2px solid red;
    border-top-style: none;
    border-bottom-style: none;
    border-right-style: none;
}
#two .el-submenu__title:hover{
    border:0;
}
#two div:nth-child(2) ul{
    margin-left:0px !important; 
}
#two div:nth-child(2) ul li:hover{
    outline: 0 !important;
    color: red !important;
    background-color: white !important;
}



#twoOne{
    margin:0  20px;
    padding-left:15px;
    display: flex;
    justify-content: center;
    align-items: center;
    height:30px;
    text-align: center;
    /* border:1px solid red; */
}

#twoOne:hover{
    border:2px solid purple;
    border-top-style: none;
    border-bottom-style: none;
    border-right-style: none;
    background-color: white !important;
}

.el-menu-vertical-demo .el-submenu:hover{
    border:2px solid red;
    border-top-style: none;
    border-left-style: none;
    border-right-style: none;
}
.el-menu-vertical-demo .el-submenu div:hover{
    cursor: default;
}
.el-submenu__title{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.el-submenu__title:hover {
    outline: 0 !important;
    color: red !important;
    background-color: white !important;
    font-weight: bold !important;
    border:2px solid red;
    border-bottom-style:none;
    border-right-style:none;
    border-left-style:none;
    transition: border-color 0s,background-color 0s,color 0s !important;  /* 修改时间--覆盖掉原来的动画 */
}

.img{
    width:140px;
    height:140px;
    border-radius: 50%;
    background: url("https://s3.jpg.cm/2021/03/26/KwjEz.png") no-repeat center; 
    background-size: 100% 100%;
    position: relative;
    left:48%;
    /* left:54%; */
}
.user{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 20%;
}
.userInfo{
    margin-left: 2%;
    width:auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.select{
    margin-left: 1%;
    margin-top: 3px;
}
</style>
