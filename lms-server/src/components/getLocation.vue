<!--
 * @Author: your name
 * @Date: 2021-03-18 17:51:14
 * @LastEditTime: 2021-03-18 22:02:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\components\getLocation.vue
-->
<template>
    <div>
        {{res}}
        <p>{{lat}}</p>
        <p>{{lng}}</p>
    </div>
</template>

<script>
import {location} from '../map/location.js'
import bus from '../assets/js/bus.js'
export default {
    data(){
        return{
            res:"",
            positionInfo:{
                lat:"",
                lng:"",
                address:""
            },
        }
    },
    mounted(){
        this.getLocation()
    },
    methods: {
        /**获取地图定位 1*/
        getLocation() {
            let _that = this;
            let geolocation = location.initMap("map-container"); //定位
            AMap.event.addListener(geolocation, "complete", result => {
                this.res=result
                this.positionInfo.address=result.formattedAddress.substr(0,6)
                console.log("获取的当前的位置",this.positionInfo.address)
                this.positionInfo.lag=result.position.lag
                this.positionInfo.lng=result.position.lng
                /* 传递数据 */
                bus.$emit('positionInfo',this.positionInfo)
                console.log(result)
                _that.lat = result.position.lat;
                _that.lng = result.position.lng;
                _that.province = result.addressComponent.province;
                _that.city = result.addressComponent.city;
                _that.district = result.addressComponent.district;
            });
        },
    },
}
</script>

<style>

</style>
