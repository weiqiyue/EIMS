<template>
    <div class="Area">
        <p class="area">我们在：</p>
        <p>华东区  浙江省</p>
        <p>华北区  山东省</p>
        <p>华中区  河南省</p>
        <p>华西区  四川省</p>
        <p>华南区  广东省</p>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.Area{
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.area{
    position: relative;
    left:-70px;
    font-size: 16px;
}
.Area p:not(.area){
    font-size: 20px;
    font-weight: bold;
}
</style>
