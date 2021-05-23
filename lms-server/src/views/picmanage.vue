<template>
    <div :class="collapse==true?'PicManageOne':'PicManage'">
        <h2>添加轮播图</h2>
        <div class="optionBtn">
            <el-button type="primary" round size="medium" v-on:click="handleOne">上传单张</el-button>
            <el-button type="success" round  size="medium" v-on:click="handleMany">上传多张</el-button>
        </div>
        <div class="upOne" v-if="upFlag==true">
            <el-form :model="picForm" status-icon :rules="rules" ref="picForm" class="demo-ruleForm" label-position="right" label-width="80px">
                <el-form-item label="图片链接" prop="img">
                    <el-input class="info" type="text" v-model="picForm.img" autocomplete="off"   placeholder="请输入图片链接" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="submitForm('picForm')">上传</el-button>
                    <el-button @click="resetForm('picForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="upMany" v-if="upFlag==false">
            <el-input type="textarea" :rows="4" placeholder="请输入图片链接,并用逗号分隔" v-model="imgs" autosize v-on:input="blur($event)"></el-input>
            <div class="btns">
                <el-button type="info" round size="small" style="width:10%;" v-on:click="up">提交</el-button>
                <el-button type="danger" round size="small" style="width:10%;" v-on:click="cancel">重置</el-button>
            </div>
        </div>
    </div>
</template> 

<script>
import bus from '../assets/js/bus.js'
import {ManyPic,OnePic} from '../api/index.js'
export default {
    data(){
        var checkPic = (rule, value, callback) => {
        setTimeout(() => {
            if(/.(png|jpg|jpeg)$/g.test(value)) {
                //为图片
                callback()
            } else {
                //不是图片
                callback(new Error('输入的不是图片链接'));
            }
        }, 1000);
        };
        return{
            collapse:true,
            upFlag:true,  //判断是否上传单个还是多个
            image:[],   //用于存储图片字符串转换的数组
            imgs:"",
            // 图片列表
            picForm:{
                img:'',
            },
            // 规则
            rules:{
                img:[
                    {required:true,message:"图片链接不能为空",trigger:"blur"},
                    {validator:checkPic,trigger:"blur"}
                ]
            }
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
    },
    methods: {
        // 一个
        handleOne(){
            this.upFlag=true
        },
        handleMany(){
            this.upFlag=false
        },
        // 提交按钮
        submitForm(picForm){
            this.$refs[picForm].validate((valid) => {
                // valid是一个布尔值
                if (valid) {
                    console.log("更新单个时的表单",this.picForm)
                    OnePic(this.picForm)
                    .then((res)=>{
                        console.log("更新单个图片成功",res)
                        this.$message({
                            message:"更新成功",
                            type:"success"
                        })
                        // 清空表单
                        this.$refs[picForm].resetFields()
                    })
                    .catch((err)=>{
                        console.log("更新单个图片失败",err)
                    })
                }
            })
        },
        // 重置按钮
        resetForm(picForm){
            this.$refs[picForm].resetFields()
        },
        // 上传多个的时候
        blur(val){
            console.log("上传的内容",val)
            this.imgs=val
        },
        up(){
            console.log("上传图片的数组",this.image)
            if(/.(png|jpg|jpeg)$/g.test(this.imgs)) {
                //为图片
                this.image=this.imgs.split(',')
                if(this.image.length<=1){
                    this.$message({
                        message:"至少上传2张图片",
                        type:"error"
                    })
                }else{
                    // 上传
                    ManyPic(this.image)
                    .then((res)=>{
                        console.log("上传多个图片成功",res)
                        this.$message({
                            message:"上传多个图片成功",
                            type:"success"
                        })
                        // 清空文本域
                        this.imgs=''
                        this.image=[]
                    })
                    .catch((err)=>{
                        console.log("上传多个图片失败",err)
                    })
                }
            } else{
                this.$message({
                    message:"请上传图片链接",
                    type:"error"
                })
            }
        },
        cancel(){
            console.log("点击了重置")
            this.imgs=''
        },

    }
}
</script>

<style scoped>
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
.optionBtn{
    width:100%;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.upOne{
    width:50%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    left:-3.6%;
}
.upMany{
    width:50%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}
.btns{
    width:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}


</style>
