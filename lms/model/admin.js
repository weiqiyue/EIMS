/*
 * @Author: your name
 * @Date: 2021-03-26 13:37:57
 * @LastEditTime: 2021-04-23 18:27:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms\model\admin.js
 */
var mongoose=require('mongoose');

// 新建约束类型
var adminSchema=mongoose.Schema({
    // 姓名
    name:{
        type:String,
        // required:true
    },
    // 密码
    password:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    sex:{
        type:String,
        // required:true
    },
    age:{
        type:Number,
        min:[18,"最小年龄不能小于18"] 
    },
    address:{
        type:String,
    },
    // 注册时间
    registerDate:{
        type:Date,
        // default:Date.now
        default:new Date()
    },
    // 身份
    identity:{
        type:String,
        default:"employee"
    },
    // 备注
    remark:{
        type:String
    },
    phone:{
        type:String,
        // required:true
    },
    // 头像
    avatar:{
        type:String,
        default:"avatars/avatar.png"
    },
    // 审核状态
    status:{
        type:String,
        default:'checking'
    }
    
},{collection:'admin'})

// 导出模块
var Admin=module.exports=mongoose.model('admin',adminSchema)
