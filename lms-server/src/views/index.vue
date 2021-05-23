<template>
    <div class="holder">
        <headNav></headNav>
        <leftMenu></leftMenu>
        <div class="router">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import headNav from '../components/headNav.vue'
import leftMenu from '../components/leftMenu.vue'
export default {
    data(){
        return{

        }
    },
    components:{
        headNav,
        leftMenu
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .holder{
        overflow: hidden;
        width:100vw;
        height:100vh;
    }
</style>
