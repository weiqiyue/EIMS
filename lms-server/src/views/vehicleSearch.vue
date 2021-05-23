<template>
    <div :class="collapse===true ? 'OddOne' : 'Odd'">
        <!-- 有数据时显示 -->
        <div v-if="tableData.length!=0">
            <h2>已有车辆列表</h2>
            <!-- 筛选表单 不使用验证规则-->
            <el-form :inline="true" :model="form" class="demo-form-inline" ref="form" :hide-required-asterisk="true">
                <el-form-item  prop="type">
                    <el-select v-model="form.type" placeholder="请您选择筛选条件" v-on:blur="blur">
                        <el-option v-for="(item, index) in types" :key="index" :label='item' :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车牌号" prop="carcode" v-if="form.type=='车牌号'">
                    <el-input  type="text" v-model="form.carcode" autocomplete="off"   placeholder="请输入车牌号" size="samll"  clearable v-on:change="handleinput1($event)"></el-input>
                </el-form-item>
                <el-form-item label="品牌型号" prop="brand" v-if="form.type=='品牌型号'">
                    <el-input  type="text" v-model="form.brand" autocomplete="off"   placeholder="请输入品牌型号" size="samll"  clearable v-on:change="handleinput2($event)"></el-input>
                </el-form-item>
                <el-form-item label="驾驶员姓名" prop="carman" v-if="form.type=='驾驶员姓名'">
                    <el-input  type="text" v-model="form.carman" autocomplete="off"   placeholder="请输入驾驶员姓名" size="samll"  clearable v-on:change="handleinput3($event)"></el-input>
                </el-form-item>
            </el-form>
            <!-- 跑马灯 -->
            <div class="pmd">
                <pmd :lists="lists"></pmd>
            </div>

            <!-- 后台的数据通过表格展示 ---渲染的数据是数组类型的-->
            <el-table
            :data="data"
            style="width: 64%;margin-left:20%;"
            max-height="500"
            :border="true"
            >
                <!-- 索引 -->
                <el-table-column
                type="index"
                label="序号"
                align="center"
                width='70'
                fixed
                >
                </el-table-column>
                <el-table-column
                label="车牌号"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag==true?'active':''">{{ scope.row.carcode }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="品牌型号"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag1==true?'active':''">{{ scope.row.brand }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="首次上牌日期"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.time }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="驾驶员姓名"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag2==true?'active':''">{{ scope.row.carman }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="联系电话"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.carphone }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="备注"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.carremark }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="添加时间"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.rtime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="180" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页的部分 -->
            <div class="pagination">
                <el-pagination
                    background
                    layout = "total,prev,pager,next"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    :total="tableData.length"
                    @current-change="handleCurrentChange"
                    >
                </el-pagination>
            </div>
            <!-- 点击编辑弹出对话框 -->
            <el-dialog
            title="修改车辆信息" 
            center
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal-append-to-body="false"
            :show-close="false"
            >
                <el-form :model="packageForm" status-icon :rules="rules" ref="packageForm" label-width="120px" class="packageform" :hide-required-asterisk="true">
                    <!-- 寄件人部分################# -->
                    <el-form-item label="车牌号" prop="carcode">
                        <el-input type="text" v-model="packageForm.carcode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌型号" prop="brand">
                        <el-input type="text" v-model="packageForm.brand" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="首次上牌日期" prop="time">
                        <el-input type="text" v-model="packageForm.time" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="驾驶员姓名" prop="carman">
                        <el-input type="text" v-model="packageForm.carman" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="carphone">
                        <el-input type="text" v-model.number="packageForm.carphone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="carremark">
                        <el-input type="text" v-model.number="packageForm.carremark" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 收件人部分################# -->
                    <el-form-item label="添加时间" prop="rtime">
                        <el-input type="text" v-model="packageForm.rtime" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="cancelOne('packageForm')" style="margin-left:20%;">取消</el-button>
                        <el-button type="primary" @click="packageModifyOne('packageForm')" style="margin-left:20%;">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!-- 删除的对话框 -->
            <el-dialog
                title="删除订单" 
                center
                :visible.sync="delDialogFormVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false"
                :show-close="false"
                >
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="out">取 消</el-button>
                        <el-button type="primary" @click="del">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 没有数据时显示 -->
        <div v-else></div>
    </div>
</template>

