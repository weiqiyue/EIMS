<template>
    <div :class="collapse==true?'PicManageOne':'PicManage'">
        <h2>整改轮播图</h2>
        <el-upload
        class="upload-demo"
        action="111"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        multiple
        :limit="3"
        :show-file-list="false"
        :on-exceed="handleExceed"
        ref="elupload">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能选择jpg/png文件，且不超过500kb</div>
        </el-upload>
        <div class="imgList" v-if="imgList.length!=0" v-for="(item, index) in imgList" :key="index">
            <img :src="item.url">
            <p>{{item.name}}</p>
            <i class="el-icon-close" v-on:click="handleRemove(item,index)"></i>
        </div>
    </div>
</template> 

<script>
import axios from 'axios'
import {ManyPic} from '../api/index.js'
export default {
    data(){
        return{
            collapse:true,
            imgList:[],   //用于将存储图片的路径上传服务器
            fileList:[],
        }
    },
    created () {
        
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log("上传成功的图片",file)
            this.imageUrl = URL.createObjectURL(file.raw);
            this.fileList=this.fileList1
        },
        beforeAvatarUpload(file) {
            console.log("上传的图片为",file)
            const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
            /* 一个1024是kb单位  两个1024是mb单位 */
            const isLt200M = file.size / 1024 / 1024 < 200;

            if (!isJPG) {
                this.$message.error('选中的图片只能是 JPG 或 png 格式!');
                return isJPG
            }else if (!isLt200M) {
                this.$message.error('选中的图片大小不能超过 200MB!');
                return isLt200M;
            }else{
                var fd=new FormData()
                fd.append("file",file)
                axios.post('/webinfo/up',fd)
                .then((res)=>{
                    var str=`${this.$store.state.host}/${res.data.path}`
                    this.imgList.push({name:res.data.info.file.newfilename,path:res.data.path,url:str})
                    console.log("上传成功",str)
                })
                .catch((err)=>{
                    console.log("上传失败",err)
                })
            }
        },
        // 上传服务器
        submitUpload(){
            /* 上传成功--在开始存数据库 */
            ManyPic(this.imgList)
            .then((res)=>{
                console.log("存数据库成功",res)
                this.$message({
                    message:"上传服务器成功",
                    type:"success"
                })
                this.imgList=[]
            })
            .catch((err)=>{
                console.log("存数据库失败",err)
            })
        },
        // 想要---删除单个图片
        handleRemove(item,index){
            this.$confirm(`确定移除 ${ item.name }？`)
            .then(()=>{
                this.imgList.splice(index,1)
                var url=`webinfo/delete/${item.name}`
                axios.get(url)
                .then((res)=>{
                    console.log("删除单个文件成功",res)
                })
                .catch((err)=>{
                    console.log("删除单个文件失败",err)
                })
            })
        },
        handleExceed(files, fileList) {
            // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            this.$message({
                message:"最多选三个文件",
                type:"warning"
            })
        },
    }
}
</script>

<style scoped>
/* 让多余的东西消失 */
/deep/.upload-demo input{
    display: none !important;
}
/* 缩略图列表 */
.imgList{
    width:40%;
    min-height:100px;
    margin-left: auto;
    margin-right: auto;
    /* border:1px solid red; */
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
}
.imgList>img{
    width: 40%;
    height:40%;
}

h2{
    margin-top: 20px;
}
.PicManageOne{
    position: relative;
    width:calc(100vw - 63px);
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color:#c1f6f3;
    top:-1px;
    left:63px;
    transition:left  1s;
}
.PicManage{
    position: relative;
    width:87vw;
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color: #c1f6f3;
    top:-1px;
    left:13vw;
    transition:left  1s;
}
</style>
