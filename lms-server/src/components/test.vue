<template>
    <div>
        <!-- 必须要有length辅助变量---不然不会点击自增 -->
        <p>{{length}}</p>
        <div v-for="(item,index) in list" :key="index" class="form">
            <input type="text" placeholder="请输入1" v-model="item.one" value="1">
            <input type="text" placeholder="请输入2" v-model="item.two">
            <input type="text" placeholder="请输入3" v-model="item.three" v-on:blur="blur">
            <button v-on:click="del">----</button>
        </div>
        <button v-on:click="add">+++</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[
                // 必须要有一个空的变量--配合下面的item变量--使得自增的行的数据不会与上一行的数据发生冲突
                {
                    one:'',
                    two:'',
                    three:'',
                }
            ],
            length:0,
            text:{},
            arr:[]
        }
    },
    created () {
        // 为了一开始就展示出来
        this.list.length=1
    },
    methods:{
        add(){
            this.list.length=this.list.length+1
            this.length=this.list.length
            
            /* 为了下一行的增加出来时，保持空的状态，不会与上一行的数据 重复和冲突 */
            var item={
                one:'',
                two:'',
                three:''
            }
            this.list[this.length-1]=item
            console.log(this.list)

            console.log(this.list.length)
        },
        del(){
            if(this.list.length>1){
                this.list.length=this.list.length-1
            }else{
                // 防止点击过多---3个框框消失在页面上
                this.list.length=1

                alert("不能再减了")

                // 清空减少至最后一行的数据
                this.list[this.list.length-1].one=''
                this.list[this.list.length-1].two=''
                this.list[this.list.length-1].three=''
            }
            this.length=this.list.length
            console.log("减少时的",this.length)
            this.list.splice(this.length,1)
            console.log("减少时的",this.list)
        },
        blur(){
            this.arr=this.list
            console.log("此时的数组",this.arr)
        }
    }
}
</script>

<style scoped>
p{
    display: none;
}
.form{
    width:100%;
    /* border:1px solid red; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}
</style>
