<template>
    <div class="New">
        <sourcemenu></sourcemenu>
        <div class="new">
            <div class="newTitle">
                <p>{{News.title}}</p>
            </div>
            <p class="newTime">{{News.pubtime}}</p>
            <div class="content">
                <img :src="News.img">
            </div>
            <div class="detail">
                <img :src="News.detail">
            </div>
            <div class="btn">
                <el-button type="info" v-on:click="go">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import sourcemenu from '../components/sourceMenu.vue'
export default {
    data(){
        return{
            News:{
                title:'',
                content:'',
                detail:'',
                img:'',
                pubtime:'',
                uptime:''
            }
        }
    },
    created() {
        this.News=JSON.parse(this.$route.query.info)
        this.News.title=JSON.parse(this.$route.query.info).title
        this.News.content=JSON.parse(this.$route.query.info).content
        this.News.detail=JSON.parse(this.$route.query.info).detail
        this.News.detail=`${this.$store.state.host}/${this.News.detail}`
        console.log("第一个新闻页接受的--图片参数",this.News.detail)
        this.News.img=JSON.parse(this.$route.query.info).img
        this.News.pubtime=this.formateDate(JSON.parse(this.$route.query.info).pubtime).substr(0,10)
        this.News.uptime=this.formateDate(JSON.parse(this.$route.query.info).uptime)
        console.log("新闻跳转接受的参数",this.News)
    },
    methods:{
        // 格式化时间：
        formateDate(datetime) {
            function addDateZero(num) {
                return (num < 10 ? "0" + num : num);
            }
            let d = new Date(datetime);
            let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
            return formatdatetime;
        },
        // 返回按钮
        go(){
            this.$router.go(-1)
        }
    },
    components:{
        sourcemenu,
    }
}
</script>

<style scoped>
.New{
    width:100vw;
    height:100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

/* 滑块的样式 */
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
    background: red;
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


.new{
    width:80vw;
    min-height:80vh;
    height:auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.content img{
    width: 80%;
}
.newTitle{
    width:100%;
}
.newTitle  p{
    font-size: 30px;
    font-weight: bold;
}
.newTime{
    font-size: 16px;
}
.detail{
    width:76%;
    height:auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.detail img{
    width:67.5%;
}
.btn{
    margin-left: -47%;
}
</style>
