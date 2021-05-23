<!--
 * @Author: your name
 * @Date: 2021-02-19 12:24:21
 * @LastEditTime: 2021-04-22 17:46:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\views\lmsregister.vue
-->
<template>
    <div class="register">
        <div class="registerBox">
            <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" class="demo-ruleForm" label-position="right" label-width="80px" >
                <h1>欢迎注册</h1>
                <el-form-item label="用户名" prop="name">
                    <el-input class="info" type="text" v-model="registerForm.name" autocomplete="off"  suffix-icon="el-icon-user" placeholder="请输入用户名" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerForm.password" autocomplete="off" suffix-icon="el-icon-date" placeholder="请输入密码" size="samll"  clearable show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input type="password" v-model="registerForm.checkPassword" suffix-icon="el-icon-date" placeholder="请再次输入密码" size="samll"  clearable show-password></el-input>
                </el-form-item>
                <!-- 注意年龄 -->
                <el-form-item  label="年龄" prop="age">
                    <el-input type="text" v-model.number="registerForm.age" suffix-icon="el-icon-user-solid" placeholder="请输入年龄" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item  label="性别" prop="sex">
                    <el-radio-group v-model="registerForm.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        <el-radio :label="3">不明</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  label="邮箱" prop="email">
                    <el-input type="text"  v-model="registerForm.email" suffix-icon="el-icon-message" placeholder="请输入邮箱" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item  label="电话" prop="phone">
                    <el-input type="text" v-model="registerForm.phone" suffix-icon="el-icon-phone-outline" placeholder="请输入电话号码" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item  label="地址" prop="address">
                    <el-input type="text" v-model="registerForm.address" suffix-icon="el-icon-s-home" placeholder="请输入地址" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item  label="身份" prop="identity">
                    <el-select class="identify" v-model="registerForm.identity" placeholder="请选择身份">
                        <el-option label="普通用户" value="employee"></el-option>
                        <el-option label="管理员" value="employer"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="备注" prop="remark" >
                    <el-input type="textarea" class="remark" maxlength="100" show-word-limit  v-model="registerForm.remark"  clearable  placeholder="请输入内容" size="small"></el-input>
                </el-form-item>
                <el-form-item style="position:relative;">
                    <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
                    <el-button @click="resetForm('registerForm')">重置</el-button>
                    <a href="#/login" class="loginLink">已有账号</a>
                </el-form-item>
            </el-form>
        </div>
        <div class="welcome">
            <img src="https://s3.jpg.cm/2021/02/17/gAL9L.gif" class="haha">
        </div>
        <!-- <div>
            <iframe name="kuaidi" src="http://www.kuaidi.com/cominterface1616.html" width="960" height="800" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>
        </div> -->
    </div>
</template>

<script>
import {addUser} from '../api/index.js'
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
        /* 自定义的密码匹配规则 */
        var validatePass2 = (rule, value, callback) => {
            if (value !==this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
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
            registerForm:{
                name:'admin',
                password:'123123',
                checkPassword:'123123',
                age:19,
                sex:'',
                email:'11@qq.com',
                phone:'15516530096',
                address:'ch',
                remark:'hahha',
                identity:'employee'
            },
            rules:{
                name:[
                    {required:true,message:"用户名不能为空",trigger:"blur"},
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    {required:true,message:"密码不能为空",trigger:"blur"},
                    {min:6,max:30,message:"长度在6-30之间",trigger:"blur"}
                ],
                checkPassword:[
                    {required:true,message:"请再次输入密码",trigger:"blur"},
                    {min: 6, max: 30, message:"长度在6-30之间",trigger:"blur"},
                    {validator:validatePass2,trigger:"blur"}
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
                address:[
                    { required: true, message: '地址不能为空', trigger: 'blur' },
                ],
                identity:[
                    { required: true, message: '身份不能为空', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods:{
        submitForm(registerForm) {
            this.$refs[registerForm].validate((valid) => {
                // valid是一个布尔值
                if (valid) {
                    console.log("此时的表单数据",this.registerForm)
                    // var url="/admin/register"
                    // var params={
                    //     name:this.registerForm.name,
                    //     password:this.registerForm.password,
                    //     email:this.registerForm.email,
                    //     address:this.registerForm.address,
                    //     age:this.registerForm.age,
                    //     sex:this.registerForm.sex,
                    //     phone:this.registerForm.phone,
                    //     remark:this.registerForm.remark,
                    //     identity:this.registerForm.identity,
                    // }
                    addUser(this.registerForm)
                        .then((res)=>{
                            console.log("注册成功",res)
                                this.$router.push('/login')
                                this.$notify({
                                    message: '注册成功',
                                    type: 'success'
                                });
                        })
                        .catch((err)=>{
                            console.log("注册失败",err)
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(registerForm) {
            this.$refs[registerForm].resetFields();
        }
    }
}
</script>

<style scoped>
    .register{
        width:100vw;
        height:100vh;
        background: url("https://s3.jpg.cm/2021/02/17/gVfcW.jpg") no-repeat center;
        background-size: 100% 100%;
        position: relative;
        overflow:hidden;
    }
    .demo-ruleForm{
        /* border:1px solid red; */
        padding-top: 3%;
    }
    .registerBox{
        width:40%;
        height:88%;
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin: auto;
        /* 毛玻璃 */
        background: rgba( 155, 155, 155, 0.65 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 11.0px );
        -webkit-backdrop-filter: blur( 11.0px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
    }
    .demo-ruleForm{
        position:absolute;
        left:0;
        right:0;
        top:4px;
        bottom:0;
        margin: auto;
        width:88%;
        /* width:35vw; */
        overflow-y: scroll
    }
    .demo-ruleForm::-webkit-scrollbar{
        width:0 !important;
    }
    .identify{
        width:100%;
        /* width:456px; */
    }
    .welcome{
        width:20%;
        height:30%;
        position: absolute;
        top:60%;
        left:79%;
        /* border:1px solid red; */
    }
    .haha{
        opacity: 0.2;
        border-radius: 50%;
    }
    .loginLink{
        position: absolute;
        right:5%;
        top:100%;
        bottom:0;
        font-size: 16px;
    }
    .loginLink:hover{
        text-decoration: none;
    }
</style>
