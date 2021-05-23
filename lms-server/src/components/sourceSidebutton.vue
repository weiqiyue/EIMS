<template>
    <div>
        <!-- 侧边按钮 -->
        <div class="options">
            <div class="send" v-on:click="send">
                <i class="fa fa-send-o" style="font-weight:bold;font-size:14px;"></i>
                <div class="option">马上寄件</div>
            </div>
            <div class="query" v-on:click="Search">
                <i class="fa fa-search" style="font-weight:bold;font-size:14px;"></i>
                <div class="option">开始查件</div>
            </div>
            <div class="online" v-on:click="server">
                <i class="fa fa-user-circle-o" style="font-weight:bold;font-size:14px;"></i>
                <div class="option">服务查询</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        send(){
            this.$router.push({path:'/order',query:{currentindex:JSON.stringify(0)}})
        },
        Search(){
            this.$router.push({path:'/order',query:{currentindex:JSON.stringify(1)}})
        },
        server(){
            this.$router.push({path:'/order',query:{currentindex:JSON.stringify(2)}})
        }
    }
}
</script>

<style soped>
/* 侧边按钮 */
.options{
    width:7%;
    /* width:5vw; */
    height:24%;
    /* height:20vh; */
    position: fixed;
    right:4px;
    top:calc(72% + 4px);
    /* top:calc(72vh + 4px); */
    z-index:20;
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: center;
    background-color: whitesmoke;
    border-radius: 10px;
    /* border:2px solid purple; */
}
.send{
    width:75%;
    height:35%;
    /* height:7vh; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border:2px solid #ccc;
    border-top-style:none;
    border-left-style:none;
    border-right-style:none;
}
.send:hover i{
    color:red;
    cursor: pointer;
}
.send:hover .option{
    color:red;
    cursor: pointer;
}
.query{
    width:75%;
    height:35%;
    /* height:7vh; */
    margin-top: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
    border:2px solid #ccc;
    border-top-style:none;
    border-left-style:none;
    border-right-style:none;
}
.query:hover i{
    color:red;
    cursor: pointer;
}
.query:hover .option{
    color:red;
    cursor: pointer;
}
.online{
    width:75%;
    height:35%;
    /* height:7vh; */
    margin-top: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.online:hover i{
    color:red;
    cursor: pointer;
}
.online:hover .option{
    color:red;
    cursor: pointer;
}
.option{
    font-weight:bold;
    font-size: 14px;
}
</style>
