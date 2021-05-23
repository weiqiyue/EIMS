<template>
    <div class="adminHolder">
        <headNav></headNav>
        <superleftmenu></superleftmenu>
        <div class="router">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import headNav from '../components/headNav.vue'
import superleftmenu from '../components/superLeftmenu.vue'
export default {
    data(){
        return{

        }
    },
    components:{
        headNav,
        superleftmenu
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .adminHolder{
        overflow: hidden;
        width:100vw;
        height:100vh;
    }
</style>