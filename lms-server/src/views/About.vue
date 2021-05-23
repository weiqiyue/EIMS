<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
// import $ from '../assets/js/jquery-1.8.3.min.js'
import $ from 'jquery'
export default {
  data(){
    return{

    }
  },
  mounted() {
    var str = $("#cnzz_stat_icon_1279640793 a").text();   
    console.log("信息",str)
  },
}
</script>

