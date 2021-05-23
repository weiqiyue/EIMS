<template>
    <div class="login">
        <div class="title">
            <h1>欢迎登陆--绝影</h1>
        </div>
        <div class="loginBox">
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm" label-position="right" label-width="80px">
                <el-form-item label="用户名" prop="name">
                    <el-input class="info" type="text" v-model="loginForm.name" autocomplete="off"  suffix-icon="el-icon-user" placeholder="请输入用户名" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off" suffix-icon="el-icon-date" placeholder="请输入密码" size="samll"  clearable show-password></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input type="text" class="code" v-model="loginForm.code" autocomplete="off" suffix-icon="el-icon-date" placeholder="请输入验证码，看不清点击更换" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">取消</el-button>
                    <a href="#/register" class="registerLink">还没有账号</a>
                </el-form-item>
            </el-form>
        </div>
        <div class="num">
            <span @click="getReCode()" class="login-code-img">
                <span :style="reOneStyle">{{reOne}}</span>
                <span :style="reTwoStyle">{{reTwo}}</span>
                <span :style="reThreeStyle">{{reThree}}</span>
                <span :style="reFourStyle">{{reFour}}</span>
            </span>
        </div>
    </div>
</template>

<script>
import {loginUser} from '../api/index.js'
import jwt_decode from 'jwt-decode'
export default {
    data(){
        /* 自定义验证码规则 */
        var checkCode=(rule,value,callback)=>{
            if(value!==this.flushReCode){
                callback(new Error("验证码不正确"))
            }else{
                callback()
            }
        }
        return{
            loginForm:{
                name:'',
                password:'',
                code:'',  //验证码
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
                code:[
                    {required:true,message:"验证码不能为空",trigger:"blur"},
                    {validator:checkCode,trigger:"blur"}
                ]
            },
            //显示的验证码部分,以及随机样式部分
            reOne:"",
            reTwo:"",
            reThree:"",
            reFour:"",
            reOneStyle:"",
            reTwoStyle:"",
            reThreeStyle:"",
            reFourStyle:"",
            //全局用来获取验证码吗的值字段
            flushReCode:"",
        }
    },
    mounted() {
        this.getReCode();
    },
    methods:{
        //生成验证码(需要把获取验证码的方法放到页面载入事件里面，保证进入页面可以刷到验证码)
        getReCode(){
            let chars = ["0","1","2","3","4","5","6","7","8","9"];
            let res = "";
            for (let i = 0; i < 4; i++) {
                let id = Math.ceil(Math.random() * 9);
                res += chars[id];
            }
            this.reOne = res[0];
            this.reTwo = res[1];
            this.reThree = res[2];
            this.reFour = res[3];
            //这里直接调用获取样式，保证验证码生成之后，可以直接获取验证码的样式
            this.getStyle();
            this.flushReCode = res;
            return res.toString();
        },
        //随机验证码样式
        getStyle(){
            let chars = [
                "font-weight: bold;font-size: 32px;text-decoration:overline;color:#BA55D3;font-family: 'Arabic Typesetting'",
                "font-weight: bold;font-size: 26px;text-decoration:overline;color:pink;font-family: 'PingFang SC'",
                "font-weight: solid;font-size: 33px;text-decoration:line-through;color:hotpink;font-family: Vijaya",
                "font-weight: bold;font-size: 25px;text-decoration:underline;color:#9400D3; font-family: Aharoni",
                "font-weight: bold;font-size: 29px;text-decoration:underline;color:#FF8C00;font-family: 'Arabic Typesetting'",
                "font-weight: bold;font-size: 27px;text-decoration:line-through;color:#FF1493;font-family: 'PingFang SC'",
                "font-weight: solid;font-size: 28px;text-decoration:line-through;color:#1E90FF;font-family: Vijaya",
            ];
            let res = [];
            for (let i = 0; i < 4; i++) {
                let id = Math.ceil(Math.random() * 7);
                res[i] += chars[id-1];
            }
            this.reOneStyle = res[0];
            this.reTwoStyle = res[1];
            this.reThreeStyle = res[2];
            this.reFourStyle = res[3];
            return res.toString();  //转换成字符串的形式
        },
        submitForm(loginForm) {
            this.$refs[loginForm].validate((valid) => {
                // valid是一个布尔值
                if (valid) {
                    loginUser(this.loginForm)
                        .then((res)=>{
                            console.log("登录的结果",res)
                            this.$notify({
                                message:"登录成功",
                                type:"success"
                            })
                            // 得到token--从后台响应的数据中---解构
                            var {token}=res
                            console.log("获取的token",token)
                            // 将token存入浏览器的缓存
                            localStorage.setItem("wqToken",token)

                            /* 语音--说话 */
                            var msg=new SpeechSynthesisUtterance(`亲爱的${this.loginForm.name}，欢迎您`)
                            speechSynthesis.speak(msg)

                            // 先得到存入缓存token,在进行路由的跳转，因为路由守卫是根据本地缓存中的token有无进行的
                            this.$router.push('/source')
                            // 解析token
                            var decode=jwt_decode(token)
                            console.log("解析后的token",decode)
                            // 将解析后的token存储在vuex(登陆状态)中
                            this.$store.dispatch('setAuthenticated', !this.isEmpty(decode))
                            this.$store.dispatch('setUser', decode)
                        })
                        .catch((err)=>{
                            console.log("登录失败",err)
                            this.loginForm.password=''
                            this.loginForm.code=''
                        })
                }else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        resetForm(loginForm) {
            this.$refs[loginForm].resetFields();
        },
        /* 判断数据是否为空的方法 */
        isEmpty(value){   /* 如果为下面的，就会返回true */
            return( 
                value===undefined ||
                value===null ||
                (typeof value===Object && Object.keys(value).length===0) ||
                (typeof value===String && value.trim().length===0)
            )
        }
        
    }
}
</script>

<style scoped>
    .login{
        /* 背景--全屏 */
        width:100vw;
        height:100vh;
        background: url("https://s3.jpg.cm/2021/02/17/g8jyp.jpg") no-repeat center;
        background-size: 100% 100%;
        position: relative;
    }
    .title{
        width:200px;
        height:30px;
        position: absolute;
        right:0;
        left:0;
        top:20%;
        margin:auto;
        text-align: center;
        line-height: 30px;
        color: #260033;
    }
    .loginBox{
        width:44%;
        /* width:40%; */
        height:50%;
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin: auto;
        /* 毛玻璃 */
        background: rgba( 255, 255, 255, 0.45 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 2.0px );
        -webkit-backdrop-filter: blur( 2.0px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
    }
    .demo-ruleForm{
        position:absolute;
        left:-24px;
        right:0;
        top:24px;
        bottom:0;
        margin: auto;
        width:88%;   /* 35vw */
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* align-items: center; */
    }
    .code{
        width:78%;
        margin-left: -21%;
    }
    .num{
        width:100px;
        height:40px;
        position: absolute;
        top:51.8%;
        left:63.6%;
    }
    .login-code-img {
        display: block;
        width:100%;
        height:100%;
        background-image:url("https://s3.jpg.cm/2021/02/17/gAGV2.jpg");
        border: 1px solid #f0f0f0;
        color: #333;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 5px;
        line-height: 38px;
        text-indent: 5px;
        text-align: center;
        overflow: hidden;
    }
    .btns{
        position: relative;
        left:-6%;
    }
    .registerLink{
        position: absolute;
        top:100%;
        right:5%;
        font-size: 16px;
    }
    .registerLink:hover{
        text-decoration: none;
    }
</style>
