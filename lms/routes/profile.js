var express=require('express')
var router=express.Router()
var passport=require('passport')
var Profile=require('../model/profile.js')
var bodyParser=require('body-parser')
var ObjectId=require('mongodb').ObjectId

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json)

// 测试连接
router.get('/',(req,res)=>{
    res.json({
        msg:"测试接口"
    })
})

// 添加数据
/* 从登陆开始获取过token，登录过后的所有操作均需要验证token */
router.post('/add',passport.authenticate('jwt', { session: false }),(req,res)=>{
    var profileFields={}
    /* 接收的是请求体的内容 */
    if(req.body.type){
        profileFields.type=req.body.type
    }
    if(req.body.describe){
        profileFields.describe=req.body.describe
    }
    if(req.body.income){
        profileFields.income=req.body.income
    }
    if(req.body.expend){
        profileFields.expend=req.body.expend
    }
    if(req.body.cash){
        profileFields.cash=req.body.cash
    }
    if(req.body.remark){
        profileFields.remark=req.body.remark
    }
    var profile=new Profile(profileFields)
    profile.save()
        .then((doc)=>{
            console.log("上传profile成功",doc)
            res.json({
                msg:"添加成功",
                doc
            })
        })
        .catch((err)=>{
            console.log("上传profile失败",err)
            res.json({
                msg:"上传profile失败",
                err
            })
        })
})

// 获取所有的数据
router.get('/allprofile',passport.authenticate('jwt', { session: false }),(req,res)=>{
    Profile.find()
        .then((doc)=>{
            if(!doc){
                res.status(404).json({msg:"没有任何内容"})
            }
            console.log("获取全部数据成功",doc)
            res.json({
                msg:"获取全部数据成功",
                doc
            })
        })
        .catch(err=>{
            console.log("获取全部数据失败",err)
            res.json({
                msg:"获取全部数据失败",
                err
            })
        })
})

// 获取单个信息--根据前端请求的id
router.get('/one/:id',passport.authenticate('jwt', { session: false }),(req,res)=>{
    /* get请求使用params形式传参。利用query接收参数 */
    Profile.findOne({"_id":ObjectId(req.params.id)})
        .then((doc)=>{
            if(!doc){
                res.status(404).json({msg:"没有任何内容"})
            }
            console.log("获取单条数据成功",doc)
            res.json({
                msg:"获取单条数据成功",
                doc
            })
        })
        .catch(err=>{
            console.log("获取单条数据失败",err)
            res.json({
                msg:"获取单条数据失败",
                err
            })
        })
})

// 更新数据--根据id
router.post('/edit/:id',passport.authenticate('jwt', { session: false }),(req,res)=>{
    var profileFields={}
    /* 接收的是请求体的内容 */
    if(req.body.type){
        profileFields.type=req.body.type
    }
    if(req.body.describe){
        profileFields.describe=req.body.describe
    }
    if(req.body.income){
        profileFields.income=req.body.income
    }
    if(req.body.expend){
        profileFields.expend=req.body.expend
    }
    if(req.body.cash){
        profileFields.cash=req.body.cash
    }
    if(req.body.remark){
        profileFields.remark=req.body.remark
    }
    /* get请求使用params形式传参。利用query接收参数 */
    Profile.findByIdAndUpdate({"_id":ObjectId(req.params.id)},{$set:profileFields},{new:true})
        .then((doc)=>{
            if(!doc){
                res.status(404).json({msg:"没有任何内容"})
            }
            console.log("更新数据成功",doc)
            res.json({
                msg:"更新数据成功",
                doc
            })
        })
        .catch(err=>{
            console.log("更新数据失败",err)
            res.json({
                msg:"更新数据失败",
                err
            })
        })
})

// 删除数据
router.get('/delete/:id',passport.authenticate('jwt', { session: false }),(req,res)=>{
    /* get请求使用params形式传参。利用query接收参数 */
    Profile.findByIdAndRemove({"_id":ObjectId(req.params.id)})
        .then(doc=>{
            console.log("获取的删除的数据",doc)
            res.json({
                msg:"删除成功",
                doc
            })
            // profile.save()
            //     .then(doc1=>{
            //         console.log("删除成功后保存的数据",doc1)
            //         res.json({
            //             msg:"删除成功后保存的数据",
            //             doc1
            //         })
            //     })
                // .catch(err=>{
                //     console.log("删除失败--save",err)
                // })
        })
        .catch(err1=>{
            console.log("删除失败",err1)
            res.json({
                msg:"删除失败",
                err1
            })
        })
})


module.exports=router