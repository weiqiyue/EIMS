const { json } = require('body-parser');
var express = require('express');
var router=express.Router();
var passport=require('passport')
var Log=require('../model/log.js')
/* 上传文件 */
var multer=require('multer')
var fs=require('fs')

router.get('/',(req,res)=>{
    res.json({
        msg:"物流介绍的根路由"
    })
})

// 查询所有
router.get("/all",passport.authenticate('jwt', { session: false }),(req,res)=>{
    Log.find({})
    .then((doc)=>{
        console.log("查询全部成功",doc)
        res.json({
            msg:"查询全部成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("查询全部失败",err)
        res.json({
            msg:"查询全部失败",
            status:401,
            info:err
        })
    })
})

// 根据类别名和标题名来进行查询--如：快递服务+绝影特快
router.post("/find",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("根据两个条件查询所得参数",req.body)
    var {ctype,ttype}=req.body
    console.log("ctype是，ttype是",ctype,ttype)
    Log.findOne({classfy:ctype,title:ttype})
    .then((doc)=>{
        console.log("查找成功",doc)
        res.json({
            msg:"查找对应数据成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("查找失败",err)
        res.json({
            msg:"查找对应数据失败",
            status:401,
            info:err
        })
    })
})

/* 上传图片用的 */
var upload = multer({dest: './public/logs/'});   //类图
var path = ""  //类图
var upload1 = multer({dest: './public/logTexts/'});   //特点图
var path1 = ""  //特点图


// 更新图片1
router.post('/up', passport.authenticate('jwt', {
    session: false
}), upload.single('file'), (req, res) => {
    console.log("admin上传图片时的参数", req.body)
    /* 上传图片 */
    let ret = {};
    ret['code'] = 20000;
    var file = req.file;
    if (file) {
        console.log("上传的文件", file)
        var fileNameArr = file.originalname.split('.');
        var suffix = fileNameArr[fileNameArr.length - 1];
        //文件重命名
        fs.renameSync('./public/logs/' + file.filename, `./public/logs/${file.originalname}`);
        file['newfilename'] = `${file.originalname}`;
    }
    ret['file'] = file;

    path = `logs/${file.originalname}`
    res.json({
        status: 200,
        msg: "上传成功",
        info: ret,
        path:path
    })
})

// 更新text的特点图
router.post('/up1', passport.authenticate('jwt', {
    session: false
}), upload1.single('file'), (req, res) => {
    console.log("admin上传图片时的参数", req.body)
    /* 上传图片 */
    let ret = {};
    ret['code'] = 20000;
    var file = req.file;
    if (file) {
        console.log("上传的文件", file)
        var fileNameArr = file.originalname.split('.');
        var suffix = fileNameArr[fileNameArr.length - 1];
        //文件重命名
        fs.renameSync('./public/logTexts/' + file.filename, `./public/logTexts/${file.originalname}`);
        file['newfilename'] = `${file.originalname}`;
    }
    ret['file'] = file;

    path1 = `logTexts/${file.originalname}`
    res.json({
        status: 200,
        msg: "上传成功",
        info: ret,
        path:path1
    })
})

// 更新---根据类别名和标题名来进行查询--如：快递服务+绝影特快
router.post("/update",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("根据两个条件查询所得参数",req.body)
    var {ctype,ttype}=req.body
    var log={}
    if(req.body.ctype){
        log.classfy=req.body.ctype
    }
    if(req.body.ttype){
        log.title=req.body.ttype
    }
    if(path){
        log.img=path
    }
    if(req.body.content){
        log.content=req.body.content
    }
    if(req.body.summary){
        log.summary=req.body.summary
    }
    if(req.body.charge){
        log.charge=req.body.charge
    }
    if(req.body.cover){
        log.cover=req.body.cover
    }
    if(req.body.promise){
        log.promise=req.body.promise
    }
    if(req.body.text){
        log.text=req.body.text
    }
    if(req.body.time){
        log.time=req.body.time
    }
    if(req.body.timer){
        log.timer=req.body.timer
    }
    if(req.body.price){
        log.price=req.body.price
    }
    if(req.body.desc){
        log.desc=req.body.desc
    }
    if(req.body.weight){
        log.weight=req.body.weight
    }
    Log.findOneAndUpdate({classfy:ctype,title:ttype},{$set:log},{new:true})
    .then((doc)=>{
        console.log("更新成功",doc)
        res.json({
            msg:"更新对应数据成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("更新失败",err)
        res.json({
            msg:"更新对应数据失败",
            status:401,
            info:err
        })
    })
})


// 删除某条信息---根据类别名和标题名来进行查询--如：快递服务+绝影特快
router.post("/delete",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("根据两个条件删除所得参数",req.body)
    var {ctype,ttype}=req.body
    Log.findOneAndDelete({classfy:ctype,title:ttype})
    .then((doc)=>{
        console.log("删除成功",doc)
        res.json({
            msg:"删除成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("删除失败",doc)
        res.json({
            msg:"删除失败",
            status:401,
            info:err
        })
    })
})




module.exports = router;