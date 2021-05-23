<template>
    <div :class="collapse===true ? 'AdminManageOne' : 'AdminManage'">
        <!-- 有数据时显示 -->
        <div v-if="tableData.length!=0">
            <h2>已有管理员注册列表</h2>
            <!-- 筛选表单 不使用验证规则-->
            <el-form :inline="true" :model="form" class="demo-form-inline" ref="form" :hide-required-asterisk="true">
                <el-form-item  prop="options">
                    <el-select v-model="form.type" placeholder="请您选择筛选条件" v-on:blur="blur">
                        <el-option v-for="(item, index) in types" :key="index" :label='item' :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名" prop="name" v-if="form.type=='用户名'">
                    <el-input  type="text" v-model="form.name" autocomplete="off"   placeholder="请输入用户名" size="samll"  clearable v-on:change="handleinput1($event)"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" v-if="form.type=='邮箱'">
                    <el-input  type="text" v-model="form.email" autocomplete="off"   placeholder="请输入邮箱" size="samll"  clearable v-on:change="handleinput2($event)"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone" v-if="form.type=='电话'">
                    <el-input  type="text" v-model="form.phone" autocomplete="off"   placeholder="请输入电话" size="samll"  clearable v-on:change="handleinput3($event)"></el-input>
                </el-form-item>
                <el-form-item label="身份" prop="identity" v-if="form.type=='身份'">
                    <el-input  type="text" v-model="form.identity" autocomplete="off"   placeholder="请输入收件人身份" size="samll"  clearable v-on:change="handleinput4($event)"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" v-on:click="submit('form')">查询</el-button>
                </el-form-item> -->
            </el-form>
            <!-- 跑马灯 -->
            <div class="pmd">
                <pmd :lists="lists"></pmd>
            </div>

            <!-- 后台的数据通过表格展示 ---渲染的数据是数组类型的-->
            <el-table
            :data="data"
            style="width: 80%;margin-left:5%;"
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
                label="用户名"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag==true?'active':''">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="邮箱"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag1==true?'active':''">{{ scope.row.email }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="电话"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag2==true?'active':''">{{ scope.row.phone }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="头像"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <img :src="getUrl(scope.row.avatar)" style="width:80px;height:80px;">
                    </template>
                </el-table-column>
                <el-table-column
                label="年龄"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.age }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="性别"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="地址"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.address }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="身份"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag3==true?'active':''">{{ scope.row.identity }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="备注"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="添加时间"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.registerDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="180" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">通过</el-button>
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
            <!-- 通过的对话框 -->
            <el-dialog
                title="审核" 
                center
                :visible.sync="checkDialogFormVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false"
                :show-close="false"
                >
                    <h1>是否审核通过</h1>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="confirm">确 定</el-button>
                    </span>
            </el-dialog>
            <!-- 删除的对话框 -->
            <el-dialog
                title="删除" 
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
import {allUser,oneUser,modifyUser} from '../api/index.js'
import {mixin} from '../mixins/index.js'
export default {
    mixins:[mixin],
    data(){
        return{
            // 用于展示管理员的头像
            url:"",
            // 跑马灯
            lists: [
                `选择条件开启筛选.`,
                `点击<span style="color:red;">⊗</span>清空,再次筛选!!`
            ],
            checkDialogFormVisible:false,  //审核对话框
            delDialogFormVisible:false,  //删除对话框
            // Id:"",  //点击删除按钮接受要删除管理员的id
            // 折叠菜单
            collapse:true,
            // 是否包含关键字的数据的样式
            activeFlag:false,
            activeFlag1:false,
            activeFlag2:false,
            activeFlag3:false,
            // 分页相关的
            pageSize: 5, //分页每页大小
            currentPage: 1, //当前页
            currentIndex:1,
            // 筛选条件的表单
            form:{
                type:"",
                name:"",
                email:"",
                phone:"",
                identity:"",
            },
            // 用于更新人员信息的
            modifyForm:{},
            // 条件数组
            types:[
                "用户名",
                "邮箱",
                "电话",
                "身份",
            ],
            // 接受后台数据的数组
            tableData:[],
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
    /* 筛选==========有弊端每次都监听 */
    watch: {
        // 监听 筛选条件是否改变 
        'form.type'(val){
            console.log("选中的筛选的条件",val)
            // 每当条件改变--就会重新获取全部数据
            this.getData()
            // 防止样式都被激活
            this.activeFlag2=false
            this.activeFlag1=false
            this.activeFlag3=false
            this.activeFlag=false
            // 清除上一次的筛选条件
            if(this.form.name!=''){
                this.form.name=''
            }
            if(this.form.email!=''){
                this.form.email=''
            }
            if(this.form.phone!=''){
                this.form.phone=''
            }
            if(this.form.identity!=''){
                this.form.identity=''
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
        // 格式化时间：
        formateDate(datetime) {
            function addDateZero(num) {
                return (num < 10 ? "0" + num : num);
            }
            let d = new Date(datetime);
            let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
            return formatdatetime;
        },
        // 向后台发起请求---获取数据--获取所有的用户
        getData(){
            allUser()
            .then((res)=>{
                console.log("得到全部人员成功",res)
                // 分页的当前页
                this.currentPage=this.currentIndex;
                // 分离出  管理员
                var newList=[]
                newList=res.doc.filter((item,index)=>{
                    if(item.identity=='employer' && item.status=='checking'){
                        return item
                    }
                })
                console.log("得到的管理员数组",newList)
                newList.forEach((item,index)=>{
                    // 格式化时间
                    item.registerDate=this.formateDate(item.registerDate)
                    // 格式化身份
                    if(item.identity=="employee"){
                        item.identity="员工"
                    }else if(item.identity=="employer"){
                        item.identity="管理员"
                    }
                    // 格式化性别
                    if(item.sex==1){
                        item.sex="男"
                    }else if(item.sex==2){
                        item.sex="女"
                    }else if(item.sex==3){
                        item.sex="不明"
                    }
                })
                // 将数组按照时间从大到小排序
                this.tableData=newList.sort((a,b)=>{
                    return (new Date(b.registerDate))-(new Date(a.registerDate))
                })
                // 判断数据数组是否为空
                if(this.tableData.length==0){
                    this.$message({
                        message:"暂时还没有待审核的管理员",
                        type:"error"
                    })
                }
            })
            .catch((err)=>{
                console.log("得到全部用户失败",err)
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
            console.log("打印的列的信息",row)
            // 展开对话框
            this.checkDialogFormVisible=true
            // 将对应的信息赋给更新表单
            this.modifyForm.id=row._id
            this.modifyForm.name=row.name
            this.modifyForm.password=row.password
            this.modifyForm.age=row.age
            this.modifyForm.email=row.email
            this.modifyForm.phone=row.phone
            this.modifyForm.status="checked"
            if(row.identity=='员工'){
                this.modifyForm.identity='employee'
            }else if(row.identity=='管理员'){
                this.modifyForm.identity='employer'
            }
            this.modifyForm.avatar=row.avatar
            this.modifyForm.remark=row.remark
            this.modifyForm.registerDate=row.registerDate
            this.modifyForm.address=row.address
            if(row.sex=="男"){
                this.modifyForm.sex=1
            }else if(row.sex=="女"){
                this.modifyForm.sex=2
            }else if(row.sex=="不明"){
                this.modifyForm.sex=3
            }
        },
        // 删除按钮
        handleDelete(index,row){
            console.log("点击了删除",index,row)
            // 唤醒删除对话框
            this.delDialogFormVisible=true
            // 将对应的信息赋给更新表单
            this.modifyForm.id=row._id
            this.modifyForm.name=row.name
            this.modifyForm.password=row.password
            this.modifyForm.age=row.age
            this.modifyForm.email=row.email
            this.modifyForm.phone=row.phone
            this.modifyForm.status="false"
            if(row.identity=='员工'){
                this.modifyForm.identity='employee'
            }else if(row.identity=='管理员'){
                this.modifyForm.identity='employer'
            }
            this.modifyForm.avatar=row.avatar
            this.modifyForm.remark=row.remark
            this.modifyForm.registerDate=row.registerDate
            this.modifyForm.address=row.address
            if(row.sex=="男"){
                this.modifyForm.sex=1
            }else if(row.sex=="女"){
                this.modifyForm.sex=2
            }else if(row.sex=="不明"){
                this.modifyForm.sex=3
            }
        },
        // 点击  删除框  的  取消  按钮
        out(){
            console.log("点击了取消删除")
            // 弹出消息提示
            this.$message({
                message:"您取消了删除",
                type:"warning"
            })
            // 关闭对话框
            this.delDialogFormVisible=false
        },
        del(){
            console.log("点击了确定删除")
            console.log("删除时的表单",this.modifyForm)
            // 根据id(订单号)删除
            modifyUser(this.modifyForm,this.modifyForm.id)
            .then((res)=>{
                console.log("删除人员成功",res)
                // 提示
                this.$message({
                    message:"删除人员成功",
                    type:"success"
                })
                // 关闭对话框
                this.delDialogFormVisible=false
                // 刷新
                this.getData()
            })
            .catch((err)=>{
                console.log("删除订单失败",err)
            })
        },
        // 点击审核表单的  取消  按钮
        cancel(){
            console.log("点击了取消")
            // 弹出提示
            this.$message({
                message:"您取消了审核",
                type:"warning"
            })
            // 关闭对话框
            this.checkDialogFormVisible=false
        },
        // 点击审核表单的  确定  按钮
        confirm(){
            console.log("点击确定时的表单",this.modifyForm)
            modifyUser(this.modifyForm,this.modifyForm.id)
            .then((res)=>{
                console.log("审核通过",res)
                // 重新获取数据---刷新页面
                this.getData()
                // 关闭对话框
                this.checkDialogFormVisible=false
            })
            .catch((err)=>{
                console.log("审核失败",err)
            })
        },
        // 筛选方法#########
        // 用户名
        handleinput1(val){
            console.log("监听的用户名",val)
            if(val!=""){
                this.activeFlag2=false
                this.activeFlag1=false
                this.activeFlag3=false
                this.activeFlag=true
                this.tableData=this.tableData.filter((item,index)=>{
                    if(item.name==val){
                        return item
                    }
                })
                if(this.tableData.length!=0){
                    // 查找成功--弹出提示
                    this.$message({
                        message:"查找成功",
                        type:"success"
                    })
                }
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该用户",
                        type:"error"
                    })
                    this.activeFlag=false
                    this.activeFlag1=false
                    this.activeFlag3=false
                    this.activeFlag2=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
            }else{
                this.activeFlag2=false
                this.activeFlag1=false
                this.activeFlag3=false
                this.activeFlag=false
                // 重新获取全部的数据
                this.getData()
            }
        },
        // 邮箱
        handleinput2(val){
            if(val!=''){
                this.activeFlag1=true
                this.activeFlag=false
                this.activeFlag3=false
                this.activeFlag2=false
                this.tableData=this.tableData.filter((item,index)=>{
                    if(item.email==val){
                        return item
                    }
                })
                if(this.tableData.length!=0){
                    // 查找成功--弹出提示
                    this.$message({
                        message:"查找成功",
                        type:"success"
                    })
                }
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该用户",
                        type:"error"
                    })
                    this.activeFlag=false
                    this.activeFlag1=false
                    this.activeFlag3=false
                    this.activeFlag2=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
            }else{
                this.activeFlag=false
                this.activeFlag1=false
                this.activeFlag3=false
                this.activeFlag2=false
                // 重新获取全部的数据
                this.getData()
            }
        },
        // 电话
        handleinput3(val){
            console.log("输入完毕",val)
            if(val!=''){
                this.activeFlag2=true
                this.activeFlag=false
                this.activeFlag3=false
                this.activeFlag1=false
                this.tableData=this.tableData.filter((item,index)=>{
                    if(item.phone==val){
                        return item
                    }
                })
                if(this.tableData.length!=0){
                    // 查找成功--弹出提示
                    this.$message({
                        message:"查找成功",
                        type:"success"
                    })
                }
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该用户",
                        type:"error"
                    })
                    this.activeFlag1=false
                    this.activeFlag=false
                    this.activeFlag3=false
                    this.activeFlag2=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
            }else{
                this.activeFlag1=false
                this.activeFlag=false
                this.activeFlag3=false
                this.activeFlag2=false
                // 重新获取全部的数据
                this.getData()
            }
        },
        // 身份
        handleinput4(val){
            if(val!=''){
                console.log('监听的身份',val)
                this.activeFlag3=true
                this.activeFlag=false
                this.activeFlag1=false
                this.activeFlag2=false
                this.tableData=this.tableData.filter((item,index)=>{
                    if(item.identity==val){
                        return item
                    }
                })
                if(this.tableData.length!=0){
                    // 查找成功--弹出提示
                    this.$message({
                        message:"查找成功",
                        type:"success"
                    })
                }
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该用户",
                        type:"error"
                    })
                    this.activeFlag3=false
                    this.activeFlag=false
                    this.activeFlag1=false
                    this.activeFlag2=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
            }else{
                this.activeFlag3=false
                this.activeFlag=false
                this.activeFlag1=false
                this.activeFlag2=false
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
.AdminManageOne{
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
.AdminManage{
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
.modifyForm{
    margin-left: -1%;
}
.btn{
    width:90%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:-6%;
}
</style>
