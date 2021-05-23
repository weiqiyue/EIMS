var mongoose=require('mongoose');
// 新建约束类型
var newSchema=mongoose.Schema({
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
    // 发表时间
    pubtime:{
        type:Date,
        default:new Date()
    },
    detail:{
        type:String
    },
    // 上传的时间
    uptime:{
        type:String,
        // required:true,
        default:new Date()
    }
},{collection:'new'})

// 暴漏模型
var New=module.exports=mongoose.model('new',newSchema)