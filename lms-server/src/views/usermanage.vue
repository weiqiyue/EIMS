<template>
    <div :class="collapse===true ? 'UserManageOne' : 'UserManage'">
        <!-- 有数据时显示 -->
        <div v-if="tableData.length!=0">
            <h2>已有用户注册列表</h2>
            <!-- 筛选表单 不使用验证规则-->
            <el-form :inline="true" :model="form" class="demo-form-inline" ref="form" :hide-required-asterisk="true">
                <el-form-item  prop="type">
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
            title="修改用户信息" 
            center
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal-append-to-body="false"
            :show-close="false"
            >
                <el-form :model="modifyForm" status-icon :rules="rules" ref="modifyForm" class="demo-ruleForm" label-position="right" label-width="80px" :hide-required-asterisk="true">
                <el-form-item label="用户名" prop="name">
                    <el-input class="info" type="text" v-model="modifyForm.name" autocomplete="off"  suffix-icon="el-icon-user" placeholder="请输入用户名" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="modifyForm.password" autocomplete="off" suffix-icon="el-icon-date" placeholder="请输入密码" size="samll"  clearable></el-input>
                </el-form-item>
                <!-- 检查密码 -->
                <p v-if="pFlag==true" style="color:red;font-size:12px;margin-left:13%;margin-top:-3%;">长度在6-10之间</p>
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
                <el-form-item  label="头像" prop="avatar">
                    <!-- <el-input type="text" v-model="modifyForm.avatar" placeholder="请输入头像链接" size="samll"  clearable></el-input> -->
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
                    <el-select class="identify" v-model="modifyForm.identity" placeholder="请选择身份"  style="width:100%;">
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
            </el-dialog>
            <!-- 删除的对话框 -->
            <el-dialog
                title="删除该用户" 
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
import {allUser,oneUser,modifyUser,deleteUser} from '../api/index.js'
import {mixin} from '../mixins/index.js'
import axios from 'axios'
export default {
    mixins:[mixin],
    data(){
        /* 自定义的验证规则 */
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
        var validateMobile=(rule,value,callback)=>{
            var MobileRegex = /^1[0-9]{10}$/;
            if (!MobileRegex.test(value)) {
                callback(new Error('手机号码格式不正确！'))
            } else {
                callback();
            }
        };
        return{
            // 用于展示用户的头像
            url:"",
            pFlag:true,  //初始化检查密码报错
            // 跑马灯
            lists: [
                `选择条件开启筛选.`,
                `点击<span style="color:red;">⊗</span>清空,再次筛选!!`
            ],
            dialogFormVisible:false,  //编辑对话框
            delDialogFormVisible:false,  //删除对话框
            Id:"",  //点击删除按钮接受要删除订单的id(订单号)
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
            // 修改信息的表单
            modifyForm:{
                id:"",
                name:"",
                password:"",
                age:null,
                sex:"",
                email:"",
                phone:"",
                address:"",
                identity:"",
                remark:"",
                avatar:"",
                registerDate:"",
            },
            // 修改信息表单的验证规则
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
                avatar:[
                    { required: true, message: '头像链接不能为空', trigger: 'blur' },
                ],
                identity:[
                    { required: true, message: '身份不能为空', trigger: ['blur', 'change'] }
                ]
            },
            // 条件数组
            types:[
                "用户名",
                "邮箱",
                "电话",
                "身份",
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
    /* 筛选----有弊端########### */
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
        // 监听表单的密码长度变化
        'modifyForm.password'(val){
            console.log("监听的密码长度",this.modifyForm.password.length)
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
        // 监听  用户名  筛选
        // 'form.name'(val){
        //     console.log("监听的用户名",val)
        //     if(val!=""){
        //         this.activeFlag2=false
        //         this.activeFlag1=false
        //         this.activeFlag3=false
        //         this.activeFlag=true
        //         this.tableData=this.tableData.filter((item,index)=>{
        //             if(item.name==val){
        //                 return item
        //             }
        //         })
        //         if(this.tableData.length==0){
        //             this.$message({
        //                 message:"查找错误,没有该用户",
        //                 type:"error"
        //             })
        //             this.activeFlag=false
        //             this.activeFlag1=false
        //             this.activeFlag3=false
        //             this.activeFlag2=false
        //             //重新获取数据
        //             setTimeout(()=>{
        //                 this.getData()
        //             },1000)
        //         }
        //     }else{
        //         this.activeFlag2=false
        //         this.activeFlag1=false
        //         this.activeFlag3=false
        //         this.activeFlag=false
        //         // 重新获取全部的数据
        //         this.getData()
        //     }
        // },
        // // 监听  邮箱  进行筛选
        // 'form.email'(val){
        //     console.log('监听的邮箱',val)
        //     if(val!=''){
        //         this.activeFlag1=true
        //         this.activeFlag=false
        //         this.activeFlag3=false
        //         this.activeFlag2=false
        //         this.tableData=this.tableData.filter((item,index)=>{
        //             if(item.email==val){
        //                 return item
        //             }
        //         })
        //         if(this.tableData.length==0){
        //             this.$message({
        //                 message:"查找错误,没有该用户",
        //                 type:"error"
        //             })
        //             this.activeFlag=false
        //             this.activeFlag1=false
        //             this.activeFlag3=false
        //             this.activeFlag2=false
        //             //重新获取数据
        //             setTimeout(()=>{
        //                 this.getData()
        //             },1000)
        //         }
        //     }else{
        //         this.activeFlag=false
        //         this.activeFlag1=false
        //         this.activeFlag3=false
        //         this.activeFlag2=false
        //         // 重新获取全部的数据
        //         this.getData()
        //     }
        // },
        // // 监听  电话  进行筛选
        // 'form.phone'(val){
        //     console.log('监听的电话',val)
        //     if(val!=''){
        //         this.activeFlag2=true
        //         this.activeFlag=false
        //         this.activeFlag3=false
        //         this.activeFlag1=false
        //         this.tableData=this.tableData.filter((item,index)=>{
        //             if(item.phone==val){
        //                 return item
        //             }
        //         })
        //         if(this.tableData.length==0){
        //             this.$message({
        //                 message:"查找错误,没有该用户",
        //                 type:"error"
        //             })
        //             this.activeFlag1=false
        //             this.activeFlag=false
        //             this.activeFlag3=false
        //             this.activeFlag2=false
        //             //重新获取数据
        //             setTimeout(()=>{
        //                 this.getData()
        //             },1000)
        //         }
        //     }else{
        //         this.activeFlag1=false
        //         this.activeFlag=false
        //         this.activeFlag3=false
        //         this.activeFlag2=false
        //         // 重新获取全部的数据
        //         this.getData()
        //     }
        // },
        // // 监听  身份  进行筛选
        // 'form.identity'(val){
        //     if(val!=''){
        //         console.log('监听的身份',val)
        //         this.activeFlag3=true
        //         this.activeFlag=false
        //         this.activeFlag1=false
        //         this.activeFlag2=false
        //         this.tableData=this.tableData.filter((item,index)=>{
        //             if(item.identity==val){
        //                 return item
        //             }
        //         })
        //         if(this.tableData.length==0){
        //             this.$message({
        //                 message:"查找错误,没有该用户",
        //                 type:"error"
        //             })
        //             this.activeFlag3=false
        //             this.activeFlag=false
        //             this.activeFlag1=false
        //             this.activeFlag2=false
        //             //重新获取数据
        //             setTimeout(()=>{
        //                 this.getData()
        //             },1000)
        //         }
        //         }else{
        //             this.activeFlag3=false
        //             this.activeFlag=false
        //             this.activeFlag1=false
        //             this.activeFlag2=false
        //             // 重新获取全部的数据
        //             this.getData()
        //         }
        // },
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
                console.log("得到全部用户成功",res)
                // 分页的当前页
                this.currentPage=this.currentIndex;
                // 分离出  用户
                var newList=[]
                newList=res.doc.filter((item,index)=>{
                    if(item.identity=='employee'){
                        return item
                    }
                })
                newList.forEach((item,index)=>{
                    // 格式化时间
                    item.registerDate=this.formateDate(item.registerDate)
                    // 格式化身份
                    if(item.identity=="employee"){
                        item.identity="普通用户"
                    }
                    // else if(item.identity=="employer"){
                    //     item.identity="管理员"
                    // }
                    
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
                        message:"暂时还没有用户",
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
            // 根据名字查询信息---为了获取id--为了修改信息
            oneUser(row.name)
            .then((res)=>{
                console.log("通过名字查询成功",res)
                this.modifyForm.id=res.info._id
            })
            .catch((err)=>{
                console.log("通过名字查询失败",err)
            })

            // 唤醒对话框
            this.dialogFormVisible=true
            // 将本行的数据赋值给修改表单
            this.modifyForm.name=row.name
            this.modifyForm.password=row.password
            if(this.modifyForm.password.length>10){
                this.pFlag=true
            }
            this.modifyForm.age=row.age
            this.modifyForm.email=row.email
            this.modifyForm.phone=row.phone
            this.modifyForm.status=row.status
            if(row.identity=='普通用户'){
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

            console.log("点击编辑时的表单",this.modifyForm)
        },
        // 删除按钮
        handleDelete(index,row){
            console.log("点击了删除",index,row)
            // 唤醒删除对话框
            this.delDialogFormVisible=true
            // 赋值Id
            this.Id=row._id
            console.log("要删除的订单的id",this.Id)
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
            deleteUser(this.Id)
            .then((res)=>{
                console.log("删除订单成功")
                // 提示
                this.$message({
                    message:"删除订单成功",
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
        // 点击修改表单的  取消  按钮
        resetForm(){
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
        submitForm(modifyForm){
            if(this.pFlag==true){
                this.$message({
                    message:"请先检查错误",
                    type:"error"
                })
            }else{
                this.$refs[modifyForm].validate((valid) => {
                    if (valid) {
                        // 根据订单号(_id)修改数据
                        modifyUser(this.modifyForm,this.modifyForm.id)
                        .then((res)=>{
                            console.log("修改订单信息成功",res)
                            // 弹出提示信息
                            this.$notify({
                                message:"修改信息成功",
                                type:"success"
                            })
                            // 关闭对话框
                            this.dialogFormVisible=false
                            // 重新获取数据---刷新页面
                            this.getData()
                        })
                        .catch((err)=>{
                            console.log("修改订单信息失败",err)
                        })
                    }
                })
            }
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
/* 上传图片 */
/deep/.upload-demo input{
    display: none !important;
}
h2{
    font-size: 22px;
    margin-top: 20px;
    font-weight: bold;
}
.demo-form-inline{
    margin-top: 20px;
}
.UserManageOne{
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
.UserManage{
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
/* .btn{
    width:90%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:-6%;
} */
</style>
