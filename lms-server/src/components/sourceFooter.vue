<template>
    <div :class="open=='source'?'Foot':'FootOne'">
        <!-- 底部区域1 -->
        <div class="footerOne">rt6          
            <!-- 底1头层 -->
            <div class="footerOneHead">
                <div class="footerOneHeadTitle">
                    <h4 style="font-weight:bold; width:12%;">马上联系我们:</h4>
                    <div class="footerOneHeadImg">
                        <i class="fa fa-weibo"></i>
                        <el-tooltip  effect="dark" placement="top">
                            <div slot="content">
                                <img src="https://s3.jpg.cm/2021/02/27/zxLZh.png" class="QR">
                            </div>
                            <i class="fa fa-weixin"></i>
                        </el-tooltip>
                        <el-tooltip  effect="dark" content="155xxxxx096" placement="top">
                            <i class="fa fa-whatsapp"></i>
                        </el-tooltip>
                    </div>
                </div>
            </div>
            <!-- 界线3 -->
            <hr class="linethree">
            <!-- 底1身体层 -->
            <div class="footerOneBody">
                <div class="lump">
                    <h3>物流服务</h3>
                    <router-link to="" class="link">快递服务</router-link>
                    <router-link to="" class="link">快运服务</router-link>
                    <router-link to="" class="link">冷运服务</router-link>
                    <router-link to="" class="link">医药服务</router-link>
                </div>
                <div class="lump">
                    <h3>服务支持</h3>
                    <router-link to="" class="link">寄件</router-link>
                    <router-link to="" class="link">查件</router-link>
                    <router-link to="" class="link">服务查询</router-link>
                </div>
                <div class="lump">
                    <h3>可持续发展</h3>
                    <router-link to="" class="link">人才伙伴</router-link>
                    <router-link to="" class="link">社会关怀</router-link>
                    <router-link to="" class="link">绿色创新</router-link>
                </div>
                <div class="lump">
                    <h3>投资者关系</h3>
                    <router-link to="" class="link">公司治理</router-link>
                    <router-link to="" class="link">公司公告</router-link>
                </div>
                <div class="lump">
                    <h3>关于我们</h3>
                    <router-link to="" class="link">关于绝影</router-link>
                    <router-link to="" class="link">新闻资讯</router-link>
                    <router-link to="" class="link">人才招聘</router-link>
                    <router-link to="" class="link">我要举报</router-link>
                </div>
            </div>
        </div>
        <!-- 底部区域2 -->
        <div class="footerTwo">
            <div class="tagging">
                <img src="https://s3.jpg.cm/2021/02/28/0Gaah.png">
                <p>@2021 魏奇 20175305009</p>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '../assets/js/bus.js'
export default {
    data(){
        return{
            open:"source"
        }
    },
    created(){
        bus.$on("open",msg=>{
            this.open=msg
            console.log("接受的数据",this.open)
        })
    }
}
</script>

<style scoped>
.Foot{
    width:100%;
    margin-top: -10px;
}
.FootOne{
    width:100%;
    position: relative;
    top:8%;
    /* border:3x solid purple; */
    /* position: absolute;
    bottom:-220%; */
}
.footerOneHead{
    width:70%;
    height:60px;
    margin-top: 10px;
}
.footerOne{
    width:100%;
    height:auto;
    background-color: #373737;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* border:2px solid blue; */
}
.footerOneHeadTitle{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items: center;
    color:white;
}
.footerOneHeadImg{
    width: 90%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.footerOneHeadImg i{
    width:50px;
    height:50px;
    background-color: #4f4f4f;
    border-radius: 50%;
    font-size: 30px;
    line-height: 50px;
    margin-left: 20px;
    z-index: 20;
}
.footerOneHeadImg i:hover{
    background-color: #6a6a6a;
}
.QR{
    width:100px;
    height:100px;
}
.linethree{
    width:70%;
    height:2px;
    background-color:#4f4f4f;
}
.footerOneBody{
    width:70%;
    height:60%;
    /* height:30vh; */
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    /* border:2px solid red; */
}
.lump{
    width:18%;
    height:auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* border:1px solid khaki; */
}
.lump h3{
    color: white;
    margin-top: 20px;
}
.lump .link{
    color:#aaa8a6;
    margin-top: 20px;
}
.link{
    color:#aaa8a6;
}
.link:hover{
    text-decoration: none;
}
.footerTwo{
    width:100%;
    height:74px;
    /* height:10vh; */
    background-color: #2c2c2c;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.tagging{
    width:70%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    color:white;
    line-height: 74px;
    /* line-height: 10vh; */
}
</style>
