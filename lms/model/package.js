var mongoose=require('mongoose');
// 新建约束类型
var packageSchema=mongoose.Schema({
    // 用户名
    username:{
        type:String,
        requireed:true,
    },
    // 寄件人姓名
    Susername:{
        type:String,
        // required:true
    },
    // 寄件人地址
    Saddress:{
        type:String,
        // required:true
    },
    // 寄件人电话
    Sphone:{
        type:String,
        // required:true
    },
    // 包裹名字
    packagename:{
        type:String,
        // required:true
    },
    // 包裹数量
    packagenum:{
        type:Number,
        // required:true
    },
    packageweight:{
        type:Number,
        // required:true
    },
    // 收件人名字
    Cusername:{
        type:String,
        // required:true
    },
    // 收件人地址
    Caddress:{
        type:String,
        // required:true
    },
    // 收件人电话
    Cphone:{
        type:String,
        // required:true
    },
    // 订单进度
    progress:{
        type:String,
        // required:true
        default:'订单审核中'
    },
    // 下单时间
    ordertime:{
        type:Date,
        default:new Date()
    },

    // 下单备注
    oremark:{
        type:String,
        // required:true,
    },
    /* 收货时 */
    // 收货备注--管理员审核  通过 时的备注
    cremark:{
        type:String,
        default:''
    },
    // 收货时间
    ctime:{
        type:Date,
        default:''
    },
    // 收获人
    cman:{
        type:String,
        default:''
    },
    /* 发货时---管理员点击提交，订单  准备发货 ---收货员收货 */
    // 发货备注
    sremark:{
        type:String,
        default:''
    },
    // 发货时间
    stime:{
        type:Date,
        default:''
    },
    // 发货人
    sman:{
        type:String,
        default:''
    },
    /* 配送时---订单从物流公司发出 */
    // 配送进度
    dremark:{
        type:String,
        default:''
    },
    // 配送时间
    dtime:{
        type:Date,
        default:''
    },
    /* 配车 */
    // 车牌号
    carcode:{
        type:String,
        default:''
    },
    // 驾驶员
    carman:{
        type:String,
        default:''
    },
    // 驾驶员的电话
    carphone:{
        type:String,
        default:''
    },
    // 路线
    carline:{
        type:String,
        default:''
    }
    // 
},{collection:'package'})

// 暴漏模型
var Package=module.exports=mongoose.model('package',packageSchema)