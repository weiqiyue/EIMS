<!--
 * @Author: your name
 * @Date: 2021-02-12 21:23:34
 * @LastEditTime: 2021-04-24 18:54:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\views\Home.vue
-->
<template>
  <div :class="collapse===true ? 'homeone' : 'home'">
    <div class="title">
      <img :src="user.avatar">
      <div class="titleOne">绝影在线</div>
      <div class="titleTwo">专注于物流配送，追求精益物流，为顾客创造价值！</div>
    </div>
  </div>
</template>

<script>
import bus from '../assets/js/bus.js'
import {oneUser} from '../api/index.js'
export default {
  data(){
    return{
      collapse:true,
      user:{}
    }
  },
  created(){
    bus.$on('collapse',msg=>{
      this.$store.dispatch("setIsCollapse",msg)
      console.log('home--接受的数据collapse',msg)
      this.collapse=this.$store.state.collapse
    })

    this.getUser()
  },
  methods: {
    /* 请求用户的信息 */
        getUser(){
            oneUser(this.$store.state.user.name)
            .then((res)=>{
                res.info.avatar=`${this.$store.state.host}/${this.$store.state.user.avatar}`
                console.log("用户home请求用户成功",res)
                this.user=res.info
            })
            .catch((err)=>{
                console.log("用户home请求用户失败",err)
            })
        },
  },
}
</script>

<style scoped>
/* 来回摆动的样式 */
  .home{
    position: relative;
    width:88vw;
    height:100vh;
    background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    top:-1px;
    left:11.99vw;
    transition:left  1s;
  }
  .homeone{
    position: relative;
    width:calc(100vw - 63px);
    height:100vh;
    background-image: url("https://s3.jpg.cm/2021/02/01/BQnGp.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    top:-1px;
    left:63px;
    transition:left  1s;
  }

  
  .title{
    width:100vw;
    height:40vh;
    /* 修改的bug */
    position: absolute;  
    top:10vh;
    /* border:2px solid green; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .titleOne{
    font-size: 22px;
    margin-top: 15px;
    color:wheat;
    text-shadow: 0 0 0px #fff,
              0 0 5px #fff,
              0 0 10px #fff,
              0 0 15px #fff700,
              0 0 20px #fff700,
              0 0 30px #fff700,
              0 0 40px #fff700,
              0 0 50px #fff700 !important;
  }
  .titleTwo{
    font-size: 18px;
    margin-top: 2%;
    color: white;
    text-shadow: 0 0 0px #fff,
              0 0 5px #fff,
              0 0 10px #fff,
              0 0 15px #fff700,
              0 0 20px #fff700,
              0 0 30px #fff700,
              0 0 40px #fff700,
              0 0 50px #fff700 !important;
  }
  
</style>

