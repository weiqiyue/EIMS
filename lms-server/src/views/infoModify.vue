<!--
 * @Author: your name
 * @Date: 2021-03-28 16:21:32
 * @LastEditTime: 2021-04-24 18:54:04
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
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="modifyForm.password" autocomplete="off" suffix-icon="el-icon-date" placeholder="请输入密码" size="samll"  clearable></el-input>
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
            collapse:true,   //导航菜单刚开始时折叠的
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
                    {min:6,max:100,message:"长度在6-30之间",trigger:"blur"}
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
            var str=JSON.stringify(this.modifyForm)
            var str1=JSON.stringify(this.$store.state.user)
            console.log("字符串",str)
            console.log(str == str1)
            if(str == str1){
                this.$notify({
                    message: '您还没有更新！',
                    type: 'error'
                });
            }else{
                this.$refs[modifyForm].validate((valid) => {
                    // valid是一个布尔值
                    if (valid) {
                        console.log("此时的表单数据",this.$store.state.user.id)
                        modifyUser(this.modifyForm,this.$store.state.user.id)
                        .then((res)=>{
                            console.log("更新信息成功",res)
                            this.$notify({
                                message: '更新信息成功！请重新登录！',
                                type: 'success'
                            });
                            setTimeout(()=>{
                                this.$router.push("/login")
                            },1200)
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
            console.log("恢复的表单",this.$store.state.user)
            this.$notify({
                message: '您取消了更新',
                type: 'error'
            });
        }
    }
}
</script>

<style scoped>
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
    /* border:1px solid palevioletred; */
}
.demo-ruleForm{
    width:70%;
    /* height:100%; */
    margin-top: 2%;
    margin-left: -30px;
    padding:0 10px;
    /* border:1px solid green; */
}
.identify{
    width:100%;
}
</style>
