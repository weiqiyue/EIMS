<!--
 * @Author: your name
 * @Date: 2021-02-23 11:17:26
 * @LastEditTime: 2021-05-08 23:02:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\views\sourceService.vue
-->
/* 服务页面 */
<template>
    <div class="Server">
        <!-- 导航栏组件 -->
        <sourcemenu v-on:update="getInfo"></sourcemenu>
        <!-- 大图 -->
        <div class="serverImg">
            <img src="https://s3.jpg.cm/2021/03/03/0vi1T.png">
        </div>
        <!-- 导航栏 -->
        <div class="serverMenu">
            <ul>
                <li v-for="(item, index) in serverMenu" :key="index" >
                    <a :href="item.id" v-on:click="serverClick(index)" :class="{serveractive:index==currentIndex}">{{item.name}}</a>
                    <!-- {{item.name}} -->
                </li>
            </ul>
        </div>
        <!-- 标题1 -->
        <div class="serverTitleOne" id="onemenu">
            {{odd.title}}
        </div>
        <!-- 内容1 -->
        <div class="serverContentOne">
            <!-- 内容1图像部分 -->
            <div class="serverContentOneImg">
                <img :src="odd.img">
            </div>
            <!-- 内容1文字部分 -->
            <div class="serverContentOneWord">
                <p>{{odd.content}}</p>
                <el-button type="danger" style="margin-left:-70%;">马上寄件</el-button>
            </div>
        </div>
        <!-- 标题2 -->
        <div class="serverTitleTwo" id="twomenu">
            产品优势
        </div>
        <!-- 内容2 -->
        <div class="serverContentTwo">
            <div class="serverContentTwoText" v-for="(item, index) in odd.text" :key="index">
                <img :src="item.pic">
                <p style="font-size:18px;">{{item.title}}</p>
                <p style="text-align:left;">{{item.content}}</p>
            </div>
        </div>
        <!-- 标题3 -->
        <div class="serverTitleThree" id="threemenu">
            <p class="Title">收费标准</p>
            <div class="fees">
                <p>{{odd.charge}}</p>
            </div>
        </div>
        <!-- 标题4 -->
        <div class="serverTitleFour" id="fourmenu">
            <p class="Title">覆盖范围</p>
            <div class="fees">
                <p>{{odd.cover}}</p>
            </div>
        </div>
        <!-- 标题5 -->
        <div class="serverTitleFive" id="fivemenu">
            <p class="Title">承诺时效</p>
            <div class="fees">
                <p>{{odd.promise}}</p>
            </div>
        </div>
        <!-- 标题6 -->
        <div class="serverTitleSix" id="sixmenu">
            了解更多
        </div>
        <!-- 标题6内容 -->
        <div class="serverContentSix">
            <div class="serverContentText">
                <img class="serverContentImg" src="https://s3.jpg.cm/2021/03/10/24EwO.png">
                <div class="serverContentBrief">
                    <p>客服热线：95338</p>
                    <p>服务时间周一至周五24小时</p>
                </div>
            </div>
            <div class="serverContentText">
                <img class="serverContentImg" src="https://s3.jpg.cm/2021/03/10/24Fxw.png">
                <div class="serverContentBrief">
                    <p>在线客服</p>
                    <p>服务时间24小时</p>
                </div>
            </div>
            <div class="serverContentText">
                <img class="serverContentImg" src="https://s3.jpg.cm/2021/03/10/24Fxw.png">
                <div class="serverContentBrief">
                    <p style="font-weight:normal;">与您当地收派员或销售经理联系</p>
                </div>
            </div>
        </div>
        <sourcefooter></sourcefooter>
        <sourcesidebutton></sourcesidebutton>
    </div>
</template>

<script>
import bus from '../assets/js/bus.js'
import sourcemenu from '../components/sourceMenu.vue'
import sourcefooter from '../components/sourceFooter.vue'
import sourcesidebutton from '../components/sourceSidebutton.vue'
export default {
    data(){
        return{
            open:"service",
            currentIndex:null,  //当前激活的选项
            odd:{},   //从source.vue页面传递来的数据
            serverMenu:[
                {name:"产品介绍",id:"#onemenu"},
                {name:"产品优势",id:"#twomenu"},
                {name:"收费标准",id:"#threemenu"},
                {name:"覆盖范围",id:"#fourmenu"},
                {name:"承诺时效",id:"#fivemenu"},
                {name:"了解更多",id:"#sixmenu"},
            ],
            text:[
                // {
                //     content:"优势资源保障，各环节通过专属流程进行优先发运、中转和派送，提供具有竞争力的时效",
                //     pic:"https://s3.jpg.cm/2021/03/10/2ERtO.png",
                //     title:"精准承诺，时效稳定、稳定"
                // },
                // {
                //     content:"多款增值服务满足您的各种寄递场景需求",
                //     pic:"https://s3.jpg.cm/2021/03/10/2Eq0w.png",
                //     title:"客制化服务"
                // },
                // {
                //     content:"科技赋能实现网络透明化，智能化",
                //     pic:"https://s3.jpg.cm/2021/03/10/2EnL8.png",
                //     title:"全程跟踪"
                // }
            ]
        }
    },
    created () {
        this.getInfo()
    },
    mounted(){
    },
    methods:{
        getInfo(){
            this.odd=JSON.parse(this.$route.query.info)
            this.odd.img=`${this.$store.state.host}/${this.odd.img}`
            this.odd.text.forEach((item,index)=>{
                item.pic=`${this.$store.state.host}/${item.pic}`
            })
            console.log("此时的数据对象",this.odd)
            bus.$emit("open",this.odd)
        },
        serverClick(index){
            this.currentIndex=index
        }
    },
    components:{
        sourcemenu,
        sourcefooter,
        sourcesidebutton,
    }
}
</script>

