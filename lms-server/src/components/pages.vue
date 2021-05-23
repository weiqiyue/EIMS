<template>
    <div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            :layout="pagination.layout"
            :total="pagination.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pagination:{
                currentPage:1,  //当前的页码
                total:0,   //总量
                pageSize:5,  //1页多少条
                pageSizes:[5,10,15],   //每页显示多少条
                layout:"total, sizes, prev, pager, next, jumper"
            }
        }
    },
    methods:{
        /* 每页多少条 */
        handleSizeChange(pagesize){

        },
        /* 当前的页码 */
        handleCurrentChange(page){

        }
    }
}
</script>

<style>

</style>
