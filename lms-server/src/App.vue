<!--
 * @Author: your name
 * @Date: 2021-02-12 21:23:32
 * @LastEditTime: 2021-05-09 01:44:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\App.vue
-->
<template>
  <div id="app">
    <!-- <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- </div> -->
    <router-view/>
  </div>
</template>

<script>
// 为了解析后端的token
import jwt_decode from "jwt-decode"
  export default {
  name: 'App',
  data(){
    return{
      CNZZ_ID:'1279640793',
      password:"",
    }
  },
  created(){    
    /* ☆☆☆防止刷新页面的时候，vuex存储的解析的token恢复默认 */
    var token=localStorage.getItem('wqToken')
    if(token){
      /* 不用解构 */
      var decode=jwt_decode(token)
      console.log("Appvue页面的token数据",jwt_decode(token))
      this.$store.dispatch("setAuthenticated",!this.isEmpty(decode))
      this.$store.dispatch("setUser",decode)
    }
  },
  mounted() {  
     // 创建cnzz统计js
    const script = document.createElement('script')  
    script.src = 'https://s9.cnzz.com/z_stat.php?id=1279640793&web_id=1279640793&online=1&show=line'
    script.language = 'JavaScript'  
    document.body.appendChild(script)  
  },
  methods:{
    /* 判断是否为空的方法 */
    isEmpty(value){   /* 如果为下面的，就会返回true */
        return( 
            value===undefined ||
            value===null ||
            (typeof value===Object && Object.keys(value).length===0) ||
            (typeof value===String && value.trim().length===0)
        )
    },

  },
  watch: {  
    '$route': {
      handler(to, from) {
        setTimeout(() => { //避免首次获取不到window._czc
          if (window._czc) {  
            let location = window.location; 
            let contentUrl = location.pathname + location.hash;  
            let refererUrl = '/';  
            // 用于发送某个URL的PV统计请求，
            window._czc.push(
              ['_trackPageview', contentUrl, refererUrl],
              ['_setAutoPageview',false]
            )  
          }
        }, 300) 
      },
      immediate: true  // 首次进入页面即执行
    }  
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
