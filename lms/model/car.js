var mongoose=require('mongoose');
// 新建约束类型
var carSchema=mongoose.Schema({
    // 车牌号
    carcode:{
        type:String
    },
    // 品牌型号
    brand:{
        type:String
    },
    // 首次上牌日期
    time:{
        type:Date,
        default:new Date()
    },
    rtime:{
        type:Date,
        default:new Date()
    },
    // 驾驶员
    carman:{
        type:String
    },
    // 驾驶员联系电话
    carphone:{
        type:String
    },
    // 备注
    carremark:{
        type:String
    }
},{collection:'car'})

// 暴漏模型
var Car=module.exports=mongoose.model('car',carSchema)