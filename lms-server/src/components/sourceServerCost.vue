

<template>
<!--修改的部分##################### -->
    <div>
        <div class="CostTable">
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props" class="inlineForm">
                        <!-- 镶嵌了一个表单 -->
                        <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="我们的产品">
                            <span>{{ props.row.title }}</span>
                        </el-form-item>
                        <el-form-item label="重量">
                            <span>{{ props.row.weight }}</span>
                        </el-form-item>
                        <el-form-item label="预计时效">
                            <span v-html="props.row.time"></span>
                        </el-form-item>
                        <el-form-item label="寄付价">
                            <span>{{ props.row.price }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span v-html="props.row.desc"></span>
                        </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                label="我们的产品"
                prop="title">
                </el-table-column>
                <el-table-column
                label="重量"
                prop="weight">
                </el-table-column>
                <el-table-column
                label="预计时效"
                prop="timer" style="color:red;">
                </el-table-column>
                <el-table-column
                label="寄付价"
                prop="price" style="color:red;">
                </el-table-column>
            </el-table>
        </div>
        <div class="Textmessage">
            <p style="font-size:14px;font-weight:bold;">1.运费基于以下计费规则：</p>
            <p>体积重量计算方法</p>
            <p>托寄物的计费重量取体积重量与实际重量两者之间的较大值，若为子母件，则将每件的计费重量进行汇总后计算总运费，其中，体积重量的计算方法为：</p>
            <div style="padding-left:2px;">
                <p style="font-weight:bold;">【 绝影即日 / 次晨 / 标快 】</p>
                <p>同城、省内件以及经济区域内互寄，体积重量 = 长 (CM)× 宽 (CM)× 高 (CM)÷12000 ；</p>
                <p>  省外跨经济区域互寄，体积重量 = 长 (CM)× 宽 (CM)× 高 (CM)÷6000 ； ( 经济区域包含：京津冀区域，江浙沪皖区域 , ，川渝区域，黑吉辽区域 )</p>
                <p style="font-weight:bold;">【 绝影标快（陆运） 】 体积重量 = 长 (CM)× 宽 (CM)× 高 (CM)÷12000 ；</p>
                <p style="font-weight:bold;">【 重货包裹 / 标准零担 / 冷运标快 】 体积重量 = 长 (CM)× 宽 (CM)× 高 (CM)÷6000 ；</p>
                <p style="font-weight:bold;">【 冷运零担 】 体积重量 = 长 (CM)× 宽 (CM)× 高 (CM)÷3000 ；</p>
            </div>
            <p style="font-size:14px;font-weight:bold;">2. 计费重量小数点进位处理方式</p>
            <div style="padding-left:2px;">
                <p style="font-weight:bold;">【中国内地互寄业务】 10KG 以下，续重以 0.1KG 为计重单位，四舍五入保留 1 位小数； 10-100KG ，续重以 0.5KG 为计重单位，采用 2378 制（ 2 退 3 进 7 退 8 进）； 100KG 及以上，四舍五入取整数。</p>
            </div>
            <p style="font-size:14px;font-weight:bold;">3. 运费计算结果处理方式</p>
            <div style="padding-left:2px;">
                <p>- 运费计算结果按四舍五入取整数值；</p>
                <p>- 不同产品起始重量各有差异，不足起重的快件将按起重计费并显示。</p>
            </div>
        </div>
    </div>
</template>

<script>
import {allLog} from '../api/index.js'
export default {
    data(){
        return{
            tableData: [
                // {
                //     production: '绝影标快',
                //     weight: '1kg',
                //     timer:"次日 12:00 前",
                //     time: "<p><span class='in'>省内</span>，<span class='timer'>次日</span> 12:00 前</p><p><span class='out'>省外</span>，<span class='timer'>第三天</span> 12:00 前</p>",
                //     price: '12.00元起',
                //     desc: "<p><span class='in'>省内</span><span class='money'>12元/kg</span>,<span class='addmoney'>超过1kg,每千克加<span class='addmoney1'>2元</span></span></p> <p><span class='out'>省外</span><span class='money'>18元/kg</span>,<span class='addmoney'>超过1kg,每千克加<span class='addmoney1'>6元</span></span></p>"
                // }, 
                // {
                //     production: '绝影特快',
                //     weight: '1kg',
                //     timer: '第三天 12:00 前',
                //     time:"<p>暂不支持<span class='in'>省内</span></p><p><span class='out'>省外</span>，<span class='timer'>第三天</span> 12:00 前</p>",
                //     price: '12.00元起',
                //     desc: "<p><span class='in'>省内</span><span class='money'>12元/kg</span>,<span class='addmoney'>超过1kg,每千克加<span class='addmoney1'>2元</span></span></p> <p><span class='out'>省外</span><span class='money'>18元/kg</span>,<span class='addmoney'>超过1kg,每千克加<span class='addmoney1'>6元</span></span></p>"
                // }
            ]
        }
    },
    created () {
        this.getlog()
    },
    methods: {
        // 获取全部的数据
        getlog(){
            allLog()
            .then((res)=>{
                console.log("获取全部的信息成功",res)
                this.tableData=res.info.filter((item,index)=>{
                    if(item.title.search("绝影特快")!=-1 || item.title.search("绝影标快")!=-1 ){
                        return item
                    }
                })
                console.log("筛选得到的字符串",this.tableData)
            })
            .catch((err)=>{
                console.log("获取全部的信息失败",err)
            })
        }
    },
}
</script>

<style scoped>
.Textmessage{
    text-align: left;
}
/* .CostTable{
    position: relative;
} */
.demo-table-expand{
    position: relative;
    top:0 !important;
    left:0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}
/deep/.el-table__expanded-cell[class*=cell]{
    padding:0 15px;
}
/deep/tbody .el-table_1_column_4  .cell{
    color:red;
}
/deep/tbody .el-table_1_column_5  .cell{
    color:red;
}
/deep/.in{
    color:#8134af;
}
/deep/.out{
    color:#dd2a7b;
}
/deep/.timer{
    color:#ff2e63;
}
/deep/.money{
    font-size: 18px;
    color:red;
    font-weight: bold;
}
/deep/.addmoney{
    font-size: 16px;
    color:#e41749;
}
/deep/.addmoney1{
    font-size:18px;
    font-weight: bold;
    color:#f6003c;
}
</style>