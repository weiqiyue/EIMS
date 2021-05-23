<template>
    <div>
        <!-- 回到顶部 -->
        <div :class="Y>=300?'TopOne':'Top'">
            <i class="fa fa-arrow-circle-up" v-on:click="upTop"></i>
        </div>
    </div>
</template>

<script>
import bus from '../assets/js/bus.js'
export default {
    data(){
        return{
            X:"",
            Y:"",
        }
    },
    created(){
        bus.$on("X",(msg)=>{
            this.X=msg
        })
        bus.$on("Y",(msg)=>{
            this.Y=msg
        })
    },
    watch:{
        X(){
            clearTimeout(this.time)
            this.time=setTimeout(()=>{
                this.Y=0
            },900)
        }
    },
    methods:{
        upTop(){
            $('.first').animate({scrollTop:0}, 400);
        }
    }
}
</script>

<style scoped>
.Top{
    display: none;
}
.TopOne{
    width:6vh;
    height:6vh;
    position: fixed;
    right:0;
    top:60vh;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
}
.TopOne i{
    font-size: 30px;
    color:red;
}
.TopOne i:hover{
    cursor: pointer;
}
</style>
