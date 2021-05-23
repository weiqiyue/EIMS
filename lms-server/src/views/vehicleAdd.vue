<template>
    <div :class="collapse==true?'VehicleOne':'Vehicle'">
        <h2>添加车辆信息</h2>
        <el-form :model="carForm" status-icon :rules="rules" ref="carForm" label-width="120px" class="carForm" >
            <el-form-item label="车牌号" prop="carcode">
                <el-input type="text" v-model="carForm.carcode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品牌型号" prop="brand">
                <el-input type="text" v-model="carForm.brand" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="驾驶员" prop="carman">
                <el-input type="text" v-model="carForm.carman" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="首次上牌日期" prop="time">
                <el-date-picker v-model="carForm.time" type="datetime" placeholder="选择日期时间" style="width:100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="驾驶员电话" prop="carphone">
                <el-input type="text" v-model="carForm.carphone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="carremark">
                <el-input type="text" v-model.number="carForm.carremark" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="info" @click="carcancel('carForm')">取消</el-button>
                <el-button type="primary" @click="carsubmit('carForm')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import bus from '../assets/js/bus.js'
import {addCar, allCar} from '../api/index.js'
import { setTimeout } from 'timers';
export default {
    data(){
        /* 自定义的验证规则 */
        var validateMobile=(rule,value,callback)=>{
            var MobileRegex = /^1[0-9]{10}$/;
            if (!MobileRegex.test(value)) {
                callback(new Error('手机号码格式不正确！'))
            } else {
                callback();
            }
        };
        return{
            // 折叠按钮
            collapse:true,
            carForm:{
                carcode:'',
                brand:'',
                time:'',
                carman:'',
                carphone:'',
                carremark:''
            },
            rules:{
                carphone:[
                    {validator:validateMobile,trigger:"blur"},
                    { required: true, message:'请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
                ],
                carcode:[
                    {required:true,message:"请输入车牌号",trigger:'blur'}
                ],
                carman:[
                    {required:true,message:"请输入驾驶员",trigger:'blur'}
                ],
                brand:[
                    {required:true,message:"请输入品牌型号",trigger:'blur'}
                ],
                time:[
                    {required:true,message:"请输入品牌型号",trigger:'blur'}
                ],
            },
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
        // 取消按钮
        carcancel(carForm){
            console.log("点击了取消")
            this.$message({
                message:"操作失败",
                type:"error"
            })
            // 置空
            this.$refs[carForm].resetFields();
        },
        // 提交按钮
        carsubmit(carForm){
            this.$refs[carForm].validate((valid) => {
                // valid是一个布尔值
                if (valid) {
                    console.log("确定时的表单",this.carForm)
                    // 添加到后台
                    addCar(this.carForm)
                    .then((res)=>{
                        console.log("添加成功",res)
                        // 提示
                        if(res.status==400){
                            this.$message({
                                message:res.msg,
                                type:"error"
                            })
                        }else if(res.status==200){
                            this.$message({
                                message:"添加成功",
                                type:"success"
                            })
                            setTimeout(()=>{
                                // 置空
                                this.$refs[carForm].resetFields();
                            },1000)
                        }
                    })
                    .catch((err)=>{
                        console.log("添加失败",err)
                    })
                }
            })
        }
    },
}
</script>

<style scoped>
h2{
    margin-top: 20px;
}
.VehicleOne{
    position: relative;
    width:calc(100vw - 63px);
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color:#dadada;
    top:-1px;
    left:63px;
    transition:left  1s;
}
.Vehicle{
    position: relative;
    width:87vw;
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color:#dadada;
    top:-1px;
    left:13vw;
    transition:left  1s;
}
.carForm{
    padding:10px;
    width:70%;
    margin-left: auto;
    margin-right: auto;
}
</style>
