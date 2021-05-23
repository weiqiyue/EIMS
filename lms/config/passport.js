var JwtStrategy=require('passport-jwt').Strategy,
ExtractJwt=require('passport-jwt').ExtractJwt;
// 引入数据库约束条件，方便获取到管理员的信息
var mongoose=require('mongoose')
/* 防止ObjectId无定义 */
var ObjectId = require('mongodb').ObjectID;
// 只需要引入约束条件的【名字】
var Admin=mongoose.model("admin")
// 还需要加密的名字---secrect
var keys=require('./index')

var opts={}
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=keys.secretOrKey;

module.exports=passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{  /* done：是一个回调函数 */
        // jwt_payload可以得到管理员的id、姓名等信息---所以就能过通过id获取该用户的信息
        console.log("验证的信息",jwt_payload)
        Admin.findOne({"_id":ObjectId(jwt_payload.id)})
            /* 返回的对象的名称，必须是--user ---不然返回的是空的*/
            .then((user)=>{
                // 如果该管理员存在.....
                if(user){
                    /* 返回给的是验证函数的req---req.user */
                    return done(null,user)
                }else{
                    return done(null,false)
                }
            })
            .catch((err)=>{
                console.log("查找错误",err)
            })
    }))
}