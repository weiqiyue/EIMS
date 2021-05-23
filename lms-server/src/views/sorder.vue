<template>
    <div :class="collapse==true ? 'SorderOne' : 'Sorder'">
        <!-- 寄件人部分###################### -->
        <div class="sorderForm" v-if="codes.length!=0">
            <h3>添加运单发货</h3>
            <el-form :model="spackageForm" status-icon :rules="rules" ref="spackageForm" label-width="120px" class="spackageForm" :hide-required-asterisk="true">
                <el-form-item label="订单号" prop="code" >
                    <el-select v-model="spackageForm.code" placeholder="请输入货单号" @change="enter"  class="code">
                        <el-option v-for="(item, index) in codes" :key="index" :label='item' :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户" prop="username">
                    <el-input type="text" v-model="spackageForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="寄件人姓名" prop="Susername">
                    <el-input type="text" v-model="spackageForm.Susername" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="寄件人号码" prop="Sphone">
                    <el-input type="text" v-model="spackageForm.Sphone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="寄件人详细地址" prop="Saddress">
                    <el-input type="text" v-model="spackageForm.Saddress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="包裹名字" prop="packagename">
                    <el-input type="text" v-model="spackageForm.packagename" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="包裹数量" prop="packagenum">
                    <el-input type="text" v-model.number="spackageForm.packagenum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="包裹重量" prop="packageweight">
                    <el-input type="text" v-model.number="spackageForm.packageweight" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 收件人部分################# -->
                <el-form-item label="收件人姓名" prop="Cusername">
                    <el-input type="text" v-model="spackageForm.Cusername" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收件人号码" prop="Cphone">
                    <el-input type="text" v-model="spackageForm.Cphone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收件人详细地址" prop="Caddress">
                    <el-input type="text" v-model="spackageForm.Caddress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="订单进度" prop="progress">
                    <el-input type="text" v-model="spackageForm.progress" autocomplete="off" :id="colorFlag==true?'red':'green'"></el-input>
                </el-form-item>
                <el-form-item label="发货员" prop="sman">
                    <el-input type="text" v-model="spackageForm.sman" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="发货时间" prop="stime">
                    <el-date-picker v-model="spackageForm.stime" type="datetime" placeholder="选择日期时间" style="width:100%;" v-on:blur="handleblur">
                </el-date-picker>
                </el-form-item>
                <el-form-item  label="备注" prop="sremark" class="remark">
                    <el-input type="textarea"  maxlength="100" show-word-limit  v-model="spackageForm.sremark"  clearable  placeholder="请输入内容" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="scancel('spackageForm')">取消</el-button>
                    <el-button type="primary" @click="spackageModify('spackageForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-else></div>
    </div>
</template>

