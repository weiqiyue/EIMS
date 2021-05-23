<template>
    <div :class="collapse==true?'newManageOne':'newManage'">
        <div class="Form">
            <h2>关于新闻介绍的整改</h2>
            <el-form :model="form" status-icon  ref="form" label-width="120px" class="form">
                <el-form-item label="标题" prop="title"> 
                    <!-- 下拉选择框 -->
                    <el-select v-if="addFlag==false" v-model="form.title" placeholder="选择整改的标题" style="width:100%;" v-on:change="blur">
                        <el-option v-for="(item, index) in titles" :key="index" :label='item' :value='item'></el-option>
                        <!-- 为了添加 -->
                        <el-button type="info" class="Add" @click="Add()">添加</el-button>
                    </el-select>
                    <!-- 输入框 -->
                    <el-input v-if="addFlag" type="text" :rows="4" placeholder="请输入标题" v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="img">
                    <!-- <el-input  type="text" v-model="form.img" autocomplete="off"   placeholder="请输入标题图片路径" size="samll"  clearable></el-input> -->
                    <!-- 上传图片 -->
                    <el-upload
                        class="upload-demo"
                        action="122"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        multiple
                        :show-file-list="false"
                        :limit="1"
                        :on-exceed="handleExceed"
                        ref="elupload">
                        <el-button size="small" type="primary">上传图片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过20M</div>
                    </el-upload>
                </el-form-item>
                <div id="img" v-if="form.img && form.img.search('https')==-1">
                    <img :src="getUrl(form.img)">
                </div>
                <el-form-item label="发布时间" prop="pubtime">
                        <el-date-picker v-model="form.pubtime" type="datetime" placeholder="选择日期时间" style="width:100%;">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="文本" prop="content">
                    <el-input type="textarea" :rows="4" placeholder="请输入文本内容" v-model="form.content" autosize></el-input>
                </el-form-item>
                <el-form-item label="详细内容" prop="detail">
                    <el-input type="textarea" :rows="4" placeholder="请输入详细内容" v-model="form.detail" autosize></el-input>
                </el-form-item>
                <el-form-item style="margin-top:20px;">
                        <el-button v-if="addFlag==false" type="primary" @click="submitForm('form')">提交</el-button>
                        <el-button v-if="addFlag" type="success" @click="submitForm1('form')">添加</el-button>
                        <el-button @click="resetForm('form')">取消</el-button>
                        <el-button @click="Del('form')" type="danger">删除</el-button>
                    </el-form-item>
            </el-form>
            <!-- 删除表单的对话框 -->
            <el-dialog
                title="删除该条信息" 
                center
                :visible.sync="formDelDialogFormVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false"
                :show-close="false"
                >
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="delFormOut">取 消</el-button>
                        <el-button type="primary" @click="delFormCommit">确 定</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import bus from '../assets/js/bus.js'
