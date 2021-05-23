<template>
    <div :class="collapse==true?'DorderViewOne':'DorderView'">
        <!-- 有数据展示区域 -->
        <div v-if="tableData.length!=0">
            <h3>已有运单配送列表</h3>
            <!-- 筛选表单 不使用验证规则-->
            <el-form :inline="true" :model="form" class="demo-form-inline" ref="form" :hide-required-asterisk="true">
                <el-form-item  prop="type">
                    <el-select v-model="form.type" placeholder="请您选择筛选条件" v-on:blur="blur">
                        <el-option v-for="(item, index) in types" :key="index" :label='item' :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单号" prop="code" v-if="form.type=='订单号'">
                    <el-input  type="text" v-model="form.code" autocomplete="off"   placeholder="请输入订单号" size="samll"  clearable v-on:change="handleinput1($event)"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username" v-if="form.type=='用户名'">
                    <el-input  type="text" v-model="form.username" autocomplete="off"   placeholder="请输入用户名" size="samll"  clearable v-on:change="handleinput2($event)"></el-input>
                </el-form-item>
                <el-form-item label="寄件人姓名" prop="Susername" v-if="form.type=='寄件人姓名'">
                    <el-input  type="text" v-model="form.Susername" autocomplete="off"   placeholder="请输入寄件人姓名" size="samll"  clearable v-on:change="handleinput3($event)"></el-input>
                </el-form-item>
                <el-form-item label="收件人姓名" prop="Cusername" v-if="form.type=='收件人姓名'">
                    <el-input  type="text" v-model="form.Cusername" autocomplete="off"   placeholder="请输入收件人姓名" size="samll"  clearable v-on:change="handleinput4($event)"></el-input>
                </el-form-item>
                <el-form-item label="配送日期" prop="dtime" v-if="form.type=='配送时间'">
                    <el-date-picker v-model="form.dtime" type="datetime" placeholder="选择日期时间" style="width:100%;" v-on:blur="handleinput5($event)"></el-date-picker>
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
            style="width: 90%;margin-left:5%;"
            max-height="500"
            :border="true"
            :cell-style="cellStyle"
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
                label="订单号"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag==true?'active':''">{{ scope.row._id }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="用户名"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag1==true?'active':''">{{ scope.row.username }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="寄件人姓名"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag2==true?'active':''">{{ scope.row.Susername }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="寄件人地址"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.Saddress }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="寄件人电话"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.Sphone }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="物品名称"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.packagename }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="数量"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.packagenum }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="收件人姓名"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag3==true?'active':''">{{ scope.row.Cusername }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="收件人地址"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.Caddress }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="收件人电话"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.Cphone }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="订单进度"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.progress }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="配送日期"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span :class="activeFlag4==true?'active':''">{{ scope.row.dtime }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="添加时间"
                align="center"
                width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.ordertime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="180" fixed="right" >
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEditCar(scope.$index, scope.row)" type="info">配车</el-button>
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
            title="修改订单信息" 
            center
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal-append-to-body="false"
            :show-close="false"
            >
                <el-form :model="packageForm" status-icon :rules="rules" ref="packageForm" label-width="120px" class="packageform" :hide-required-asterisk="true">
                    <!-- 寄件人部分################# -->
                    <el-form-item label="订单号" prop="code">
                        <el-input type="text" v-model="packageForm.code" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="寄件人姓名" prop="Susername">
                        <el-input type="text" v-model="packageForm.Susername" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="寄件人号码" prop="Sphone">
                        <el-input type="text" v-model="packageForm.Sphone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="寄件人详细地址" prop="Saddress">
                        <el-input type="text" v-model="packageForm.Saddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="包裹名字" prop="packagename">
                        <el-input type="text" v-model="packageForm.packagename" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="包裹数量" prop="packagenum">
                        <el-input type="text" v-model.number="packageForm.packagenum" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="包裹重量" prop="packageweight">
                        <el-input type="text" v-model.number="packageForm.packageweight" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 收件人部分################# -->
                    <el-form-item label="收件人姓名" prop="Cusername">
                        <el-input type="text" v-model="packageForm.Cusername" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人号码" prop="Cphone">
                        <el-input type="text" v-model="packageForm.Cphone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人详细地址" prop="Caddress">
                        <el-input type="text" v-model="packageForm.Caddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="配送时间" prop="dtime">
                        <el-date-picker v-model="packageForm.dtime" type="datetime" placeholder="选择日期时间" style="width:100%;" v-on:blur="handleblur"></el-date-picker>
                    </el-form-item>
                    <el-form-item  label="备注" prop="dremark" class="remark">
                        <el-input type="textarea"  maxlength="100" show-word-limit  v-model="packageForm.dremark"  clearable  placeholder="请输入内容" ></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="info" @click="cancelOne('packageForm')">取消</el-button>
                        <el-button type="primary" @click="packageModifyOne('packageForm')">确定</el-button>
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
            <!-- 配车的对话框 -->
            <el-dialog
                title="添加配车" 
                center
                :visible.sync="carDialogFormVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false"
                :show-close="false"
                >
                    <el-form :model="packageForm" status-icon :rules="rules" ref="packageForm" label-width="120px" class="packageForm" :hide-required-asterisk="true">
                        <el-form-item label="订单号" prop="code" >
                            <el-input type="text" v-model="packageForm.code" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="用户" prop="username">
                            <el-input type="text" v-model="packageForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="寄件人姓名" prop="Susername">
                            <el-input type="text" v-model="packageForm.Susername" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="寄件人号码" prop="Sphone">
                            <el-input type="text" v-model="packageForm.Sphone" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="寄件人详细地址" prop="Saddress">
                            <el-input type="text" v-model="packageForm.Saddress" autocomplete="off"></el-input>
                        </el-form-item> -->
                        <el-form-item label="包裹名字" prop="packagename">
                            <el-input type="text" v-model="packageForm.packagename" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="包裹数量" prop="packagenum">
                            <el-input type="text" v-model.number="packageForm.packagenum" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="包裹重量" prop="packageweight">
                            <el-input type="text" v-model.number="packageForm.packageweight" autocomplete="off"></el-input>
                        </el-form-item> -->
                        <!-- 收件人部分################# -->
                        <el-form-item label="收件人姓名" prop="Cusername">
                            <el-input type="text" v-model="packageForm.Cusername" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="收件人号码" prop="Cphone">
                            <el-input type="text" v-model="packageForm.Cphone" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="收件人详细地址" prop="Caddress">
                            <el-input type="text" v-model="packageForm.Caddress" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="订单进度" prop="progress">
                            <el-input type="text" v-model="packageForm.progress" autocomplete="off"></el-input>
                        </el-form-item> -->
                        
                        <!-- 车牌号####☻☻☻☻☻ -->
                        <el-form-item label="车牌号" prop="carcode">
                            <el-select v-model="packageForm.carcode" placeholder="请输入车牌号" style="width:100%;">
                                <el-option v-for="(item, index) in Carcodes" :key="index" :label="item.carcode" :value="item.carcode"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="驾驶员姓名" prop="carman">
                            <el-input type="text" v-model="packageForm.carman" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="carphone">
                            <el-input type="text" v-model="packageForm.carphone" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="线路信息" prop="carline">
                            <el-input type="text" v-model="packageForm.carline" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- <el-form-item  label="备注" prop="dremark" class="remark">
                            <el-input type="textarea"  maxlength="100" show-word-limit  v-model="packageForm.dremark"  clearable  placeholder="请输入内容" ></el-input>
                        </el-form-item> -->
                        <el-form-item>
                            <el-button type="info" @click="carcancel('packageForm')">取消</el-button>
                            <el-button type="primary" @click="carpackageModify('packageForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
            </el-dialog>
        </div>
        <!-- 没有数据时显示 -->
        <div v-else></div>
    </div>
</template>

<script>
import {allPackage,Modify,Delete,allCar} from '../api/index.js'
import bus from '../assets/js/bus.js'
import pmd from '../components/paomadeng.vue'
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
            // 跑马灯
            lists: [
                `选择条件开启筛选.`,
                `点击<span style="color:red;">⊗</span>清空,再次筛选!!`
            ],
            dialogFormVisible:false,  //编辑对话框
            delDialogFormVisible:false,  //删除对话框
            carDialogFormVisible:false,  //配车对话框
            Id:"",  //点击删除按钮接受要删除订单的id(订单号)
            Line:"", //点击配车按钮--得到寄件地址与收件地址截取的线路字段
            // 折叠菜单
            collapse:true,
            // 是否包含关键字的数据的样式
            activeFlag:false,
            activeFlag1:false,
            activeFlag2:false,
            activeFlag3:false,
            activeFlag4:false,
            // 分页相关的
            pageSize: 5, //分页每页大小
            currentPage: 1, //当前页
            currentIndex:1,
            // 筛选条件的表单
            form:{
                type:"",
                code:"",
                username:"",
                Susername:"",
                Cusername:"",
                dtime:'',
            },
            // 修改信息的表单+配车表单
            packageForm:{
                code:"",
                username:'',
                Susername:'',
                Sphone:'',
                Saddress:'',
                packagename:'',
                packagenum:'',
                packageweight:'',
                Cusername:'',
                Cphone:'',
                Caddress:'',
                progress:'',
                dtime:'',
                dremark:'',
                stime:'',  //检测是否与发货时间一致
                carcode:'',
                carman:'',
                carphone:'',
                carline:'',
            },
            // 修改信息表单的验证规则+配车表单
            rules:{
                // 关于修改信息
                Susername:[
                    {required:true,message:"姓名不能为空",trigger:"blur"},
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
                    {required:true,message:"姓名不能为空",trigger:"blur"},
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
                ],
                carcode:[
                    {required:true,message:"车牌号不能为空",trigger:"blur"}
                ],
                carman:[
                    {required:true,message:"驾驶员不能为空",trigger:"blur"}
                ],
                carphone:[
                    {required:true,message:"联系方式不能为空",trigger:"blur"}
                ],
                carline:[
                    {required:true,message:"路线不能为空",trigger:"blur"}
                ],
            },
            // 条件数组
            types:[
                "订单号",
                "用户名",
                "寄件人姓名",
                "收件人姓名",
                "配送时间"
            ],
            // 车牌号数组
            Carcodes:[],
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

        // 获取数据--向数据数组赋值
        this.getData()
        // 获取车辆信息
        this.getCar()
    },
    mounted() {
        
    },
    /* 筛选---有弊端 */
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
            this.activeFlag4=false
            this.activeFlag=false
            // 清除上一次的筛选条件
            if(this.form.Cusername!=''){
                this.form.Cusername=''
            }
            if(this.form.Susername!=''){
                this.form.Susername=''
            }
            if(this.form.username!=''){
                this.form.username=''
            }
            if(this.form.code!=''){
                this.form.code=''
            }
            if(this.form.dtime!=''){
                this.form.dtime=''
            }
        },
        // 监听  寄件人姓名  筛选
        // 'form.Susername'(val){
        //     console.log("监听的寄件人",val)
        //     if(val!=""){
        //         this.activeFlag2=true
        //         this.activeFlag1=false
        //         this.activeFlag3=false
        //         this.activeFlag4=false
        //         this.activeFlag=false
        //         this.tableData=this.tableData.filter((item,index)=>{
        //             if(item.Susername==val){
        //                 return item
        //             }
        //         })
        //         if(this.tableData.length==0){
        //             this.$message({
        //                 message:"查找错误,没有该订单",
        //                 type:"error"
        //             })
        //             this.activeFlag2=false
        //             this.activeFlag1=false
        //             this.activeFlag3=false
        //             this.activeFlag4=false
        //             this.activeFlag=false
        //             //重新获取数据
        //             setTimeout(()=>{
        //                 this.getData()
        //             },1000)
        //         }
        //         }else{
        //             this.activeFlag2=false
        //             this.activeFlag1=false
        //             this.activeFlag3=false
        //             this.activeFlag4=false
        //             this.activeFlag=false
        //             // 重新获取全部的数据
        //             this.getData()
        //         }
        // },
        // 监听  订单号  进行筛选
        // 'form.code'(val){
        //     console.log('监听的订单号',val)
        //     if(val!=''){
        //         this.activeFlag=true
        //         this.activeFlag1=false
        //         this.activeFlag3=false
        //         this.activeFlag4=false
        //         this.activeFlag2=false
        //         this.tableData=this.tableData.filter((item,index)=>{
        //             if(item._id==val){
        //                 return item
        //             }
        //         })
        //         if(this.tableData.length==0){
        //             this.$message({
        //                 message:"查找错误,没有该订单",
        //                 type:"error"
        //             })
        //             this.activeFlag2=false
        //             this.activeFlag1=false
        //             this.activeFlag3=false
        //             this.activeFlag4=false
        //             this.activeFlag=false
        //             //重新获取数据
        //             setTimeout(()=>{
        //                 this.getData()
        //             },1000)
        //         }
        //         }else{
        //             this.activeFlag=false
        //             this.activeFlag1=false
        //             this.activeFlag3=false
        //             this.activeFlag4=false
        //             this.activeFlag2=false
        //             // 重新获取全部的数据
        //             this.getData()
        //         }
        // },
        // 监听  用户  进行筛选
        // 'form.username'(val){
        //     console.log('监听的用户',val)
        //     if(val!=''){
        //         this.activeFlag1=true
        //         this.activeFlag=false
        //         this.activeFlag3=false
        //         this.activeFlag4=false
        //         this.activeFlag2=false
        //         this.tableData=this.tableData.filter((item,index)=>{
        //             if(item.username==val){
        //                 return item
        //             }
        //         })
        //         if(this.tableData.length==0){
        //             this.$message({
        //                 message:"查找错误,没有该订单",
        //                 type:"error"
        //             })
        //             this.activeFlag2=false
        //             this.activeFlag1=false
        //             this.activeFlag3=false
        //             this.activeFlag4=false
        //             this.activeFlag=false
        //             //重新获取数据
        //             setTimeout(()=>{
        //                 this.getData()
        //             },1000)
        //         }
        //         }else{
        //             this.activeFlag1=false
        //             this.activeFlag=false
        //             this.activeFlag3=false
        //             this.activeFlag4=false
        //             this.activeFlag2=false
        //             // 重新获取全部的数据
        //             this.getData()
        //     }
        // },
        // 监听  收件人  进行筛选
        // 'form.Cusername'(val){
        //     if(val!=''){
        //         console.log('监听的收件人',val)
        //         this.activeFlag3=true
        //         this.activeFlag=false
        //         this.activeFlag1=false
        //         this.activeFlag4=false
        //         this.activeFlag2=false
        //         this.tableData=this.tableData.filter((item,index)=>{
        //             if(item.Cusername==val){
        //                 return item
        //             }
        //         })
        //         if(this.tableData.length==0){
        //             this.$message({
        //                 message:"查找错误,没有该订单",
        //                 type:"error"
        //             })
        //             this.activeFlag2=false
        //             this.activeFlag1=false
        //             this.activeFlag3=false
        //             this.activeFlag4=false
        //             this.activeFlag=false
        //             //重新获取数据
        //             setTimeout(()=>{
        //                 this.getData()
        //             },1000)
        //         }
        //         }else{
        //             this.activeFlag3=false
        //             this.activeFlag=false
        //             this.activeFlag1=false
        //             this.activeFlag4=false
        //             this.activeFlag2=false
        //             // 重新获取全部的数据
        //             this.getData()
        //         }
        // },
        // 监听  收货时间  进行筛选
        // 'form.dtime'(val){
        //     var time=this.formateDate(val)
        //     console.log('监听的收货时间',time,val)
        //     if(val!=''){
        //         this.activeFlag=false
        //         this.activeFlag3=false
        //         this.activeFlag1=false
        //         this.activeFlag4=true
        //         this.activeFlag2=false
        //         this.tableData=this.tableData.filter((item,index)=>{
        //             console.log("订单的发货日期",item.dtime)
        //             if(item.dtime==time){
        //                 return item
        //             }
        //         })
        //         if(this.tableData.length==0){
        //             this.$message({
        //                 message:"查找错误,没有该订单",
        //                 type:"error"
        //             })
        //             this.activeFlag2=false
        //             this.activeFlag1=false
        //             this.activeFlag3=false
        //             this.activeFlag4=false
        //             this.activeFlag=false
        //             //重新获取数据
        //             setTimeout(()=>{
        //                 this.getData()
        //             },1000)
        //         }
        //         }else{
        //             this.activeFlag4=false
        //             this.activeFlag=false
        //             this.activeFlag3=false
        //             this.activeFlag1=false
        //             this.activeFlag2=false
        //             // 重新获取全部的数据
        //             this.getData()
        //         }
        // },
        /* 监听车牌号的变化 */
        'packageForm.carcode'(val){
            console.log("监听的车牌号",val)
            // 查找符合的对象
            var car={}=this.Carcodes.find((item,index)=>{
                if(item.carcode==val){
                    return item
                }
            })
            // 赋值
            this.packageForm.carcode=car.carcode
            this.packageForm.carman=car.carman
            this.packageForm.carphone=car.carphone
            // 展示对应的线路信息
            this.packageForm.carline=this.Line
        },
    },
    methods:{
        // 单元格的样式---row是行，column是列---【都是从0开始的】
        cellStyle({row,column,rowIndex,columnIndex}){
            // console.log("行列",rowIndex,columnIndex)
            if(columnIndex===14){
                return `text-align:right;`;
            }else{
                return ``
            }
        },
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
        // 格式化时间的方法
        formateDate(datetime) {
            function addDateZero(num) {
                return (num < 10 ? "0" + num : num);
            }
            let d = new Date(datetime);
            let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
            return formatdatetime;
        },
        getCar(){
            allCar()
            .then((res)=>{
                console.log("获取全部的车辆信息成功",res)
                this.Carcodes=res.info
            })
            .catch((err)=>{
                console.log("获取全部的车辆信息失败",err)
            })
        },
        // 向后台发起请求---获取数据
        getData(){
            allPackage()
            .then((res)=>{
                console.log("查询所有订单成功",res)
                this.currentPage=this.currentIndex;
                var newList=res.info.filter((item,index)=>{
                    if(item.progress=='货物已从物流公司发出'){
                        return item
                    }
                })
                newList.forEach((item,index)=>{
                    // 格式化  添加  时间
                    item.ordertime=this.formateDate(item.ordertime)
                    // 格式化 配送 时间
                    if(item.dtime==""){
                        return ;
                    }else{
                        item.dtime=this.formateDate(item.dtime)
                    }
                })
                // 将数组按照时间从大到小排序
                this.tableData=newList.sort((a,b)=>{
                    return (new Date(b.ordertime))-(new Date(a.ordertime))
                })
                // 判断数据数组是否为空
                if(this.tableData.length==0){
                    this.$message({
                        message:"暂时还没有订单被收货员收货哦",
                        type:"error"
                    })
                }
            })
            .catch((err)=>{
                console.log("查询所有订单失败",err)
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
            this.packageForm.code=row._id
            this.packageForm.username=row.username
            this.packageForm.Cusername=row.Cusername
            this.packageForm.Susername=row.Susername
            this.packageForm.Cphone=row.Cphone
            this.packageForm.Sphone=row.Sphone
            this.packageForm.Caddress=row.Caddress
            this.packageForm.Saddress=row.Saddress
            this.packageForm.ordertime=row.ordertime
            this.packageForm.packagename=row.packagename
            this.packageForm.packageweight=row.packageweight
            this.packageForm.packagenum=row.packagenum
            this.packageForm.progress=row.progress
            this.packageForm.dtime=row.dtime
            this.packageForm.dremark=row.dremark
            this.packageForm.stime=row.stime
        },
        // 检查时间格式转化的对不对---配送时间与收货时间是否一样
        handleblur(){
            var date=new Date(this.packageForm.dtime).getTime()
            var date1=new Date(this.formateDate(this.packageForm.stime)).getTime()
            console.log("选择的时间",date,this.formateDate(this.packageForm.stime))
            if(date<=date1){
                this.$message({
                    message:"配送时间不能早于或等于收货员收货(发货)时间",
                    type:"error"
                })
                this.packageForm.dtime=''
            }
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
            Delete(this.Id)
            .then((res)=>{
                console.log("删除订单成功")
                // 提示
                this.$message({
                    message:"删除订单成功",
                    type:"success"
                })
                // 刷新
                this.getData()

                // this.activeFlag2=false
                // this.activeFlag1=false
                // this.activeFlag3=false
                // this.activeFlag4=false
                // this.activeFlag=false
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
                    Modify(this.packageForm.code,this.packageForm)
                    .then((res)=>{
                        console.log("修改订单信息成功",res)
                        // 弹出提示信息
                        this.$notify({
                            message:"修改信息成功",
                            type:"success"
                        })
                        // 重新获取数据---刷新页面
                        this.getData()

                        // this.activeFlag2=false
                        // this.activeFlag1=false
                        // this.activeFlag3=false
                        // this.activeFlag4=false
                        // this.activeFlag=false
                        // 关闭对话框
                        this.dialogFormVisible=false
                    })
                    .catch((err)=>{
                        console.log("修改订单信息失败",err)
                    })
                }
            })
        },
        // 配车按钮
        handleEditCar(index,row){
            // 打开对话框
            this.carDialogFormVisible=true
            console.log("选中的行的信息",row)
            // 截取寄件与收件地址---拼接线路信息
            var str=row.Saddress.substr(0,2)
            var str1=row.Caddress.substr(0,2)
            this.Line=`${str}-${str1}`
            console.log("得到的线路信息",this.Line)
            // 得到配车的表单
            this.packageForm.code=row._id
            this.packageForm.Caddress=row.Caddress
            // this.packageForm.Saddress=row.Saddress
            this.packageForm.Cphone=row.Cphone
            // this.packageForm.Sphone=row.Sphone
            this.packageForm.Cusername=row.Cusername
            // this.packageForm.Susername=row.Susername
            this.packageForm.carcode=row.carcode
            this.packageForm.carline=row.carline
            this.packageForm.carman=row.carman
            this.packageForm.carphone=row.carphone
            // this.packageForm.cman=row.cman
            // this.packageForm.sman=row.sman
            // this.packageForm.cremark=row.cremark
            // this.packageForm.sremark=row.sremark
            // this.packageForm.dremark=row.dremark
            // this.packageForm.ctime=row.ctime
            // this.packageForm.stime=row.stime
            // this.packageForm.dtime=row.dtime
            // this.packageForm.ordertime=row.ordertime
            this.packageForm.packagename=row.packagename
            // this.packageForm.packagenum=row.packagenum
            // this.packageForm.packageweight=row.packageweight
            // this.packageForm.progress=row.progress
            this.packageForm.username=row.username
        },
        // 配车对话框的  取消  按钮
        carcancel(packageForm){
            console.log("配车失败")
            // 弹出提示
            this.$message({
                message:"操作失败",
                type:"error"
            })
            // 关闭对话框
            this.carDialogFormVisible=false
        },
        // 配车对话框的  确定  按钮--将得到的配车信息表单更新到数据库
        carpackageModify(packageForm){
            this.$refs[packageForm].validate((valid) => {
                if (valid) {
                    // 点击按钮--更改配送进度
                    this.packageForm.progress="订单已成功配送"
                    Modify(this.packageForm.code,this.packageForm)
                    .then((res)=>{
                        console.log("配车表单更新成功",res)
                        // 弹出提示
                        this.$message({
                            message:"操作成功",
                            type:"success"
                        })
                        // 重新获取数据
                        this.getData()
                        // 关闭对话框
                        this.carDialogFormVisible=false
                    })
                    .catch((err)=>{
                        console.log("配车表单更新失败",err)
                    })
                }
            })
        },
        handleinput1(val){
            console.log('监听的订单号',val)
            if(val!=''){
                this.activeFlag=true
                this.activeFlag1=false
                this.activeFlag3=false
                this.activeFlag4=false
                this.activeFlag2=false
                this.tableData=this.tableData.filter((item,index)=>{
                    if(item._id==val){
                        return item
                    }
                })
                //查找成功
                if(this.tableData!=0){
                    this.$message({
                        message:"查找成功",
                        type:"success"
                    })
                }
                // 查找失败
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该订单",
                        type:"error"
                    })
                    this.activeFlag2=false
                    this.activeFlag1=false
                    this.activeFlag3=false
                    this.activeFlag4=false
                    this.activeFlag=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
                }else{
                    this.activeFlag=false
                    this.activeFlag1=false
                    this.activeFlag3=false
                    this.activeFlag4=false
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
                this.activeFlag3=false
                this.activeFlag4=false
                this.activeFlag2=false
                this.tableData=this.tableData.filter((item,index)=>{
                    if(item.username==val){
                        return item
                    }
                })
                 //查找成功
                if(this.tableData!=0){
                    this.$message({
                        message:"查找成功",
                        type:"success"
                    })
                }
                // 查找失败
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该订单",
                        type:"error"
                    })
                    this.activeFlag2=false
                    this.activeFlag1=false
                    this.activeFlag3=false
                    this.activeFlag4=false
                    this.activeFlag=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
                }else{
                    this.activeFlag1=false
                    this.activeFlag=false
                    this.activeFlag3=false
                    this.activeFlag4=false
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
                this.activeFlag3=false
                this.activeFlag4=false
                this.activeFlag=false
                this.tableData=this.tableData.filter((item,index)=>{
                    if(item.Susername==val){
                        return item
                    }
                })
                 //查找成功
                if(this.tableData!=0){
                    this.$message({
                        message:"查找成功",
                        type:"success"
                    })
                }
                // 查找失败
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该订单",
                        type:"error"
                    })
                    this.activeFlag2=false
                    this.activeFlag1=false
                    this.activeFlag3=false
                    this.activeFlag4=false
                    this.activeFlag=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
                }else{
                    this.activeFlag2=false
                    this.activeFlag1=false
                    this.activeFlag3=false
                    this.activeFlag4=false
                    this.activeFlag=false
                    // 重新获取全部的数据
                    this.getData()
                }
        },
        handleinput4(val){
            if(val!=''){
                console.log('监听的收件人',val)
                this.activeFlag3=true
                this.activeFlag=false
                this.activeFlag1=false
                this.activeFlag4=false
                this.activeFlag2=false
                this.tableData=this.tableData.filter((item,index)=>{
                    if(item.Cusername==val){
                        return item
                    }
                })
                 //查找成功
                if(this.tableData!=0){
                    this.$message({
                        message:"查找成功",
                        type:"success"
                    })
                }
                // 查找失败
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该订单",
                        type:"error"
                    })
                    this.activeFlag2=false
                    this.activeFlag1=false
                    this.activeFlag3=false
                    this.activeFlag4=false
                    this.activeFlag=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
                }else{
                    this.activeFlag3=false
                    this.activeFlag=false
                    this.activeFlag1=false
                    this.activeFlag4=false
                    this.activeFlag2=false
                    // 重新获取全部的数据
                    this.getData()
                }
        },
        handleinput5(val){
            var time=this.formateDate(val)
            console.log('监听的收货时间',time,val)
            if(val!=''){
                this.activeFlag=false
                this.activeFlag3=false
                this.activeFlag1=false
                this.activeFlag4=true
                this.activeFlag2=false
                this.tableData=this.tableData.filter((item,index)=>{
                    console.log("订单的发货日期",item.dtime)
                    if(item.dtime==time){
                        return item
                    }
                })
                 //查找成功
                if(this.tableData!=0){
                    this.$message({
                        message:"查找成功",
                        type:"success"
                    })
                }
                // 查找失败
                if(this.tableData.length==0){
                    this.$message({
                        message:"查找错误,没有该订单",
                        type:"error"
                    })
                    this.activeFlag2=false
                    this.activeFlag1=false
                    this.activeFlag3=false
                    this.activeFlag4=false
                    this.activeFlag=false
                    //重新获取数据
                    setTimeout(()=>{
                        this.getData()
                    },1000)
                }
                }else{
                    this.activeFlag4=false
                    this.activeFlag=false
                    this.activeFlag3=false
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
.DorderViewOne{
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
.DorderView{
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
