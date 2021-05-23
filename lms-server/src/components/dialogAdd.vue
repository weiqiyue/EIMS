<template>
    <div class="dialog">
        <el-dialog
        :title="title" 
        center
        top="8vh"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :modal-append-to-body="false"
        >
            <el-form :model="addform" :rules="rules" ref="addform" label-position="right" label-width="120px"
        style="padding-left:-15px;">
                <el-form-item label="收支类型" prop="type">
                    <el-select v-model="addform.type" placeholder="请输入收支类型">
                        <el-option v-for="(item, index) in types" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收支描述" prop="describe">
                    <el-input v-model="addform.describe" type="text"></el-input>
                </el-form-item>
                <el-form-item label="收入" prop="income">
                    <el-input v-model="addform.income" type="text"></el-input>
                </el-form-item>
                <el-form-item label="支出" prop="expend">
                    <el-input v-model="addform.expend" type="text"></el-input>
                </el-form-item>
                <el-form-item label="账户现金" prop="cash">
                    <el-input v-model="addform.cash" type="text"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="addform.remark" type="text"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="submitForm('addform')" class="btn1">提交</el-button>
                    <el-button @click="resetForm('addform')" class="btn2">重置</el-button>
                    <el-button type="info" @click="dialogFormVisible=false" class="btn3">取消</el-button>
                </el-form-item>
            </el-form>  
        </el-dialog>
    </div>
</template>

<script>
import bus from '../assets/js/bus.js'
export default {
    data(){
        return{
            dialogFormVisible:false,
            addform:{},
            title:"",
            types:[
                "提现",
                "提现手续费",
                "充值",
                "充值礼券",
                "转账"
            ],
            rules:{
                type:[
                    {required:true,message:"收支类型不能为空",trigger:"blur"}
                ],
                describe:[
                    {required:true,message:"描述不能为空",trigger:"blur"}
                ],
                income:[
                    {required:true,message:"收入不能为空",trigger:"blur"}
                ],
                expend:[
                    {required:true,message:"支出不能为空",trigger:"blur"}
                ],
                cash:[
                    {required:true,message:"现金不能为空",trigger:"blur"}
                ],
                remark:[
                    {required:true,message:"备注不能为空",trigger:"blur"}
                ]
            }
        }
    },
    methods:{
        submitForm(addform){
            this.$refs[addform].validate((valid) => {
                if (valid) {
                    console.log("表单的数据",this.addform)
                    this.dialogFormVisible=false
                }
            })
        },
        resetForm(value){
            console.log("reset")
        }
    },
    created(){
        bus.$on("dialogFormVisible",msg=>{
            this.dialogFormVisible=msg
            console.log("添加对话框接受的数据",msg)
        })
        bus.$on("addform",msg=>{
            this.addform=msg
        })
        bus.$on("title",msg=>{
            this.title=msg
        })
        // bus.$emit("update")
    }
}
</script>

<style scoped>
.btn2{
    position: relative;
    left:120px;
}
.btn3{
    position: relative;
    left:240px;
}
</style>
