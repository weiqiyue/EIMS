<template>
    <div class="Stand">
        <div class="advise">
            <i class="fa fa-bullhorn"></i>
            <p>除了<span class="Danger">危险品，敏感品</span>等一系列危险物品均可</p>
        </div>
        <div class="StandTitle">
            <p>进出口件禁止/限制寄递物品</p>
        </div>
        <p class="StandTitleOne">我们不寄递/有条件寄递下列物品：</p>
        <div>
            <ul>
                <li v-for="(item, index) in optionslist" :key="index">{{item}}</li>
            </ul>
        </div>
        <p>除以上禁寄/限寄物品外，顺丰还有权拒绝寄递和/或暂停寄递以下物品：</p>
        <div>
            <ul>
                <li v-for="(item, index) in optionslist1" :key="index">{{item}}</li>
            </ul>
        </div>
        <p class="StandTitleOne">遵守始发地国家/地区当前适用的法律法规及政府规定是寄件人的义务，因各个国家或地区规定禁止或限制寄递的物品不尽相同，除以上禁寄/限寄物品标准外，建议寄件人还需参考物品寄递目的地国家/地区的进出口禁寄/限寄物品列表。</p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            optionslist:[
                    "武器、仿真武器、弹药、管制器具及爆炸物品",
                    "易燃烧性物品、易爆炸性物品",
                    "氧化剂和过氧化物",
                    "毒品及吸毒工具、非正当用途麻醉药品和精神药品、非正当用途的易制毒化学品、毒性物质",
                    "生化制品、传染性、感染性物质",
                    "腐蚀性物质、放射性物质",
                    "各类危害国家安全和社会稳定的非法出版物、印刷品、音像制品等宣传品",
                    "内容涉及国家秘密的文件、资料及其他物品",
                    "间谍专用器材",
                    "伪造或者变造的货币、有价证券、证件、公章等非法伪造物品",
                    "货币和有价证券",
                    "侵犯知识产权和假冒伪劣物品",
                    "动植物尤其各类濒危野生动物植物及其制品",
                    "如有碍人畜健康的、来自疫区的以及其他能传播疾病的食品、药品或者其他物品",
                    "烟草和烟草制品、酒",
                    "贵重物品（例如，艺术品、古董、宝石以及黄金等贵重金属）",
                    "其它法律法规的违禁品",
            ],
            optionslist1:[
                "任何未提供寄件人和收件人的详细联络信息的包裹；",
                "在我们看来不适合寄递或未用适合寄递的方式恰当地描述、分类或包装和加标签并具备必要凭证的物品；",
                "因为产品本身或包装特性，我们基于自身判断认为可能危及运输工具及人员安全的物品；",
                "我们基于自身判断认为从经济角度或操作角度不可寄递的物品。",
            ]
        }
    }
}
</script>

<style scoped>
.Stand{
    width:100%;
    height:100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px;
}
.advise{
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.advise i{
    font-size: 22px;
    margin-top: -5px;
}
.advise p{
    font-size:18px;
    font-weight:bold;
    margin-left:10px; 
}
.advise p span{
    color:red;
    font-size:20px;
}
ul{
    list-style-type:disc;
}
.StandTitle{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.StandTitle p{
    font-size:18px;
    font-weight:bold;
}
.StandTitleOne{
    font-weight:bold;
    font-size: 14px;
}

</style>
