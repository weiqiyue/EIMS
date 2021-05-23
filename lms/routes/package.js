var express = require('express');
var router=express.Router();
var passport=require('passport')
var Package=require('../model/package.js')

router.get("/",(req,res)=>{
    console.log("这是包裹路由的根路由")
    res.json({
        msg:"这是包裹路由的根路由"
    })
})

// 查询所有的包裹
router.get("/all",passport.authenticate('jwt', { session: false }),(req,res)=>{
    Package.find({})
    .then((doc)=>{
        console.log("获取的所有的包裹",doc)
        res.json({
            msg:"获取的所有的包裹成功",
            status:200,
            info:doc.reverse()
        })
    })
    .catch((err)=>{
        console.log("获取全部订单失败",err)
        res.json({
            msg:"获取全部的订单失败",
            status:401,
            info:err
        })
    })
})

// 根据用户名查询包裹---根据操作人的名字
router.get("/byname/:name",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("接受的参数",req.params.name)
    Package.find({})
    .then((doc)=>{
        var newList=doc.filter((item,index)=>{
            if(item.username==req.params.name){
                return item
            }
        })
        console.log("按照名字查询成功",doc)
        res.json({
            msg:"按照名字查询包裹成功",
            status:200,
            info:newList
        })
    })
    .catch((err)=>{
        console.log("按照名字查询失败",err)
        res.json({
            msg:"按照名字查询包裹失败",
            status:401,
            info:err
        })
    })
})

// 根据id(包裹号)查询
router.get("/bycode/:code",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("接受的参数",req.params.code)
    Package.find({"_id":req.params.code})
    .then((doc)=>{
        console.log("查询成功",doc)
        res.json({
            msg:"查询成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("查询失败",err)
        res.json({
            msg:"查询失败",
            status:404,
            info:err
        })
    })
})

// 添加包裹
router.post("/add",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("接受的参数",req.body)
    var package={}=req.body
    var mail=new Package(package)
    mail.save()
    .then((doc)=>{
        console.log("保存包裹信息成功",doc)
        res.json({
            msg:"保存包裹成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("包裹包裹信息失败",err)
        res.json({
            msg:"保存包裹失败",
            status:401,
            info:err
        })
    })
})

//修改包裹的信息---根据id
router.post("/modify/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("接受的参数",req.params.id)
    var package={}
    if(req.body.username){
        package.username=req.body.username
    }
    if(req.body.Susername){
        package.Susername=req.body.Susername
    }
    if(req.body.Saddress){
        package.Saddress=req.body.Saddress
    }
    if(req.body.Sphone){
        package.Sphone=req.body.Sphone
    }
    if(req.body.packagename){
        package.packagename=req.body.packagename
    }
    if(req.body.packagenum){
        package.packagenum=req.body.packagenum
    }
    if(req.body.packageweight){
        package.packageweight=req.body.packageweight
    }
    if(req.body.Cusername){
        package.Cusername=req.body.Cusername
    }
    if(req.body.Caddress){
        package.Caddress=req.body.Caddress
    }
    if(req.body.Cphone){
        package.Cphone=req.body.Cphone
    }
    if(req.body.progress){
        package.progress=req.body.progress
    }
    // 收货时
    if(req.body.cman){
        package.cman=req.body.cman
    }
    if(req.body.cremark){
        package.cremark=req.body.cremark
    }
    if(req.body.ctime){
        package.ctime=req.body.ctime
    }
    // 发货时
    if(req.body.sman){
        package.sman=req.body.sman
    }
    if(req.body.sremark){
        package.sremark=req.body.sremark
    }
    if(req.body.stime){
        package.stime=req.body.stime
    }
    // 配送时
    if(req.body.dremark){
        package.dremark=req.body.dremark
    }
    if(req.body.dtime){
        package.dtime=req.body.dtime
    }
    // 配车时
    if(req.body.carcode){
        package.carcode=req.body.carcode
    }else if(req.body.carcode==''){
        package.carcode=''
    }
    if(req.body.carman){
        package.carman=req.body.carman
    }else if(req.body.carman==''){
        package.carman=''
    }
    if(req.body.carphone){
        package.carphone=req.body.carphone
    }else if(req.body.carphone==''){
        package.carphone=''
    }
    if(req.body.carline){
        package.carline=req.body.carline
    }else if(req.body.carline==''){
        package.carline=''
    }
    console.log("配车的参数",package.carcode,package.cman,package.carphone,package.carline)
    Package.findByIdAndUpdate({"_id":req.params.id},{$set:package},{new:true})
    .then((doc)=>{
        console.log("修改订单信息成功",doc)
        res.json({
            msg:"修改订单信息成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("修改订单信息失败",err)
        res.json({
            msg:"修改订单信息失败",
            status:401,
            info:err
        })
    })
})

// 根据订单号(id)删除
router.get("/delete/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("接受的参数",req.params.id)
    Package.findByIdAndDelete({"_id":req.params.id})
    .then((doc)=>{
        console.log("删除成功",doc)
        res.json({
            msg:"删除订单成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("删除失败",err)
        res.json({
            msg:"删除订单失败",
            status:401,
            info:err
        })
    })

})

module.exports = router;