<script>
import bus from '../assets/js/bus.js'
import pmd from '../components/paomadeng.vue'
import {allCar,modifyCar,deleteCar} from '../api/index.js'
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
            // 跑马灯
            lists: [
                `选择条件开启筛选.`,
                `点击<span style="color:red;">⊗</span>清空,再次筛选!!`
            ],
            dialogFormVisible:false,  //编辑对话框
            delDialogFormVisible:false,  //删除对话框
            Id:"",  //点击删除按钮接受要删除车辆的id
            Id1:"",  //点击编辑按钮接受要编辑车辆的id
            // 折叠菜单
            collapse:true,
            // 是否包含关键字的数据的样式
            activeFlag:false,
            activeFlag1:false,
            activeFlag2:false,
            // 分页相关的
            pageSize: 5, //分页每页大小
            currentPage: 1, //当前页
            currentIndex:1,
            // 筛选条件的表单
            form:{
                type:"",
                carcode:'',
                brand:'',
                carman:'',
            },
            // 修改信息的表单
            packageForm:{
                carcode:'',
                brand:'',
                carman:'',
                time:'',
                carphone:'',
                carremark:'',
                rtime:'',
            },
            // 修改信息表单的验证规则
            rules:{
                // 关于修改信息
                carman:[
                    {required:true,message:"驾驶员姓名不能为空",trigger:"blur"},
                ],
                carcode:[
                    {required:true,message:"车牌号不能为空",trigger:"blur"},
                ],
                carphone:[
                    {validator:validateMobile,trigger:"blur"},
                    { required: true, message:'请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }

                ],
                brand:[
                    {required:true,message:"品牌型号不能为空",trigger:"blur"}
                ],
                time:[
                    {required:true,message:"首次上牌日期不能为空",trigger:"blur"},
                ],
                rtime:[
                    {required:true,message:"添加时间不能为空",trigger:"blur"},
                ],
            },
            // 条件数组
            types:[
                "车牌号",
                "品牌型号",
                "驾驶员姓名",
            ],
            // 接受后台数据的数组
            tableData:[],
            // 条件表单的验证规则
        }
    },
    computed: {
        //计算当前搜索结果表里的数据---就是每页展示的数据
        data() {
            return this.tableData.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            );
        },
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
        console.log('modify--接受的数据collapse',this.collapse)

        // 获取数据--向数据数组赋值
        this.getData()
    },
    mounted() {
        
    },
    /* 筛选-----监听筛选有别断---对于输入汉字是友好的 */
    watch: {
        // 监听 筛选条件是否改变 
        'form.type'(val){
            console.log("选中的筛选的条件",val)
            // 每当条件改变--就会重新获取全部数据
            this.getData()
            // 防止样式都被激活
            this.activeFlag2=false
            this.activeFlag1=false
            this.activeFlag=false
            // 清除上一次的筛选条件
            if(this.form.carman!=''){
                this.form.carman=''
            }
            if(this.form.carcode!=''){
                this.form.carcode=''
            }
            if(this.form.brand!=''){
                this.form.brand=''
            }
        },
    },
    methods:{
        // 检验选中的值--select框
        blur(){
            console.log("选中的值",this.form.type)
        },
        // 提交--筛选的条件表单----最开始的作用为了进行筛选####改成上面的监听
        // submit(form){
        //     this.$refs[form].validate((valid) => {
        //         if (valid) {
        //             console.log("筛选的表单",this.form)
        //         } else {
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // },
        // 格式化时间
        formateDate(datetime) {
            function addDateZero(num) {
                return (num < 10 ? "0" + num : num);
            }
            let d = new Date(datetime);
            let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
            return formatdatetime;
        },
        // 向后台发起请求---获取数据
        getData(){
            allCar()
            .then((res)=>{
                console.log("获取全部数据成功",res)
                // 格式化添加时间+上牌时间
                res.info.forEach((item,index)=>{
                    item.rtime=this.formateDate(item.rtime)
                    item.time=this.formateDate(item.time).substr(0,10)
                })
                
                // 按照上牌日期降序排列
                var newList=res.info.sort((a,b)=>{
                    return (new Date(b.time).getTime()) - (new Date(a.time).getTime())
                })
                this.tableData=newList
                if(this.tableData.length==0){
                    this.$message({
                        message:"暂时还没有车辆信息",
                        type:"error"
                    })
                }

            })
            .catch((err)=>{
                console.log("获取全部数据失败",err)
            })
        },
        //获取当前页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.currentIndex=val
            console.log("当前页",this.currentPage)
        },
        // 编辑按钮
        handleEdit(index,row){
            console.log("打印的关于行的数据",index,row)
            // 唤醒对话框
            this.dialogFormVisible=true
            // 将本行的数据赋值给修改表单
            this.Id1=row._id
            this.packageForm.carcode=row.carcode
            this.packageForm.carman=row.carman
            this.packageForm.time=row.time
            this.packageForm.brand=row.brand
            this.packageForm.carphone=row.carphone
            this.packageForm.carremark=row.carremark
            this.packageForm.rtime=row.rtime
        },
        // 删除按钮
        handleDelete(index,row){
            console.log("点击了删除",index,row)
            // 唤醒删除对话框
            this.delDialogFormVisible=true
            // 赋值Id
            this.Id=row._id
            console.log("要删除的车辆的的id",this.Id)
        },
        // 点击  删除框  的  取消  按钮
        out(){
            console.log("点击了取消删除")
            // 弹出消息提示
            this.$message({
                message:"您取消了删除",
                type:"error"
            })
            // 关闭对话框
            this.delDialogFormVisible=false
        },
        del(){
            console.log("点击了确定删除")
            // 根据id(订单号)删除
            deleteCar(this.Id)
            .then((res)=>{
                console.log("删除车辆成功")
                // 提示
                this.$message({
                    message:"删除车辆信息成功",
                    type:"success"
                })
                // 刷新
                this.getData()

                // this.activeFlag=false
                // this.activeFlag1=false
                // this.activeFlag2=false
                // 关闭对话框
                this.delDialogFormVisible=false
            })
            .catch((err)=>{
                console.log("删除订单失败",err)
            })
        },
        // 点击修改表单的  取消  按钮
        cancelOne(){
            console.log("点击了取消")
            // 弹出提示
            this.$message({
                message:"您取消了修改",
                type:"error"
            })
            // 关闭对话框
            this.dialogFormVisible=false
        },
        // 点击修改表单的  确定  按钮
        packageModifyOne(packageForm){
            this.$refs[packageForm].validate((valid) => {
                if (valid) {
                    // 根据订单号(_id)修改数据
                    console.log("修改时的表单的信息",this.packageForm)
                    modifyCar(this.Id1,this.packageForm)
                    .then((res)=>{
                        console.log("更新成功",res)
                        // 提示
                        this.$message({
                            message:"修改车辆信息成功",
                            type:"success"
                        })
                        // 重新获取数据---刷新页面
                        this.getData()

                        // this.activeFlag=false
                        // this.activeFlag1=false
                        // this.activeFlag2=false
                        //关闭对话框
                        this.dialogFormVisible=false
                    })
                    .catch((err)=>{
                        console.log("更新失败",err)
                    })
                }
            })
        },
        // 筛选条件
        handleinput1(val){
            console.log('监听的车牌号',val)
            if(val!=''){
                this.activeFlag=true
                this.activeFlag1=false
                this.activeFlag2=false
                this.tableData=this.tableData.filter((item,index)=>{
                    if(item.carcode==val){
                        return item
                    }
                })
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该车辆",
                        type:"error"
                    })
                    this.activeFlag2=false
                    this.activeFlag1=false
                    this.activeFlag=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
            }else{
                this.activeFlag=false
                this.activeFlag1=false
                this.activeFlag2=false
                // 重新获取全部的数据
                this.getData()
            }
        },
        handleinput2(val){
            console.log('监听的用户',val)
            if(val!=''){
                this.activeFlag1=true
                this.activeFlag=false
                this.activeFlag2=false
                this.tableData=this.tableData.filter((item,index)=>{
                    if(item.brand==val){
                        return item
                    }
                })
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该车辆",
                        type:"error"
                    })
                    this.activeFlag2=false
                    this.activeFlag1=false
                    this.activeFlag=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
            }else{
                this.activeFlag1=false
                this.activeFlag=false
                this.activeFlag2=false
                // 重新获取全部的数据
                this.getData()
            }
        },
        handleinput3(val){
            console.log("监听的寄件人",val)
            if(val!=""){
                this.activeFlag2=true
                this.activeFlag1=false
                this.activeFlag=false
                this.tableData=this.tableData.filter((item,index)=>{
                    if(item.carman==val){
                        return item
                    }
                })
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该车辆",
                        type:"error"
                    })
                    this.activeFlag2=false
                    this.activeFlag1=false
                    this.activeFlag=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
            }else{
                this.activeFlag2=false
                this.activeFlag1=false
                this.activeFlag=false
                // 重新获取全部的数据
                this.getData()
            }
        },
    },
    components:{
        pmd,
    }
}
</script>

<style scoped>
h2{
    font-size: 22px;
    margin-top: 20px;
    font-weight: bold;
}
.demo-form-inline{
    margin-top: 20px;
}
.OddOne{
    position: relative;
    width:calc(100vw - 63px);
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    top:-1px;
    left:63px;
    transition:left  1s;
}
.Odd{
    position: relative;
    width:87vw;
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    top:-1px;
    left:13vw;
    transition:left  1s;
}
.pagination{
    margin-left: 5%;
    width:90%;
    height:6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dadada;
}
/* 含有查找信息的的样式 */
.active{
    color: red;
}
/* 跑马灯样式 */
.pmd{
    width:90%;
    margin-left: 5%;
    display:flex;
    justify-content: center;
    align-items: center;
}
/* 修改表单 */
.packageform{
    margin-left: -1%;
}
/* .btn{
    width:90%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:-6%;
} */
</style>
