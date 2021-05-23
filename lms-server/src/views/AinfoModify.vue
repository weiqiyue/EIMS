<!--
 * @Author: your name
 * @Date: 2021-03-28 16:21:32
 * @LastEditTime: 2021-05-09 00:21:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\views\infoModify.vue
-->
<template>
    <div :class="collapse==true ? 'Modify' : 'ModifyOne'">
        <div class="modifyTable">
            <el-form :model="modifyForm" status-icon :rules="rules" ref="modifyForm" class="demo-ruleForm" label-position="right" label-width="80px" :hide-required-asterisk="true">
                <el-form-item label="用户名" prop="name">
                    <el-input class="info" type="text" v-model="modifyForm.name" autocomplete="off"  suffix-icon="el-icon-user" placeholder="请输入用户名" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" style="position:relative;">
                    <el-input type="password" v-model="modifyForm.password" suffix-icon="el-icon-date" placeholder="请输入密码" size="samll"  clearable ref="password"></el-input>
                    <p v-if="pFlag" style="font-size:12px;color:red;position:absolute;top:30px;left:0;">密码长度在6~10之间</p>
                </el-form-item>
                <!-- 注意年龄 -->
                <el-form-item  label="年龄" prop="age">
                    <el-input type="text" v-model.number="modifyForm.age" suffix-icon="el-icon-user-solid" placeholder="请输入年龄" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item  label="性别" prop="sex">
                    <el-radio-group v-model="modifyForm.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        <el-radio :label="3">不明</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  label="邮箱" prop="email">
                    <el-input type="text"  v-model="modifyForm.email" suffix-icon="el-icon-message" placeholder="请输入邮箱" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item  label="电话" prop="phone">
                    <el-input type="text" v-model="modifyForm.phone" suffix-icon="el-icon-phone-outline" placeholder="请输入电话号码" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item  label="地址" prop="address">
                    <el-input type="text" v-model="modifyForm.address" suffix-icon="el-icon-s-home" placeholder="请输入地址" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item  label="头像" prop="avatar" style="height:auto;">
                    <!-- <el-input type="text" v-model="modifyForm.avatar" placeholder="请输入头像链接" size="samll"  clearable></el-input> -->
                    <!-- 上传头像 -->
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
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过20M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item  label="身份" prop="identity">
                    <el-select class="identify" v-model="modifyForm.identity" placeholder="请选择身份" :disabled="true">
                        <el-option label="普通用户" value="employee"></el-option>
                        <el-option label="管理员" value="employer"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="备注" prop="remark" >
                    <el-input type="textarea" class="remark" maxlength="100" show-word-limit  v-model="modifyForm.remark"  clearable  placeholder="请输入内容" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('modifyForm')">提交</el-button>
                    <el-button @click="resetForm()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import bus from '../assets/js/bus.js'
