<template>
    <div :class="collapse===true?'lmsManageOne':'lmsManage'">
        <h2>关于物流介绍的整改</h2>
        <div class="Lms">
            <el-form :model="form" status-icon  ref="form" label-width="120px" class="form">
                <el-form-item label="类别"  prop="ctype">
                    <el-select v-model="form.ctype" placeholder="选择整改的模块" style="width:100%;">
                        <el-option v-for="(item, index) in ctypes" :key="index" :label='item' :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" prop="ttype"> 
                    <el-select v-model="form.ttype" placeholder="选择整改的标题" style="width:100%;" v-on:change="blur">
                        <el-option v-for="(item, index) in ttypes" :key="index" :label='item' :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片链接" prop="img">
                    <!-- <el-input  type="text" v-model="form.img" autocomplete="off"   placeholder="请输入标题图片路径" size="samll"  clearable></el-input> -->
                    <!-- 上传图片 -->
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
                        <el-button size="small" type="primary">更新图片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过20M</div>
                    </el-upload>
                </el-form-item>
                <div id="img" v-if="form.img && form.img.search('https')==-1">
                    <img :src="getUrl(form.img)">
                </div>
                <el-form-item label="文本" prop="content">
                    <el-input type="textarea" :rows="4" placeholder="请输入文本内容" v-model="form.content" autosize></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="summary">
                    <el-input  type="text" v-model="form.summary" autocomplete="off"   placeholder="请输入简介" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item label="运费" prop="charge">
                    <el-input  type="text" v-model="form.charge" autocomplete="off"   placeholder="请输入运费" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item label="覆盖范围" prop="cover">
                    <el-input  type="text" v-model="form.cover" autocomplete="off"   placeholder="请输入覆盖范围" size="samll"  clearable></el-input>
                </el-form-item>
                <el-form-item label="承诺" prop="promise">
                    <el-input  type="text" v-model="form.promise" autocomplete="off"   placeholder="请输入承诺" size="samll"  clearable></el-input>
                </el-form-item>
                <div v-if="form.ctype=='快递服务'">
                    <el-form-item label="大概时间" prop="timer">
                        <el-input  type="text" v-model="form.timer" autocomplete="off"   placeholder="请输入到达大概时间" size="samll"  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="重量" prop="weight">
                        <el-input  type="text" v-model="form.weight" autocomplete="off"   placeholder="请输入重量" size="samll"  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="具体时间" prop="time">
                        <el-input  type="text" v-model="form.time" autocomplete="off"   placeholder="请输入到达详细时间" size="samll"  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input  type="text" v-model="form.price" autocomplete="off"   placeholder="请输入价格" size="samll"  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="价格介绍" prop="desc">
                        <el-input  type="text" v-model="form.desc" autocomplete="off"   placeholder="请输入价格介绍" size="samll"  clearable></el-input>
                    </el-form-item>
                </div>
                <el-form-item lable="特征" prop="text" style="display:flex;justify-content:center;">
                    <!-- <template slot-scope="scope"> -->
                        <el-table
                        :data="form.text"
                        style="width: 100%;"
                        max-height="500"
                        :border="true"
                        >
                            <el-table-column
                            type="index"
                            label="序号"
                            align="center"
                            width='70'
                            fixed
                            >
                            </el-table-column>
                            <el-table-column
                            label="文本内容"
                            align="center"
                            width="300" v-if="contentFlag==false">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.content }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="图片链接"
                            align="center"
                            width="180">
                                <template slot-scope="scope">
                                    <!-- <span>{{ scope.row.pic }}</span> -->
                                    <img :src="getUrl(scope.row.pic)" style="width:40%;height:40%;">
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="标题"
                            align="center"
                            width="180">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.title }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center" width="180">
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
                    <!-- </template> -->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    <el-button @click="resetForm('form')">取消</el-button>
                    <el-button @click="Del('form')" type="danger">删除</el-button>
                </el-form-item>
            </el-form>
            <!-- 表格的编辑对话框 -->
            <el-dialog
                title="修改该条信息的几个特点" 
                center
                :visible.sync="editDialogFormVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false"
                :show-close="false"
                >
                <el-form :model="modifyform" status-icon  ref="form" label-width="120px" class="modifyform">
                    <el-form-item label="文本" prop="content">
                        <el-input type="textarea" :rows="4" placeholder="请输入文本内容" v-model="modifyform.content" autosize></el-input>
                    </el-form-item>
                    <el-form-item label="图片链接" prop="pic">
                        <!-- <el-input  type="text" v-model="modifyform.pic" autocomplete="off"   placeholder="请输入图片链接" size="samll"  clearable></el-input> -->
                        <!-- 上传图片 -->
                        <el-upload
                            class="upload-demo"
                            action="122"
                            :on-success="handleAvatarSuccess1"
                            :before-upload="beforeAvatarUpload1"
                            multiple
                            :show-file-list="false"
                            :limit="1"
                            :on-exceed="handleExceed1"
                            ref="elupload"
                            >
                            <el-button size="small" type="primary">更新图片</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过20M</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input  type="text" v-model="modifyform.title" autocomplete="off"   placeholder="请输入标题" size="samll"  clearable></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editFormOut">取 消</el-button>
                    <el-button type="primary" @click="editFormCommit">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 表格的删除对话框 -->
            <el-dialog
                title="删除该特点" 
                center
                :visible.sync="tableDelDialogFormVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false"
                :show-close="false"
                >
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="tableFormOut">取 消</el-button>
                        <el-button type="primary" @click="tableFormCommit">确 定</el-button>
                    </span>
            </el-dialog>
            <!-- 删除表单的对话框 -->
            <el-dialog
                title="删除该条信息" 
                center
                :visible.sync="formDelDialogFormVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false"
                :show-close="false"
                >
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="delFormOut">取 消</el-button>
                        <el-button type="primary" @click="delFormCommit">确 定</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import bus from '../assets/js/bus.js'
