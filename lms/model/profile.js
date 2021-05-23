var mongoose=require('mongoose')

var profileSchema=mongoose.Schema({
    type:{
        type:String
    },
    describe:{
        type:String
    },
    // 收入
    income:{
        type:String,
        required:true
    },
    // 支出
    expend:{
        type:String,
        required:true
    },
    // 现金
    cash:{
        type:String,
        required:true
    },
    // 备注
    remark:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
},{collection:'profile'})

var Profile=module.exports=mongoose.model('profile',profileSchema)