<script>
import bus from '../assets/js/bus.js'
import {allPackage,byCode,Modify} from '../api/index.js'
export default {
    data(){
        var validateMobile=(rule,value,callback)=>{
            var MobileRegex = /^1[0-9]{10}$/;
            if (!MobileRegex.test(value)) {
                callback(new Error('手机号码格式不正确！'))
            } else {
                callback();
            }
        };
        var checkNum1=(rule,value,callback)=>{
            if(!value){
                return callback(new Error('重量不能为空'))
            }
            setTimeout(()=>{
                if(!Number.isInteger(value)){
                    callback(new Error("请输入数字值"));
                }else{
                    callback();
                }
            },1000)
        };
        var checkNum=(rule,value,callback)=>{
            if(!value){
                return callback(new Error('数量不能为空，至少1件'))
            }
            setTimeout(()=>{
                if(!Number.isInteger(value)){
                    callback(new Error("请输入数字值"));
                }else{
                    callback();
                }
            },1000)
        }
        return{
            collapse:true,
            colorFlag:true,
            //表单审核信息
            spackageForm:{
                code:'',
                username:'',
                Susername:'',
                Sphone:'',
                Saddress:'',
                sarea:'',
                packagename:'',
                packagenum:'',
                packageweight:'',
                Cusername:'',
                Cphone:'',
                Caddress:'',
                carea:'',
                progress:'',
                sremark:'',
                sman:'',
                stime:'',
                ctime:'',  //为了判断与收货日期是否一样
            },
            odds:[],   //用于接受后台所有符合状态为【订单审核中】的订单
            codes:[],  //用于接受后台所有状态为【订单审核中】的订单的   id
            rules:{
                Susername:[
                    {required:true,message:"寄件人不能为空",trigger:"blur"},
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                username:[
                    {required:true,message:"用户不能为空",trigger:"blur"},
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                Sphone:[
                    {validator:validateMobile,trigger:"blur"},
                    { required: true, message:'请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }

                ],
                sarea:[
                    {required:true,message:"地区不能为空",trigger:"change"}
                ],
                Saddress:[
                    {required:true,message:"详细地址不能为空",trigger:"blur"},
                    {min:3,message:"最少3个字",trigger:"blur"},
                ],
                Cusername:[
                    {required:true,message:"收件人不能为空",trigger:"blur"},
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                Cphone:[
                    {validator:validateMobile,trigger:"blur"},
                    { required: true, message:'请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }

                ],
                carea:[
                    {required:true,message:"地区不能为空",trigger:"change"}
                ],
                // code:[
                //     {required:true,message:"订单号不能为空",trigger:"change"}
                // ],
                progress:[
                    {required:true,message:"订单进度不能为空",trigger:"change"}
                ],
                sman:[
                    {required:true,message:"收货员不能为空",trigger:"change"}
                ],
                Caddress:[
                    {required:true,message:"详细地址不能为空",trigger:"blur"},
                    {min:3,message:"最少3个字",trigger:"blur"},
                ],
                packagename:[
                    {required:true,message:"包裹名字不能为空",trigger:"blur"}
                ],
                packagenum:[
                    {required:true,validator:checkNum,trigger:"blur"},
                ],
                packageweight:[
                    {required:true,validator:checkNum1,trigger:"blur"},
                ]
            },

        }
    },
    watch:{

    },
    created(){
        // 关于折叠菜单
        /* 关于导航栏收缩时的变化产生的前提 */
        bus.$on('collapse',msg=>{
            console.log('修改信息--接受的数据collapse',msg)
            this.$store.dispatch("setIsCollapse",msg)
            this.collapse=this.$store.state.collapse
        })
        this.collapse=this.$store.state.collapse   //为了猛一开始就能切换到合适的样式

        // 从后台获取所有状态为【订单审核中】的订单
        this.getAllPackage()
        
    },
    methods:{
        // 获取所有的订单
        getAllPackage(){
            allPackage()
            .then((res)=>{
                console.log("获取全部的订单成功",res)
                this.odds=res.info.filter((item,index)=>{
                    if(item.progress=="下单成功"){
                        return item
                    }
                })
                console.log("所有符合条件的订单",this.odds)
                this.codes=this.odds.map((item,index)=>{
                    return item._id
                })
                //判断是否由合适条件的订单
                if(this.codes.length==0){
                    this.$message({
                        message:"还没有订单审核通过",
                        type:"error"
                    })
                }
                console.log("所有符合条件的订单的id",this.codes)
            })
            .catch((err)=>{
                console.log("获取全部的订单失败",err)
            })
        },
        // 根据id(订单号查询)订单
        enter(val){
            console.log("订单号为",val)
                byCode(this.spackageForm.code)
                .then((res)=>{
                    console.log("根据订单号查询成功",res)
                    res.info[0].code=res.info[0]._id
                    this.spackageForm=res.info[0]
                    // 获取管理员的名字--赋值到表单中
                    this.spackageForm.sman=this.$store.state.user.name
                })
                .catch((err)=>{
                    console.log("根据订单号查询失败",err)
                })
        },
        // 检查时间格式转化的对不对---发货时间与收货时间是否一样
        handleblur(){
            var date=new Date(this.spackageForm.stime).getTime()
            var date1=new Date(this.spackageForm.ctime).getTime()
            console.log("选择的时间",date,date1)
            if(date<=date1){
                this.$message({
                    message:"发货时间不能早于或等于收货时间",
                    type:"error"
                })
                this.spackageForm.stime=''
            }
        },
        // 点击表单的  取消 按钮
        scancel(spackageForm){
            this.$refs[spackageForm].resetFields();
            this.$message({
                message:"操作失败",
                type:"error"
            })
        },
        // 点击表单的确定按钮
        spackageModify(spackageForm){
            this.$refs[spackageForm].validate((valid) => {
                if (valid) {
                    console.log("表单",this.spackageForm)
                    // 改变订单的状态
                    this.spackageForm.progress="收货员已收货"
                    // 更新订单信息
                    Modify(this.spackageForm.code,this.spackageForm)
                    .then((res)=>{
                        console.log("更新信息成功",res)
                        // 改变字体颜色标识符
                        this.colorFlag=false
                        // 弹出提示框
                        this.$message({
                            message:"操作成功",
                            type:"success"
                        })
                        // 清空表单
                        setTimeout(()=>{
                            this.spackageForm={}
                        },5000)
                    })
                    .catch((err)=>{
                        console.log("更新信息失败",err)
                    })
                }
            })
        },
    },
}
</script>

<style scoped>
.SorderOne{
    position: relative;
    width:calc(100vw - 63px);
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color:#d9d9f3;
    top:-1px;
    left:63px;
    transition:left  1s;
}
.Sorder{
    position: relative;
    width:87vw;
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color:#d9d9f3;
    top:-1px;
    left:13vw;
    transition:left  1s;
}
h3{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
.sorderForm{
    width:100%;
    height:100%;
    /* border:1px solid red; */
    overflow-y: scroll;
}
.spackageForm::-webkit-scrollbar{
    width: 0 !important;
}
/* 表单 */
.spackageForm{
    width:90%;
    margin-left:auto;
    margin-right: auto;
    height:90%;
    overflow-y: scroll;
    box-shadow: 5px 5px 10px #888888;
    padding:10px;
    /* border:1px solid green; */
}
.spackageForm::-webkit-scrollbar{
    width:0 !important;
}
.code{
    width:100%;
}
/deep/#red{
    color:#5bd1d7 !important;
}
/deep/#green{
    color: #005792 !important;
}
</style>
