<template>
    <div :class="collapse==true ? 'tableone' : 'table'">
        <!-- 添加按钮 -->
        <div class="btn">
            <el-form :inline="true" ref="add_data">
                <el-form-item class="btnRight" style="border:none;">
                    <el-button type='primary'  size='small' @click.prevent='handleAdd()'>添加</el-button>
                </el-form-item>
                <el-form-item>
                    <!-- 筛选框 -->
                    <el-date-picker
                    v-model="searchDate.startDate"
                    type="datetime"
                    placeholder="选择开始日期时间"
                    >
                    </el-date-picker>
                    --
                    <el-date-picker
                    v-model="searchDate.endDate"
                    type="datetime"
                    placeholder="选择开始日期时间"
                    >
                    </el-date-picker>
                    <el-button type='primary' size='small' @click.prevent='handleSearch()'>筛选</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <template> -->
            <div v-if="list.length>0" class="fill">
            <el-table
            border
            max-height="450"
            :data="list"
            style="width: 100%"
            v-model="searchDate"
            >
                <!-- 多选框 -->
                <el-table-column
                type="selection"
                align="center"
                width="55"
                >
                </el-table-column>
                <!-- 序号 -->
                <el-table-column
                type="index"
                fixed
                label="序号"
                align="center"
                width='70'
                >
                </el-table-column>
                <el-table-column
                prop="date"
                index
                label="日期"
                align="center"
                width="220"
                >
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="type"
                label="收支类型"
                align="center"
                width="120"
                >
                </el-table-column>
                <el-table-column
                prop="cash"
                label="现金"
                align="center"
                width="120"
                >
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-time"></i> -->
                        <span style="color:#4db3ff;">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="describe"
                label="描述"
                align="center"
                width="120"
                >
                </el-table-column>
                <el-table-column
                prop="expend"
                label="支出"
                align="center"
                width="120"
                >
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-time"></i> -->
                        <span style="color:#00d053;">{{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="income"
                label="收入"
                align="center"
                width="120"
                >
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-time"></i> -->
                        <span style="color:#f56767;">{{ scope.row.income }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="remark"
                label="备注"
                align="center"
                width="200"
                >
                </el-table-column>
                <el-table-column
                prop="operation"
                label="操作"
                fixed="right"
                align="center"
                width='320'
                >
                    <template slot-scope="scope">
                        <el-button
                        type='warning'
                        size="small"
                        icon="edit"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        type='danger'
                        size="small"
                        icon="delete"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
        <!-- </template> -->
        <div class="warn" v-if="list.length==0">
            <div class="alert alert-warning alert-dismissable tip">
        <!-- 同样需要一个类：.close类，一个属性 ：data-dismiss="alert"-->
                <a href="#" class="close" data-dismiss="alert">&times;</a>
                <strong>警告</strong>确定关闭吗？
            </div>
        </div>
        <dialogAdd></dialogAdd>
        <div>
            <pages></pages>
        </div>
    </div>
</template>

<script>
import dialogAdd from '../components/dialogAdd.vue'
import bus from '../assets/js/bus.js'
import pages from '../components/pages.vue'
export default {
    data(){
        return{
            collapse:true,
            dialogFormVisible:false,
            title:"",
            searchDate:{
                startDate:"",
                endDate:""
            },
            filterTableData:[], //用于存储筛选过后的(全部)数据
            addform:{
                type:"",
                describe:"",
                income:"",
                expend:"",
                cash:"",
                remark:"",
                id:""
            },
            list:[
                {
                    cash:"5000",
                    date:'2021-2-7T09:05:35.255Z',
                    describe:'购买课程',
                    expend:'200',
                    income:'200',
                    type:'优惠券',
                    remark:"购买Vue全栈课程ccccccccccc",
                    id:"1"
                },
                {
                    cash:"5000",
                    date:'2021-2-5T09:05:35.255Z',
                    describe:'购买课程',
                    expend:'2001',
                    income:'2001',
                    type:'优惠券',
                    remark:"购买Vue全栈课程ccccccccccc",
                    id:"2"
                },
                {
                    cash:"5000",
                    date:'2021-2-8T09:05:35.255Z',
                    describe:'购买课程',
                    expend:'2003',
                    income:'2003',
                    type:'优惠券',
                    remark:"购买Vue全栈课程ccccccccccc",
                    id:"3"
                },
                {
                    cash:"5000",
                    date:'2021-2-9T09:05:35.255Z',
                    describe:'购买课程',
                    expend:'2004',
                    income:'2004',
                    type:'优惠券',
                    remark:"购买Vue全栈课程ccccccccccc",
                    id:"4"
                },
                {
                    cash:"5000",
                    date:'2021-2-4T09:05:35.255Z',
                    describe:'购买课程',
                    expend:'2005',
                    income:'2005',
                    type:'优惠券',
                    remark:"购买Vue全栈课程ccccccccccc",
                    id:"5"
                },
                {
                    cash:"5000",
                    date:'2021-2-10T09:05:35.255Z',
                    describe:'购买课程',
                    expend:'2006',
                    income:'2006',
                    type:'优惠券',
                    remark:"购买Vue全栈课程ccccccccccc",
                    id:"6"
                },
                {
                    cash:"5000",
                    date:'2021-2-12T09:05:35.255Z',
                    describe:'购买课程',
                    expend:'2007',
                    income:'2007',
                    type:'优惠券',
                    remark:"购买Vue全栈课程ccccccccccc",
                    id:"7"
                },
                {
                    cash:"5000",
                    date:'2021-2-13T09:05:35.255Z',
                    describe:'购买课程',
                    expend:'2008',
                    income:'2008',
                    type:'优惠券',
                    remark:"购买Vue全栈课程ccccccccccc",
                    id:"8"
                }
            ]
        }
    },
    created(){
        bus.$on('collapse',msg=>{
            console.log('资金--接受的数据collapse',msg)
            this.$store.dispatch("setIsCollapse",msg)
            this.collapse=this.$store.state.collapse
        })
            this.collapse=this.$store.state.collapse
            console.log('money--接受的数据collapse',this.collapse)
    },
    mounted() {
        bus.$emit("addform",this.addform)
    },
    methods:{
        handleEdit(index, row) {
            console.log(index, row);
            this.title="修改资金信息"
            bus.$emit("title",this.title)
            this.addform={
                cash:row.cash,
                describe:row.describe,
                expend:row.expend,
                income:row.income,
                type:row.type,
                remark:row.remark,
                id:row.id
            }
            bus.$emit("addform",this.addform)
            this.dialogFormVisible=true
            bus.$emit("dialogFormVisible",this.dialogFormVisible)
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleAdd(){
            console.log("789")
            this.dialogFormVisible=true
            bus.$emit("dialogFormVisible",this.dialogFormVisible)
            this.title="添加资金信息"
            bus.$emit("title",this.title)
            this.addform={
                type:"",
                describe:"",
                income:"",
                expend:"",
                cash:"",
                remark:"",
                id:""
            }
            bus.$emit("addform",this.addform)
        },
        handleSearch(){
            if(!this.searchDate.startDate || !this.searchDate.endDate){
                this.notify({
                    type:"error",
                    message:"请先选择时间区间"
                })
                // 因为什么也没有筛选就点击筛选按钮，所以就返回全部的数据
                this.getProfile()
                return;
            }
            var sTime=this.searchDate.startDate.getTime()
            var eTime=this.searchDate.endDate.getTime()
            // allTableData:是存储获取全部的数据，filterTableData最初也是获取的全部数据
            this.allTableData=this.filterData.filter((item)=>{
                var date=new Date(item.date)
                var time=date.getTime()
                return time>=sTime &&  time<=eTime
            })
            // 最后重要的是分页数据方法的调用
            this.setPaginations()
        }
    },
    components:{
        dialogAdd,
        pages,
    }
}
</script>

<style scoped>
.table{
    width:88vw;
    height:100%;
    position: relative;
    top:-0.17em;
    /* left:calc(12vw - 1px); */
    left:11.99vw;
    transition:left  1s;
    overflow: hidden;
    padding: 16px;
}
.tableone{
    position: relative;
    width:calc(100vw - 63px);
    height:100vh;
    left:63px;
    top:-0.17em;
    padding: 16px;
    box-sizing: border-box;
    transition: left 1s;
    overflow: hidden;
}
.btn .el-form-item__content .el-button{
    border:none;
}
/* .fill{
    width:100%;
    height:100%;
    padding: 16px;
    box-sizing: border-box;
} */
.warn{
    width:40vw;
    height:30vw;
    position: absolute;
    top:-8%;
    bottom: 0;
    left:0;
    right:0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.tip{
    width:100%;
}
.close{
    position: relative;
    right:20px;
    display: block;
    top:1%;
}
.btn{
    width: 100%;
    height:40px;
    position: relative;
}
.btnRight{
    position: absolute;
    right:0;
    top:-1px;
}
</style>
