<template>
    <div :class="collapse===true ?'info-show':'info-showOne'" >
        <el-row>
            <el-col :span="8"  class="row-bg">
                <div class="user">
                    <img :src="img" class="avatar">
                </div>
            </el-col>
            <el-col :span="16" class="row-bg1">
                <div class="userinfo">
                    <div class="news">
                        <div class="newsOne">
                            <i class="el-icon-s-custom"></i>
                            <span class="tip">用户名：</span>
                        </div>
                        <p class="newsTwo">{{person.name}}</p>
                    </div>
                    <div class="news">
                        <div>
                            <i class="fa fa-mars-double"></i>
                            <span class="tip">性别：</span>
                        </div>
                        <p class="newsTwo">{{person.sex}}</p>
                    </div>
                    <div class="news">
                        <div class="newsOne">
                            <i class="el-icon-user"></i>
                            <span class="tip">年龄：</span>
                        </div>
                        <p class="newsTwo">{{person.age}}</p>
                    </div>
                    <div class="news">
                        <div class="newsOne">
                            <i class="el-icon-message"></i>
                            <span class="tip">邮箱：</span>
                        </div>
                        <p class="newsTwo">{{person.email}}</p>
                    </div>
                    <div class="news address">
                        <div class="newsOne">
                            <i class="fa fa-home"></i>
                            <span class="tip">地址：</span>
                        </div>
                        <p class="newsTwo">{{person.address}}</p>
                    </div>
                    <div class="news">
                        <div class="newsOne">
                            <i class="fa fa-history"></i>
                            <span class="tip">注册时间：</span>
                        </div>
                        <p class="newsTwo">{{person.registerDate}}</p>
                    </div>
                    <div class="news">
                        <div class="newsOne">
                            <i class="el-icon-user-solid"></i>
                            <span class="tip">身份：</span>
                        </div>
                        <p class="newsTwo">{{identity}}</p>
                    </div>
                    <div class="news">
                        <div class="newsOne">
                            <i class="el-icon-s-order"></i>
                            <span class="tip">备注：</span>
                        </div>
                        <p class="newsTwo">{{person.remark}}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {oneUser} from '../api/index.js'
import bus from '../assets/js/bus.js'
export default {
    data(){
        return{
            collapse:true,
            person:{},
            identity:"",
        }
    },
    mounted() {
        
    },
    created(){
        /* 关于导航栏收缩时的变化产生的前提 */
        bus.$on('collapse',msg=>{
            console.log('个人信息--接受的数据collapse',msg)
            this.$store.dispatch("setIsCollapse",msg)
            this.collapse=this.$store.state.collapse
        })
        this.collapse=this.$store.state.collapse
        console.log('info--接受的数据collapse',this.collapse)

        /* 获取用户的信息 */
        console.log("获取的vuex",this.$store.state.user.name)

        // var time=(new Date()).getTime()
        oneUser(this.$store.state.user.name)
        .then((res)=>{
            console.log("获取的用户的信息成功",res)
            // 格式化--性别
            if(res.info.sex=="1"){
                res.info.sex="男"
                this.person=res.info
            }
            if(res.info.sex=="2"){
                res.info.sex="女"
                this.person=res.info
            }
            if(res.info.sex=="3"){
                res.info.sex="不明"
                this.person=res.info
            }
            // 格式化--时间
            let date = new Date(this.person.registerDate);
            this.person.registerDate=date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            this.person.registerDate=this.person.registerDate.substr(0,10).replace(/-/g,'.')

            console.log("改动的person",this.person)

            // 获取用户的头像
            this.img=`${this.$store.state.host}/${this.$store.state.user.avatar}`

            /* 判断身份 */
            if(this.person.identity=='employee'){
                this.identity="普通用户"
            }else if(this.person.identity=='employer'){
                this.identity="管理员"
            }else if(this.person.identity=='super'){
                this.identity="超级管理员"
            }
        })
        .catch((err)=>{
            console.log("获取用户信息失败",err)
        })
    },
    methods:{
        
    },
}
</script>

<style scoped>
.info-showOne{
    position: relative;
    width:87vw;  /* 相对于导航栏的宽度而定的 */
    height:100vh;
    /* background: url("https://s3.jpg.cm/2021/03/28/hnpHE.jpg") center no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    top:-2px;
    left:13vw;
    transition:left  1s;
    background-color: #eae3e3;
    /* border:4x solid hotpink; */
}
.info-show{
    position: relative;
    width:calc(100vw - 63px);
    height:100vh;
    /* background: url("https://s3.jpg.cm/2021/03/28/hnpHE.jpg") center no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    top:-2px;
    left:63px;
    transition:left  1s;
    background-color: #eae3e3;
    /* border:1px solid aqua; */
}

.row-bg{
    width:33vw;
    height:100vh;
    background-color: #ffffff;
    /* border:2px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left:-3.5%;
}
.user{
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border:2px solid purple; */
}
.avatar{
    display: flex;
    width:140px;
    height:140px;
    border-radius: 50%;
    margin-right: 15%;
}
.row-bg1{
    width:70%;
    height:100%;
    background-color: #ccc;
    height: 100vh;
    position: relative;
    /* border:2px solid green; */
    position: absolute;
    left:30.6%;
}
.userinfo{
    position: absolute;
    top:-60px;
    bottom: 0;
    left:0;
    right:0;
    margin: auto;
    width:70%;
    height:60%;
    display: flex;
    flex-direction: row;
    align-content: center;
    flex-wrap: wrap;
}
.tip{
    margin-left: 5px;
    font-size: 14px;
    font-weight: bold;
}
.news{
    width:150px;
    height:70px;
    margin-left:30px; 
    margin-top: 20px;
    text-align: center;
    background-color: #a39e9e;
    /* border:1px solid red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.newsOne{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width:100%;
    height:20px;
    margin-top: 11px;
    /* border:1px solid green; */
}
.newsTwo{
    width:100%;
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;  
    text-overflow:ellipsis; 
    overflow:hidden;
    color:#2d2d2d;

    /* border:1px solid red; */
}

</style>

