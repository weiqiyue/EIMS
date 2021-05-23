<!--
 * @Author: your name
 * @Date: 2021-02-23 10:35:20
 * @LastEditTime: 2021-05-09 02:10:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\views\source.vue
-->
<template>
    <div class="first" v-on:mousemove="updateXY">
        <sourcemenu></sourcemenu>
        <sourcecarousel></sourcecarousel>
        <!-- 侧边导航 -->
        <sourcesidebutton></sourcesidebutton>
        <!-- 第三个导航 -->
        <div class="headone">
            <h1>物流服务介绍</h1>   
        </div>
        <div class="threeMenu">
            <ul>
                <!-- 是否为true，true样式生效 -->
                <li v-for="(item, index) in menulist" :key="index" style="z-index:10;" :class="{active:index==currentIndex}" v-on:click="go(index)">{{item}}</li>
            </ul>
        </div>
        <!-- 界线1 -->
        <hr class="oneLine">
        <!-- 展示区域 -->
        <div class="showarea">
            <div class="col-lg-4 area" v-for="(item, index) in infolist" :key="index">
                <div class="thumbnail areaone" style="hright:320px;" v-on:click="Router(item)">
                    <!-- 缩略图自己需要 -->
                    <img :src="item.img" style="width:100%;height:240px;">
                    <div class="caption">
                        <div class="generalization">
                            <h3>{{item.title}}</h3>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                        <div class="introduction">
                            {{item.content}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 第4个导航 -->
        <div class="headtwo">
            <h1>新闻资讯</h1>
        </div>
        <!-- 展示区域2 -->
        <div class="showareatwo">
            <div class="holder">
                <div class="showContainer" v-for="(item, index) in newlist" :key="index" v-on:click="newRouter(index,item)">
                    <div class="small">
                        <img :src="item.img" class="smallImg">
                    </div>
                    <div class="char">
                        <div class="charTitle">
                            {{item.title}}
                        </div>
                        <div class="charContent">
                            {{item.content}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 界线2 -->
        <hr class="footer">
        <sourcefooter></sourcefooter>
        <!-- 回到顶部 -->
        <sourcetop></sourcetop>
    </div>
</template>

<script>
import bus from '../assets/js/bus.js'
import sourcemenu from "../components/sourceMenu.vue"
import sourcecarousel from '../components/sourceCarousel.vue'
import sourcefooter from '../components/sourceFooter.vue'
import sourcesidebutton from '../components/sourceSidebutton.vue'
import { setTimeout, clearTimeout } from 'timers';
import sourcetop from '../components/sourceTop.vue'
import {allLog,allNew,oneUser1, oneUser} from '../api/index.js'
export default {
    data(){
        return{
            // defaultIndex:0,
            currentIndex:0,
            time:null,
            X:"",
            Y:"",
            open:"source",  //不同的页面调整footer页面
            currentheight:0,
            menulist:[
                "快递服务",
                "快运服务",
                // "冷运服务",
                // "医药服务"
            ],
            infolist:[],
            /* 以后通过数据库获取--或者修改 */
            infolist1:[
                // {
                //     img:"https://s3.jpg.cm/2021/02/26/zfVOO.png",
                //     title:"绝影特快",
                //     content:"绝影为客户提供的“快速、准时、稳定、安全”的高品质、门到门快递服务，优势路线，优先保障"
                // },
                // {
                //     img:"https://s3.jpg.cm/2021/02/26/zfAAw.png",
                //     title:"绝影标快",
                //     content:"全场景的标准时效快递，是绝影为客户提供的价格经济、时效稳定、服务范围广的门到门快递服务"
                // }
            ],
            infolist2:[
                // {
                //     img:"https://s3.jpg.cm/2021/02/26/zfXp8.png",
                //     title:"整车直达",
                //     content:"客制化的整车装运物流服务，主要覆盖单票3吨以上，通过点对点、点对多点的方式实现货物完全直达"
                // },
                // {
                //     img:"https://s3.jpg.cm/2021/02/26/zfbdk.png",
                //     title:"重货包裹",
                //     content:"主打20-100KG门到门服务，面向B2C、C2C、B2B等多中场景，高品质上门上楼收派服务"
                // }
            ],
            newlist:[
                // {
                //     img:"https://s3.jpg.cm/2021/02/26/zzf9h.png",
                //     title:"“智”创未来 “链”接全球--新征程 再出发",
                //     content:"“智”创未来 “链”接全球--新征程 再出发"
                // },
                // {
                //     img:"https://s3.jpg.cm/2021/02/26/zzBmQ.png",
                //     title:"绝影积极参与网络安全国家标准订定《快递物流服务数据安全指南》征求意见稿新鲜出炉",
                //     content:"《信息安全技术 快递物流服务数据安全指南》是国家标准化管理委员会下达的信息安全国家标准制定项目。该项目的编制工作由我公司牵头，并联合了中国电子技术标准化研究院、邮政速递、京东振世等七家单位。文件将适用于快递物流服务运营者规范数据活动，也适用于主管监管部门、第三方评估机构等对快递物流服务数据活动进行监督、管理和评估。"
                // },
                // {
                //     img:"https://s3.jpg.cm/2021/02/26/zz0YW.png",
                //     title:"新突破！顺丰航空开通首条美洲全货运航线“深圳=杭州=洛杉矶”",
                //     content:"北京时间2020年11月7日晨 ，顺丰航空一架B747-400ERF载货从深圳宝安国际机场起飞，经杭州停场上货后于北京时间11月8日晨04：37顺利飞抵美国洛杉矶国际机场，将满载的包括普货、电商快件等在内的货物运抵洛杉矶，顺丰航空首条美洲全货运航线“深圳=杭州=洛杉矶”由此正式开通。"
                // },
                // {
                //     img:"https://s3.jpg.cm/2021/02/26/zzzQS.png",
                //     title:"顺丰航空第61架新运力投用 助战“双十一”物流高峰",
                //     content:"2020年11月10日晨，顺丰航空第 61 架新运力（B757-200F）完成改装，由成都顺利飞抵深圳宝安国际机场，正式入列顺丰航空全货机机队、投入航线运行，全力助战即将到来的第二波“双十一”物流高峰。"
                // }
            ]
        }
    },
    created(){
        bus.$emit("open",this.open)
        this.goInfo(this.currentIndex)

        // 获取所有的物流介绍数据
        this.getlog()
        // 得到全部的新闻
        this.getnwe()
    },
    mounted(){
        
    },
    // watch:{
    //     X(){
    //         clearTimeout(this.time)
    //         this.time=setTimeout(()=>{
    //             this.Y=0
    //         },900)
    //     }
    // },
    methods:{
        go(index){
            console.log("哈哈哈index",index)
            this.currentIndex=index
            // this.defaultIndex=index
            this.goInfo(this.currentIndex)
        },
        goInfo(index){
            switch(index){
                case 0:
                    this.infolist=this.infolist1
                    break;
                case 1:
                    this.infolist=this.infolist2
                    break;
            }
        },
        /* 回到顶部的必要方法 */
        updateXY(event){
            clearTimeout(this.time)
            this.X=event.offsetX
            // this.Y=event.offsetY
            this.Y=$(".first").scrollTop();  
            // console.log("鼠标移动的位置",this.X,this.Y)
            bus.$emit('X',this.X)
            bus.$emit('Y',this.Y)
        },
        // upTop(){
        //     $('.first').animate({scrollTop:0}, 400);
        // }

        // 获取物流介绍的信息
        getlog(){
            allLog()
            .then((res)=>{
                console.log("获取全部的物流介绍成功",res)
                res.info.forEach((item,index)=>{
                    if(item.classfy=="快递服务"){
                        item.img=`${this.$store.state.host}/${item.img}`
                        this.infolist1.push(item)
                        console.log("此时的infolist1",this.infolist1)
                    }else if(item.classfy=="快运服务"){
                        item.img=`${this.$store.state.host}/${item.img}`
                        this.infolist2.push(item)
                        console.log("此时的infolist2",this.infolist2)
                    }
                })
            })
            .catch((err)=>{
                console.log("获取全部的物流介绍失败",err)
            })
        },
        // 得到新闻资讯
        getnwe(){
            allNew()
            .then((res)=>{
                console.log("得到全部的新闻成功",res)
                this.newlist=res.info
                // 将全部的图片的路径---绝对化
                this.newlist.forEach((item,index)=>{
                    item.img=`${this.$store.state.host}/${item.img}`
                })
                console.log("全部的新闻数组",this.newlist)
            })
            .catch((err)=>{
                console.log("得到全部的新闻失败",err)
            })
        },
        // 路由跳转
        Router(val){
            console.log("跳转时携带的信息",val)
            val.img=val.img.substr(21,val.img.length-1)
            console.log("传递的图片",val.img)
            this.$router.push({path:'/service',query:{info:JSON.stringify(val)}})
        },
        // 新闻页面的路由跳转
        newRouter(index,val){
            console.log("新闻跳转时携带的信息",index,val)
            this.$router.push({path:`/new${index+1}`,query:{info:JSON.stringify(val)}})
        },
    },
    components:{
        sourcemenu,
        sourcecarousel,
        sourcefooter,
        sourcesidebutton,
        sourcetop,
    }
}
</script>

<style scoped>
*{
    list-style: none;
}
.first{
    width:100vw;
    height:100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    position: relative;
}


/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
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

.headone{
    width:100%;
    height:8%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 76px;
    /* border:1px solid purple; */
}

h1{
    font-weight: bolder;
}
.threeMenu{
    width:100%;
    height:10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* border:1px  solid red; */
}
ul{
    width:80%;
    display: inline-block;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    margin-left: 1%;
}
li{
    margin-left: 100px;
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    margin-left: -0.88%;
}
.active{
    color:red;
    /* border:2px solid red; */
    border-top-style: none;
    border-right-style: none;
    border-left-style: none;
}
.oneLine{
    display: block;
    width:100vw;
    height:1px;
    /* border:1px solid red; */
    background-color: #ffffff;
    margin-top: -2px;
}
.showarea{
    width:100%;
    height:50%;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* border:1px solid blue; */
}
.area{
    /* margin-bottom:-6%; */
    margin-left: auto;
    margin-right: auto;
}
.areaone:hover{
    box-shadow: 2px 1px 1px #888888;
    cursor: pointer;
}
.area:hover .introduction{
    color:red;
}
.area:hover .generalization{
    color:red;
}
.caption{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: -20%;
}
.generalization{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:100%;
}
.generalization h3{
    font-size: 20px;
    font-weight: bolder;
}
.generalization i{
    font-size:14px;
    font-weight:bold;
}
.introduction{
    width:100%;
    font-size: 14px;
    color:#ccc;
    text-align: left;
    display:-webkit-box;
    overflow:hidden;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;

}
.headtwo{
    width:100%;
    height:10vh;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border:1px solid red; */
}
.headtwo h1{
    padding-top: 10px;
}
.showareatwo{
    width:100%;
    height:50%;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.holder{
    width:86%;
    /* width:86%; */
    /* width:100%; */
    height:100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
    /* 小屏幕 */
    position: relative;
    left:-40px;
}
.showContainer{
    width:41%;
    /* 小屏幕 */
    height:40%;
    /* height:14vh; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color:#ffffff; 
    /* margin-left: 11vw; */

    /* 小屏幕 */
    position: relative;
    top:2%;
    left:10%;
    margin:0 0 0 20px;
    /* margin-left: 8.5%; */
    /* margin-left: 11.8%; */
    margin-top: 2%;
}
.showContainer:hover{
    background-color: red;
    cursor: pointer;
}
.showContainer:hover .charTitle{
    color:white;
}
.showContainer:hover .charContent{
    color:white;
}
.showContainer:hover .smallImg{
    transform:scale(1.5);
    transition: all 0.5s;
}
.small{
    width:34%;
    height:100%;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.smallImg{
    width:100%;
    height:100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.char{
    width:67%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.charTitle{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-align: left;
    font-size: 18px;
    margin-top: 4px;
}
.charContent{
    color:#ccc;
    display:-webkit-box;
    overflow:hidden;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:3;
    width:100%;
    margin-bottom: 4px;
    text-align: left;
}
.footer{
    width:100vw;
    height:8px;
    background-color: #dc1e32;
    margin-top: 50px;
}
/* .Top{
    display: none;
}
.TopOne{
    width:6vh;
    height:6vh;
    position: fixed;
    right:0;
    top:60vh;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
}
.TopOne i{
    font-size: 30px;
    color:red;
}
.TopOne i:hover{
    cursor: pointer;
} */

</style>

