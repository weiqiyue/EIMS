<!--
 * @Author: your name
 * @Date: 2021-04-16 14:36:38
 * @LastEditTime: 2021-04-17 18:16:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\components\test1.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-04-16 08:16:31
 * @LastEditTime: 2021-04-17 17:02:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\components\test1.vue
-->
<template>
    <div>
        <el-upload
        class="upload-demo"
        action="122"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :show-file-list="false"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        ref="elupload">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <button v-on:click="handleClick">下载</button>
        <button v-on:click="handleUp">上传服务器</button>
        <button v-on:click="handleDelete">删除</button>
    </div>
</template>

<script>
import downloadUrl from '../assets/js/download.js'
import {ManyPic} from '../api/index.js'
import axios from 'axios'
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            imgsList:[],  //需要这个数组--来接受上传成功的图片
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
            console.log("上传成功的图片",file)
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        handleUp(){
            /* 上传成功--在开始存数据库 */
            ManyPic(this.imgsList)
            .then((res1)=>{
                console.log("存数据库成功",res1)
                this.$message({
                    message:"存入数据库成功",
                    type:"success"
                })
                this.imgsList=[]
            })
            .catch((err1)=>{
                console.log("存数据库失败",err1)
            })
        },
        beforeAvatarUpload(file) {
            console.log("上传的图片为",file)
            const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
            /* 一个1024是kb单位  两个1024是mb单位 */
            const isLt200M = file.size / 1024 / 1024 < 200;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 或 png 格式!');
                return isJPG
            }else if (!isLt200M) {
                this.$message.error('上传头像图片大小不能超过 200MB!');
                return isLt200M;
            }else{
                var fd=new FormData()
                fd.append("file",file)
                axios.post('/webinfo/up',fd)
                .then((res)=>{
                    console.log("上传成功",res)
                    this.imgsList.push(res.data.path)
                    console.log("上传的所有图片组成的path数组",this.imgsList)
                })
                .catch((err)=>{
                    console.log("上传失败",err)
                })
            }
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        handleClick(){
            var filename="404.jpg"
            var oldname="404.jpg"
            var url=`/upload/down?filename=${filename}&oldname=${oldname}`
            // axios.get(url)
            // .then((res)=>{
            //     console.log("下载成功",res)
            // })
            // .catch((err)=>{
            //     console.log("下载失败",err)
            // })
            downloadUrl(`${this.$store.state.host}/upload/down/${filename}/${oldname}`)
        },
        handleDelete(){
            var filename="404.jpg"
            var url=`/upload/delete/${filename}`
            axios.get(url)
            .then((res)=>{
                console.log("删除成功",res)
            })
            .catch((err)=>{
                console.log("删除失败",err)
            })
        },
    }
}
</script>

<style scoped>
/deep/.upload-demo input{
    display: none !important;
}
</style>