import {oneUser,modifyUser} from '../api/index.js'
export default {
    data(){
        /* 自定义年龄规则 */
        var checkAge = (rule, value, callback) => {
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                        callback(new Error('必须年满18岁'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
         /* 自定义的手机号验证规则 */
        var validateMobile=(rule,value,callback)=>{
            var MobileRegex = /^1[0-9]{10}$/;
            if (!MobileRegex.test(value)) {
                callback(new Error('手机号码格式不正确！'))
            } else {
                callback();
            }
        }
        return{
            fileList:[],  //图片上传列表
            collapse:true,   //导航菜单刚开始时折叠的
            pFlag:false,  //刷新页面验证密码
            modifyForm:{
                name:"",
                password:"",
                age:null,
                sex:"",
                email:"",
                phone:"",
                address:"",
                indentify:"",
                remark:"",
                avatar:"",
                registerDate:"",
            },
            rules:{
                name:[
                    {required:true,message:"用户名不能为空",trigger:"blur"},
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    {required:true,message:"密码不能为空",trigger:"blur"},
                    {min:6,max:10,message:"长度在6~10之间",trigger:"blur"},
                ],
                age:[
                    {required:true,message:"年龄不能为空",trigger:"blur"},
                    {validator:checkAge, trigger: 'blur'}
                ],
                sex:[
                    {required:true,message:"请选择性别",trigger:"change"}
                ],
                email:[
                    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                phone:[
                    { validator: validateMobile, trigger: 'blur' },
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
                ],
                // address:[
                //     { required: true, message: '地址不能为空', trigger: 'blur' },
                // ],
                avatar:[
                    { required: true, message: '头像链接不能为空', trigger: 'blur' },
                ],
                identity:[
                    { required: true, message: '身份不能为空', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    watch: {
        'modifyForm.password'(val){
            console.log("监听的表单的密码",val)
            if(this.modifyForm.password.length>10){
                this.pFlag=true
            }
            if(this.modifyForm.password.length==0){
                this.pFlag=false
            }
            if(this.modifyForm.password.length>=6 && this.modifyForm.password.length<=10){
                this.pFlag=false
            }
        }
    },
    created() {
        // 关于折叠菜单
        /* 关于导航栏收缩时的变化产生的前提 */
        bus.$on('collapse',msg=>{
            console.log('修改信息--接受的数据collapse',msg)
            this.$store.dispatch("setIsCollapse",msg)
            this.collapse=this.$store.state.collapse
        })
        this.collapse=this.$store.state.collapse   //为了猛一开始就能切换到合适的样式
        console.log('modify--接受的数据collapse',this.collapse)

        // 获取用户信息
        this.getinfo()

        this.modifyForm.password=this.$store.state.user.password
        if(this.modifyForm.password.length>10){
            this.pFlag=true
        }
    },
    mounted() {
        this.modifyForm.password=this.$store.state.user.password
        console.log("此时的密码",this.modifyForm.password)
    },
    methods:{
        /* 获取用户的信息 */
        getinfo(){
            console.log("前提条件",this.$store.state.user.name)
            oneUser(this.$store.state.user.name)
            .then((res)=>{
                console.log("modify获取单个用户信息成功",res)
                this.modifyForm=res.info
                
                // 格式化--时间
                let date = new Date(this.modifyForm.registerDate);
                this.modifyForm.registerDate=date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


                this.modifyForm.registerDate=this.modifyForm.registerDate.substr(0,10).replace(/-/g,'.')

                this.modifyForm.sex=parseInt(this.modifyForm.sex)

                console.log("重新定义的表单",this.modifyForm)
            })
            .catch((err)=>{
                console.log("modify获取单个用户信息失败",err)
            })
        },
        submitForm(modifyForm) {
            let date = new Date(this.$store.state.user.registerDate);
            this.$store.state.user.registerDate=date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            
            this.$store.state.user.registerDate=this.$store.state.user.registerDate.substr(0,10).replace(/-/g,'.')

            this.$store.state.user.sex=parseInt(this.$store.state.user.sex)

            console.log("提交的",this.$store.state.user)
            console.log("提交的22",this.modifyForm)

            if(this.pFlag!=false){
                return this.$message({
                    message:"请您检查错误",
                    type:"error"
                })
            }else if(
                this.modifyForm._id==this.$store.state.user.id &&
                this.modifyForm.name==this.$store.state.user.name &&
                this.modifyForm.identity==this.$store.state.user.identity &&
                this.modifyForm.password==this.$store.state.user.password &&
                this.modifyForm.eamil==this.$store.state.user.eamil &&
                this.modifyForm.sex==this.$store.state.user.sex &&
                this.modifyForm.age==this.$store.state.user.age &&
                this.modifyForm.address==this.$store.state.user.address &&
                this.modifyForm.registerDate==this.$store.state.user.registerDate &&
                this.modifyForm.remark==this.$store.state.user.remark &&
                this.modifyForm.phone==this.$store.state.user.phone &&
                this.modifyForm.avatar==this.$store.state.user.avatar
            ){
                this.$notify({
                    message: '您还没有更新！',
                    type: 'error'
                });
            }else{
                this.$refs[modifyForm].validate((valid) => {
                    // valid是一个布尔值
                    if (valid && this.pFlag==false) {
                        console.log("此时的表单数据",this.$store.state.user.id)
                        modifyUser(this.modifyForm,this.$store.state.user.id)
                        .then((res)=>{
                            console.log("更新信息成功",res)
                            if(res.status==403){
                                this.$message({
                                    message:res.msg,
                                    type:"error"
                                })
                            }else{
                                this.$notify({
                                    message: '更新信息成功！请重新登录！',
                                    type: 'success'
                                });
                                setTimeout(()=>{
                                    this.$router.push("/login")
                                },1200)
                            }
                        })
                        .catch((err)=>{
                            console.log("更新信息失败",err)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        resetForm() {
            this.getinfo()
            this.modifyForm.password=this.$store.state.user.password
            console.log("恢复的表单",this.$store.state.user)
            this.$notify({
                message: '您取消了更新',
                type: 'error'
            });
        },
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
                this.$message.error('上传头像图片只能是 JPG 或 png 格式!');
                return isJPG
            }else if (!isLt200M) {
                this.$message.error('上传头像图片大小不能超过 200MB!');
                return isLt200M;
            }else{
                var fd=new FormData()
                fd.append("file",file)
                axios.post('/admin/up',fd)
                .then((res)=>{
                    console.log("上传成功",res)
                    this.$message({
                        message:"上传头像成功",
                        type:"success"
                    })
                })
                .catch((err)=>{
                    console.log("上传失败",err)
                    this.$message({
                        message:"上传头像失败",
                        type:"warning"
                    })
                })
            }
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
        },
    }
}
</script>

<style scoped>
/* 上传图片 */
/deep/.upload-demo input{
    display: none !important;
}
.ModifyOne{
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
.Modify{
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
.modifyTable{
    width:70vw;
    height:89.3vh;
    position: absolute;
    top:-5%;
    bottom:0;
    right:0;
    left:0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba( 255, 255, 255, 0.20 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 3.0px );
    -webkit-backdrop-filter: blur( 3.0px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    overflow-y: scroll;
    /* border:1px solid palevioletred; */
}
.modifyTable::-webkit-scrollbar{
    width:0 !important;
}
.demo-ruleForm{
    width:70%;
    height:100%;
    margin-top: 2%;
    margin-left: -30px;
    padding:0 10px;
    /* border:1px solid green; */
}
.identify{
    width:100%;
}
</style>