import {allNew,oneNew,updateNew,deleteNew,addNew} from '../api/index.js'
import axios from 'axios'
import {mixin} from '../mixins/index.js'
export default {
    mixins:[mixin],
    data(){
        return{
            collapse:true,
            formDelDialogFormVisible:false,  //删除按钮的对话框
            addFlag:false,  //是否添加
            // 表单
            form:{
                title:"",
                img:"",
                content:"",
                pubtime:"",
                detail:""
            },
            // 标题组
            titles:[]
        }
    },
    created () {
        // 关于折叠菜单
        /* 关于导航栏收缩时的变化产生的前提 */
        bus.$on('collapse',msg=>{
            console.log('修改信息--接受的数据collapse',msg)
            this.$store.dispatch("setIsCollapse",msg)
            this.collapse=this.$store.state.collapse
        })
        this.collapse=this.$store.state.collapse   //为了猛一开始就能切换到合适的样式
        console.log('modify--接受的数据collapse',this.collapse)

        // 形成标题组
        this.getAll()
    },
    methods: {
        /* 上传图片 */
        handleAvatarSuccess(res, file) {
            console.log("上传成功的图片",file)
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            console.log("上传的图片为",file)
            const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
            /* 一个1024是kb单位  两个1024是mb单位 */
            const isLt200M = file.size / 1024 / 1024 < 200;

            if (!isJPG) {
                this.$message.error('上传的图片只能是 JPG 或 png 格式!');
                return isJPG
            }else if (!isLt200M) {
                this.$message.error('上传的图片大小不能超过 200MB!');
                return isLt200M;
            }else{
                var fd=new FormData()
                fd.append("file",file)
                axios.post('/new/up',fd)
                .then((res)=>{
                    console.log("上传成功",res)
                    this.form.img=res.data.path
                    this.$message({
                        message:"上传图片成功",
                        type:"success"
                    })
                })
                .catch((err)=>{
                    console.log("上传失败",err)
                    this.$message({
                        message:"上传图片失败",
                        type:"warning"
                    })
                })
            }
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
        },
        // !添加
        Add(){
            this.addFlag=true
        },
        // 格式化时间
        formateDate(datetime) {
            function addDateZero(num) {
                return (num < 10 ? "0" + num : num);
            }
            let d = new Date(datetime);
            console.log("d是",d)
            let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
            return formatdatetime;
        },
        // 为了按照标题查询
        blur(){
            console.log("获取的标题",this.form.title)
            this.getNew()
        },
        getNew(){
            oneNew(this.form.title)
            .then((res)=>{
                console.log("利用标题查询成功",res)
                
                this.$message({
                    message:"查询成功",
                    type:"success"
                })
                this.form.title=res.info.title
                this.form.detail=res.info.detail
                this.form.img=res.info.img
                this.form.pubtime=this.formateDate(res.info.pubtime)
                this.form.content=res.info.content
                console.log("此时的表单",this.form)
            })
            .catch((err)=>{
                console.log("利用标题查询失败",res)
            })
        },
        // 获取所有的新闻---为了标题组
        getAll(){
            allNew()
            .then((res)=>{
                console.log("获取全部的新闻成功",res)
                this.titles=res.info.map(v=>v.title)
                console.log("标题组",this.titles)
            })
            .catch((err)=>{
                console.log("获取全部的新闻失败",err)
            })
        },
        // 点击提交
        submitForm(){
            console.log("点击了确定",this.form)
            // 提交修改
            updateNew(this.form.title,this.form)
            .then((res)=>{
                console.log("更新成功",res)

                this.$message({
                    message:"更新成功",
                    type:"success"
                })
                // 重新获取数据
                this.getNew()
            })
            .catch((err)=>{
                console.log("更新失败",err)
            })
        },
        // 点击 添加
        submitForm1(){
            console.log("点击了添加按钮",this.form)
            // 提交修改
            addNew(this.form)
            .then((res)=>{
                console.log("添加成功",res)

                this.$message({
                    message:"添加成功",
                    type:"success"
                })
                // 重新获取数据
                this.getNew()
                // 重新置空表单
                this.form={}
                // 将表单的状态变为下拉框
                this.addFlag=false
            })
            .catch((err)=>{
                console.log("添加失败",err)
            })
        },
        // 点击取消按钮
        resetForm(form){
            this.addFlag=false
            this.$message({
                message:"您点击了取消",
                type:"error"
            })
            this.$refs[form].resetFields();
        },
        // 点击删除按钮
        Del(form){
            this.formDelDialogFormVisible=true
        },
        // 点击  删除  对话框的  取消  按钮
        delFormOut(){
            this.$message({
                message:"您取消了删除",
                type:"error"
            })
            this.formDelDialogFormVisible=false
        },
        // 点击  删除  对话框的  确定  按钮
        delFormCommit(){
            if(this.form.title==''){
                this.$message({
                    message:"请先选择",
                    type:"warning"
                })
                this.formDelDialogFormVisible=false
            }else{
                console.log("删除此时的表单",this.form)
                deleteNew(this.form.title)
                .then((res)=>{
                    console.log("删除成功",res)
    
                    this.$message({
                        message:"删除成功",
                        type:"success"
                    })
    
                    this.form.title=''
                    this.form.img=''
                    this.form.content=''
                    this.form.pubtime=''
                    this.form.detail=''
    
                    this.getAll()
    
                    this.formDelDialogFormVisible=false
                })
                .catch((err)=>{
                    console.log("删除失败",err)
                })
            }
        }
    }
}
</script>

<style scoped>
/* 上传图片 */
/deep/.upload-demo input{
    display: none !important;
}
h2{
    margin-top: 20px;
}
.newManageOne{
    position: relative;
    width:calc(100vw - 63px);
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color: #ccccbf;
    top:-1px;
    left:63px;
    transition:left  1s;
}
.newManage{
    position: relative;
    width:87vw;
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color: #ccccbf;
    top:-1px;
    left:13vw;
    transition:left  1s;
}
.Form{
    width:90%;
    height:100%;
    overflow-y: scroll;
    margin-left: auto;
    margin-right: auto;
}
.Form::-webkit-scrollbar{
    width:0 !important;
}
.form{
    width:80%;
    height:auto;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
}
#img{
    width:100%;
    height:auto;
    /* border:1px solid red; */
    margin-left: 6%;
    display: flex;
    align-content: center;
    justify-content: center;
}
#img>img{
    width:10%;
    height:10%;
}

/* 添加按钮 */
.Add{
    width:120px;
    margin-left: 45%;
}
</style>
