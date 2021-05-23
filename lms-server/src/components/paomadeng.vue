<template>
<!-- // 外框，固定宽度 -->
    <div class="wrap"> 
      <!-- // 内部滚动框 -->
        <div id="box">  
            <!-- //展示的文字 -->
            <div id="marquee" v-html="text"></div>  
        <!-- // 文字副本，为了实现无缝滚动 -->
            <div id="copy"></div>  
        </div>
    <!-- //为了获取text实际宽度 -->
        <div id="node" v-html="text"></div> 
    </div>
</template>
<script>
export default {
    /* 组件的名字可以不要 */
    // name: 'Marquee',
    /* 使用props里面的变量---像data中一样就行 */
    props: {
        lists:Array,
    }, // 父组件传入数据， 数组形式 [ "连雨不知春去"，"一晴方觉夏深"]
    data () {
        return {
            text: '' // 数组文字转化后的字符串
        }
    },
    methods: {
        move () {
    // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
        let width = document.getElementById('node').getBoundingClientRect().width 
        let box = document.getElementById('box')
        let copy = document.getElementById('copy')
        copy.innerHTML = this.text // 文字副本填充
        let distance = 0 // 位移距离
    //设置位移
        setInterval(function () { 
            distance = distance - 1
    // 如果位移超过文字宽度，则回到起点
            if (-distance >= width) {
            distance = 16
            }
            box.style.transform = 'translateX(' + distance + 'px)'
        }, 20) 
        }
    },
// 把父组件传入的arr转化成字符串
    mounted: function () {
        for (let i = 0; i < this.lists.length; i++) {
        this.text += ' ' + this.lists[i]
        }
    },
// 更新的时候运动
    updated: function () {
        this.move()
    }
}
</script>
<style scoped>
/* // 限制外框宽度，隐藏多余的部分 */
.wrap {
    overflow: hidden;
    background-color: #dadada;
}
/* // 移动框宽度设置 */
#box {
    width: 80000%;
}
/* // 文字一行显示 */
#box div {
    float: left;
}
/* // 设置前后间隔 */
#marquee {
    font-size: 14px;
    margin: 0 16px 0 0;
}
#copy{
    font-size: 14px;
}
/* // 获取宽度的节点，隐藏掉 */
#node {
    position: absolute;
    z-index: -999;
    top: -999999px;
}
</style>