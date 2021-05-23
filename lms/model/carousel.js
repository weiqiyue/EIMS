/*
 * @Author: your name
 * @Date: 2021-03-26 13:37:57
 * @LastEditTime: 2021-03-28 15:33:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms\model\carousel.js
 */
var mongoose=require('mongoose');
// 新建约束类型
var carouselSchema=mongoose.Schema({
    // 图片路径
    img:{
        type:String,
        // required:true
    },
    // 上传时间
    uptime:{
        type:Date,
        // required:true,
        default:new Date()
    }
},{collection:'carousel'})

// 暴漏模型
var Carousel=module.exports=mongoose.model('carousel',carouselSchema)