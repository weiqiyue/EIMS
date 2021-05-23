/*
 * @Author: your name
 * @Date: 2021-04-09 22:26:15
 * @LastEditTime: 2021-04-22 20:01:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms\model\log.js
 */
var mongoose=require('mongoose');
// 新建约束类型
var logSchema=mongoose.Schema({
    // 内容的大类别
    classfy:{
        type:String,
    },
    // 内容的标题
    title:{
        type:String,
        // required:true
    },
    // 内容的图片
    img:{
        type:String
    },
    // 内容的简单文本
    content:{
        type:String
    },
    // 内容的摘要
    summary:{
        type:String
    },
    // 内容的特点
    text:{
        type:Array
    },
    // 特点的图片
    pic:{
        type:String
    },
    // 收费
    charge:{
        type:String
    },
    // 覆盖范围
    cover:{
        type:String
    },
    // 承诺
    promise:{
        type:String
    },
    // 上传的时间
    uptime:{
        type:String,
        // required:true,
        default:new Date()
    },
    // 重量
    weight:{
        type:String,
    },
    // 大概时间
    timer:{
        type:String,
    },
    // 详细时间
    time:{
        type:String,
    },
    // 价格
    price:{
        type:String,
    },
    // 价格描述
    desc:{
        type:String,
    }
},{collection:'log'})

// 暴漏模型
var Log=module.exports=mongoose.model('log',logSchema)