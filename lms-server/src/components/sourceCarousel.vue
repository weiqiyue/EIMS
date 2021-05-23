<!--
 * @Author: your name
 * @Date: 2021-02-23 20:08:49
 * @LastEditTime: 2021-04-22 18:06:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\components\sourceCarousel.vue
-->
<template>
    <div class="carousel">
        <template>
            <!-- height:62vh -->
            <el-carousel :interval="4000"  height="62vh" class="circle">
                <el-carousel-item v-for="item in imgList" :key="item">
                    <img :src="item" class="map">
                </el-carousel-item>
            </el-carousel>
        </template>
        <!-- 框 -->
        <div class="order">
            <div class="input">
                <el-input placeholder="您可以输入货运单号进行查询" v-model="code" class="input-with-select">
                    <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                    <template slot="append">
                        <i class="el-icon-search"></i>
                    </template>
                </el-input>
            </div>
            <el-button type="danger" class="query" v-on:click="Search">马上查单</el-button>
        </div>
        <!-- 导航栏 -->
        <div class="xq_bag" id="bar5">
			<ul class="xq_navbar">
				<li class="xq_navli first">
                    <a href="#/order?currentindex=1">
                        <i class="glyphicon glyphicon-search i"></i>
                        <span  class="name">运单追踪</span>
                    </a>
                </li>
				<li class="xq_navli">
                    <a href="#/order?currentindex=0">
                        <i class="fa fa-envelope i"></i>
                        <span  class="name">我要寄件</span>
                    </a>
                </li>
				<li class="xq_navli">
                    <a href="#/order?currentindex=2">
                        <i class="fa fa-jpy i"></i>
                        <span  class="name">时效查询</span>
                    </a>
                </li>
				<li class="xq_navli">
                    <a href="#/order?currentindex=2">
                        <i class="fa fa-map-marker i"></i>
                        <span  class="name">网点查询</span>
                    </a>
                </li>
				<li class="xq_navli">
                    <a href="#/order?currentindex=2">
                        <i class="fa fa-globe i"></i>
                        <span  class="name">收集标准</span>
                    </a>
                </li>
			</ul>
		</div>
        <!-- 侧边按钮 -->
        <div class="tip">
            <div class="announcement">
                <div class="content">
                    <i class="fa fa-volume-up contentIcon"></i>
                    <span class="contentTip">系统公告</span>
                </div>
                <div class="text">
                    <div class="detail">2021年春节期间服务公告</div>
                </div>
            </div>
            <div class="feedback">
                <div class="content">
                    <i class="fa fa-commenting contentIcon"></i>
                    <span class="contentTip">问题反馈</span>
                </div>
                <div class="text">
                    <div class="detail">如您对绝影有任何建议和反馈，可留言给我们</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/js/xq_navbar.js'
import {getcarousel} from '../api/index.js'
import bus from '../assets/js/bus.js'
export default {
    data(){
        return{
            code:"",  //运单号
            sourceFlag:false, //从首页跳转到查询页面用来出发事件
            imgList:[
                // "https://s3.jpg.cm/2021/02/23/zAEtU.png",
                // "https://s3.jpg.cm/2021/02/23/zAsnf.png",
                // "https://s3.jpg.cm/2021/02/23/zAYjL.png"
            ]
        }
    },
    created(){
        $(function(){
            $("#bar5").xq_navbar({"type":"block","liwidth":"avg","bgcolor":"#000","hcolor":["blue","rgb(10,100,100)","#6b48ff","pink","green","rgba(23,234,22,1)","rgb(230,230,230)"]});
        })
    },
    mounted(){
        // this.hover()
        // 获取轮播图的数据
        this.getCarousel()
    },
    watch:{
        code(val){
            console.log("监听的code",val)
            if(val!=''){
                this.sourceFlag=true
            }else{
                this.sourceFlag=false
            }
        }
    },
    methods:{
        // 从后台获取轮播图
        getCarousel(){
            getcarousel()
            .then((res)=>{
                console.log("获取的轮播图数据---成功",res)
                res.info.forEach((item,index)=>{
                    var img=item.img
                    this.imgList.push(img)
                })
                console.log("轮播图数组",this.imgList)
                // 改装数组的元素
                var newList=[]
                this.imgList.forEach((item,index)=>{
                    item=`${this.$store.state.host}/${item}`
                    newList.push(item)
                })
                this.imgList=newList
            })
            .catch((err)=>{
                console.log("获取的轮播图数据---失败",err)
            })
        },
        // 查询订单
        Search(){
            if(this.code==''){
                this.$message({
                    message:"您还没有输入订单号",
                    type:"error"
                })
            }else{
                console.log("此时的订单",this.code,this.sourceFlag)
                this.$store.dispatch('setCode',this.code)
                this.$store.dispatch('setSourceFlag',this.sourceFlag)
                this.$router.push({path:'/order',query:{currentindex:JSON.stringify(1)}})
            }
        }
    }
}
</script>

<style scoped>
.carousel{
    width:100vw;
    height:62vh;
    /* border:1px solid purple; */
    position: relative;
}
.map{
    width:100%;
    height:100%;
}
.circle{
    position: relative;
}
.order{
    position: absolute;
    width:20%;
    height:28%;
    /* height:16vh; */
    background-color:#ffffff;
    bottom:-1px;
    left:10%;
    /* left:10vw; */
    z-index:10;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.order:hover + .xq_bag>ul>.first{
    background-color:blue !important; 
}
.input{
    width:90%;
    margin-top: 5%;
}

.query{
    width:90%;
    margin-top: 10px;
    font-size: 18px;
}
.name{
    font-size: 18px;
    margin-left: 10px;
}
.i{
    font-size: 16px;
}
/* 侧边按钮伸出的长度取决于这个 */
.tip{
    width:18%;
    /* width:14vw; */
    height:15vh;
    position: absolute;
    right:6px;
    top:60%;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* border:1px solid orangered; */
}
.announcement{
    width:26%;
    /* width:5vw; */
    height:50%;
    /* height:7vh; */
    position: absolute;
    right:0;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background-color:rgba(102, 102, 102,.5);
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
}
.announcement:hover{
    width:100%;
    /* width:16.7vw; */
    transition: width 2s;
}

.announcement:hover .text{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color:white;
    border:2px solid white;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: none;
    padding: 0 10px;
    margin-left: 10px;
    /* border:2px solid red; */
}
.feedback{
    margin-top: 8vh;
    width:26%;
    /* width:5vw; */
    height:50%;
    /* height:7vh; */
    position: absolute;
    right:0;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background-color:rgba(102, 102, 102,.5);
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
}
.feedback:hover{
    width:100%;
    /* width:16.7vw; */
    transition: width 2s;
}

.feedback:hover .text{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color:white;
    border:2px solid white;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: none;
    padding:0 10px;
    margin-left: 10px;
}

.content{
    width:86%;
    /* width:5vw; */
    height:100%;
    /* height:7vh; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
}
.contentTip{
    color:white;
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 12px;
}
.contentIcon{
    color:white;
    font-size: 18px;
    font-weight: bold;
    padding-top: 12px;
}
.text{
    display:none;
}
.detail{
    width:200px;  /* 防止二次伸缩 */
    text-align: left;
    /* 文本换行取决于上面给的宽度 */
    white-space: nowrap;  
    text-overflow:ellipsis; 
    overflow:hidden;
    /* border:4px solid yellow; */
}
.detail:hover{
    cursor:pointer;
}
</style>
