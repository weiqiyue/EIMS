<template>
    <div class="head-nav">
        <el-row>
            <el-col :span="6" class="logo-container">
                <img src="https://s3.jpg.cm/2021/03/26/KwjEz.png" class="logo">
                <span class="title">绝影物流管理系统</span>
            </el-col>
            <el-col :span="6" :offset="12" class="user">
                <div class="userinfo">
                    <img :src="user.avatar" class="avatar">
                    <div class="welcome">
                        <p class="comename">欢迎</p>
                        <p class="avatarname">{{user.name}}</p>
                    </div>
                    <span class="username">
                        <el-dropdown trigger="click" @command="setDialogInfo">
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="back">返回前台</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import bus from '../assets/js/bus.js'
import {oneUser} from '../api/index.js'
export default {
    data(){
        return{
            collapse:true,
            user:{},   //存储用户的信息
        }
    },
    created() {
        console.log("解析的token的数据",this.$store.state.user)
        this.getUser()
    },
    mounted() {
    },
    methods:{
        setDialogInfo(value){
            console.log("获取到的数据",value)
            switch(value){
                case "back":
                    // this.showInfoList();
                    this.$router.push("/source")
                    this.collapse=true
                    this.$store.dispatch("setIsCollapse",this.collapse)
                    break;
                case "logout":
                    this.logout();
                    break;
            }
        },
        showInfoList(){
            console.log("点击了info")
            this.$router.push('/infoShow')
            // this.collapse=!this.collapse
            console.log("当前collapse的状态-头部的",this.collapse)
            bus.$emit("collapse",this.collapse)
        },
        // 退出--就是使登录状态为false，用户信息为空
        logout(){
            console.log("点击了退出")
            // 清除token
            localStorage.removeItem('wqToken')
            // 调用vuex的store的actions
            this.$store.dispatch('clearCurrentState');
            // 跳转页面
            this.$router.push("/login")
        },
        /* 请求用户的信息 */
        getUser(){
            oneUser(this.$store.state.user.name)
            .then((res)=>{
                res.info.avatar=`${this.$store.state.host}/${this.$store.state.user.avatar}`
                console.log("导航头部请求用户成功",res)
                this.user=res.info
            })
            .catch((err)=>{
                console.log("导航头部请求用户失败",err)
            })
        },
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .head-nav{
        width:100%;
        height:60px;
        min-width:600px;
        padding: 5px;
        background:#324057;
        color: #fff;
        border-bottom: 1px solid #1f2d3d;
        padding-left: 0;
        padding-top: 0;
    }
    .logo-container{
        height:58px;
        /* margin-top: 3px; */
        position: relative;
        display: flex;
        flex-direction: row;
        align-content: space-around;
        /* border:1px solid green; */
        position: relative;
    }
    .logo{
        position: absolute;
        width:90px;
        height:100%;
        margin-left: -1.2%;
        /* border:1px solid red; */
    }
    .title{
        display: block;
        line-height: 60px;
        margin-left: -1.6%;
        font-size: 20px;
    }
    .user{
        height:60px;
        /* margin-top:0px; */
        display: flex;
        justify-content: flex-end;
    }
    .userinfo{
        width:auto;  /* 为了适应更长的名字 */
        min-width: 8%;
        height:100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        position: absolute;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-right: 6%;
    }
    .avatar{
        width:60px;
        height:60px;
        border-radius: 50%;
    }
    .welcome{
        width:auto;
        /* height:60px; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* align-items: flex-start; */
    }
    .comename{
        font-size: 12px;
    }
    .avatarname{
        padding-top: 5px;
        font-size: 14px;
        color:#409eff;
    }
    .username{
        display: block;
        height:60px;
        line-height: 60px;
    }
    .el-icon--right{
        color:#fff;
    }

</style>