<style scoped>
.Server{
    width:100vw;
    height:100vh;
    overflow-x: hidden;
    position: relative;
}
/* 美化滚动条 */
::-webkit-scrollbar
{
    width: 6px;  /* 侧边的 */
    height: 16px; /* 底部的 */
    background-color: #7af5cf;/*//背景色*/
}

/*定义滚动条轨道 内阴影+圆角*//* 滚动槽 */
::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(255,0,0,0.3);
    border-radius: 10px;
    background-color: #4e3cf5;/*滚动条槽的颜色*/
}

/*定义滑块 内阴影+圆角*//* 滚动条滑块 */
::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #ccc;
}
/*交互时样式设置*/
::-webkit-scrollbar-thumb:window-inactive {
    background: #d5a4cf;
    width: 10px;
    height: 10px;
    border: 6px;
}
/* 两边按钮设置*/
::-webkit-scrollbar-button {
    width: 10px;
    height: 10px;
    border: 2px;
    background: black;
}
::-webkit-scrollbar-button:horizontal:decrement:hover {
    /*当鼠标在水平滚动条递减属性的按钮上的状态，在该文件中就只有水平方向的第一个按钮*/
    /* decrement 表示递减的碎片 */
    width: 10px;
    height: 10px;
    border: 6px;
    background: #d3150b;
}
/*内层轨道，滚动条中间部分（除去）,滚动槽颜色可能会遮挡该颜色*/
::-webkit-scrollbar-track-piece {
    /*background: #29d32f;*/
}
/*两个滚动条的交汇处*/
::-webkit-scrollbar-corner {
    width: 10px;
    height: 10px;
    border: 2px;
    background: #bdd39b;
}

::-webkit-scrollbar-track-piece:start {
    /*滚动条上半边或左半边*/
    width: 10px;
    height: 10px;
    border: 2px;
    background: #d1a2d3;
}


.serverImg{
    width:100vw;
    height:50vh;
}
.serverImg img{
    width:100%;
    height:100%;
}
.serverMenu{
    width:100vw;
    height:8vh;
    line-height: 5vh;
    position: relative;
    border:2px solid #fff7f7;
    border-top-style: none;
    border-right-style: none;
    border-left-style: none;
}
.serverMenu ul{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    list-style: none;
    position: absolute;
    left:-4vw;
}
.serverMenu ul li{
    margin-left: 8%;
    border:0;
}
.serverMenu ul li a{
    font-size:20px;
    font-weight: bold;
    color:black;
    padding-bottom:10px;
}
.serverMenu ul li a:hover{
    text-decoration: none;
}
.serveractive{
    color: red;
    border:3px solid red;
    border-top-style: none;
    border-right-style: none;
    border-left-style: none;
}
.serverTitleOne{
    width:100vw;
    height:10vh;
    text-align: center;
    line-height:10vh;
    font-size: 28px;
    font-weight: fold;
}
.serverContentOne{
    width:100vw;
    height:42vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 3%;
}
.serverContentOneImg{
    width:30vw;
    height:30vh;
}
.serverContentOneImg img{
    width:100%;
    height:100%;
}
.serverContentOneWord{
    width:30vw;
    height:35vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 20px rgb(192 192 192 / 50%);
    background: url("https://s3.jpg.cm/2021/03/03/0wkgT.png") no-repeat center;
    background-size: 100% 100%;
}
.serverContentOneWord p{
    font-size: 20px;
    text-align: left;
    padding: 0 22px;
}
/* 标题2 */
.serverTitleTwo{
    width:100%;
    height:16vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    line-height:10vh;
    font-size: 28px;
    font-weight: fold;
}
.serverContentTwo{
    width:100%;
    height:30vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.serverContentTwoText{
    width:20%;
    height:80%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    margin-left: 60px;
    padding:10px;
    box-shadow: 0 2px 16px 0 rgb(0 0 0 / 7%);
    position: relative;
    left:-24px;
}
.serverContentTwoText img{
    width:100px;
    height:100px;
}
/* 标题3 */
.serverTitleThree{
    width:100%;
    height:20vh;
    text-align: left;
    padding-left: 255px;
    padding-top: 30px;
    margin-top: 2vh;
}
.Title{
    border:4px solid red;
    height:18px;
    font-size: 22px;
    font-weight:bold;
    border-top-style:none;
    border-right-style:none;
    border-bottom-style:none;
    display: flex;
    align-items: center;
    padding-left:10px;
}
.fees{
    width:60%;
    height:40px;
}
/* 标题4 */
.serverTitleFour{
    width:100%;
    height:10vh;
    text-align: left;
    padding-left: 255px;
    padding-top: 30px;
}
/* 标题5 */
.serverTitleFive{
    width:100%;
    height:10vh;
    text-align: left;
    padding-left: 255px;
    padding-top: 30px;
    margin-top:6vh;
}
/* 标题6 */
.serverTitleSix{
    width:100%;
    height:10vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size:22px;
    font-weight:bold;
    padding-top:10px;
    position: relative;
    top:8vh;
}
/* 标题6内容 */
.serverContentSix{
    width:100%;
    height:40vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.serverContentText{
    width:24%;
    height:20vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.serverContentImg{
    width:80px;
    height:80px;
}
.serverContentBrief{
    width:200px;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}
.serverContentBrief p:nth-child(1){
    font-size: 22px;
    font-weight: bold;
    text-align: left;
}
.serverContentBrief p:nth-child(2){
    font-size: 14px;
    text-align: left;
}
</style>