import {allLog,findLog,updateLog,deleteLog} from '../api/index.js'
import {mixin} from '../mixins/index.js'
import axios from 'axios'
export default {
    mixins:[mixin],
    data(){
        return{
            collapse:true,
            index:"",   //text数组中第几条信息
            formDelDialogFormVisible:false,   //删除表单的对话框
            editDialogFormVisible:false,  //编辑对话框
            tableDelDialogFormVisible:false,   //表格的删除对话框
            contentFlag:false,   //显不显示文本一栏
            form:{
                ctype:"",  //类别种类
                ttype:"",  //标题种类
                img:"",
                content:"",
                summary:"",
                charge:"",
                cover:"",
                promise:"",
                text:[],
                time:"",
                timer:"",
                price:"",
                weight:"",
                desc:"",
            },
            modifyform:{
                content:'',
                title:'',
                pic:''
            },
            // 种类数组
            ctypes:[
                "快递服务",
                "快运服务"
            ],
            ttypes:[
                "绝影标快",
                "绝影特快",
                "整车直达",
                "重货包裹"
            ]
        }
    },
    created () {
        // 关于折叠菜单
        /* 关于导航栏收缩时的变化产生的前提 */
        bus.$on('collapse',msg=>{
            console.log('物流介绍--接受的数据collapse',msg)
            this.$store.dispatch("setIsCollapse",msg)
            this.collapse=this.$store.state.collapse
        })
        this.collapse=this.$store.state.collapse   //为了猛一开始就能切换到合适的样式
        console.log('物流介绍--接受的数据collapse',this.$store.state.collapse)

        // 获取种类数组
        this.getAll()
    },
    watch:{
        
    },
    methods: {
        blur(){
            console.log("这是",this.form.ctype,this.form.ttype)
            this.getLog()
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
                this.$message.error('上传的图片只能是 JPG 或 png 格式!');
                return isJPG
            }else if (!isLt200M) {
                this.$message.error('上传的图片大小不能超过 200MB!');
                return isLt200M;
            }else{
                var fd=new FormData()
                fd.append("file",file)
                axios.post('/log/up',fd)
                .then((res)=>{
                    console.log("上传成功",res)
                    this.$message({
                        message:"上传图片成功",
                        type:"success"
                    })
                })
                .catch((err)=>{
                    console.log("上传失败",err)
                    this.$message({
                        message:"上传图片失败",
                        type:"warning"
                    })
                })
            }
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
        },
        // 上传图片2
         /* 上传图片 */
        handleAvatarSuccess1(res, file) {
            console.log("上传成功的图片",file)
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload1(file) {
            console.log("上传的图片为",file)
            const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
            /* 一个1024是kb单位  两个1024是mb单位 */
            const isLt200M = file.size / 1024 / 1024 < 200;

            if (!isJPG) {
                this.$message.error('上传的图片只能是 JPG 或 png 格式!');
                return isJPG
            }else if (!isLt200M) {
                this.$message.error('上传的图片大小不能超过 200MB!');
                return isLt200M;
            }else{
                var fd1=new FormData()
                fd1.append("file",file)
                axios.post('/log/up1',fd1)
                .then((res)=>{
                    console.log("上传成功",res)
                    this.modifyform.pic=res.data.path
                    this.$message({
                        message:"上传图片成功",
                        type:"success"
                    })
                })
                .catch((err)=>{
                    console.log("上传失败",err)
                    this.$message({
                        message:"上传图片失败",
                        type:"warning"
                    })
                })
            }
        },
        handleExceed1(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
        },

        // 获取所有数据---得到两个种类数组
        getAll(){
            allLog()
            .then((res)=>{
                console.log("获取全部的数据成功",res)
                var newList=[]=res.info.map(v=>v.classfy)
                var newList1=[]=res.info.map(v=>v.title)
                this.ctypes=newList.filter((item,index,item1,)=>{
                    if(item1.indexOf(item)==index){
                        return item
                    }
                })
                this.ttypes=newList1.filter((item,index,item1,)=>{
                    if(item1.indexOf(item)==index){
                        return item
                    }
                })
                console.log("属性数组",this.ctypes)
                console.log("属性数组2",this.ttypes)
            })
            .catch((err)=>{
                console.log("获取全部的数据失败",err)
            })
        },
        // 通过条件得到   对应的物流  介绍
        getLog(){
            // 构建请求参数
            var body={
                ctype:this.form.ctype,
                ttype:this.form.ttype
            }
            findLog(body)
            .then((res)=>{
                console.log("得到对应的log成功",res)
                if(res.info==null){
                    this.$message({
                        message:`没有类别为:${body.ctype}且标题为:${body.ttype}的信息`,
                        type:"error"
                    })
                    this.form.ctype=''
                    this.form.ttype=''
                    this.form.img=''
                    this.form.content=''
                    this.form.summary=''
                    this.form.charge=''
                    this.form.cover=''
                    this.form.promise=''
                    this.form.text=[]
                    this.form.time=""
                    this.form.timer=""
                    this.form.price=""
                    this.form.weight=""
                    this.form.desc=""
                }else{
                    // 赋值
                    this.form.ctype=res.info.classfy
                    this.form.ttype=res.info.title
                    this.form.img=res.info.img
                    this.form.content=res.info.content
                    this.form.summary=res.info.summary
                    this.form.charge=res.info.charge
                    this.form.cover=res.info.cover
                    this.form.promise=res.info.promise
                    this.form.text=res.info.text
                    this.form.time=res.info.time
                    this.form.timer=res.info.timer
                    this.form.price=res.info.price
                    this.form.weight=res.info.weight
                    this.form.desc=res.info.desc
                    // 判断是否有文本一栏？
                    this.contentFlag=this.form.text.every((item,index)=>{
                        return item.content==''
                    })
                    console.log("此时的文本标识符",this.contentFlag)
                    console.log("获取的表单",this.form)
                    this.$message({
                        message:"查询成功",
                        type:"success"
                    })
                }
            })
            .catch((err)=>{
                console.log("得到对应的log失败",err)
            })
        },
        // 点击提交按钮---修改信息
        submitForm(){
            console.log("点击确定时的表单",this.form)
            updateLog(this.form)
            .then((res)=>{
                console.log("更新成功",res)
                this.$message({
                    message:"更新信息成功",
                    type:"success"
                })
                
                // 刷新页面
                this.getLog()
            })
            .catch((err)=>{
                console.log("更新失败",err)
            })
        },
        // 点击 添加 按钮---修改信息
        submitForm1(){
            console.log("点击确定时的表单",this.form)
            // updateLog(this.form)
            // .then((res)=>{
            //     console.log("添加成功",res)
            //     this.$message({
            //         message:"添加信息成功",
            //         type:"success"
            //     })
            //     // 刷新页面
            //     this.getLog()
            // })
            // .catch((err)=>{
            //     console.log("添加失败",err)
            // })
        },
        // 点击取消按钮---重置表单
        resetForm(form){
            this.$message({
                message:"您取消了修改",
                type:"error"
            })
            this.$refs[form].resetFields();
        },
        // 点击表单的删除按钮---删除某条信息
        Del(){
            // 唤醒对话框
            this.formDelDialogFormVisible=true
        },
        // 点击表单的删除对话框的  取消  按钮
        delFormOut(){
            this.$message({
                message:"您取消了删除操作",
                type:"error"
            })
            this.formDelDialogFormVisible=false
        },
        //点击表单的删除对话框的  确定 按钮
        delFormCommit(){
            if(this.form.ttype==""){
                this.$message({
                    message:"请先选择",
                    type:"warning"
                })
                this.formDelDialogFormVisible=false
            }else{
                var body={
                    ctype:this.form.ctype,
                    ttype:this.form.ttype
                }
                deleteLog(body)
                .then((res)=>{
                    console.log("删除成功",res)
                    this.formDelDialogFormVisible=false
                    this.$message({
                        message:"删除成功",
                        type:"success"
                    })
                    
                    // 清空表单
                    this.form={}
    
                    // 重新获取全部数据
                    this.getAll()
                })
                .catch((err)=>{
                    console.log("删除失败",err)
                })
            }
        },
        // 点击  表格  的  编辑 按钮
        handleEdit(index,row){
            this.editDialogFormVisible=true

            this.index=index

            console.log("当前的行的内容",row)

            this.modifyform.content=row.content
            this.modifyform.title=row.title
            // 转移到---上传图片时赋值
            // this.modifyform.pic=row.pic
        },
        // 点击  表格  的  编辑  按钮  对话框的  取消  按钮
        editFormOut(){
            this.editDialogFormVisible=false
            this.$message({
                message:"您取消了修改",
                type:"error"
            })
        },
        // 点击表格的  编辑  按钮  对话框的  确定  按钮
        editFormCommit(){
            console.log("点击编辑确定时的表单",this.modifyform)
            var newForm={
                ctype:this.form.ctype,
                ttype:this.form.ttype,
                text:[]
            }
            // 重组text数组
            this.form.text.splice(this.index,1)
            newForm.text.push(this.modifyform)
            newForm.text=[...newForm.text,...this.form.text]

            updateLog(newForm)
            .then((res)=>{
                console.log("更新特点成功",res)
                this.$message({
                    message:"更新特点成功",
                    type:"success"
                })
                
                // 刷新页面
                this.getLog()

                this.editDialogFormVisible=false
            })
            .catch((err)=>{
                console.log("更新特点失败",err)
            })
        },
        // 点击表格的  删除  按钮 
        handleDelete(index,row){
            this.index=index
            console.log("删除此行的值",this.index,row)
            this.tableDelDialogFormVisible=true
        },
        // 点击  表格  的  删除  按钮  对话框的  取消  按钮
        tableFormOut(){
            this.tableDelDialogFormVisible=false
            this.$message({
                message:"您取消了删除操作",
                type:"error"
            })
        },
        // 点击  表格  的  删除  按钮  对话框的  确定  按钮
        tableFormCommit(){
            console.log("点击删除确定时的form表单",this.index,this.form)
            this.form.text.splice(this.index,1)
            console.log("经过删除操作的text数组",this.form.text)
            updateLog(this.form)
            .then((res)=>{
                console.log("删除特点成功",res)
                this.$message({
                    message:"删除成功",
                    type:"success"
                })
                // 重新获取数据
                this.getLog()
                this.tableDelDialogFormVisible=false
            })
            .catch((err)=>{
                console.log("删除特点失败",err)
            })
        }
    }
}
</script>

<style scoped>
/* 上传图片 */
/deep/.upload-demo input{
    display: none !important;
}
.lmsManageOne{
    position: relative;
    width:calc(100vw - 63px);
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color: peru;
    top:-1px;
    left:63px;
    transition:left  1s;
}
.lmsManage{
    position: relative;
    width:87vw;
    height:100vh;
    /* background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg"); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    overflow: hidden;
    background-color: peru;
    top:-1px;
    left:13vw;
    transition:left  1s;
}
.Lms{
    width:80%;
    /* border:1px solid red; */
    height:85vh;
    overflow-y: scroll;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
}
.Lms::-webkit-scrollbar{
    width:0 !important;
}
#img{
    width:100%;
    height:auto;
    /* border:1px solid red; */
    margin-left: 6%;
    display: flex;
    align-content: center;
    justify-content: center;
}
#img>img{
    width:10%;
    height:10%;
}

</style>
